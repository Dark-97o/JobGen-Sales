import React, { useState, useEffect, useRef } from 'react';
import { XCircle, CheckCircle2, PhoneCall, Cpu, Calendar, MessageSquare, FileText, UserCheck } from 'lucide-react';

const FRICTION_STAGES = [
  {
    id: 1,
    number: "01",
    icon: PhoneCall,
    title: "Zero dropped rings. Instant 24/7 reception.",
    description: "65% of callers hang up on voicemail. Jenny answers in 800ms with natural human prosody, securing qualified bookings 24/7.",
    legacyText: "Ring out to generic voicemail",
    jobgenText: "Jenny answers in 800ms 24/7",
    metric: "<800ms",
    metricLabel: "Average pickup response",
    bgImage: "/assets/friction/stage-1.jpg"
  },
  {
    id: 2,
    number: "02",
    icon: Cpu,
    title: "Instant CRM telemetry before caller finishes speaking.",
    description: "No more tab-juggling or lost notes. JobGen queries live CRM records to identify customer history and guidelines instantly.",
    legacyText: "Scramble across 4 browser tabs",
    jobgenText: "Instant CRM telemetry & memory",
    metric: "100%",
    metricLabel: "Customer context match",
    bgImage: "/assets/friction/stage-2.jpg"
  },
  {
    id: 3,
    number: "03",
    icon: Calendar,
    title: "Deterministic calendar locks without phone tag.",
    description: "Eliminate email delays. The AI verifies technician availability in real time and secures bookings directly without double-booking.",
    legacyText: "Days of manual email & phone tag",
    jobgenText: "Direct calendar lock in 45 seconds",
    metric: "45s",
    metricLabel: "Complete booking time",
    bgImage: "/assets/friction/stage-3.jpg"
  },
  {
    id: 4,
    number: "04",
    icon: MessageSquare,
    title: "Seamless voice-to-WhatsApp conversation bridge.",
    description: "While calls end, callers receive automated WhatsApp confirmations with invites, prep checklists, and directions.",
    legacyText: "Lost follow-ups & forgotten links",
    jobgenText: "Automated WhatsApp dispatch & docs",
    metric: "98%",
    metricLabel: "Instant message delivery",
    bgImage: "/assets/friction/stage-4.jpg"
  },
  {
    id: 5,
    number: "05",
    icon: FileText,
    title: "Verbatim writeback and clean CRM hygiene.",
    description: "Stop relying on hurried notes. Structured summaries, verbatim transcripts, and follow-up tasks automatically sync to your CRM.",
    legacyText: "Manual typing & missing CRM notes",
    jobgenText: "Structured sync to HubSpot & Salesforce",
    metric: "100%",
    metricLabel: "Verbatim transcript logging",
    bgImage: "/assets/friction/stage-5.jpg"
  },
  {
    id: 6,
    number: "06",
    icon: UserCheck,
    title: "Graceful live transfer to your team when it matters.",
    description: "When an emergency or high-value deal is identified, deterministic guardrails execute an immediate warm transfer with full caller briefing.",
    legacyText: "Overnight delay for critical calls",
    jobgenText: "Warm live transfer to on-call manager",
    metric: "3s",
    metricLabel: "Deterministic escalation time",
    bgImage: "/assets/friction/stage-6.jpg"
  }
];

export default function ComparisonSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [staggerDone, setStaggerDone] = useState(false);
  const sectionRef = useRef(null);
  const activeStage = FRICTION_STAGES[activeIdx];
  const StageIcon = activeStage.icon;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setStaggerDone(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <section
      id="compare"
      ref={sectionRef}
      className={`section-spacing friction-comparison-section ${isVisible ? 'is-visible' : 'is-pending'}`}
    >
      <div className="friction-full-wrapper">
        {/* Section Headline following exact same font size as other sections */}
        <div className="friction-header-container text-center">
          <div className="friction-header-block">
            <h2 className="section-title text-center">
              <span className="friction-headline-main">Eliminate friction from</span> <br />
              <span className="text-full-blue friction-headline-sub">first ring to revenue.</span>
            </h2>
          </div>
        </div>

        {/* Stage Layout: Left Card Box with Image Background + Right Cards */}
        <div className="friction-stage-layout">
          {/* Left Column: Enclosed inside a Card Box with background images */}
          <div className="friction-info-wrapper">
            <div className="friction-card-box">
              {/* Background images for all 6 options - crossfade with clear view */}
              <div className="friction-card-bg-container" aria-hidden="true">
                {FRICTION_STAGES.map((stage, idx) => (
                  <img
                    key={stage.id}
                    src={stage.bgImage}
                    alt=""
                    className={`friction-card-bg-img ${activeIdx === idx ? 'is-active' : ''}`}
                    loading={idx === 0 ? "eager" : "lazy"}
                  />
                ))}
              </div>

              {/* Bottom text scrim: Black overlay ONLY near the text area */}
              <div className="friction-card-bottom-scrim">
                <div className="friction-clean-info-container">
                  <h3 className="friction-clean-title">{activeStage.title}</h3>

                  <div className="friction-metric-card">
                    <div className="friction-metric-content">
                      <div className="friction-metric-value">{activeStage.metric}</div>
                      <div className="friction-metric-label">{activeStage.metricLabel}</div>
                    </div>
                    <div className="friction-metric-icon-circle" aria-hidden="true">
                      <StageIcon size={24} className="friction-metric-icon" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Cards Attached to Right Side with Column Headers & 6 Rows */}
          <div className="friction-pills-container">
            {/* Headers Mentioning Legacy Method and JobGen AI Workforce */}
            <div className="friction-pills-header">
              <div className="friction-header-col-legacy">
                <XCircle size={19} className="friction-header-icon-cross" />
                <span>Legacy Method (Voicemail / Manual Staff)</span>
              </div>
              <div className="friction-header-col-jobgen">
                <CheckCircle2 size={19} className="friction-header-icon-tick" />
                <span>JobGen AI Workforce</span>
              </div>
            </div>

            {/* 6 Stacked Two-Tone Pill Rows: White pills slide in first, then black pills slide in */}
            <div className="friction-pills-stack" role="tablist" aria-label="Workflow comparisons">
              {FRICTION_STAGES.map((stage, idx) => {
                const isHovered = activeIdx === idx;
                // Stagger timing: White cards slide in row-by-row (0ms to 400ms), then Black cards slide in row-by-row (500ms to 900ms)
                const whiteDelay = `${idx * 80}ms`;
                const blackDelay = `${500 + idx * 80}ms`;

                return (
                  <div
                    key={stage.id}
                    role="tab"
                    tabIndex={0}
                    aria-selected={isHovered}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => setActiveIdx(idx)}
                    onFocus={() => setActiveIdx(idx)}
                    className={`friction-pill-row ${isHovered ? 'is-hovered' : ''} ${isVisible ? 'has-appeared' : 'is-hidden'}`}
                  >
                    {/* Front Pill: White background with black text and red cross */}
                    <div
                      className="friction-pill-front-white"
                      style={isVisible && !staggerDone ? { transitionDelay: whiteDelay } : undefined}
                    >
                      <XCircle size={16} className="friction-icon-cross" />
                      <span className="friction-text-legacy">{stage.legacyText}</span>
                    </div>

                    {/* Next Pill: Off-white background with black text, turns blue on hover, with green tick */}
                    <div
                      className="friction-pill-next-black"
                      style={
                        isVisible && !staggerDone && !isHovered
                          ? { transitionDelay: blackDelay }
                          : undefined
                      }
                    >
                      <CheckCircle2 size={16} className="friction-icon-tick" />
                      <span className="friction-text-jobgen">{stage.jobgenText}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
