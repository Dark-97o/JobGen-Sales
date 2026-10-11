import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, PhoneCall, X, LogIn } from 'lucide-react';

export default function Navbar({ onOpenDemo }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);

          // Check whether the section directly beneath the top navbar is white/light
          let isWhite = false;

          // 1. The White Contour Stage (after curved-black-shell)
          const whiteStage = document.querySelector('.white-contour-stage');
          if (whiteStage) {
            const rect = whiteStage.getBoundingClientRect();
            if (rect.top <= 65 && rect.bottom >= 45) {
              isWhite = true;
            }
          }

          // 2. Automate section in Hero with moving text lines (as soon as card shrinks: progress >= 0.05)
          const blackShell = document.querySelector('.curved-black-shell');
          if (!isWhite && blackShell) {
            const blackRect = blackShell.getBoundingClientRect();
            // If curved black shell is still below the navbar:
            if (blackRect.top > 65) {
              const heroTrack = document.querySelector('.hero-scroll-track');
              if (heroTrack) {
                const heroRect = heroTrack.getBoundingClientRect();
                const heroHeight = heroTrack.offsetHeight;
                const heroProgress = -heroRect.top / Math.max(heroHeight - window.innerHeight, 1);
                if (heroProgress >= 0.05 && heroRect.bottom > 65) {
                  isWhite = true;
                }
              }
            }
          }

          // Explicit Black/Dark Sections: Force isWhite = false so logo and text turn white!
          const guardrailsDark = document.querySelector('.guardrails-dark-section');
          if (guardrailsDark) {
            const gRect = guardrailsDark.getBoundingClientRect();
            if (gRect.top <= 75 && gRect.bottom >= 20) {
              isWhite = false;
            }
          }

          const testimonialDark = document.querySelector('.testimonial-dark-slide-section');
          if (testimonialDark) {
            const tRect = testimonialDark.getBoundingClientRect();
            if (tRect.top <= 75 && tRect.bottom >= 20) {
              isWhite = false;
            }
          }

          if (blackShell) {
            const bRect = blackShell.getBoundingClientRect();
            if (bRect.top <= 75 && bRect.bottom >= 20) {
              isWhite = false;
            }
          }

          setIsLightMode(isWhite);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
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
      <header className={`navbar-header-full ${isScrolled ? 'is-scrolled' : ''} ${isLightMode ? 'is-light-theme' : ''}`}>
        <nav className="navbar-full-container">
          {/* Top Left Side: JobGen Blue Logo + Text */}
          <a href="#home" onClick={handleHomeClick} className="navbar-brand-full">
            <img
              src={isLightMode ? '/assets/jobgen-logo.webp' : '/assets/jobgen-white.webp'}
              alt="JobGen Logo"
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
