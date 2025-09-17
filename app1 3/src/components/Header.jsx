import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import './Header.css';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    setShowUserMenu(false);
    navigate('/');
  };
  
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
          <img src="/favicon.svg" alt="Logo" className="logo-img" />
          <div className="logo-text">
            <h1>DisasterAlert</h1>
            <span className="subtitle">Disaster Reporting Platform</span>
          </div>
        </Link>
        
        <button
          className="menu-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/create" 
            className={`nav-link ${location.pathname === '/create' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Report Disaster
          </Link>
          <Link 
            to="/map" 
            className={`nav-link ${location.pathname === '/map' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Live Map
          </Link>
          <Link 
            to="/info" 
            className={`nav-link ${location.pathname === '/info' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Disaster Info
          </Link>
        </nav>
        
        <div className="header-actions">
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button className="emergency-btn">🚨 Emergency Alert</button>
          
          {user ? (
            <div className="user-menu">
              <button 
                className="user-profile-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                {user.photoURL && (
                  <img src={user.photoURL} alt="Profile" className="profile-image" />
                )}
                <span>{user.displayName || user.email}</span>
                <span className="dropdown-arrow">{showUserMenu ? '▲' : '▼'}</span>
              </button>
              
              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="user-info">
                    <strong>{user.displayName || 'User'}</strong>
                    <span>{user.email}</span>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button onClick={() => setShowUserMenu(false)}>Profile</button>
                  <button onClick={() => setShowUserMenu(false)}>Settings</button>
                  <div className="dropdown-divider"></div>
                  <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/register" className="register-btn">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}