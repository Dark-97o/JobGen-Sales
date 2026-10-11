import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrapper footer-clay-wrapper">
      <div className="container">
        <div className="footer-clay-card">
          {/* Top Header Row: Brand & Live Infrastructure Status */}
          <div className="footer-clay-top-bar">
            <div className="footer-brand-header">
              <img
                src="/assets/jobgen-white.webp"
                alt="JobGen White Logo"
                className="footer-brand-logo-img"
              />
              <span className="footer-brand-title">
                JOBGEN<span className="footer-brand-accent">.AI</span>
              </span>
            </div>

            <div className="footer-status-clay-pill">
              <span className="footer-status-pulse-dot" />
              <span>Sub-600ms Live Voice Infrastructure</span>
            </div>
          </div>

          <div className="footer-clay-divider" />

          {/* Main 4-Column Navigation Grid */}
          <div className="footer-clay-grid">
            {/* Brand Intro Column */}
            <div className="footer-brand-col">
              <p className="footer-brand-desc">
                The unified autonomous AI voice workforce for 24/7 inbound reception, instant calendar bookings, and multi-channel sales outreach.
              </p>
              <div className="footer-quick-actions">
                <a
                  href="mailto:hello@jobgen.ai"
                  className="footer-clay-action-pill"
                >
                  <Mail size={14} />
                  <span>hello@jobgen.ai</span>
                </a>
              </div>
            </div>

            {/* Column 1: AI Agents */}
            <div className="footer-nav-col">
              <h4 className="footer-col-title">AI Agents</h4>
              <ul className="footer-link-list">
                <li><a href="#">Jenny · Inbound Receptionist</a></li>
                <li><a href="#">Olivia · Outbound Sales Agent</a></li>
                <li><a href="#">Jess · Technical Recruiter</a></li>
                <li><a href="#">Emma · Education Advisor</a></li>
                <li><a href="#calls">Real Call Library</a></li>
              </ul>
            </div>

            {/* Column 2: Platform & Features */}
            <div className="footer-nav-col">
              <h4 className="footer-col-title">Platform</h4>
              <ul className="footer-link-list">
                <li><a href="#platform">Sub-600ms Voice Engine</a></li>
                <li><a href="#pillars">24/7 After-Hours Answering</a></li>
                <li><a href="#pillars">Live Diary & CRM Sync</a></li>
                <li><a href="#compare">Workflow Comparison</a></li>
                <li><a href="#pricing">Dynamic ROI Calculator</a></li>
              </ul>
            </div>

            {/* Column 3: Company & Connect */}
            <div className="footer-nav-col">
              <h4 className="footer-col-title">Company</h4>
              <ul className="footer-link-list">
                <li><a href="mailto:hello@jobgen.ai">Contact Support</a></li>
                <li><a href="https://calendly.com/jobgen-demo/30min" target="_blank" rel="noreferrer">Book Executive Demo</a></li>
                <li><a href="#">Security & Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Partner Program</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-clay-divider" />

          {/* Bottom Bar: Global Offices & Back to Top */}
          <div className="footer-clay-bottom-bar">
            <div className="footer-locations-cluster">
              <span className="footer-location-clay-pill">
                🇺🇸 <strong>San Francisco</strong>: 580 California St, CA 94104
              </span>
              <span className="footer-location-clay-pill">
                🇦🇺 <strong>Sydney</strong>: 60 Martin Place, NSW 2000
              </span>
            </div>

            <div className="footer-bottom-meta">
              <span className="footer-copyright">
                © 2026 JobGen.ai Inc. All rights reserved.
              </span>
              <button
                type="button"
                onClick={scrollToTop}
                className="footer-back-to-top-clay-btn"
                aria-label="Back to top"
                title="Back to top"
              >
                <ArrowUp size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
