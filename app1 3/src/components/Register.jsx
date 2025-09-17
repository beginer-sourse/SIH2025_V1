import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    photo: null
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, photo: 'Please select a valid image file' }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, photo: 'Image size should be less than 5MB' }));
        return;
      }
      setFormData(prev => ({ ...prev, photo: file }));
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreview(e.target.result);
      reader.readAsDataURL(file);
      if (errors.photo) setErrors(prev => ({ ...prev, photo: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    else if (formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.photo) newErrors.photo = 'Profile photo is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      let photoURL = null;
      if (formData.photo) {
        const fd = new FormData();
        fd.append('folder', 'profilePhotos');
        fd.append('files', formData.photo, `${cred.user.uid}-${formData.photo.name}`);
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        if (!res.ok) throw new Error('Photo upload failed');
        const data = await res.json();
        photoURL = data.files && data.files[0] ? data.files[0].url : null;
      }
      await updateProfile(cred.user, { displayName: formData.name, photoURL: photoURL || undefined });
      navigate('/');
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>Join DisasterAlert</h1>
          <p>Create your account to start reporting and staying informed</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={errors.name ? 'error' : ''} placeholder="Enter your full name" />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={errors.email ? 'error' : ''} placeholder="Enter your email" />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className={errors.password ? 'error' : ''} placeholder="Create a password" />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={errors.confirmPassword ? 'error' : ''} placeholder="Confirm your password" />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className={errors.dateOfBirth ? 'error' : ''} />
            {errors.dateOfBirth && <span className="error-text">{errors.dateOfBirth}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="photo">Profile Photo</label>
            <div className="photo-upload">
              <input type="file" id="photo" accept="image/*" onChange={handlePhotoChange} className="photo-input" />
              <label htmlFor="photo" className="photo-upload-label">
                {photoPreview ? (
                  <div className="photo-preview">
                    <img src={photoPreview} alt="Profile preview" />
                    <div className="photo-overlay"><span>Click to change photo</span></div>
                  </div>
                ) : (
                  <div className="photo-placeholder">
                    <div className="upload-icon">📷</div>
                    <span>Upload your photo</span>
                    <small>JPG, PNG up to 5MB</small>
                  </div>
                )}
              </label>
            </div>
            {errors.photo && <span className="error-text">{errors.photo}</span>}
          </div>

          {errors.general && <div className="error-message general-error">{errors.general}</div>}

          <button type="submit" className="register-btn" disabled={isLoading}>
            {isLoading ? (<><span className="loading-spinner"></span>Creating Account...</>) : ('Create Account')}
          </button>
        </form>

        <div className="register-footer">
          <p>Already have an account? <Link to="/login">Sign in here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;