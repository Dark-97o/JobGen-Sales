import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, Check, Zap, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const LLM_OPTIONS = [
  { id: 'gpt-4o', label: 'GPT-4o (Standard)', note: 'Recommended · Low Latency', mult: 1.0 },
  { id: 'gpt-5.5', label: 'GPT-5.5 (Deep Reasoning)', note: 'Flagship Intelligence', mult: 1.45 },
  { id: 'gpt-4.1-mini', label: 'GPT-4.1 Mini (High Velocity)', note: 'High Speed & Efficiency', mult: 0.6 }
];

const VOICE_OPTIONS = [
  { id: 'eleven-flash', label: 'ElevenLabs Flash Turbo', note: 'Sub-400ms Natural Tone', mult: 1.0 },
  { id: 'eleven-v3', label: 'ElevenLabs Conversational v3', note: 'Expressive Nuance', mult: 1.25 }
];

export default function PricingCalculator({ onOpenDemo }) {
  const [direction, setDirection] = useState('inbound');
  const [callVolume, setCallVolume] = useState(350);
  const [durationMinutes, setDurationMinutes] = useState(1.5);
  const [selectedLlm, setSelectedLlm] = useState('gpt-4o');
  const [selectedVoice, setSelectedVoice] = useState('eleven-flash');

  const calculation = useMemo(() => {
    const llm = LLM_OPTIONS.find(l => l.id === selectedLlm) || LLM_OPTIONS[0];
    const voice = VOICE_OPTIONS.find(v => v.id === selectedVoice) || VOICE_OPTIONS[0];

    const basePerMin = 0.12;
    const llmCost = 0.08 * llm.mult;
    const voiceCost = 0.10 * voice.mult;
    const ratePerMin = basePerMin + llmCost + voiceCost;

    const perCallCost = +(ratePerMin * durationMinutes).toFixed(2);
    const telephonyBase = 19.00;
    const monthlyTotal = Math.round((perCallCost * callVolume) + telephonyBase);

    // Estimate recovered revenue
    const missedCallsWithoutAi = Math.round(callVolume * 0.28);
    const recoveredRevenue = Math.round(missedCallsWithoutAi * 0.45 * 350);

    return {
      perCall: perCallCost,
      monthlyTotal,
      recoveredRevenue
    };
  }, [direction, callVolume, durationMinutes, selectedLlm, selectedVoice]);

  const handleDeployClick = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
    onOpenDemo();
  };

  return (
    <section id="pricing" className="section-spacing">
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '3.5rem' }}>
          <h2 className="section-title">
            Transparent pricing modeled <br />
            <span className="gradient-text">on your exact call requirements.</span>
          </h2>
          <p className="section-lead">
            No bloated user-seat fees or lock-in contracts. Slide your volume below to see your estimated monthly investment and recovered revenue.
          </p>
        </div>

        {/* Interactive Cockpit */}
        <div className="pricing-calculator-cockpit">
          {/* Controls */}
          <div>
            {/* Direction Selector */}
            <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '2rem' }}>
              <button
                type="button"
                onClick={() => setDirection('inbound')}
                className={`pricing-dir-tab ${direction === 'inbound' ? 'is-active' : ''}`}
              >
                Jenny · Inbound Reception
              </button>
              <button
                type="button"
                onClick={() => setDirection('outbound')}
                className={`pricing-dir-tab ${direction === 'outbound' ? 'is-active' : ''}`}
              >
                Olivia · Outbound Outreach
              </button>
            </div>

            {/* Slider 1: Call Volume */}
            <div className="slider-group">
              <div className="slider-header-row">
                <span className="slider-label">Expected Monthly Phone Calls</span>
                <span className="slider-value-badge">{callVolume.toLocaleString()} calls</span>
              </div>
              <input
                type="range"
                min="50"
                max="3000"
                step="50"
                value={callVolume}
                onChange={(e) => setCallVolume(Number(e.target.value))}
                className="luxury-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--color-white-50)', marginTop: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                <span>50 (Solo clinic)</span>
                <span>1,200 (Mid agency)</span>
                <span>3,000+ (High volume)</span>
              </div>
            </div>

            {/* Slider 2: Average Call Duration */}
            <div className="slider-group">
              <div className="slider-header-row">
                <span className="slider-label">Average Call Length</span>
                <span className="slider-value-badge">{durationMinutes.toFixed(1)} mins</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="4.0"
                step="0.1"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="luxury-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--color-white-50)', marginTop: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                <span>30s (Quick triage)</span>
                <span>1.5m (Standard booking)</span>
                <span>4.0m (Consultation)</span>
              </div>
            </div>

            {/* Reasoning Engine Toggle */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-white-70)', marginBottom: '0.5rem' }}>
                Reasoning LLM
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {LLM_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedLlm(opt.id)}
                    className={`llm-chip-btn ${selectedLlm === opt.id ? 'is-active' : ''}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Output Deck */}
          <div className="roi-output-card">
            <div>
              <div className="roi-metric-item">
                <div className="roi-metric-label">Estimated Monthly Investment</div>
                <div className="roi-metric-number">
                  ${calculation.monthlyTotal.toLocaleString()}
                  <span style={{ fontSize: '1.1rem', color: 'var(--color-white-50)', fontWeight: 500 }}> / mo</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-blue-300)', fontFamily: 'var(--font-mono)' }}>
                  ≈ ${calculation.perCall.toFixed(2)} per handled phone conversation
                </div>
              </div>

              <div className="roi-metric-item" style={{ paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="roi-metric-label" style={{ color: '#6EE7B7' }}>Projected Recovered Revenue</div>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-success)', letterSpacing: '-0.03em' }}>
                  +${calculation.recoveredRevenue.toLocaleString()}
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-white-70)', fontWeight: 500 }}> / mo</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-white-50)', marginTop: '0.2rem' }}>
                  Based on capturing 28% after-hours calls currently lost to voicemail.
                </div>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleDeployClick}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginBottom: '0.75rem' }}
              >
                <span>Deploy This Plan with 14-Day Free Pilot</span>
                <div className="btn-icon-pill">
                  <ArrowRight size={14} />
                </div>
              </button>
              <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-white-50)' }}>
                ✓ No credit card required · Instant setup in under 2 hours
              </div>
            </div>
          </div>
        </div>

        {/* 3 Clear Transparent Tier Cards */}
        <div className="pricing-tiers-grid">
          <div className="hardware-bezel-outer">
            <div className="hardware-bezel-inner tier-card">
              <div className="tier-name">Starter Pilot</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-white-50)', marginBottom: '1.25rem' }}>
                Ideal for solo practices, local clinics, and boutique brokerages testing AI phone intake.
              </p>
              <div className="tier-price-row">
                <span className="tier-price">$99</span>
                <span className="tier-period">/ month</span>
              </div>
              <ul className="pillar-checklist" style={{ marginBottom: '2rem' }}>
                <li><Check size={15} /><span>Up to 250 handled minutes</span></li>
                <li><Check size={15} /><span>Jenny 24/7 Inbound Reception</span></li>
                <li><Check size={15} /><span>Google & Outlook Calendar sync</span></li>
                <li><Check size={15} /><span>WhatsApp & SMS intake dispatch</span></li>
                <li><Check size={15} /><span>Standard email support</span></li>
              </ul>
              <button type="button" onClick={onOpenDemo} className="btn-secondary" style={{ marginTop: 'auto', width: '100%' }}>
                Start Free Trial
              </button>
            </div>
          </div>

          <div className="hardware-bezel-outer">
            <div className="hardware-bezel-inner tier-card is-featured" style={{ background: 'linear-gradient(180deg, rgba(37,99,235,0.12) 0%, rgba(11,16,29,0.95) 100%)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="tier-name">Growth Dual Engine</div>
                <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', background: 'var(--color-blue-600)', color: '#fff', padding: '0.2rem 0.55rem', borderRadius: 'var(--radius-pill)', fontWeight: 700 }}>
                  MOST POPULAR
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-white-50)', marginBottom: '1.25rem' }}>
                Full dual AI workforce: 24/7 Jenny reception plus proactive Olivia sales outreach.
              </p>
              <div className="tier-price-row">
                <span className="tier-price">$299</span>
                <span className="tier-period">/ month</span>
              </div>
              <ul className="pillar-checklist" style={{ marginBottom: '2rem' }}>
                <li><Check size={15} /><span>Up to 1,000 handled minutes</span></li>
                <li><Check size={15} /><span>Both Jenny (Inbound) + Olivia (Outbound)</span></li>
                <li><Check size={15} /><span>HubSpot, Salesforce & CRM writeback</span></li>
                <li><Check size={15} /><span>Live Warm Staff Transfer</span></li>
                <li><Check size={15} /><span>Custom Knowledge Base Ingestion</span></li>
                <li><Check size={15} /><span>Priority Solutions Engineer Setup</span></li>
              </ul>
              <button type="button" onClick={onOpenDemo} className="btn-primary" style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }}>
                Deploy Growth Plan
              </button>
            </div>
          </div>

          <div className="hardware-bezel-outer">
            <div className="hardware-bezel-inner tier-card">
              <div className="tier-name">Enterprise Scale</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-white-50)', marginBottom: '1.25rem' }}>
                For multi-location groups, high-volume call centers, and custom telephony architectures.
              </p>
              <div className="tier-price-row">
                <span className="tier-price">$699</span>
                <span className="tier-period">/ month</span>
              </div>
              <ul className="pillar-checklist" style={{ marginBottom: '2rem' }}>
                <li><Check size={15} /><span>3,000+ handled minutes pool</span></li>
                <li><Check size={15} /><span>Unlimited concurrent lines</span></li>
                <li><Check size={15} /><span>Custom Fine-Tuned Voice Clones</span></li>
                <li><Check size={15} /><span>Dedicated Account Manager & SLA</span></li>
                <li><Check size={15} /><span>HIPAA BAA & SOC-2 Compliance Docs</span></li>
                <li><Check size={15} /><span>Custom Webhook & API Infrastructure</span></li>
              </ul>
              <button type="button" onClick={onOpenDemo} className="btn-secondary" style={{ marginTop: 'auto', width: '100%' }}>
                Contact Enterprise
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
