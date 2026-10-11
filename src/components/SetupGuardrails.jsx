import React, { useState } from 'react';
import { Shield } from 'lucide-react';

const SPADE_CARDS = [
  {
    id: 1,
    rank: "A",
    suit: "♠",
    title: "Ingest Verified Business Knowledge",
    description: "Upload your service menu, pricing guidelines, opening hours, or property listings. Define approved answers for questions your staff answers daily.",
    tag: "Multi-PDF Ingestion · Structured Service Catalogs",
    bgImage: "/assets/cards/website-voice.jpg",
    angle: -22,
    x: -420,
    y: 38
  },
  {
    id: 2,
    rank: "2",
    suit: "♠",
    title: "Define Required Intake & Escalation Logic",
    description: "Specify required qualification fields: caller address, timeline, urgency level, or insurance type. Set conditional escalation triggers for VIPs.",
    tag: "Custom CRM Fields · Dynamic Calendar Slots",
    bgImage: "/assets/cards/call-intake.jpg",
    angle: -15,
    x: -280,
    y: 18
  },
  {
    id: 3,
    rank: "3",
    suit: "♠",
    title: "Sandbox Test & Instant Production Port",
    description: "Test phone interactions directly in your browser with your team. Review audio recordings and CRM entries, then point your existing phone lines.",
    tag: "Zero Downtime · Instant Number Forwarding",
    bgImage: "/assets/cards/carrier-forward.jpg",
    angle: -7,
    x: -140,
    y: 5
  },
  {
    id: 4,
    rank: "4",
    suit: "♠",
    title: "Zero Hallucination Policy",
    description: "Only speaks approved business facts. Never fabricates pricing, policies, or availability.",
    tag: "Deterministic Guardrails · 100% Fact Verified",
    bgImage: "/assets/cards/smart-routing.jpg",
    angle: 0,
    x: 0,
    y: 0
  },
  {
    id: 5,
    rank: "5",
    suit: "♠",
    title: "Identity & Security Checks",
    description: "Enforces DOB or account number verification before sharing customer-specific information.",
    tag: "Biometric & Cryptographic ID Gateways",
    bgImage: "/assets/cards/crm-leads.jpg",
    angle: 7,
    x: 140,
    y: 5
  },
  {
    id: 6,
    rank: "6",
    suit: "♠",
    title: "Instant Warm Failover",
    description: "High-urgency callers are transferred to live personnel with a pre-briefed dossier.",
    tag: "Zero Blind Transfers · Pre-Briefed Caller State",
    bgImage: "/assets/cards/human-handoff.jpg",
    angle: 15,
    x: 280,
    y: 18
  },
  {
    id: 7,
    rank: "7",
    suit: "♠",
    title: "Complete Audit Trails",
    description: "Full audio logs, word-by-word transcripts, and explicit caller recording consent logged.",
    tag: "Immutable Verbatim Ledger · Audio Vault",
    bgImage: "/assets/cards/calendar-sync.jpg",
    angle: 22,
    x: 420,
    y: 38
  }
];

export default function SetupGuardrails() {
  const [activeIdx, setActiveIdx] = useState(null);

  return (
    <section id="guardrails" className="guardrails-dark-section">
      {/* Floating Blue Mist in Background */}
      <div className="guardrails-mist-container" aria-hidden="true">
        <div className="guardrails-mist-orb mist-orb-1" />
        <div className="guardrails-mist-orb mist-orb-2" />
        <div className="guardrails-mist-orb mist-orb-3" />
      </div>

      <div className="container guardrails-container relative z-10">
        {/* Section Headline matching exact text & typography requested */}
        <div className="guardrails-header-block">
          <h2 className="section-title">
            <span className="guardrails-headline-main">Deploy with one call flow</span> <br />
            <span className="text-full-blue guardrails-headline-sub">Retain 100% control as you scale.</span>
          </h2>
        </div>

        {/* Fanned Hand of 7 Spades Playing Cards */}
        <div className="spade-hand-stage">
          <div
            className="spade-hand-fan"
            role="region"
            aria-label="Deploy and safety cards"
            onMouseLeave={() => setActiveIdx(null)}
          >
            {/* Base Hover Detectors (ensure seamless card selection across overlapping fans) */}
            <div className="spade-hit-slots" aria-hidden="true">
              {SPADE_CARDS.map((card, idx) => (
                <div
                  key={`hit-${card.id}`}
                  className="spade-hit-area"
                  style={{
                    transform: `translateX(${card.x}px) translateY(${card.y}px) rotate(${card.angle}deg)`,
                    zIndex: 20 + idx
                  }}
                  onMouseEnter={() => setActiveIdx(idx)}
                />
              ))}
            </div>

            {/* The 7 Interactive Spades Cards */}
            {SPADE_CARDS.map((card, idx) => {
              const isActive = activeIdx === idx;
              const hasActive = activeIdx !== null;

              // Resting position in fan
              const restingTransform = `translateX(${card.x}px) translateY(${card.y}px) rotate(${card.angle}deg)`;
              // Active card pops upward in its slot so other cards remain visible on both sides
              const activeTransform = `translateX(${card.x}px) translateY(-58px) rotate(0deg) scale(1.24)`;

              return (
                <div
                  key={card.id}
                  className={`spade-card-slot ${isActive ? 'is-active' : ''} ${hasActive && !isActive ? 'is-dimmed' : ''}`}
                  style={{
                    transform: isActive ? activeTransform : restingTransform,
                    zIndex: isActive ? 100 : 10 + idx
                  }}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => setActiveIdx(isActive ? null : idx)}
                  tabIndex={0}
                  onFocus={() => setActiveIdx(idx)}
                  role="button"
                  aria-label={`Step ${card.id}: ${card.title}`}
                >
                  <div className="spade-card-flipper">
                    {/* BACK FACE (Luxury Spades card back with prominent center emblem and enlarged corner indices) */}
                    <div className="spade-card-back">
                      {/* Top-Left Corner Index (Bigger rank and spade) */}
                      <div className="card-corner-index top-left">
                        <span className="corner-rank">{card.rank}</span>
                        <span className="corner-suit">{card.suit}</span>
                      </div>

                      {/* Card Back Filigree Frame & Prominent Center Spade Emblem */}
                      <div className="card-back-ornament">
                        <div className="card-spade-center-emblem" aria-hidden="true">
                          <span className="spade-symbol-icon">♠</span>
                        </div>
                        <div className="card-back-headline-box">
                          <h4 className="card-back-headline">{card.title}</h4>
                          <span className="card-back-deck-sub">JOBGEN.AI DECK</span>
                        </div>
                      </div>

                      {/* Bottom-Right Inverted Corner Index (Bigger rank and spade) */}
                      <div className="card-corner-index bottom-right">
                        <span className="corner-rank">{card.rank}</span>
                        <span className="corner-suit">{card.suit}</span>
                      </div>
                    </div>

                    {/* FRONT FACE (Revealed on hover: background image, headline & description, clean without card/deck/spade mentions) */}
                    <div
                      className="spade-card-front"
                      style={{ backgroundImage: `url(${card.bgImage})` }}
                    >
                      <div className="spade-front-overlay" />
                      <div className="spade-front-content">
                        {/* Top Meta Bar: Clean rank indicator & feature tag (no spade logo or deck mention) */}
                        <div className="spade-front-top-bar">
                          <div className="spade-front-phase-badge">
                            <span>0{card.id}</span>
                          </div>
                          <span className="spade-front-tag">{card.tag}</span>
                        </div>

                        {/* Title & Detailed Narrative */}
                        <div className="spade-front-body">
                          <h3 className="spade-front-title">{card.title}</h3>
                          <p className="spade-front-desc">{card.description}</p>
                        </div>

                        {/* Bottom Enterprise Guardrail Seal (no deck or playing card mentions) */}
                        <div className="spade-front-footer">
                          <div className="spade-seal-pill">
                            <Shield size={14} className="spade-seal-icon" />
                            <span>Deterministic Guardrail</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Micro hint below the hand */}
          <div className="spade-hand-hint" aria-hidden="true">
            <span>Hover over any item to inspect deployment architecture & enterprise guardrails</span>
          </div>
        </div>
      </div>
    </section>
  );
}
