import React from 'react';
import { ArrowUp } from 'lucide-react';
import FooterKineticWordmark from './FooterKineticWordmark';

function LinkedInIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.4 9.74v-8.37H5.06v8.37h2.8z" />
    </svg>
  );
}

function InstagramIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function Footer({ onOpenDemo, onOpenCalculator, onNavigate }) {
  const [isPc, setIsPc] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth > 768 : true
  );

  React.useEffect(() => {
    const handleResize = () => {
      setIsPc(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: false, duration: 0.85 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    if (onNavigate) {
      if (targetId === 'home') {
        onNavigate('home');
        return;
      }
      if (targetId === 'about') {
        onNavigate('about');
        return;
      }
      if (targetId === 'pricing') {
        onNavigate('pricing');
        return;
      }
      if (targetId === 'features') {
        onNavigate('features');
        return;
      }
    }
    const el = document.getElementById(targetId);
    if (el) {
      if (window.lenis) {
        window.lenis.scrollTo(el, { offset: -70, duration: 0.85 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: false, duration: 0.85 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer data-theme="dark" data-nav-theme="dark" className="ms-style-footer">
      {/* Background Layer 1: Kinetic Vector Wordmark WebGL Canvas (Moved right & smaller) */}
      <div
        aria-hidden="true"
        className="ms-footer-bg-canvas-wrap"
      >
        <FooterKineticWordmark
          text="JOBGEN"
          background="#030712"
          textColor="#FFFFFF"
          shade="rgba(255, 255, 255, 0.14)"
          accent="rgba(56, 189, 248, 0.65)"
          font={{
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontWeight: 900,
            fontSize: isPc ? '255px' : '180px',
            letterSpacing: '-0.03em',
          }}
          handles={{ labels: true, size: 120, spread: 26 }}
        />
      </div>

      {/* Background Layer 2: Vignette / Atmospheric Depth Radial Gradient */}
      <div
        aria-hidden="true"
        className="ms-footer-vignette-overlay"
      />

      {/* Foreground Container: Content Grid & Typography Matching Reference */}
      <div className="container ms-footer-container">
        {/* Main Content Grid: All Text Content Settled to the Left */}
        <div className="ms-footer-grid">
          {/* Column 1: Brand & Locations & Socials */}
          <div className="ms-footer-col ms-footer-brand-col">
            <a href="/" className="ms-footer-brand-link" onClick={scrollToTop}>
              <img
                src="/assets/jobgen-white.webp"
                alt="JobGen AI"
                className="ms-footer-brand-logo"
              />
              <span className="ms-footer-brand-title">
                JOBGEN<span className="ms-footer-brand-dot">.AI</span>
              </span>
            </a>

            {/* City Locations with Australia & USA Flags */}
            <div className="ms-footer-locations-list">
              <div className="ms-footer-location-item">
                <span className="ms-footer-flag-emoji" role="img" aria-label="Australia">🇦🇺</span>
                <span className="ms-footer-location-city">Sydney, Australia</span>
              </div>
              <div className="ms-footer-location-item">
                <span className="ms-footer-flag-emoji" role="img" aria-label="United States">🇺🇸</span>
                <span className="ms-footer-location-city">San Francisco, CA</span>
              </div>
            </div>

            {/* Direct Contact Links */}
            <p className="ms-footer-contact-text">
              Direct: +1 (800) 562-4361<br />
              Sydney: (02) 8814 7905<br />
              Email:{' '}
              <a href="mailto:hello@jobgen.ai" className="ms-footer-inline-email">
                hello@jobgen.ai
              </a>
            </p>

            {/* Tactile Claymorphed Social Buttons: LinkedIn, Instagram, YouTube */}
            <div className="ms-footer-social-row" aria-label="Social media channels">
              <a
                href="https://linkedin.com/company/jobgenai"
                target="_blank"
                rel="noopener noreferrer"
                className="ms-footer-social-btn"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <LinkedInIcon size={16} />
              </a>
              <a
                href="https://instagram.com/jobgenai"
                target="_blank"
                rel="noopener noreferrer"
                className="ms-footer-social-btn"
                aria-label="Instagram"
                title="Instagram"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="https://www.youtube.com/@JobGenConnect"
                target="_blank"
                rel="noopener noreferrer"
                className="ms-footer-social-btn"
                aria-label="YouTube"
                title="YouTube"
              >
                <YoutubeIcon size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Pages */}
          <div className="ms-footer-col ms-footer-nav-col">
            <h3 className="ms-footer-heading">Platform</h3>
            <ul className="ms-footer-nav-list">
              <li>
                <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>
                  Home
                </a>
              </li>
              <li>
                <a href="#pillars" onClick={(e) => handleNavClick(e, 'pillars')}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#features" onClick={(e) => handleNavClick(e, 'features')}>
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" onClick={(e) => handleNavClick(e, 'pricing')}>
                  Pricing
                </a>
              </li>
              <li>
                <a href="#calls" onClick={(e) => handleNavClick(e, 'calls')}>
                  Real Call Library
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright Trademark, Compliance Links & Back to Top */}
        <div className="ms-footer-bottom-bar">
          <div className="ms-footer-copyright">
            © 2026 JobGen.AI. JobGen® is a registered trademark.
          </div>

          <div className="ms-footer-meta-links">
            <a href="#">Privacy Policy</a>
            <span className="ms-footer-meta-dot">•</span>
            <a href="#">Terms of Service</a>
            <span className="ms-footer-meta-dot">•</span>
            <a href="#">Security & Compliance</a>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="ms-footer-back-top-btn"
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
