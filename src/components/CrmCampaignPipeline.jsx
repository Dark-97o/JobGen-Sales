import React, { useRef, useLayoutEffect } from 'react';
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

  useLayoutEffect(() => {
    let animId = null;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Scrollable vertical distance of the pinned section
      const totalScrollable = Math.max(rect.height - windowH, 1);
      const rawProgress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);

      // Glide runs between 0.15 and 0.85 of the scroll section
      const startT = 0.15;
      const endT = 0.85;
      const glideProgress = Math.min(Math.max((rawProgress - startT) / (endT - startT), 0), 1);

      // 1. Laptop glides horizontally across from Right Slot (50%) to Left Slot (0%)
      if (laptopWrapRef.current) {
        const translateXPercent = -glideProgress * 100;
        laptopWrapRef.current.style.transform = `translate3d(${translateXPercent}%, 0, 0)`;
      }

      // 2. Cross-fade between comp1 (SMS/Email) and comp2 (Company CRM)
      if (img1Ref.current && img2Ref.current) {
        // img1 fades out between glide 0.35 and 0.65
        const img1Opacity = Math.min(1, Math.max(0, 1 - (glideProgress - 0.3) * 2.5));
        // img2 fades in between glide 0.35 and 0.65
        const img2Opacity = Math.min(1, Math.max(0, (glideProgress - 0.35) * 2.5));

        img1Ref.current.style.opacity = img1Opacity;
        img2Ref.current.style.opacity = img2Opacity;
      }

      // 3. SMS/Email Text Card on Left: fades out and slides away to left
      if (smsCardRef.current) {
        const smsOpacity = Math.min(1, Math.max(0, 1 - glideProgress * 2.2));
        const smsX = -glideProgress * 50;
        smsCardRef.current.style.opacity = smsOpacity;
        smsCardRef.current.style.transform = `translate3d(${smsX}px, 0, 0)`;
        smsCardRef.current.style.pointerEvents = glideProgress > 0.5 ? 'none' : 'auto';
      }

      // 4. Company CRM Text Card on Right: fades in and slides into place from right
      if (crmCardRef.current) {
        const crmOpacity = Math.min(1, Math.max(0, (glideProgress - 0.45) * 2.2));
        const crmX = (1 - glideProgress) * 50;
        crmCardRef.current.style.opacity = crmOpacity;
        crmCardRef.current.style.transform = `translate3d(${crmX}px, 0, 0)`;
        crmCardRef.current.style.pointerEvents = glideProgress < 0.5 ? 'none' : 'auto';
      }

      // 5. Bottom horizontal progress indicator fill
      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${glideProgress * 100}%`;
      }
    };

    const onScroll = () => {
      if (animId) cancelAnimationFrame(animId);
      animId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    handleScroll();

    return () => {
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

            {/* Dedicated Gliding Laptop Unit: Sits in Right Slot initially, glides to Left Slot */}
            <div ref={laptopWrapRef} className="pipeline-gliding-laptop-unit">
              <div className="pipeline-laptop-visual-box">
                <div className="pipeline-laptop-glow-aura" aria-hidden="true" />
                <img
                  ref={img1Ref}
                  src="/assets/comp1.png"
                  alt="SMS and Email Campaign Management"
                  className="pipeline-laptop-img pipeline-laptop-img-1"
                />
                <img
                  ref={img2Ref}
                  src="/assets/comp2.png"
                  alt="Company CRM Management"
                  className="pipeline-laptop-img pipeline-laptop-img-2"
                />
              </div>
            </div>
          </div>

          {/* Sleek Horizontal Flow Indicator */}
          <div className="pipeline-scroll-tracker">
            <div className="pipeline-tracker-bar">
              <div ref={progressFillRef} className="pipeline-tracker-fill" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
