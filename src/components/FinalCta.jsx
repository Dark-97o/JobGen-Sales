import React from 'react';
import { ArrowRight, Calendar, CheckCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FinalCta({ onOpenDemo }) {
  const handleStartTrial = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback
    }
    onOpenDemo();
  };

  return (
    <section className="section-spacing" style={{ paddingTop: '2rem' }}>
      <div className="container">
        <div className="final-stadium-card">
          <div className="stadium-glow-flare" />

          {/* Dual Avatars Cluster */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
            <div style={{ position: 'relative', zIndex: 2, width: '4.5rem', height: '4.5rem', borderRadius: '50%', overflow: 'hidden', border: '3px solid #2563EB', boxShadow: '0 0 25px rgba(37,99,235,0.6)' }}>
              <img src="/assets/jenny-portrait.jpg" alt="Jenny AI Receptionist" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'relative', zIndex: 1, width: '4.5rem', height: '4.5rem', borderRadius: '50%', overflow: 'hidden', border: '3px solid #60A5FA', marginLeft: '-1.5rem', boxShadow: '0 0 25px rgba(96,165,250,0.4)' }}>
              <img src="/assets/olivia-portrait.jpg" alt="Olivia AI Sales Agent" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 3 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5.2vw, 4.25rem)', fontWeight: 800, color: '#fff', margin: '0 0 1.5rem', lineHeight: 1.08, letterSpacing: '-0.04em' }}>
              Deploy your 24/7 AI workforce <br />
              <span className="gradient-text">before your next customer calls.</span>
            </h2>

            <p style={{ fontSize: 'clamp(1.05rem, 1.4vw, 1.2rem)', color: 'var(--color-white-70)', lineHeight: 1.65, marginBottom: '2.5rem' }}>
              Join forward-thinking clinics, real estate brokerages, law firms, and service enterprises answering every inbound call and turning cold databases into revenue.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <button
                type="button"
                onClick={handleStartTrial}
                className="btn-primary"
                style={{ fontSize: '1rem', padding: '0.75rem 0.75rem 0.75rem 1.75rem' }}
              >
                <span>Start 14-Day Free Trial</span>
                <div className="btn-icon-pill" style={{ width: '2.25rem', height: '2.25rem' }}>
                  <ArrowRight size={16} />
                </div>
              </button>

              <button
                type="button"
                onClick={onOpenDemo}
                className="btn-secondary"
                style={{ fontSize: '1rem', padding: '0.85rem 1.6rem' }}
              >
                <Calendar size={18} style={{ color: 'var(--color-blue-400)' }} />
                <span>Test Live Phone Sandbox</span>
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', fontSize: '0.8125rem', color: 'var(--color-white-50)', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle size={14} style={{ color: 'var(--color-success)' }} /> No credit card required
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle size={14} style={{ color: 'var(--color-success)' }} /> Keep your existing phone number
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle size={14} style={{ color: 'var(--color-success)' }} /> Deterministic failover to human rep
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
