import React from 'react';
import { Sliders, Shield, Lock, FileCheck, Users, Eye, CheckCircle2 } from 'lucide-react';

export default function SetupGuardrails() {
  return (
    <section className="section-spacing">
      <div className="container">
        <div style={{ maxWidth: '820px', marginBottom: '3.5rem' }}>
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
              <div className="hardware-bezel-inner setup-step-card" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div className="setup-step-badge">
                  01
                </div>
                <div>
                  <h3 className="setup-step-title">
                    Ingest Verified Business Knowledge
                  </h3>
                  <p className="setup-step-desc">
                    Upload your service menu, pricing guidelines, opening hours, or property listings. Define approved answers for questions your staff answers daily.
                  </p>
                  <span className="setup-step-feature">
                    ✓ Multi-PDF Ingestion · Structured Service Catalogs
                  </span>
                </div>
              </div>
            </div>

            <div className="hardware-bezel-outer">
              <div className="hardware-bezel-inner setup-step-card" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div className="setup-step-badge">
                  02
                </div>
                <div>
                  <h3 className="setup-step-title">
                    Define Required Intake & Escalation Logic
                  </h3>
                  <p className="setup-step-desc">
                    Specify required qualification fields: caller address, timeline, urgency level, or insurance type. Set conditional escalation triggers for VIPs.
                  </p>
                  <span className="setup-step-feature">
                    ✓ Custom CRM Fields · Dynamic Calendar Slots
                  </span>
                </div>
              </div>
            </div>

            <div className="hardware-bezel-outer">
              <div className="hardware-bezel-inner setup-step-card" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div className="setup-step-badge">
                  03
                </div>
                <div>
                  <h3 className="setup-step-title">
                    Sandbox Test & Instant Production Port
                  </h3>
                  <p className="setup-step-desc">
                    Test phone interactions directly in your browser with your team. Review audio recordings and CRM entries, then point your existing phone lines.
                  </p>
                  <span className="setup-step-feature">
                    ✓ Zero Downtime · Instant Number Forwarding
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Guardrails & Boundaries Sidebar */}
          <div className="hardware-bezel-outer">
            <div className="hardware-bezel-inner guardrail-sidebar-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <Shield size={18} style={{ color: 'var(--color-blue-400)' }} />
                <span className="guardrail-strip-tag">
                  Enterprise Boundaries
                </span>
              </div>

              <h3 className="guardrail-title">
                You decide where the AI stops.
              </h3>

              <p className="guardrail-desc">
                An autonomous workforce must be strictly bounded by your company policies and never improvise answers.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1 }}>
                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <FileCheck size={18} className="guardrail-item-icon" />
                  <div>
                    <strong className="guardrail-item-title">Zero Hallucination Policy</strong>
                    <span className="guardrail-item-desc">Only speaks approved business facts. Never fabricates pricing, policies, or availability.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <Lock size={18} className="guardrail-item-icon" />
                  <div>
                    <strong className="guardrail-item-title">Identity & Security Checks</strong>
                    <span className="guardrail-item-desc">Enforces DOB or account number verification before sharing customer-specific information.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <Users size={18} className="guardrail-item-icon" />
                  <div>
                    <strong className="guardrail-item-title">Instant Warm Failover</strong>
                    <span className="guardrail-item-desc">High-urgency callers are transferred to live personnel with a pre-briefed dossier.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <Eye size={18} className="guardrail-item-icon" />
                  <div>
                    <strong className="guardrail-item-title">Complete Audit Trails</strong>
                    <span className="guardrail-item-desc">Full audio logs, word-by-word transcripts, and explicit caller recording consent logged.</span>
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
