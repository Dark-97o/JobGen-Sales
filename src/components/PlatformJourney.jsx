import React from 'react';
import { Layers, Globe, PhoneCall, Send, MessageSquare, Database, Users2, Check, Sparkles, Shield, Cpu, RefreshCw, Zap } from 'lucide-react';
import { PLATFORM_PILLARS, JOURNEY_STEPS } from '../data/landingData';

export default function PlatformJourney() {
  return (
    <section id="platform" className="section-spacing">
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '4rem' }}>
          <div className="section-badge">
            <Layers size={14} />
            <span>CORE ARCHITECTURE CAPABILITIES</span>
          </div>
          <h2 className="section-title">
            Every conversation. <br />
            <span className="gradient-text">A deterministic, owned outcome.</span>
          </h2>
          <p className="section-lead">
            Connect your website, telephony lines, WhatsApp channels, and CRM database.
            JobGen unifies voice intelligence, instant messaging, and staff calendars into one unbreakable loop.
          </p>
        </div>

        {/* Huly-Grade Asymmetric Bento Grid */}
        <div className="bento-grid" style={{ marginBottom: '5.5rem' }}>
          {/* Card 1 (Span 8): Real-Time Voice Engine & Sub-600ms Latency */}
          <div className="hardware-bezel-outer bento-col-8">
            <div className="hardware-bezel-inner bento-card-inner">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div className="bento-icon-wrapper">
                  <Cpu size={20} />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-blue-400)', background: 'rgba(37,99,235,0.1)', padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(59,130,246,0.25)' }}>
                  SUB-600MS LATENCY ENGINE
                </div>
              </div>

              <div>
                <h3 className="bento-card-title">
                  Real-Time Neural Speech with Zero Awkward Pauses
                </h3>
                <p className="bento-card-desc" style={{ marginBottom: '1.75rem' }}>
                  Most voice bots make callers wait 2–3 seconds between responses. JobGen streams bidirectional speech tokens in under 550ms, supporting natural interruptions, clarifying pauses, and empathetic inflection.
                </p>
              </div>

              {/* Graphic element: Live Latency Spectrum */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-success)', boxShadow: '0 0 10px var(--color-success)' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--color-white-90)' }}>
                    Continuous Audio Stream: 24kHz Uncompressed Opus
                  </span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-blue-400)' }}>
                  480ms – 620ms Verified
                </span>
              </div>
            </div>
          </div>

          {/* Card 2 (Span 4): Deterministic Guardrails */}
          <div className="hardware-bezel-outer bento-col-4">
            <div className="hardware-bezel-inner bento-card-inner">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div className="bento-icon-wrapper">
                  <Shield size={20} />
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-success)' }}>
                  0% HALLUCINATION
                </span>
              </div>

              <div>
                <h3 className="bento-card-title">
                  Strict Brand Voice Guardrails
                </h3>
                <p className="bento-card-desc" style={{ marginBottom: '1.5rem' }}>
                  Trained strictly on your verified knowledge base, policy docs, and service menus. If a caller asks something out of bounds, JobGen admits policy limits gracefully.
                </p>
              </div>

              <div style={{ padding: '0.75rem 1rem', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '10px', fontSize: '0.78rem', color: '#6EE7B7' }}>
                ✓ Deterministic Fallback Rules Active
              </div>
            </div>
          </div>

          {/* Card 3 (Span 4): Bi-Directional CRM & Calendar Sync */}
          <div className="hardware-bezel-outer bento-col-4">
            <div className="hardware-bezel-inner bento-card-inner">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div className="bento-icon-wrapper">
                  <Database size={20} />
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-blue-400)' }}>
                  TWO-WAY SYNC
                </span>
              </div>

              <div>
                <h3 className="bento-card-title">
                  Live Diary & CRM Writeback
                </h3>
                <p className="bento-card-desc" style={{ marginBottom: '1.5rem' }}>
                  Checks live Google/Outlook calendars before offering times. Books slots directly, writes caller notes to HubSpot, Salesforce or Clio in real-time.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['HubSpot', 'Salesforce', 'Google Cal', 'Calendly'].map((tool) => (
                  <span key={tool} style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-pill)', color: 'var(--color-white-70)' }}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 4 (Span 8): Omnichannel WhatsApp & SMS Automation */}
          <div className="hardware-bezel-outer bento-col-8">
            <div className="hardware-bezel-inner bento-card-inner">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div className="bento-icon-wrapper">
                  <MessageSquare size={20} />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-blue-400)', background: 'rgba(37,99,235,0.1)', padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(59,130,246,0.25)' }}>
                  OMNICHANNEL HANDOFF
                </div>
              </div>

              <div>
                <h3 className="bento-card-title">
                  Immediate WhatsApp & SMS Post-Call Automation
                </h3>
                <p className="bento-card-desc" style={{ marginBottom: '1.75rem' }}>
                  The conversation doesn’t vanish when the call ends. Callers immediately receive calendar invites, intake forms, location maps, or PDF brochures right on WhatsApp before hanging up.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-white-70)' }}>
                  Average SMS/WhatsApp dispatch speed:
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-success)' }}>
                  &lt; 3.2 Seconds Post-Call
                </span>
              </div>
            </div>
          </div>

          {/* Card 5 (Span 6): Warm Human Transfer */}
          <div className="hardware-bezel-outer bento-col-6">
            <div className="hardware-bezel-inner bento-card-inner">
              <div className="bento-icon-wrapper">
                <Users2 size={20} />
              </div>
              <div>
                <h3 className="bento-card-title">
                  Smart Human Warm Transfer
                </h3>
                <p className="bento-card-desc">
                  When a caller requests a specific staff member or encounters an emergency, Jenny dials your human team, whispers the caller's dossier, and transfers seamlessly without dropping the call.
                </p>
              </div>
            </div>
          </div>

          {/* Card 6 (Span 6): Telemetry & Audio Auditing */}
          <div className="hardware-bezel-outer bento-col-6">
            <div className="hardware-bezel-inner bento-card-inner">
              <div className="bento-icon-wrapper">
                <Zap size={20} />
              </div>
              <div>
                <h3 className="bento-card-title">
                  Deep Call Telemetry & Transcript Logs
                </h3>
                <p className="bento-card-desc">
                  Every call produces a word-for-word transcript, caller sentiment tag, intent categorization, audio playback link, and structured CRM record within seconds of completion.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* The 4-Step Customer Journey Timeline */}
        <div className="hardware-bezel-outer">
          <div className="hardware-bezel-inner" style={{ padding: '3.5rem 3rem' }}>
            <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem' }}>
              <div className="section-badge">
                <span>SEAMLESS CUSTOMER EXPERIENCE</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 800, color: '#fff', marginBottom: '0.75rem' }}>
                A lead is a real person. Give them a proper handover.
              </h3>
              <p style={{ color: 'var(--color-white-50)', fontSize: '1rem', lineHeight: 1.6 }}>
                Agree the channels, details to capture, and handoff rules with our solutions engineering team. Here is the connected journey.
              </p>
            </div>

            <div className="journey-timeline-row">
              {JOURNEY_STEPS.map((step) => (
                <div key={step.step} className="journey-step-card">
                  <div className="journey-step-number">STEP 0{step.step}</div>
                  <h4 className="journey-step-heading">{step.title}</h4>
                  <p className="journey-step-body">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
