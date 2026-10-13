import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import FinalCta from './FinalCta';

export default function AboutPage({ onOpenDemo, onOpenBooking }) {
  return (
    <div className="about-page-root">
      {/* SECTION 1: FOUNDER (Kush on left unboxed directly on background with claymorphed pill, story on right) */}
      <section className="about-founder-section" aria-label="Founder">
        <div className="container about-container">
          <div className="about-founder-grid">
            {/* LEFT COLUMN: Kush Cutout unboxed directly on background */}
            <div className="kush-portrait-column">
              <div className="kush-portrait-stage">
                <div className="kush-image-wrapper">
                  <img
                    src="/assets/kush.png"
                    alt="Kush Bhatia - Founder of JobGen"
                    className="kush-portrait-img"
                    loading="eager"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Headline, reduced story paragraph & Claymorphed LinkedIn Button */}
            <div className="about-story-text-column">
              <h1 className="founder-main-headline">
                It shouldn&rsquo;t be the bottleneck of your business.
              </h1>

              <div className="founder-story-copy">
                <p>
                  Kush saw businesses spending thousands driving customer demand, only to lose over 60% of prospective clients to unanswered phone calls, hurried notes, and delayed staff follow-ups.
                </p>

                <p>
                  JobGen was engineered to eliminate this bottleneck: deploying sub-600ms conversational AI voice intelligence that answers every inbound call, qualifies buyer intent, and books confirmed revenue into your calendar and CRM in real time.
                </p>
              </div>

              {/* Claymorphed Button to Kush's LinkedIn with Favicon */}
              <div className="founder-actions-row">
                <a
                  href="https://www.linkedin.com/in/kushbhatia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kush-linkedin-clay-btn"
                  title="Connect with Kush Bhatia on LinkedIn"
                  aria-label="Connect with Kush Bhatia on LinkedIn"
                >
                  <span className="kush-linkedin-icon-bubble">
                    <svg
                      className="kush-linkedin-svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </span>
                  <span className="kush-linkedin-btn-text">Connect with Kush</span>
                  <ArrowUpRight size={17} className="kush-linkedin-arrow" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: DUAL CARDS (JOBGEN.AI & JOBGEN.IO - ONLY TEXT HEADLINE, RELEVANT IMAGE WITH BLACK OVERLAY & WHITE TEXT) */}
      <section className="about-entities-section" aria-label="JobGen Dual Platforms">
        <div className="container about-container">
          <div className="entities-section-header text-center">
            <span className="entities-kicker">THE ARCHITECTURAL SPLIT</span>
            <h2 className="entities-main-title">
              Two Dedicated Engines. <span className="text-full-blue">One Closed-Loop Solution.</span>
            </h2>
          </div>

          <div className="about-entities-grid">
            {/* CARD 1: JOBGEN.AI (Text Headline Only, Background Image + Black Overlay + White Text) */}
            <div className="about-entity-card entity-ai-card" role="region" aria-label="JobGen.AI">
              <div 
                className="entity-card-bg-image"
                style={{ backgroundImage: `url('/assets/jobgen-ai-card.jpg')` }}
                aria-hidden="true"
              />
              <div className="entity-card-black-overlay" aria-hidden="true" />
              
              <div className="entity-card-headline-content">
                <span className="entity-card-mini-kicker">AUTONOMOUS WORKFORCE</span>
                <h3 className="entity-brand-title text-white">JOBGEN.AI</h3>
                <p className="entity-brand-subheadline text-white">
                  Sub-600ms Conversational AI Voice Agents
                </p>
              </div>
            </div>

            {/* CARD 2: JOBGEN.IO (For Job Seekers: Tailored Resumes, Cover Letters & Tracking) */}
            <div className="about-entity-card entity-io-card" role="region" aria-label="JobGen.IO">
              <div 
                className="entity-card-bg-image"
                style={{ backgroundImage: `url('/assets/jobgen-io-card.jpg')` }}
                aria-hidden="true"
              />
              <div className="entity-card-black-overlay" aria-hidden="true" />
              
              <div className="entity-card-headline-content">
                <span className="entity-card-mini-kicker">FOR JOB SEEKERS</span>
                <h3 className="entity-brand-title text-white">JOBGEN.IO</h3>
                <p className="entity-brand-subheadline text-white">
                  Tailored Resumes, Cover Letters &amp; Application Tracking
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CONTACT CARD FROM HOME PAGE */}
      <section className="about-contact-section" aria-label="Contact JobGen">
        <FinalCta onOpenDemo={onOpenDemo} onOpenBooking={onOpenBooking} />
      </section>
    </div>
  );
}
