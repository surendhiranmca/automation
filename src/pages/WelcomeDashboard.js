import React from 'react';
import './WelcomeDashboard.css';

const WelcomeDashboard = ({ onHostelLogin }) => {
  return (
    <div className="welcome-fullscreen">
      {/* Dynamic Background Effects */}
      <div className="fullscreen-bg">
        <div className="glow-blob blob-top-left"></div>
        <div className="glow-blob blob-bottom-right"></div>
        <div className="bg-grid-overlay"></div>
      </div>

      {/* Navigation Header */}
      <header className="welcome-nav">
        <div className="nav-brand">
          <div className="brand-logo-icon">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 8L8 26V54H56V26L32 8Z" fill="url(#brandGrad)" stroke="#6366f1" strokeWidth="2.5" strokeLinejoin="round"/>
              <path d="M24 34H30V44H24V34Z" fill="#818cf8"/>
              <path d="M34 34H40V44H34V34Z" fill="#818cf8"/>
              <path d="M24 22H30V28H24V22Z" fill="#c7d2fe"/>
              <path d="M34 22H40V28H34V22Z" fill="#c7d2fe"/>
              <path d="M28 54V46H36V54H28Z" fill="#4f46e5"/>
              <defs>
                <linearGradient id="brandGrad" x1="8" y1="8" x2="56" y2="54" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ffffff" stopOpacity="0.95"/>
                  <stop offset="1" stopColor="#e0e7ff" stopOpacity="0.95"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="brand-text-container">
            <span className="brand-title">DON BOSCO</span>
            <span className="brand-subtitle">SKILL MISSION</span>
          </div>
        </div>

        <button className="nav-login-btn" onClick={onHostelLogin}>
          <span>Hostel Login</span>
          <svg className="nav-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </header>

      {/* Main Hero Content */}
      <main className="welcome-hero-container">
        <div className="hero-content">
          <div className="badge-pill">
            <span className="badge-sparkle">✨</span>
            <span>Hostel Management System</span>
          </div>

          <h1 className="hero-title">
            Welcome to <br />
            <span className="gradient-text">DON BOSCO SKILL MISSION</span> <br />
            Hostel Login
          </h1>

          <p className="hero-description">
            Complete automated solution for room allocations, 15-day roster generation, student tracking, and secure portal access.
          </p>

          <div className="hero-cta-group">
            <button className="primary-hero-btn" onClick={onHostelLogin}>
              <span>Hostel Login</span>
              <svg className="hero-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper icon-blue">
              🏢
            </div>
            <h3 className="feature-card-title">Room Management</h3>
            <p className="feature-card-desc">
              Monitor room occupancy, capacity limits, and status in real-time.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper icon-purple">
              📅
            </div>
            <h3 className="feature-card-title">Automated 15-Day Lists</h3>
            <p className="feature-card-desc">
              Automatic roster calculation and name list generation with complete archive history.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper icon-emerald">
              🔒
            </div>
            <h3 className="feature-card-title">Multi-Portal Security</h3>
            <p className="feature-card-desc">
              Dedicated portals for Administrators and Students with role-based access.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper icon-amber">
              ⚡
            </div>
            <h3 className="feature-card-title">Instant Transfers</h3>
            <p className="feature-card-desc">
              Seamless student room transfers and automated registration code assignment.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="welcome-footer">
        <p>© 2026 Don Bosco Skill Mission • Hostel Management System</p>
      </footer>
    </div>
  );
};

export default WelcomeDashboard;
