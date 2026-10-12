import React from 'react';
import { Shield, Zap, Globe, Cpu, Users, Building, ArrowRight, CheckCircle2, PhoneCall, Sparkles } from 'lucide-react';

export default function AboutPage({ onOpenDemo, onOpenBooking }) {
  return (
    <div className="about-page-root">
      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="container about-container">
          <div className="about-hero-badge">
            <span className="about-badge-dot" />
            <span>Our Mission & Architecture</span>
          </div>

          <h1 className="about-hero-title">
            Pioneering the Autonomous Telephony Layer for Modern Enterprise
          </h1>

          <p className="about-hero-subtitle">
            JobGen was built on a single uncompromising thesis: no business should ever lose revenue, appointments, or customer trust to an unanswered phone call or slow human follow-up.
          </p>

          <div className="about-hero-metrics-grid">
            <div className="about-metric-card">
              <span className="about-metric-number">&lt;600ms</span>
              <span className="about-metric-label">Voice Latency Target</span>
              <p className="about-metric-sub">Real-time conversational response with human cadences and zero awkward pauses.</p>
            </div>

            <div className="about-metric-card">
              <span className="about-metric-number">24/7/365</span>
              <span className="about-metric-label">Continuous Availability</span>
              <p className="about-metric-sub">Zero missed calls during peak rushes, midnight emergencies, or staff holidays.</p>
            </div>

            <div className="about-metric-card">
              <span className="about-metric-number">95%+</span>
              <span className="about-metric-label">Lead Recovery Rate</span>
              <p className="about-metric-sub">Converting callers into confirmed bookings and instant CRM deals in seconds.</p>
            </div>

            <div className="about-metric-card">
              <span className="about-metric-number">100+</span>
              <span className="about-metric-label">Enterprise Integrations</span>
              <p className="about-metric-sub">Instant 2-way sync to HubSpot, Salesforce, WhatsApp, Zapier, and custom telephony.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Origin Story & Vision Section */}
      <section className="about-story-section">
        <div className="container about-container">
          <div className="about-story-grid">
            <div className="about-story-text-col">
              <span className="about-section-tag">Why We Built JobGen</span>
              <h2 className="about-story-title">From Missed Calls to Autonomous Pipeline Operations</h2>
              <div className="about-story-paragraphs">
                <p>
                  Every day, millions of high-intent callers reach out to local service businesses, healthcare providers, legal practices, and real estate agencies. Over 62% of those calls go unanswered, roll to voicemail, or sit in hold queues for minutes.
                </p>
                <p>
                  Traditional IVR phone trees frustrate callers, and hiring around-the-clock receptionists across multiple time zones is cost-prohibitive. We engineered JobGen to eliminate that friction completely with sub-600ms conversational AI voice agents capable of handling complex bookings, dynamic pricing inquiries, and warm live transfers.
                </p>
                <p>
                  Today, our autonomous workforce—led by Jenny for inbound reception and Olivia for proactive sales outreach—handles tens of thousands of conversations with empathy, speed, and precision.
                </p>
              </div>

              <div className="about-story-checklist">
                <div className="about-check-item">
                  <CheckCircle2 size={18} className="about-check-icon" />
                  <span>Human-grade speech synthesis with natural backchanneling and breath cadence</span>
                </div>
                <div className="about-check-item">
                  <CheckCircle2 size={18} className="about-check-icon" />
                  <span>Deterministic guardrails preventing hallucinations and unauthorized disclosures</span>
                </div>
                <div className="about-check-item">
                  <CheckCircle2 size={18} className="about-check-icon" />
                  <span>Closed-loop operational integration directly into your existing CRM & calendar stack</span>
                </div>
              </div>
            </div>

            <div className="about-story-visual-col">
              <div className="about-feature-box">
                <div className="about-box-glow" />
                <div className="about-box-content">
                  <div className="about-box-header">
                    <div className="about-box-avatar">
                      <Cpu size={24} color="#38BDF8" />
                    </div>
                    <div>
                      <h4 className="about-box-title">The JobGen AI Core</h4>
                      <span className="about-box-sub">Dual Autonomous Engine</span>
                    </div>
                  </div>

                  <div className="about-agent-pair">
                    <div className="about-agent-pill">
                      <div className="about-agent-dot dot-jenny" />
                      <div>
                        <strong>Jenny • Receptionist</strong>
                        <p>24/7 front-desk inbound triaging, calendar booking, FAQs, and warm transfer.</p>
                      </div>
                    </div>

                    <div className="about-agent-pill">
                      <div className="about-agent-dot dot-olivia" />
                      <div>
                        <strong>Olivia • Sales Agent</strong>
                        <p>Sub-5-minute outbound follow-ups, lead reactivation, and closed-loop pipeline qualification.</p>
                      </div>
                    </div>
                  </div>

                  <div className="about-tech-tags">
                    <span>WebRTC Telephony</span>
                    <span>Sub-600ms TTS/STT</span>
                    <span>CRM Telemetry</span>
                    <span>WhatsApp Dispatch</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Headquarters & Infrastructure */}
      <section className="about-locations-section">
        <div className="container about-container">
          <div className="about-section-center">
            <span className="about-section-tag">Global Footprint</span>
            <h2 className="about-locations-title">Engineered Globally, Operating Locally</h2>
            <p className="about-locations-desc">
              Operating with redundant high-availability telephony gateways deployed across Asia-Pacific and North America.
            </p>
          </div>

          <div className="about-locations-grid">
            <div className="about-location-card">
              <div className="about-location-icon-wrap">
                <Building size={22} color="#0052FF" />
              </div>
              <h3 className="about-location-name">Sydney Headquarters</h3>
              <p className="about-location-address">
                Suite 306, 60 Martin Place<br />
                Sydney NSW 2000, Australia
              </p>
              <div className="about-location-badge">Asia-Pacific Operations & Core Research</div>
            </div>

            <div className="about-location-card">
              <div className="about-location-icon-wrap">
                <Globe size={22} color="#0052FF" />
              </div>
              <h3 className="about-location-name">San Francisco Hub</h3>
              <p className="about-location-address">
                580 California St<br />
                San Francisco, CA 94104, USA
              </p>
              <div className="about-location-badge">North American Enterprise & Telephony Cloud</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values & Commitments */}
      <section className="about-values-section">
        <div className="container about-container">
          <div className="about-section-center">
            <span className="about-section-tag">Our Philosophy</span>
            <h2 className="about-values-title">Guiding Principles in Every Model We Deploy</h2>
          </div>

          <div className="about-values-grid">
            <div className="about-value-item">
              <div className="about-value-icon">
                <Zap size={22} color="#0052FF" />
              </div>
              <h3>Speed as a Feature</h3>
              <p>Conversations that lag feel artificial. We engineer every millisecond out of speech-to-text, LLM reasoning, and audio generation.</p>
            </div>

            <div className="about-value-item">
              <div className="about-value-icon">
                <Shield size={22} color="#0052FF" />
              </div>
              <h3>Enterprise Security by Default</h3>
              <p>SOC-2 compliance principles, encrypted audio streams, zero data training on customer calls, and strict audit trails.</p>
            </div>

            <div className="about-value-item">
              <div className="about-value-icon">
                <Users size={22} color="#0052FF" />
              </div>
              <h3>Human-in-the-Loop Harmony</h3>
              <p>AI is designed to elevate your staff, taking over repetitive intake while executing warm transfers when human empathy is critical.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="about-cta-section">
        <div className="container about-container">
          <div className="about-cta-card">
            <div className="about-cta-glow" />
            <div className="about-cta-content">
              <h2>Ready to deploy your autonomous revenue engine?</h2>
              <p>Get a bespoke live phone test configured for your exact business requirements in minutes.</p>
              <div className="about-cta-buttons">
                <button
                  type="button"
                  onClick={onOpenBooking || onOpenDemo}
                  className="btn-cream-hero-cta"
                >
                  <span>Book Free Demo</span>
                  <ArrowRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={onOpenDemo}
                  className="btn-cream-secondary-cta"
                >
                  <PhoneCall size={15} style={{ marginRight: '6px' }} />
                  <span>Test Live Audio Call</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
