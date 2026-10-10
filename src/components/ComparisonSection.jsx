import React from 'react';
import { GitCompare, CheckCircle2, XCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { WORKFLOW_COMPARISON } from '../data/landingData';

export default function ComparisonSection() {
  return (
    <section id="compare" className="section-spacing">
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '3.5rem' }}>
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
                      <strong className="compare-work-title">{row.work}</strong>
                    </td>
                    <td>
                      <div className="compare-legacy-text">
                        <XCircle size={16} style={{ color: 'var(--color-danger)', flexShrink: 0, marginTop: '2px' }} />
                        <span>{row.before}</span>
                      </div>
                    </td>
                    <td className="jobgen-cell">
                      <div className="compare-jobgen-text">
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
        <div className="compare-progression-strip">
          <div>
            <span className="compare-strip-tag">
              Standardized Pipeline Progression
            </span>
            <p className="compare-strip-title">
              Every conversation progresses through 4 deterministic gates:
            </p>
          </div>

          <div className="compare-gates-flow">
            <span className="compare-gate-pill">01 / Contact Reached</span>
            <ArrowRight size={13} className="compare-gate-arrow" />
            <span className="compare-gate-pill">02 / Intent Classified</span>
            <ArrowRight size={13} className="compare-gate-arrow" />
            <span className="compare-gate-pill">03 / Action Booked</span>
            <ArrowRight size={13} className="compare-gate-arrow" />
            <span className="compare-gate-pill is-success">04 / Team Handover</span>
          </div>
        </div>
      </div>
    </section>
  );
}
