import React from 'react';

const HANDOVER_POINTS = [
  'Start wherever they are.',
  'Understand the request.',
  'Pass the lead with context.',
  'Let your people take it from here.',
];

export default function LeadHandoverSection() {
  return (
    <section className="lead-handover-section" id="handover">
      {/* Full Width & Full Height Image of Man (Clean, Watermark-Free) */}
      <img
        src="/assets/man-clean.png"
        alt="A lead is a person. Give them a proper handover."
        className="lead-handover-bg-img"
      />

      {/* Cinematic Contrast Overlay to keep Top-Left Text Crisp */}
      <div className="lead-handover-overlay" />

      {/* Content Anchored to Top Left */}
      <div className="lead-handover-container">
        <div className="lead-handover-header-block">
          <h2 className="lead-handover-headline">
            <span className="lead-handover-headline-main">A lead is a person.</span>
            <span className="lead-handover-headline-sub">Give them a proper handover</span>
          </h2>
          <p className="lead-handover-desc">
            Agree the channels, details to capture and handoff rules with us.
          </p>
        </div>

        {/* 4 Points Below It: Just dots and the points (no boxes) */}
        <div className="lead-handover-points-list">
          {HANDOVER_POINTS.map((point, index) => (
            <div key={index} className="lead-handover-point-item">
              <span className="lead-handover-dot" />
              <span className="point-text">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
