import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, PhoneCall, X, LogIn } from 'lucide-react';

export default function Navbar({ onOpenDemo }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHomeClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  };

  const handleNavClick = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Full-Width Top Navbar: Blue Logo on Left, Buttons + Fancy Hamburger on Right */}
      <header className={`navbar-header-full ${isScrolled ? 'is-scrolled' : ''}`}>
        <nav className="navbar-full-container">
          {/* Top Left Side: JobGen Blue Logo + Text */}
          <a href="#home" onClick={handleHomeClick} className="navbar-brand-full">
            <img
              src="/assets/jobgen-white.webp"
              alt="JobGen Blue Logo"
              className="brand-logo-img-blue"
            />
            <span className="brand-title-full">
              JOBGEN<span className="brand-title-accent">.AI</span>
            </span>
          </a>

          {/* Top Right Side Corner: Free Demo + Sign In + Fancy Hamburger Button */}
          <div className="navbar-right-cluster">
            {/* Free Demo Button */}
            <button
              type="button"
              onClick={onOpenDemo}
              className="btn-animated-demo"
              title="Launch Live Demo"
            >
              <span>Free Demo</span>
            </button>

            {/* Sign In Button */}
            <button
              type="button"
              onClick={onOpenDemo}
              className="btn-nav-signin"
              title="Sign Up or Log In"
            >
              <LogIn size={15} style={{ color: '#071A52' }} />
              <span>Sign Up / In</span>
            </button>

            {/* Fancy Looking Hamburger Button on Top Right Corner */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className={`btn-fancy-hamburger ${menuOpen ? 'is-active' : ''}`}
              aria-label="Toggle Navigation Menu"
              title="Navigation Menu"
            >
              <span className="fancy-hamburger-pill">
                <span className="fancy-line line-1" />
                <span className="fancy-line line-2" />
                <span className="fancy-line line-3" />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Fancy Slide-out Menu Drawer */}
      {menuOpen && (
        <div className="fancy-menu-drawer-backdrop" onClick={() => setMenuOpen(false)}>
          <div className="fancy-menu-panel" onClick={(e) => e.stopPropagation()}>
            <div className="fancy-menu-header">
              <div className="fancy-menu-brand">
                <img
                  src="/assets/jobgen-white.webp"
                  alt="JobGen Logo"
                  style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                />
                <span className="brand-title-full" style={{ fontSize: '1.25rem', color: '#fff' }}>
                  JOBGEN<span style={{ color: '#3B82F6' }}>.AI</span>
                </span>
              </div>
              <button
                type="button"
                className="btn-close-fancy-menu"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="fancy-menu-links">
              <a
                href="#home"
                className="fancy-menu-link"
                onClick={handleHomeClick}
              >
                <span className="menu-num">01</span>
                <span className="menu-text">Home</span>
                <ArrowRight size={18} className="menu-arrow" />
              </a>
              <a
                href="#platform"
                className="fancy-menu-link"
                onClick={(e) => { e.preventDefault(); handleNavClick('platform'); }}
              >
                <span className="menu-num">02</span>
                <span className="menu-text">Features</span>
                <ArrowRight size={18} className="menu-arrow" />
              </a>
              <a
                href="#pillars"
                className="fancy-menu-link"
                onClick={(e) => { e.preventDefault(); handleNavClick('pillars'); }}
              >
                <span className="menu-num">03</span>
                <span className="menu-text">AI Agents</span>
                <ArrowRight size={18} className="menu-arrow" />
              </a>
              <a
                href="#pricing"
                className="fancy-menu-link"
                onClick={(e) => { e.preventDefault(); handleNavClick('pricing'); }}
              >
                <span className="menu-num">04</span>
                <span className="menu-text">Pricing</span>
                <ArrowRight size={18} className="menu-arrow" />
              </a>
            </div>

            <div className="fancy-menu-footer">
              <div className="fancy-menu-status">
                <span className="fancy-status-dot" />
                <span>Jenny (Inbound) & Olivia (Outbound) Active</span>
              </div>
              <div className="fancy-menu-actions">
                <button
                  type="button"
                  onClick={() => { setMenuOpen(false); onOpenDemo(); }}
                  className="btn-animated-demo"
                  style={{ width: '100%', height: '42px', fontSize: '0.9rem' }}
                >
                  <span>Book Free Demo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
