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

  useLayoutEffect(() => {
    let animId = null;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Total scrollable height for pinning
      const totalScrollable = Math.max(rect.height - windowH, 1);
      const rawProgress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);

      // Glide active between 0.08 and 0.85 of this pinned section
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

      // 3. SMS/Email Text on Left: slides out to left & fades
      if (smsCardRef.current) {
        const smsOpacity = Math.min(1, Math.max(0, 1 - (glideProgress - 0.1) * 2.0));
        const smsX = -easeT * 60;
        smsCardRef.current.style.opacity = smsOpacity;
        smsCardRef.current.style.transform = `translate3d(${smsX}px, 0, 0)`;
        smsCardRef.current.style.pointerEvents = glideProgress > 0.5 ? 'none' : 'auto';
      }

      // 4. Company CRM Text on Right: slides in from right & fades in
      if (crmCardRef.current) {
        const crmOpacity = Math.min(1, Math.max(0, (glideProgress - 0.35) * 2.0));
        const crmX = (1 - easeT) * 60;
        crmCardRef.current.style.opacity = crmOpacity;
        crmCardRef.current.style.transform = `translate3d(${crmX}px, 0, 0)`;
        crmCardRef.current.style.pointerEvents = glideProgress < 0.5 ? 'none' : 'auto';
      }
    };

    const onScroll = () => {
      if (animId) cancelAnimationFrame(animId);
      animId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    handleScroll();

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
          {/* Bold 2-Line Headline: "We collect leads and" is +6px larger */}
          <div className="pipeline-header-block text-center">
            <h2 className="pipeline-main-title">
              <span className="pipeline-title-dark">We collect leads and</span>
              <br />
              <span className="pipeline-title-blue">ensure they run in your CRM</span>
            </h2>
          </div>

          {/* Gliding Stage Viewport */}
          <div className="pipeline-stage-viewport">
            {/* Left Slot: SMS / Email Campaign Text */}
            <div className="pipeline-slot pipeline-slot-left">
              <div ref={smsCardRef} className="pipeline-text-area pipeline-sms-area">
                <h3 className="pipeline-area-heading">
                  SMS &amp; Email Campaigns Included
                </h3>
                <p className="pipeline-area-desc">
                  We provide complete multi-channel campaign automation. Instant SMS follow-ups,
                  dynamic email nurture sequences, and booking links are all handled for you.
                </p>

                {/* 3 Bullet Points with Tactile Claymorphic Circle Favicons */}
                <div className="pipeline-bullets-list">
                  <div className="pipeline-bullet-item">
                    <div className="pipeline-clay-circle">
                      <Send size={26} className="pipeline-bullet-icon" />
                    </div>
                    <div className="pipeline-bullet-content">
                      <h4 className="pipeline-bullet-title">Turnkey SMS Follow-Up Campaigns</h4>
                      <p className="pipeline-bullet-text">
                        We deploy instant branded SMS campaigns with booking links and estimates while intent is highest.
                      </p>
                    </div>
                  </div>

                  <div className="pipeline-bullet-item">
                    <div className="pipeline-clay-circle">
                      <Mail size={26} className="pipeline-bullet-icon" />
                    </div>
                    <div className="pipeline-bullet-content">
                      <h4 className="pipeline-bullet-title">Done-For-You Email Drip Sequences</h4>
                      <p className="pipeline-bullet-text">
                        We run personalized email nurture sequences referencing exact caller requirements and proposals.
                      </p>
                    </div>
                  </div>

                  <div className="pipeline-bullet-item">
                    <div className="pipeline-clay-circle">
                      <Zap size={26} className="pipeline-bullet-icon" />
                    </div>
                    <div className="pipeline-bullet-content">
                      <h4 className="pipeline-bullet-title">Autonomous Two-Way Campaign Replies</h4>
                      <p className="pipeline-bullet-text">
                        Our AI replies to incoming SMS messages, answers prospect questions, and locks appointments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Slot: Company CRM Details Text */}
            <div className="pipeline-slot pipeline-slot-right">
              <div ref={crmCardRef} className="pipeline-text-area pipeline-crm-area">
                <h3 className="pipeline-area-heading">
                  All-In-One Company CRM Included
                </h3>
                <p className="pipeline-area-desc">
                  We provide your complete dedicated Company CRM. Manage deals, view full call recordings,
                  track lead pipelines, and monitor team performance in one unified platform.
                </p>

                {/* 3 Bullet Points with Tactile Claymorphic Circle Favicons */}
                <div className="pipeline-bullets-list">
                  <div className="pipeline-bullet-item">
                    <div className="pipeline-clay-circle">
                      <Database size={26} className="pipeline-bullet-icon" />
                    </div>
                    <div className="pipeline-bullet-content">
                      <h4 className="pipeline-bullet-title">Complete Dedicated Company CRM</h4>
                      <p className="pipeline-bullet-text">
                        A full turnkey CRM platform with deal stages, contact timelines, and automated pipeline tracking.
                      </p>
                    </div>
                  </div>

                  <div className="pipeline-bullet-item">
                    <div className="pipeline-clay-circle">
                      <FileText size={26} className="pipeline-bullet-icon" />
                    </div>
                    <div className="pipeline-bullet-content">
                      <h4 className="pipeline-bullet-title">Full Lead Dossiers &amp; Recordings</h4>
                      <p className="pipeline-bullet-text">
                        Every contact card includes verbatim transcript logs, one-click call audio, and qualification tags.
                      </p>
                    </div>
                  </div>

                  <div className="pipeline-bullet-item">
                    <div className="pipeline-clay-circle">
                      <Share2 size={26} className="pipeline-bullet-icon" />
                    </div>
                    <div className="pipeline-bullet-content">
                      <h4 className="pipeline-bullet-title">Automated Pipeline &amp; Rep Routing</h4>
                      <p className="pipeline-bullet-text">
                        Automatically routes won leads to your sales reps with instant notifications and scheduled tasks.
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
        </div>
      </div>
    </section>
  );
}
