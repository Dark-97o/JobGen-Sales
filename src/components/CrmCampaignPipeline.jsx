import React, { useRef, useState, useLayoutEffect } from 'react';
import {
  MessageSquare,
  Mail,
  Zap,
  Database,
  FileText,
  Share2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Send,
  Layers,
} from 'lucide-react';

export default function CrmCampaignPipeline() {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const laptopWrapRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const smsCardRef = useRef(null);
  const crmCardRef = useRef(null);

  // Active step for manual tabs or visual state indicator (0 = SMS/Email, 1 = CRM)
  const [activeStep, setActiveStep] = useState(0);

  useLayoutEffect(() => {
    let animId = null;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Scrollable distance within the pinned container:
      const totalScrollable = Math.max(rect.height - windowH, 1);
      // Raw progress 0.0 -> 1.0
      const p = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);

      // Transition starts at 0.30 and finishes at 0.70
      const startT = 0.25;
      const endT = 0.75;
      const glideProgress = Math.min(Math.max((p - startT) / (endT - startT), 0), 1);

      // Measure column distance
      let colDistance = 0;
      if (leftColRef.current && rightColRef.current) {
        const leftRect = leftColRef.current.getBoundingClientRect();
        const rightRect = rightColRef.current.getBoundingClientRect();
        colDistance = Math.max(rightRect.left - leftRect.left, 0);
      }

      // 1. Laptop gliding from Right Column to Left Column
      if (laptopWrapRef.current) {
        const currentTranslateX = -glideProgress * colDistance;
        laptopWrapRef.current.style.transform = `translate3d(${currentTranslateX}px, 0, 0)`;
      }

      // 2. Cross-fade between comp1 (SMS/Email) and comp2 (Company CRM)
      if (img1Ref.current && img2Ref.current) {
        const comp1Opacity = Math.max(0, 1 - glideProgress * 1.25);
        const comp2Opacity = Math.min(1, glideProgress * 1.25);
        img1Ref.current.style.opacity = comp1Opacity;
        img2Ref.current.style.opacity = comp2Opacity;
      }

      // 3. SMS/Email Text Card on Left: Fades out and slides slightly left as user scrolls down
      if (smsCardRef.current) {
        const smsOpacity = Math.max(0, 1 - glideProgress * 1.4);
        const smsTranslateX = -glideProgress * 36;
        smsCardRef.current.style.opacity = smsOpacity;
        smsCardRef.current.style.transform = `translate3d(${smsTranslateX}px, 0, 0)`;
        smsCardRef.current.style.pointerEvents = glideProgress > 0.6 ? 'none' : 'auto';
      }

      // 4. Company CRM Text Card on Right: Fades in and slides in from right as user scrolls down
      if (crmCardRef.current) {
        const crmOpacity = Math.min(1, Math.max(0, (glideProgress - 0.2) * 1.35));
        const crmTranslateX = (1 - glideProgress) * 36;
        crmCardRef.current.style.opacity = crmOpacity;
        crmCardRef.current.style.transform = `translate3d(${crmTranslateX}px, 0, 0)`;
        crmCardRef.current.style.pointerEvents = glideProgress < 0.4 ? 'none' : 'auto';
      }

      // Update active step state
      if (p >= 0.5) {
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

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  const scrollToStep = (step) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const windowH = window.innerHeight;
    const totalScrollable = Math.max(containerRef.current.offsetHeight - windowH, 1);

    const targetScroll = step === 0 ? containerTop + 20 : containerTop + totalScrollable * 0.85;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  return (
    <section ref={containerRef} className="pipeline-scroll-section" id="crm-campaign-pipeline">
      <div className="pipeline-sticky-wrapper">
        <div className="container relative z-10 pipeline-inner-container">
          {/* Main Section Header */}
          <div className="pipeline-header-block text-center">
            <div className="pipeline-eyebrow-pill">
              <Sparkles size={14} className="text-blue-500" />
              <span>LEAD INGESTION &amp; PIPELINE ENGINE</span>
            </div>

            <h2 className="pipeline-main-title">
              We collect leads and ensure they run in your CRM
            </h2>

            <p className="pipeline-sub-description">
              We help businesses capture high-intent callers and effortlessly power both
              real-time CRM synchronization and high-converting SMS &amp; email follow-up campaigns.
            </p>

            {/* Claymorphic Step Switcher Pills */}
            <div className="pipeline-switch-bar">
              <button
                type="button"
                onClick={() => scrollToStep(0)}
                className={`pipeline-switch-btn ${activeStep === 0 ? 'is-active' : ''}`}
              >
                <Send size={15} />
                <span>01 · SMS &amp; Email Campaigns</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToStep(1)}
                className={`pipeline-switch-btn ${activeStep === 1 ? 'is-active' : ''}`}
              >
                <Database size={15} />
                <span>02 · Company CRM Integration</span>
              </button>
            </div>
          </div>

          {/* Gliding 2-Column Stage */}
          <div className="pipeline-gliding-stage">
            {/* Left Column Area */}
            <div ref={leftColRef} className="pipeline-col pipeline-col-left">
              {/* Step 1: SMS / Email Campaign Text Card */}
              <div ref={smsCardRef} className="pipeline-content-card pipeline-sms-card">
                <div className="pipeline-card-badge">
                  <span className="pipeline-step-number">01</span>
                  <span>AUTONOMOUS OUTREACH</span>
                </div>

                <h3 className="pipeline-card-heading">
                  SMS &amp; Email Follow-Up Campaigns
                </h3>

                <p className="pipeline-card-desc">
                  Never lose a warm prospect to slow response times. The instant a voice call
                  concludes, JobGen AI triggers tailored multi-channel follow-ups quoting the
                  caller’s exact requirements, pricing estimates, and calendar links.
                </p>

                {/* 3 Bullet Points with Claymorphism Circles */}
                <div className="pipeline-bullets-list">
                  <div className="pipeline-bullet-item">
                    <div className="pipeline-clay-circle">
                      <Send size={20} className="pipeline-bullet-icon" />
                    </div>
                    <div className="pipeline-bullet-content">
                      <h4 className="pipeline-bullet-title">Instant 45-Second SMS Follow-Up</h4>
                      <p className="pipeline-bullet-text">
                        Dispatches immediate SMS confirmations, quotes, and booking links while caller intent is at its highest.
                      </p>
                    </div>
                  </div>

                  <div className="pipeline-bullet-item">
                    <div className="pipeline-clay-circle">
                      <Mail size={20} className="pipeline-bullet-icon" />
                    </div>
                    <div className="pipeline-bullet-content">
                      <h4 className="pipeline-bullet-title">Hyper-Personalized Email Nurture</h4>
                      <p className="pipeline-bullet-text">
                        Dynamic email sequences tailored with caller requirements, meeting dossiers, and PDF brochures.
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

            {/* Right Column Area */}
            <div ref={rightColRef} className="pipeline-col pipeline-col-right">
              {/* Step 2: Company CRM Details Card (Initially Faded Out, revealed as laptop glides left) */}
              <div ref={crmCardRef} className="pipeline-content-card pipeline-crm-card">
                <div className="pipeline-card-badge">
                  <span className="pipeline-step-number">02</span>
                  <span>ENTERPRISE CRM WRITEBACK</span>
                </div>

                <h3 className="pipeline-card-heading">
                  Company CRM Integration &amp; Real-Time Sync
                </h3>

                <p className="pipeline-card-desc">
                  Eliminate manual staff data entry and fragmented lead sheets. Full caller
                  dossiers, recordings, transcripts, and verified booking dates flow directly into
                  your company’s central CRM with zero human intervention.
                </p>

                {/* 3 Bullet Points with Claymorphism Circles */}
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

              {/* The Gliding Laptop Wrapper (Initially situated in Right Column, glides across to Left Column) */}
              <div ref={laptopWrapRef} className="pipeline-gliding-laptop">
                <div className="pipeline-laptop-card-frame">
                  {/* Glowing Claymorphic Backdrop Accent */}
                  <div className="pipeline-laptop-glow" aria-hidden="true" />

                  {/* Image 1: comp1.png (SMS / Email Campaign laptop) */}
                  <img
                    ref={img1Ref}
                    src="/assets/comp1.png"
                    alt="SMS and Email Campaign Management on Laptop"
                    className="pipeline-laptop-img pipeline-laptop-img1"
                  />

                  {/* Image 2: comp2.png (Company CRM laptop) */}
                  <img
                    ref={img2Ref}
                    src="/assets/comp2.png"
                    alt="Company CRM Management on Laptop"
                    className="pipeline-laptop-img pipeline-laptop-img2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
