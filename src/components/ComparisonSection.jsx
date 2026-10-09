import React from 'react';
import { GitCompare, CheckCircle2, XCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { WORKFLOW_COMPARISON } from '../data/landingData';

export default function ComparisonSection() {
  return (
    <section id="compare" className="section-spacing">
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '3.5rem' }}>
          <div className="section-badge">
            <GitCompare size={14} />
            <span>WORKFLOW TRANSFORMATION MATRIX</span>
          </div>
          <h2 className="section-title">
            Eliminate manual friction between <br />
            <span className="gradient-text">the first phone ring and the revenue.</span>
          </h2>
          <p className="section-lead">
            A direct comparison of daily business operations with and without configured JobGen conversational workflows.
          </p>
        </div>

        {/* High-Contrast Cyber Comparison Table (Quoti & Huly DNA) */}
        <div className="hardware-bezel-outer">
          <div className="hardware-bezel-inner comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th style={{ width: '26%' }}>Operational Workflow</th>
                  <th style={{ width: '37%' }}>Legacy Method (Voicemail / Manual Staff)</th>
                  <th className="jobgen-header" style={{ width: '37%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Zap size={15} style={{ color: '#93C5FD' }} />
                      <span>JobGen Dual AI Workforce</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {WORKFLOW_COMPARISON.map((row, idx) => (
                  <tr key={idx}>
                    <td>
                      <strong style={{ color: '#fff', fontSize: '0.95rem' }}>{row.work}</strong>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--color-white-50)', lineHeight: 1.55 }}>
                        <XCircle size={16} style={{ color: 'var(--color-danger)', flexShrink: 0, marginTop: '2px' }} />
                        <span>{row.before}</span>
                      </div>
                    </td>
                    <td className="jobgen-cell">
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#fff', lineHeight: 1.55 }}>
                        <CheckCircle2 size={16} style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: '2px' }} />
                        <span>{row.withJobGen}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Milestone Progression Strip */}
        <div style={{ marginTop: '3rem', padding: '1.75rem 2.25rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-blue-400)', letterSpacing: '0.15em' }}>
              Standardized Pipeline Progression
            </span>
            <p style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 600, marginTop: '0.25rem' }}>
              Every conversation progresses through 4 deterministic gates:
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(255,255,255,0.05)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>01 / Contact Reached</span>
            <ArrowRight size={13} style={{ color: 'var(--color-white-50)' }} />
            <span style={{ background: 'rgba(255,255,255,0.05)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>02 / Intent Classified</span>
            <ArrowRight size={13} style={{ color: 'var(--color-white-50)' }} />
            <span style={{ background: 'rgba(255,255,255,0.05)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>03 / Action Booked</span>
            <ArrowRight size={13} style={{ color: 'var(--color-white-50)' }} />
            <span style={{ background: 'rgba(16,185,129,0.15)', color: '#6EE7B7', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(16,185,129,0.3)', fontWeight: 600 }}>04 / Team Handover</span>
          </div>
        </div>
      </div>
    </section>
  );
}
