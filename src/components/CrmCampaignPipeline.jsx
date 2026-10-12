import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import {
  Send,
  Mail,
  Zap,
  Database,
  FileText,
  Share2,
} from 'lucide-react';

export default function CrmCampaignPipeline() {
  const containerRef = useRef(null);
  const laptopWrapRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const smsCardRef = useRef(null);
  const crmCardRef = useRef(null);
  const progressFillRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useLayoutEffect(() => {
    let animId = null;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Total scrollable height for pinning
      const totalScrollable = Math.max(rect.height - windowH, 1);
      const rawProgress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);

      // Glide active between 0.10 and 0.85 of this pinned section
      const startT = 0.08;
      const endT = 0.85;
      const glideProgress = Math.min(Math.max((rawProgress - startT) / (endT - startT), 0), 1);

      // Smooth ease-in-out curve for the laptop gliding across
      const easeT =
        glideProgress < 0.5
          ? 2 * glideProgress * glideProgress
          : 1 - Math.pow(-2 * glideProgress + 2, 2) / 2;

      // 1. Gliding Laptop: translates from Right Column (0%) to Left Column (-100%)
      if (laptopWrapRef.current) {
        const translateXPercent = -easeT * 100;
        laptopWrapRef.current.style.transform = `translate3d(${translateXPercent}%, 0, 0)`;
      }

      // 2. Cross-fade between comp1 (SMS/Email) and comp2 (Company CRM)
      if (img1Ref.current && img2Ref.current) {
        const img1Opacity = Math.min(1, Math.max(0, 1 - (glideProgress - 0.25) * 2.2));
        const img2Opacity = Math.min(1, Math.max(0, (glideProgress - 0.3) * 2.2));

        img1Ref.current.style.opacity = img1Opacity;
        img2Ref.current.style.opacity = img2Opacity;
      }

      // 3. SMS/Email Text Card on Left: slides out to left & fades
      if (smsCardRef.current) {
        const smsOpacity = Math.min(1, Math.max(0, 1 - (glideProgress - 0.1) * 2.0));
        const smsX = -easeT * 50;
        smsCardRef.current.style.opacity = smsOpacity;
        smsCardRef.current.style.transform = `translate3d(${smsX}px, 0, 0)`;
        smsCardRef.current.style.pointerEvents = glideProgress > 0.5 ? 'none' : 'auto';
      }

      // 4. Company CRM Text Card on Right: slides in from right & fades in
      if (crmCardRef.current) {
        const crmOpacity = Math.min(1, Math.max(0, (glideProgress - 0.35) * 2.0));
        const crmX = (1 - easeT) * 50;
        crmCardRef.current.style.opacity = crmOpacity;
        crmCardRef.current.style.transform = `translate3d(${crmX}px, 0, 0)`;
        crmCardRef.current.style.pointerEvents = glideProgress < 0.5 ? 'none' : 'auto';
      }

      // 5. Progress tracker bar fill
      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${glideProgress * 100}%`;
      }

      // Update step indicator
      if (glideProgress >= 0.5) {
        setActiveStep(1);
      } else {
        setActiveStep(0);
      }
    };

    const onScroll = () => {
      if (animId) cancelAnimationFrame(animId);
      animId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    handleScroll();

    // Secondary trigger in case styles or fonts load after mount
    const timer = setTimeout(handleScroll, 80);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section ref={containerRef} className="pipeline-scroll-section" id="crm-campaign-pipeline">
      <div className="pipeline-sticky-wrapper">
        <div className="container relative z-10 pipeline-inner-container">
          {/* Streamlined Section Header */}
          <div className="pipeline-header-block text-center">
            <h2 className="pipeline-main-title">
              We collect leads and ensure they run in your CRM
            </h2>
            <p className="pipeline-lead-sub">
              We help businesses with CRM, email &amp; SMS campaigns
            </p>
          </div>

          {/* Gliding Stage Viewport */}
          <div className="pipeline-stage-viewport">
            {/* Left Slot: SMS / Email Campaign Card */}
            <div className="pipeline-slot pipeline-slot-left">
              <div ref={smsCardRef} className="pipeline-content-card pipeline-sms-card">
                <h3 className="pipeline-card-heading">
                  SMS &amp; Email Campaigns
                </h3>
                <p className="pipeline-card-desc">
                  Never lose a warm prospect. The instant a voice call concludes, JobGen AI triggers
                  tailored multi-channel follow-ups quoting the caller’s exact requirements,
                  estimates, and calendar links.
                </p>

                {/* 3 Bullet Points with Tactile Claymorphic Circles */}
                <div className="pipeline-bullets-list">
                  <div className="pipeline-bullet-item">
                    <div className="pipeline-clay-circle">
                      <Send size={20} className="pipeline-bullet-icon" />
                    </div>
                    <div className="pipeline-bullet-content">
                      <h4 className="pipeline-bullet-title">Instant 45-Second SMS Follow-Up</h4>
                      <p className="pipeline-bullet-text">
                        Dispatches immediate SMS confirmations, quotes, and booking links while caller intent is highest.
                      </p>
                    </div>
                  </div>

                  <div className="pipeline-bullet-item">
                    <div className="pipeline-clay-circle">
                      <Mail size={20} className="pipeline-bullet-icon" />
                    </div>
                    <div className="pipeline-bullet-content">
                      <h4 className="pipeline-bullet-title">Hyper-Personalized Email Sequences</h4>
                      <p className="pipeline-bullet-text">
                        Dynamic email sequences tailored with caller requirements, meeting dossiers, and attached brochures.
                      </p>
                    </div>
                  </div>

                  <div className="pipeline-bullet-item">
                    <div className="pipeline-clay-circle">
                      <Zap size={20} className="pipeline-bullet-icon" />
                    </div>
                    <div className="pipeline-bullet-content">
                      <h4 className="pipeline-bullet-title">Autonomous Two-Way Re-engagement</h4>
                      <p className="pipeline-bullet-text">
                        Answers SMS replies automatically, overcomes hesitations, and locks appointments on your calendar.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Slot: Company CRM Details Card */}
            <div className="pipeline-slot pipeline-slot-right">
              <div ref={crmCardRef} className="pipeline-content-card pipeline-crm-card">
                <h3 className="pipeline-card-heading">
                  Company CRM Integration
                </h3>
                <p className="pipeline-card-desc">
                  Eliminate manual staff data entry and fragmented lead sheets. Full caller dossiers,
                  recordings, transcripts, and verified booking dates flow directly into your company’s
                  central CRM with zero human intervention.
                </p>

                {/* 3 Bullet Points with Tactile Claymorphic Circles */}
                <div className="pipeline-bullets-list">
                  <div className="pipeline-bullet-item">
                    <div className="pipeline-clay-circle">
                      <Database size={20} className="pipeline-bullet-icon" />
                    </div>
                    <div className="pipeline-bullet-content">
                      <h4 className="pipeline-bullet-title">Instant Pipeline Record Creation</h4>
                      <p className="pipeline-bullet-text">
                        Auto-creates or enriches deals and contacts in HubSpot, Salesforce, Zoho, or your proprietary CRM.
                      </p>
                    </div>
                  </div>

                  <div className="pipeline-bullet-item">
                    <div className="pipeline-clay-circle">
                      <FileText size={20} className="pipeline-bullet-icon" />
                    </div>
                    <div className="pipeline-bullet-content">
                      <h4 className="pipeline-bullet-title">Verbatim Dossiers &amp; Sentiment Tags</h4>
                      <p className="pipeline-bullet-text">
                        Embeds word-for-word transcript logs, call audio links, and qualification tags right in the CRM feed.
                      </p>
                    </div>
                  </div>

                  <div className="pipeline-bullet-item">
                    <div className="pipeline-clay-circle">
                      <Share2 size={20} className="pipeline-bullet-icon" />
                    </div>
                    <div className="pipeline-bullet-content">
                      <h4 className="pipeline-bullet-title">Smart Workflow &amp; Webhook Triggers</h4>
                      <p className="pipeline-bullet-text">
                        Notifies your account executives on Slack/Teams and assigns high-priority follow-up tasks instantly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dedicated Gliding Laptop Unit: Sits in Right Slot initially, glides across to Left Slot */}
            <div ref={laptopWrapRef} className="pipeline-gliding-laptop-unit">
              <div className="pipeline-laptop-visual-box">
                <div className="pipeline-laptop-glow-aura" aria-hidden="true" />
                <img
                  ref={img1Ref}
                  src="/assets/comp1.png"
                  alt="SMS and Email Campaign Management"
                  loading="eager"
                  className="pipeline-laptop-img pipeline-laptop-img-1"
                />
                <img
                  ref={img2Ref}
                  src="/assets/comp2.png"
                  alt="Company CRM Management"
                  loading="eager"
                  className="pipeline-laptop-img pipeline-laptop-img-2"
                />
              </div>
            </div>
          </div>

          {/* Sleek Horizontal Flow Progress Tracker */}
          <div className="pipeline-scroll-tracker">
            <div className="pipeline-tracker-labels">
              <span className={`pipeline-step-tag ${activeStep === 0 ? 'is-active' : ''}`}>
                01 · SMS &amp; Email Campaigns
              </span>
              <span className={`pipeline-step-tag ${activeStep === 1 ? 'is-active' : ''}`}>
                02 · Company CRM Integration
              </span>
            </div>
            <div className="pipeline-tracker-bar">
              <div ref={progressFillRef} className="pipeline-tracker-fill" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
