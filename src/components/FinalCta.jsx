import React from 'react';
import { ArrowRight, Calendar, CheckCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FinalCta({ onOpenDemo, onOpenBooking }) {
  const handleRequestDemo = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback
    }
    if (onOpenBooking) {
      onOpenBooking();
    } else if (onOpenDemo) {
      onOpenDemo();
    }
  };

  return (
    <section className="section-spacing contact-compact-section">
      <div className="container">
        <div className="final-stadium-card final-compact-clay-card">
          <div className="stadium-glow-flare" />

          <div className="contact-content-inner">
            <h2 className="contact-card-title">
              Deploy your 24/7 AI workforce <br />
              <span className="gradient-text">before your next customer calls.</span>
            </h2>

            <p className="contact-card-desc">
              Join forward-thinking practices, brokerages, and service enterprises answering every inbound call and booking qualified appointments around the clock.
            </p>

            <div className="contact-actions-row">
              <button
                type="button"
                onClick={handleRequestDemo}
                className="btn-primary contact-clay-primary-btn"
              >
                <Calendar size={17} />
                <span>Request a Demo</span>
                <div className="btn-icon-pill">
                  <ArrowRight size={15} />
                </div>
              </button>

              <button
                type="button"
                onClick={onOpenDemo}
                className="btn-secondary contact-clay-secondary-btn"
              >
                <Sparkles size={16} className="text-full-blue" />
                <span>Test Live Voice Sandbox</span>
              </button>
            </div>

            <div className="contact-trust-row">
              <span className="contact-trust-item">
                <CheckCircle size={14} className="contact-check-icon" /> No credit card required
              </span>
              <span className="contact-trust-item">
                <CheckCircle size={14} className="contact-check-icon" /> Keep your existing phone number
              </span>
              <span className="contact-trust-item">
                <CheckCircle size={14} className="contact-check-icon" /> Warm staff failover
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
