import React from 'react';
import { ArrowUp, ArrowRight, PhoneCall, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import FooterKineticWordmark from './FooterKineticWordmark';

export default function Footer({ onOpenDemo, onOpenCalculator }) {
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer data-theme="dark" className="ms-style-footer">
      {/* Background Layer 1: Kinetic Vector Wordmark WebGL Canvas */}
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
            fontSize: isPc ? '272px' : '320px',
            letterSpacing: '-0.03em',
          }}
          handles={{ labels: true, size: 109, spread: 27 }}
        />
      </div>

      {/* Background Layer 2: Vignette / Atmospheric Depth Radial Gradient */}
      <div
        aria-hidden="true"
        className="ms-footer-vignette-overlay"
      />

      {/* Foreground Container: Content Grid & Typography Matching Reference */}
      <div className="container ms-footer-container">
        {/* Main Multi-Column Content Grid */}
        <div className="ms-footer-grid">
          {/* Column 1: Brand & Autonomous Telephony Positioning */}
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
            <p className="ms-footer-brand-desc">
              Sub-600ms conversational AI voice and telephony infrastructure for autonomous business operations, 24/7 inbound reception, and closed-loop sales execution.
            </p>
          </div>

          {/* Column 2: Navigation Pages */}
          <div className="ms-footer-col">
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

          {/* Column 3: Global Headquarters & Telephony Operations */}
          <div className="ms-footer-col">
            <h3 className="ms-footer-heading">Global Headquarters</h3>
            <p className="ms-footer-address-text">
              Suite 306, 60 Martin Place<br />
              Sydney NSW 2000, Australia<br />
              580 California St, San Francisco, CA 94104
            </p>
            <p className="ms-footer-contact-text">
              Direct: +1 (800) 562-4361<br />
              Sydney: (02) 8814 7905<br />
              Email:{' '}
              <a href="mailto:hello@jobgen.ai" className="ms-footer-inline-email">
                hello@jobgen.ai
              </a>
            </p>
          </div>

          {/* Column 4: Quick Action & Demo Launcher */}
          <div className="ms-footer-col ms-footer-cta-col">
            <h3 className="ms-footer-heading">Autonomous Action</h3>
            <p className="ms-footer-cta-desc">
              Experience zero-latency voice agents built specifically for your enterprise stack.
            </p>
            <div className="ms-footer-btn-stack">
              <button
                type="button"
                onClick={onOpenDemo}
                className="ms-footer-primary-btn"
              >
                <span>Book Free Demo</span>
                <ArrowRight size={15} />
              </button>
              <button
                type="button"
                onClick={onOpenCalculator}
                className="ms-footer-secondary-btn"
              >
                <span>Calculate Waiting Cost</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Compliance Links & Back to Top */}
        <div className="ms-footer-bottom-bar">
          <div className="ms-footer-copyright">
            © 2026 JobGen.Ai Inc. All rights reserved.
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
