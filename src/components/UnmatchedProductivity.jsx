import React, { useRef, useLayoutEffect } from 'react';

// Card definitions with grouped layout slots:
// Supports single cards and stacked vertical columns (2 squares up & down, or horizontal rectangle + square up & down)
const PRODUCTIVITY_SLOTS = [
  {
    type: 'column-stack',
    cards: [
      {
        id: 'call-intake',
        headline: 'Every caller gets a useful answer.',
        description: 'Jenny greets callers in your business name, answers approved questions, and keeps the conversation moving.',
        image: '/assets/cards/call-intake.jpg',
        shapeClass: 'shape-square-stacked shape-square-stacked-lg',
        accentColor: '#38BDF8',
      },
      {
        id: 'calendar-sync',
        headline: 'Live calendars, confirmed on the call.',
        description: 'Jenny finds valid times, applies duration and staff rules, books or reschedules, and sends confirmations.',
        image: '/assets/cards/calendar-sync.jpg',
        shapeClass: 'shape-square-stacked shape-square-stacked-lg',
        accentColor: '#60A5FA',
      },
    ],
  },
  {
    type: 'single',
    card: {
      id: 'carrier-forward',
      headline: 'Keep your number. Cover the calls you miss.',
      description: 'Forward unanswered, overflow, or after-hours calls without replacing the number customers already know.',
      image: '/assets/cards/carrier-forward.jpg',
      shapeClass: 'shape-square-single',
      accentColor: '#3B82F6',
    },
  },
  {
    type: 'column-stack',
    cards: [
      {
        id: 'smart-routing',
        headline: 'The right calls reach the right person.',
        description: 'Urgent or high-value conversations trigger a live transfer or contextual staff handoff.',
        image: '/assets/cards/smart-routing.jpg',
        shapeClass: 'shape-rect-h-stacked',
        accentColor: '#818CF8',
      },
      {
        id: 'website-voice',
        headline: 'A website that starts a conversation.',
        description: 'Bring your website, AI chat and browser voice together to answer questions and capture intent.',
        image: '/assets/cards/website-voice.jpg',
        shapeClass: 'shape-square-stacked',
        accentColor: '#38BDF8',
      },
    ],
  },
  {
    type: 'single',
    card: {
      id: 'inbound-voice',
      headline: 'Be there when customers call.',
      description: 'Your AI receptionist answers enquiries, takes messages and helps with appointments around the clock.',
      image: '/assets/cards/inbound-voice.jpg',
      shapeClass: 'shape-rect-horizontal',
      accentColor: '#A78BFA',
    },
  },
  {
    type: 'single',
    card: {
      id: 'outbound-voice',
      headline: 'Make the next conversation happen.',
      description: 'Follow up with eligible contacts, qualify interest and arrange callbacks on your custom schedule.',
      image: '/assets/cards/outbound-voice.jpg',
      shapeClass: 'shape-square-single',
      accentColor: '#60A5FA',
    },
  },
  {
    type: 'column-stack',
    cards: [
      {
        id: 'whatsapp-voice',
        headline: 'Keep the conversation going.',
        description: 'Connect WhatsApp with your voice workflow for instant messaging and unified follow-up.',
        image: '/assets/cards/whatsapp-voice.jpg',
        shapeClass: 'shape-square-stacked',
        accentColor: '#34D399',
      },
      {
        id: 'crm-leads',
        headline: 'Turn interest into an owned next step.',
        description: 'Capture contact details, customer intent and full conversation summaries directly into your CRM.',
        image: '/assets/cards/crm-leads.jpg',
        shapeClass: 'shape-square-stacked',
        accentColor: '#818CF8',
      },
    ],
  },
  {
    type: 'single',
    card: {
      id: 'human-handoff',
      headline: 'Bring a real person into the conversation.',
      description: 'Transfer live calls to your configured team when available, or collect full context for follow-up.',
      image: '/assets/cards/human-handoff.jpg',
      shapeClass: 'shape-rect-horizontal',
      accentColor: '#F472B6',
    },
  },
];

export default function UnmatchedProductivity() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    let animationFrameId = null;

    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Reserve the last 100vh for Lead Handover section sliding over:
      const cardScrollable = Math.max(rect.height - 2 * windowH, 1);

      // Progress: 0.0 at top of pinned section, 1.0 when horizontal cards finish sliding
      const progress = Math.min(Math.max(-rect.top / cardScrollable, 0), 1);

      // Track width and viewport width
      const trackWidth = trackRef.current.scrollWidth;
      const windowW = window.innerWidth;
      const maxScrollDist = Math.max(trackWidth - windowW + 160, 0);

      // Cards move from RIGHT to LEFT on scroll:
      // When progress = 0: translateX = 0
      // As user scrolls down (progress -> 1): translateX moves negative so cards slide in from the right toward the left
      const currentTranslateX = -progress * maxScrollDist;
      trackRef.current.style.transform = `translateX(${currentTranslateX}px)`;
    };

    const onScroll = () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const renderCard = (card) => (
    <div
      key={card.id}
      className={`productivity-card-item ${card.shapeClass}`}
      style={{ '--card-accent': card.accentColor }}
    >
      {/* Full Card Image */}
      <img
        src={card.image}
        alt={card.headline}
        className="card-full-bleed-img"
        loading="lazy"
      />

      {/* Dark Scrim Only Near Text Area */}
      <div className="card-full-bleed-overlay" />

      {/* Card Content: 1 Headline and 1 Line Description */}
      <div className="card-full-bleed-content">
        <h3 className="card-body-headline">{card.headline}</h3>
        <p className="card-body-desc">{card.description}</p>
      </div>
    </div>
  );

  return (
    <section ref={containerRef} className="productivity-pinned-container" id="productivity">
      <div className="productivity-sticky-frame">
        {/* Full-Bleed Background Image 'unmatch.jpg' */}
        <img
          src="/assets/unmatch.jpg"
          alt=""
          className="productivity-bg-img"
          aria-hidden="true"
        />
        <div className="productivity-bg-overlay" />

        {/* Subtle Ambient Background Lighting */}
        <div className="productivity-glow-aura aura-left" />
        <div className="productivity-glow-aura aura-right" />

        {/* Section Header: Clean headline without faded watermark */}
        <div className="productivity-header-wrap">
          <div className="productivity-headline-container">
            <h2 className="productivity-main-headline">
              <span className="productivity-unmatched-word">Unmatched</span>{' '}
              <span className="productivity-blue-highlight">Productivity</span>
            </h2>
          </div>
        </div>

        {/* The Horizontal Cards Track (Moving from Right to Left on Scroll) */}
        <div className="productivity-track-viewport">
          <div ref={trackRef} className="productivity-cards-track">
            {PRODUCTIVITY_SLOTS.map((slot, idx) => {
              if (slot.type === 'column-stack') {
                return (
                  <div key={`col-${idx}`} className="productivity-card-col">
                    {slot.cards.map((card) => renderCard(card))}
                  </div>
                );
              }
              return renderCard(slot.card);
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
