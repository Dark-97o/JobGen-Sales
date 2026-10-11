import React, { useState, useEffect, useRef } from 'react';
import { XCircle, CheckCircle2, PhoneCall, Cpu, Calendar, MessageSquare, FileText, UserCheck } from 'lucide-react';

const FRICTION_STAGES = [
  {
    id: 1,
    number: "01",
    icon: PhoneCall,
    title: "Zero dropped rings. Instant 24/7 reception.",
    description: "65% of callers hang up on voicemail and dial a competitor. Jenny answers in 800ms, speaks with natural human prosody in your company voice, and locks in qualified bookings.",
    legacyText: "Ring out to generic voicemail",
    jobgenText: "Jenny answers in 800ms 24/7",
    metric: "<800ms",
    metricLabel: "Average pickup response"
  },
  {
    id: 2,
    number: "02",
    icon: Cpu,
    title: "Instant CRM telemetry before caller finishes speaking.",
    description: "Staff no longer scramble across 4 different tabs or fragmented sticky notes. JobGen queries live CRM records to identify the customer, prior invoices, and approved business guidelines.",
    legacyText: "Scramble across 4 browser tabs",
    jobgenText: "Instant CRM telemetry & memory",
    metric: "100%",
    metricLabel: "Customer context match"
  },
  {
    id: 3,
    number: "03",
    icon: Calendar,
    title: "Deterministic calendar locks without phone tag.",
    description: "Replace hours of back-and-forth emails. The AI verifies technician availability in real time, books consultations directly into your calendar, and prevents double-booking.",
    legacyText: "Days of manual email & phone tag",
    jobgenText: "Direct calendar lock in 45 seconds",
    metric: "45s",
    metricLabel: "Complete booking time"
  },
  {
    id: 4,
    number: "04",
    icon: MessageSquare,
    title: "Seamless voice-to-WhatsApp conversation bridge.",
    description: "While the call is ending, the caller instantly receives an automated WhatsApp confirmation with calendar invites, prep checklists, and direct directions.",
    legacyText: "Lost follow-ups & forgotten links",
    jobgenText: "Automated WhatsApp dispatch & docs",
    metric: "98%",
    metricLabel: "Instant message delivery"
  },
  {
    id: 5,
    number: "05",
    icon: FileText,
    title: "100% verbatim writeback and clean CRM hygiene.",
    description: "Stop relying on staff memory and hurried notes. Structured summaries, verbatim transcripts, sentiment tags, and follow-up tasks are automatically synced to your CRM.",
    legacyText: "Manual typing & missing CRM notes",
    jobgenText: "Structured sync to HubSpot & Salesforce",
    metric: "100%",
    metricLabel: "Verbatim transcript logging"
  },
  {
    id: 6,
    number: "06",
    icon: UserCheck,
    title: "Graceful live transfer to your team when it matters.",
    description: "When an emergency, sensitive query, or high-value deal is identified, deterministic guardrails execute an immediate live transfer with full caller briefing.",
    legacyText: "Overnight delay for critical calls",
    jobgenText: "Warm live transfer to on-call manager",
    metric: "3s",
    metricLabel: "Deterministic escalation time"
  }
];

export default function ComparisonSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section
      id="compare"
      ref={sectionRef}
      className={`section-spacing friction-comparison-section ${isVisible ? 'is-visible' : 'is-pending'}`}
    >
      <div className="friction-full-wrapper">
        {/* Section Headline following exact same font size as other sections */}
        <div className="friction-header-container">
          <div className="friction-header-block">
            <h2 className="section-title">
              <span className="friction-headline-main">Eliminate manual friction between</span> <br />
              <span className="text-full-blue friction-headline-sub">the first phone ring and the revenue.</span>
            </h2>
          </div>
        </div>

        {/* Stage Layout: Left Info Container (No Box, No Bg Image) + Right Cards */}
        <div className="friction-stage-layout">
          {/* Left Column: Clean text directly on background + Favicon Next to Headline + Metric Card */}
          <div className="friction-info-wrapper">
            <div className="friction-clean-info-container">
              {/* Header row: Distinct Claymorphic Favicon next to Headline Text */}
              <div className="friction-clean-header-row">
                <div className="friction-clay-icon-circle" aria-hidden="true">
                  <StageIcon size={24} className="friction-clay-icon" />
                </div>
                <h3 className="friction-clean-title">{activeStage.title}</h3>
              </div>

              <p className="friction-clean-desc">{activeStage.description}</p>

              <div className="friction-metric-card">
                <div className="friction-metric-value">{activeStage.metric}</div>
                <div className="friction-metric-label">{activeStage.metricLabel}</div>
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
                      style={isVisible ? { transitionDelay: whiteDelay } : undefined}
                    >
                      <XCircle size={16} className="friction-icon-cross" />
                      <span className="friction-text-legacy">{stage.legacyText}</span>
                    </div>

                    {/* Next Pill: Black background with white text, turns blue on hover, with green tick */}
                    <div
                      className="friction-pill-next-black"
                      style={isVisible ? { transitionDelay: blackDelay } : undefined}
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
