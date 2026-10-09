import React from 'react';

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div className="brand-dot" />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', color: '#fff', letterSpacing: '-0.03em' }}>
                JOBGEN<span style={{ color: 'var(--color-blue-400)' }}>.AI</span>
              </span>
              <span className="brand-badge">ENTERPRISE</span>
            </div>
            <p style={{ color: 'var(--color-white-50)', fontSize: '0.9rem', lineHeight: 1.65, maxWidth: '340px', marginBottom: '1.5rem' }}>
              The unified autonomous AI voice workforce for 24/7 inbound reception, instant calendar bookings, and multi-channel sales outreach.
            </p>
            <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--color-blue-400)', background: 'rgba(37,99,235,0.1)', padding: '0.3rem 0.65rem', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(59,130,246,0.25)' }}>
              SOC-2 TYPE II · HIPAA BAA · 99.99% SLA
            </span>
          </div>

          {/* Column 1: AI Workforce */}
          <div>
            <h4 className="footer-col-title">AI Agents</h4>
            <ul className="footer-link-list">
              <li><a href="#">Jenny · Inbound Receptionist</a></li>
              <li><a href="#">Olivia · Outbound Sales Agent</a></li>
              <li><a href="#">Jess · Technical Recruiter</a></li>
              <li><a href="#">Emma · Education Advisor</a></li>
              <li><a href="#calls">Real Call Library</a></li>
            </ul>
          </div>

          {/* Column 2: Platform & Solutions */}
          <div>
            <h4 className="footer-col-title">Platform</h4>
            <ul className="footer-link-list">
              <li><a href="#platform">Sub-600ms Voice Engine</a></li>
              <li><a href="#pillars">24/7 After-Hours Answering</a></li>
              <li><a href="#pillars">Live Diary & CRM Sync</a></li>
              <li><a href="#compare">Workflow Comparison</a></li>
              <li><a href="#pricing">Dynamic ROI Calculator</a></li>
            </ul>
          </div>

          {/* Column 3: Company & Global */}
          <div>
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

        {/* Global Addresses & Copyright Bar */}
        <div className="footer-bottom-bar">
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <span>🇺🇸 <strong>San Francisco</strong>: 580 California St, CA 94104</span>
            <span>🇦🇺 <strong>Sydney</strong>: 60 Martin Place, NSW 2000</span>
          </div>
          <div>
            © 2026 JobGen.ai Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
