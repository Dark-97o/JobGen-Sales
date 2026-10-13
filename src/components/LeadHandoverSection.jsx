import React from 'react';

const HANDOVER_POINTS = [
  'Start wherever they are.',
  'Understand the request.',
  'Pass the lead with context.',
  'Let your people take it from here.',
];

const COMPANY_LOGOS = [
  { name: 'Buta Deogun Property', src: '/assets/companylogo/buta-deogun-property.png' },
  { name: 'Jolie Recruitment', src: '/assets/companylogo/jolie-recruitment-white.png' },
  { name: 'McGill Institute', src: '/assets/companylogo/mcgill-institute-transparent.png' },
  { name: 'MS Business', src: '/assets/companylogo/ms-business.webp' },
  { name: 'Multi Dynamic', src: '/assets/companylogo/multi-dynamic-white.webp' },
  { name: 'Onetec', src: '/assets/companylogo/onetec.webp' },
  { name: 'Prima', src: '/assets/companylogo/prima-white.webp' },
  { name: 'Study & Work', src: '/assets/companylogo/studyandwork-trimmed.png' },
];

export default function LeadHandoverSection() {
  // Tripled array for uninterrupted seamless marquee looping from right to left
  const repeatedLogos = [...COMPANY_LOGOS, ...COMPANY_LOGOS, ...COMPANY_LOGOS];

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

      {/* Moving Band Attached to the Edge on the Background: WORKING WITH on top, logos rolling below */}
      <div className="lead-handover-ticker-band" aria-label="Companies working with JobGen">
        <div className="handover-ticker-header">
          <span className="handover-ticker-label-text">WORKING WITH TEAMS AT</span>
        </div>
        <div className="handover-ticker-marquee-wrap">
          <div className="handover-ticker-track">
            {repeatedLogos.map((logo, idx) => (
              <div key={`${logo.name}-${idx}`} className="handover-logo-item">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="handover-logo-img"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
