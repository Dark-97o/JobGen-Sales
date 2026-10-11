import React, { useRef, useEffect } from 'react';

export default function Footer() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="footer-wrapper footer-video-wrapper">
      {/* Background Video with Top Fade to Background Above */}
      <div className="footer-video-bg-container" aria-hidden="true">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="footer-bg-video"
        >
          <source src="/assets/footer.mp4" type="video/mp4" />
        </video>
        <div className="footer-video-dark-overlay" />
      </div>

      <div className="container footer-content-container">
        <div className="footer-grid">
          {/* Brand Info with jobgen-white logo */}
          <div>
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
            <p className="footer-brand-desc">
              The unified autonomous AI voice workforce for 24/7 inbound reception, instant calendar bookings, and multi-channel sales outreach.
            </p>
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
