import { useState } from 'react';
import { disasterTypes } from '../data/staticData';
import './CreatePost.css';
import { db, serverTimestamp } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    location: '',
    severity: '',
    description: '',
    coordinates: { lat: '', lng: '' },
    media: [],
    contactNumber: '',
    reporterRole: 'citizen'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({ ...prev, [parent]: { ...prev[parent], [child]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    const mediaFiles = files.map(file => ({
      type: file.type.startsWith('image/') ? 'image' : 'video',
      name: file.name,
      size: file.size,
      file
    }));
    setFormData(prev => ({ ...prev, media: [...prev.media, ...mediaFiles] }));
  };

  const removeMedia = (index) => {
    setFormData(prev => ({ ...prev, media: prev.media.filter((_, i) => i !== index) }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            coordinates: {
              lat: position.coords.latitude.toFixed(6),
              lng: position.coords.longitude.toFixed(6)
            }
          }));
        },
        () => { alert('Unable to get current location. Please enter manually.'); }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.type) newErrors.type = 'Disaster type is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.severity) newErrors.severity = 'Severity level is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.description.length < 20) newErrors.description = 'Description must be at least 20 characters';
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    const phoneRegex = /^[6-9]\d{9}$/;
    if (formData.contactNumber && !phoneRegex.test(formData.contactNumber.replace(/\D/g, ''))) {
      newErrors.contactNumber = 'Please enter a valid 10-digit Indian mobile number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Upload selected files to local upload server and return URLs
  const uploadMediaAndGetUrls = async (reportId) => {
    const fd = new FormData();
    fd.append('folder', `reports/${reportId}`);
    for (const item of formData.media) {
      fd.append('files', item.file, item.name);
    }
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    if (!res.ok) throw new Error('Upload failed');
    const data = await res.json();
    // Server returns { files: [{ url, originalName, mimetype, size }] }
    return (data.files || []).map(f => ({
      type: f.mimetype && f.mimetype.startsWith('image/') ? 'image' : 'video',
      url: f.url,
      caption: f.originalName
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      // Create the report without media first to get doc id
      const docRef = await addDoc(collection(db, 'reports'), {
        title: formData.title,
        type: formData.type,
        location: formData.location,
        severity: formData.severity,
        description: formData.description,
        coordinates: {
          lat: formData.coordinates.lat ? parseFloat(formData.coordinates.lat) : null,
          lng: formData.coordinates.lng ? parseFloat(formData.coordinates.lng) : null,
        },
        contactNumber: formData.contactNumber,
        reporterRole: formData.reporterRole,
        upvotes: 0,
        downvotes: 0,
        comments: 0,
        verified: false,
        createdAt: serverTimestamp()
      });

      // Upload media if any and update the doc
      let media = [];
      if (formData.media.length > 0) {
        media = await uploadMediaAndGetUrls(docRef.id);
      }

      if (media.length > 0) {
        // import updateDoc lazily to keep top import tidy
        const { updateDoc } = await import('firebase/firestore');
        await updateDoc(docRef, { media });
      }

      setSubmitSuccess(true);
      setFormData({
        title: '', type: '', location: '', severity: '', description: '',
        coordinates: { lat: '', lng: '' }, media: [], contactNumber: '', reporterRole: 'citizen'
      });
    } catch (err) {
      alert('Failed to submit report: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="create-post">
        <div className="success-message">
          <div className="success-icon">✅</div>
          <h2>Report Submitted Successfully!</h2>
          <p>Thank you for reporting this disaster. Your report has been submitted to local authorities and will help with emergency response efforts.</p>
          <button className="new-report-btn" onClick={() => setSubmitSuccess(false)}>
            Submit Another Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="create-post">
      <div className="create-post-container">
        <div className="form-header">
          <h1>Report a Disaster</h1>
          <p>Help your community by providing accurate information about disaster incidents</p>
          <div className="emergency-notice">
            <strong>🚨 Emergency?</strong> If this is a life-threatening emergency, call <strong>112</strong> immediately
          </div>
        </div>

        <form onSubmit={handleSubmit} className="disaster-form">
          {/* Reporter Information */}
          <div className="form-section">
            <h3>Reporter Information</h3>
            <div className="form-group">
              <label htmlFor="reporterRole">I am a:</label>
              <select id="reporterRole" name="reporterRole" value={formData.reporterRole} onChange={handleInputChange} required>
                <option value="citizen">Citizen</option>
                <option value="volunteer">Volunteer</option>
                <option value="official">Government Official</option>
                <option value="first_responder">First Responder</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number *</label>
              <input type="tel" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} placeholder="Enter 10-digit mobile number" className={errors.contactNumber ? 'error' : ''} required />
              {errors.contactNumber && <span className="error-text">{errors.contactNumber}</span>}
            </div>
          </div>

          {/* Disaster Details */}
          <div className="form-section">
            <h3>Disaster Information</h3>
            <div className="form-group">
              <label htmlFor="title">Report Title *</label>
              <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} placeholder="Brief description of the incident" className={errors.title ? 'error' : ''} required />
              {errors.title && <span className="error-text">{errors.title}</span>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="type">Disaster Type *</label>
                <select id="type" name="type" value={formData.type} onChange={handleInputChange} className={errors.type ? 'error' : ''} required>
                  <option value="">Select disaster type</option>
                  {disasterTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.type && <span className="error-text">{errors.type}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="severity">Severity Level *</label>
                <select id="severity" name="severity" value={formData.severity} onChange={handleInputChange} className={errors.severity ? 'error' : ''} required>
                  <option value="">Select severity</option>
                  <option value="Low">Low - Minor impact</option>
                  <option value="Medium">Medium - Moderate impact</option>
                  <option value="High">High - Severe impact</option>
                  <option value="Critical">Critical - Life threatening</option>
                </select>
                {errors.severity && <span className="error-text">{errors.severity}</span>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="description">Detailed Description *</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="Provide detailed information about the disaster - what happened, current situation, affected areas, casualties if any, immediate needs..." rows="5" className={errors.description ? 'error' : ''} required></textarea>
              <div className="char-count">{formData.description.length}/500 characters (minimum 20 required)</div>
              {errors.description && <span className="error-text">{errors.description}</span>}
            </div>
          </div>

          {/* Location Information */}
          <div className="form-section">
            <h3>Location Information</h3>
            <div className="form-group">
              <label htmlFor="location">Location Details *</label>
              <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} placeholder="City, District, State (e.g., Mumbai, Maharashtra)" className={errors.location ? 'error' : ''} required />
              {errors.location && <span className="error-text">{errors.location}</span>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="lat">Latitude (Optional)</label>
                <input type="number" id="lat" name="coordinates.lat" value={formData.coordinates.lat} onChange={handleInputChange} placeholder="e.g., 19.0760" step="any" />
              </div>
              <div className="form-group">
                <label htmlFor="lng">Longitude (Optional)</label>
                <input type="number" id="lng" name="coordinates.lng" value={formData.coordinates.lng} onChange={handleInputChange} placeholder="e.g., 72.8777" step="any" />
              </div>
              <button type="button" className="location-btn" onClick={getCurrentLocation}>📍 Get Current Location</button>
            </div>
          </div>

          {/* Media Upload */}
          <div className="form-section">
            <h3>Media Evidence (Optional)</h3>
            <p className="section-description">Upload photos or videos to help verify the report</p>
            <div className="media-upload">
              <input type="file" id="media" multiple accept="image/*,video/*" onChange={handleMediaUpload} style={{ display: 'none' }} />
              <label htmlFor="media" className="upload-btn">📷 Upload Photos/Videos</label>
              {formData.media.length > 0 && (
                <div className="media-preview">
                  {formData.media.map((item, index) => (
                    <div key={index} className="media-item">
                      <div className="media-info">
                        <span className="media-icon">{item.type === 'image' ? '📷' : '🎥'}</span>
                        <span className="media-name">{item.name}</span>
                        <span className="media-size">({(item.size / 1024 / 1024).toFixed(1)} MB)</span>
                      </div>
                      <button type="button" className="remove-media" onClick={() => removeMedia(index)}>✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? (<><span className="spinner"></span>Submitting Report...</>) : ('Submit Disaster Report')}
            </button>
            <p className="disclaimer">By submitting this report, you confirm that the information provided is accurate to the best of your knowledge. False reports may result in legal consequences.</p>
          </div>
        </form>
      </div>
    </div>
  );
}