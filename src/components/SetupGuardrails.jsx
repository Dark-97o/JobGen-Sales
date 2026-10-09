import React from 'react';
import { Sliders, Shield, Lock, FileCheck, Users, Eye, CheckCircle2 } from 'lucide-react';

export default function SetupGuardrails() {
  return (
    <section className="section-spacing">
      <div className="container">
        <div style={{ maxWidth: '820px', marginBottom: '3.5rem' }}>
          <div className="section-badge">
            <Sliders size={14} />
            <span>3-STEP ACTIVATION & SAFETY PROTOCOL</span>
          </div>
          <h2 className="section-title">
            Deploy in hours with one call flow. <br />
            <span className="gradient-text">Retain 100% control as you scale.</span>
          </h2>
          <p className="section-lead">
            Configure the questions, knowledge base facts, and escalation boundaries. Test thoroughly in the browser sandbox before switching your live phone lines or launching outbound campaigns.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', alignItems: 'stretch' }}>
          {/* Left: 3 Setup Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="hardware-bezel-outer">
              <div className="hardware-bezel-inner" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: 'var(--radius-pill)', background: 'var(--color-blue-600)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontWeight: 800, flexShrink: 0, boxShadow: '0 0 20px rgba(37,99,235,0.4)' }}>
                  01
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>
                    Ingest Verified Business Knowledge
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-white-50)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                    Upload your service menu, pricing guidelines, opening hours, or property listings. Define approved answers for questions your staff answers daily.
                  </p>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--color-blue-400)' }}>
                    ✓ Multi-PDF Ingestion · Structured Service Catalogs
                  </span>
                </div>
              </div>
            </div>

            <div className="hardware-bezel-outer">
              <div className="hardware-bezel-inner" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: 'var(--radius-pill)', background: 'var(--color-blue-600)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontWeight: 800, flexShrink: 0, boxShadow: '0 0 20px rgba(37,99,235,0.4)' }}>
                  02
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>
                    Define Required Intake & Escalation Logic
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-white-50)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                    Specify required qualification fields: caller address, timeline, urgency level, or insurance type. Set conditional escalation triggers for VIPs.
                  </p>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--color-blue-400)' }}>
                    ✓ Custom CRM Fields · Dynamic Calendar Slots
                  </span>
                </div>
              </div>
            </div>

            <div className="hardware-bezel-outer">
              <div className="hardware-bezel-inner" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: 'var(--radius-pill)', background: 'var(--color-blue-600)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontWeight: 800, flexShrink: 0, boxShadow: '0 0 20px rgba(37,99,235,0.4)' }}>
                  03
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>
                    Sandbox Test & Instant Production Port
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-white-50)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                    Test phone interactions directly in your browser with your team. Review audio recordings and CRM entries, then point your existing phone lines.
                  </p>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--color-blue-400)' }}>
                    ✓ Zero Downtime · Instant Number Forwarding
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Guardrails & Boundaries Sidebar */}
          <div className="hardware-bezel-outer">
            <div className="hardware-bezel-inner" style={{ padding: '2.5rem', height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, rgba(37,99,235,0.12) 0%, rgba(11,16,29,0.95) 100%)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <Shield size={18} style={{ color: 'var(--color-blue-400)' }} />
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-blue-400)', letterSpacing: '0.15em' }}>
                  Enterprise Boundaries
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.85rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', lineHeight: 1.2 }}>
                You decide where the AI stops.
              </h3>

              <p style={{ fontSize: '0.9rem', color: 'var(--color-white-50)', lineHeight: 1.6, marginBottom: '2rem' }}>
                An autonomous workforce must be strictly bounded by your company policies and never improvise answers.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1 }}>
                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <FileCheck size={18} style={{ color: 'var(--color-blue-400)', marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: '#fff', fontSize: '0.9rem', display: 'block' }}>Zero Hallucination Policy</strong>
                    <span style={{ color: 'var(--color-white-50)', fontSize: '0.8125rem' }}>Only speaks approved business facts. Never fabricates pricing, policies, or availability.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <Lock size={18} style={{ color: 'var(--color-blue-400)', marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: '#fff', fontSize: '0.9rem', display: 'block' }}>Identity & Security Checks</strong>
                    <span style={{ color: 'var(--color-white-50)', fontSize: '0.8125rem' }}>Enforces DOB or account number verification before sharing customer-specific information.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <Users size={18} style={{ color: 'var(--color-blue-400)', marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: '#fff', fontSize: '0.9rem', display: 'block' }}>Instant Warm Failover</strong>
                    <span style={{ color: 'var(--color-white-50)', fontSize: '0.8125rem' }}>High-urgency callers are transferred to live personnel with a pre-briefed dossier.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <Eye size={18} style={{ color: 'var(--color-blue-400)', marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: '#fff', fontSize: '0.9rem', display: 'block' }}>Complete Audit Trails</strong>
                    <span style={{ color: 'var(--color-white-50)', fontSize: '0.8125rem' }}>Full audio logs, word-by-word transcripts, and explicit caller recording consent logged.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
