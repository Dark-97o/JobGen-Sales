import React, { useState, useEffect } from 'react';
import { LogIn, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenDemo, onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      if (window.innerWidth > 860) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleHomeClick = (e) => {
    e.preventDefault();
    setActiveTab('Home');
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (id, tabName) => {
    setActiveTab(tabName);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-header-full ${isScrolled ? 'is-scrolled' : 'is-hero-mode'} ${isMobileMenuOpen ? 'is-menu-open' : ''}`}>
      {/* While in hero section: transparent on hero itself. When scrolled: blur transparent white claymorphed bar */}
      <nav className="navbar-clay-pill-bar" aria-label="Main Navigation">
        {/* Left: Logo (White on Hero, Blue on Scrolled) + Brand */}
        <a href="#home" onClick={handleHomeClick} className="navbar-brand-full">
          <img
            src={isScrolled ? '/assets/jobgen-logo.webp' : '/assets/jobgen-white.webp'}
            alt="JobGen Logo"
            className={isScrolled ? 'brand-logo-img-blue' : 'brand-logo-img-white'}
          />
          <span className="brand-title-full">
            JOBGEN<span className="brand-title-accent">.AI</span>
          </span>
        </a>

        {/* Center: Actual Navigation Options (Desktop) */}
        <div className="navbar-links-center">
          <a
            href="#home"
            onClick={handleHomeClick}
            className={`nav-clay-link ${activeTab === 'Home' ? 'is-active' : ''}`}
          >
            Home
          </a>
          <a
            href="#industries"
            onClick={(e) => { e.preventDefault(); handleNavClick('industries', 'Industries'); }}
            className={`nav-clay-link ${activeTab === 'Industries' ? 'is-active' : ''}`}
          >
            Industries
          </a>
          <a
            href="#handover"
            onClick={(e) => { e.preventDefault(); handleNavClick('handover', 'About us'); }}
            className={`nav-clay-link ${activeTab === 'About us' ? 'is-active' : ''}`}
          >
            About us
          </a>
          <a
            href="#platform"
            onClick={(e) => { e.preventDefault(); handleNavClick('platform', 'Features'); }}
            className={`nav-clay-link ${activeTab === 'Features' ? 'is-active' : ''}`}
          >
            Features
          </a>
          <a
            href="#pricing"
            onClick={(e) => { e.preventDefault(); handleNavClick('pricing', 'Pricing'); }}
            className={`nav-clay-link ${activeTab === 'Pricing' ? 'is-active' : ''}`}
          >
            Pricing
          </a>
        </div>

        {/* Right: Free Demo + Sign In Buttons + Mobile Hamburger */}
        <div className="navbar-right-cluster">
          <button
            type="button"
            onClick={onOpenDemo}
            className="btn-nav-signin"
            title="Sign Up or Log In"
          >
            <LogIn size={15} className="nav-signin-icon" />
            <span className="nav-signin-text">Sign In</span>
          </button>

          <button
            type="button"
            onClick={onOpenBooking || onOpenDemo}
            className="btn-animated-demo"
            title="Request a Free Demo"
          >
            <span>Free Demo</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`nav-hamburger-btn ${isMobileMenuOpen ? 'is-active' : ''}`}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Claymorphic Mobile Drawer Menu */}
      <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'is-open' : ''}`} aria-hidden={!isMobileMenuOpen}>
        <div className="mobile-nav-backdrop" onClick={() => setIsMobileMenuOpen(false)} />
        <div className="mobile-nav-clay-sheet">
          <div className="mobile-nav-sheet-header">
            <span className="mobile-nav-menu-label">Menu</span>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-nav-close-btn"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mobile-nav-links-list">
            <button
              type="button"
              onClick={handleHomeClick}
              className={`mobile-nav-item ${activeTab === 'Home' ? 'is-active' : ''}`}
            >
              <span>Home</span>
              <span className="mobile-nav-item-indicator" />
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('industries', 'Industries')}
              className={`mobile-nav-item ${activeTab === 'Industries' ? 'is-active' : ''}`}
            >
              <span>Industries</span>
              <span className="mobile-nav-item-indicator" />
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('handover', 'About us')}
              className={`mobile-nav-item ${activeTab === 'About us' ? 'is-active' : ''}`}
            >
              <span>About us</span>
              <span className="mobile-nav-item-indicator" />
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('platform', 'Features')}
              className={`mobile-nav-item ${activeTab === 'Features' ? 'is-active' : ''}`}
            >
              <span>Features</span>
              <span className="mobile-nav-item-indicator" />
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('pricing', 'Pricing')}
              className={`mobile-nav-item ${activeTab === 'Pricing' ? 'is-active' : ''}`}
            >
              <span>Pricing</span>
              <span className="mobile-nav-item-indicator" />
            </button>
          </div>

          <div className="mobile-nav-footer-actions">
            <button
              type="button"
              onClick={() => { setIsMobileMenuOpen(false); onOpenDemo(); }}
              className="mobile-drawer-btn-signin"
            >
              <LogIn size={16} />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => { setIsMobileMenuOpen(false); (onOpenBooking || onOpenDemo)(); }}
              className="mobile-drawer-btn-demo"
            >
              <span>Book Free Demo</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
