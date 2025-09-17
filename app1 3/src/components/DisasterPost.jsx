import { useEffect, useState } from 'react';
import { severityLevels } from '../data/staticData';
import './DisasterPost.css';

export default function DisasterPost({ post, onVote }) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  
  const getSeverityColor = (severity) => {
    return severityLevels[severity.toUpperCase()]?.color || '#6b7280';
  };

  const truncateDescription = (text, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const openLightbox = (index) => {
    setActiveMediaIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const showPrev = () => {
    const total = post.media?.length || 0;
    if (!total) return;
    setActiveMediaIndex((prev) => (prev - 1 + total) % total);
  };

  const showNext = () => {
    const total = post.media?.length || 0;
    if (!total) return;
    setActiveMediaIndex((prev) => (prev + 1) % total);
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen]);

  // Keep the in-card carousel index in sync when opening lightbox
  useEffect(() => {
    setCarouselIndex(activeMediaIndex);
  }, [activeMediaIndex]);

  // Preload adjacent images to avoid flicker
  useEffect(() => {
    if (!post.media || post.media.length === 0) return;
    const next = post.media[(carouselIndex + 1) % post.media.length];
    const prev = post.media[(carouselIndex - 1 + post.media.length) % post.media.length];
    [next, prev].forEach((m) => {
      if (m?.type === 'image') {
        const img = new Image();
        img.src = m.url;
      }
    });
  }, [carouselIndex, post.media]);

  return (
    <div className="disaster-post">
      <div className="post-header">
        <div className="post-meta">
          <span className={`disaster-type type-${post.type.toLowerCase()}`}>
            {post.type}
          </span>
          <span 
            className="severity-badge"
            style={{ backgroundColor: getSeverityColor(post.severity) }}
          >
            {post.severity} Severity
          </span>
          {post.verified && (
            <span className="verified-badge">
              ✓ Verified
            </span>
          )}
        </div>
        <div className="post-info">
          <span className="time-ago">{post.timeAgo}</span>
          <span className="location">📍 {post.location}</span>
        </div>
      </div>

      <div className="post-content">
        <h2 className="post-title">{post.title}</h2>
        
        <div className="post-description">
          <p>
            {showFullDescription 
              ? post.description 
              : truncateDescription(post.description)
            }
            {post.description.length > 200 && (
              <button 
                className="read-more-btn"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? ' Show less' : ' Read more'}
              </button>
            )}
          </p>
        </div>

        {post.media && post.media.length > 0 && (
          <div className="post-media">
            <div className="media-item">
              <div className="media-frame carousel" onClick={() => openLightbox(carouselIndex)} role="button" tabIndex={0}>
                {post.media[carouselIndex].type === 'image' ? (
                  <img 
                    key={post.media[carouselIndex].url}
                    src={post.media[carouselIndex].url} 
                    alt={post.media[carouselIndex].caption || 'Image'} 
                    className="media-image fade-in"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = 'https://picsum.photos/seed/fallback/1200/800'; }}
                  />
                ) : (
                  <video 
                    key={post.media[carouselIndex].url}
                    className="media-video fade-in" 
                    controls 
                    poster={post.media[carouselIndex].poster}
                    preload="metadata"
                  >
                    <source src={post.media[carouselIndex].url} />
                    Your browser does not support the video tag.
                  </video>
                )}
                {post.media.length > 1 && (
                  <>
                    <button className="carousel-arrow left" onClick={(e) => { e.stopPropagation(); setCarouselIndex((i) => (i - 1 + post.media.length) % post.media.length); }} aria-label="Previous">‹</button>
                    <button className="carousel-arrow right" onClick={(e) => { e.stopPropagation(); setCarouselIndex((i) => (i + 1) % post.media.length); }} aria-label="Next">›</button>
                    <div className="carousel-dots">
                      {post.media.map((_, i) => (
                        <span key={i} className={`dot ${i === carouselIndex ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); setCarouselIndex(i); }} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="post-author">
          <strong>Reported by:</strong> {post.author}
        </div>
      </div>

      {lightboxOpen && post.media && post.media.length > 0 && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">✕</button>
            {post.media[activeMediaIndex]?.type === 'image' ? (
              <img 
                src={post.media[activeMediaIndex].url}
                alt={post.media[activeMediaIndex].caption || 'Image'}
                className="lightbox-media"
                onError={(e) => { e.currentTarget.src = 'https://picsum.photos/seed/fallback/1600/1000'; }}
              />
            ) : (
              <video className="lightbox-media" controls autoPlay poster={post.media[activeMediaIndex].poster}>
                <source src={post.media[activeMediaIndex].url} />
              </video>
            )}
            {post.media.length > 1 && (
              <>
                <button className="lightbox-arrow left" onClick={showPrev} aria-label="Previous">‹</button>
                <button className="lightbox-arrow right" onClick={showNext} aria-label="Next">›</button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="post-actions">
        <div className="voting">
          <button 
            className="vote-btn upvote"
            onClick={() => onVote(post.id, 'up')}
          >
            ⬆️ {post.upvotes}
          </button>
          <button 
            className="vote-btn downvote"
            onClick={() => onVote(post.id, 'down')}
          >
            ⬇️ {post.downvotes}
          </button>
        </div>
        
        <div className="post-stats">
          <span className="comments">💬 {post.comments} comments</span>
          <button className="share-btn">🔗 Share</button>
        </div>
      </div>
    </div>
  );
}