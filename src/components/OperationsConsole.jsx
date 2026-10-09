import React, { useState } from 'react';
import { Activity, Radio, Phone, Calendar, Mail, DollarSign, CheckCircle2, AlertTriangle, ArrowUpRight, BarChart3, Users, Clock, Shield } from 'lucide-react';
import { CONSOLE_STATS, RECENT_ACTIVITY } from '../data/landingData';

export default function OperationsConsole() {
  const [activeTab, setActiveTab] = useState('telemetry');

  return (
    <section id="console" className="section-spacing">
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '3.5rem' }}>
          <div className="section-badge">
            <Activity size={14} />
            <span>CENTRAL OPERATIONS TELEMETRY</span>
          </div>
          <h2 className="section-title">
            Every conversation becomes <br />
            <span className="gradient-text">visible, accountable work.</span>
          </h2>
          <p className="section-lead">
            Live operations cockpit with real-time throughput: concurrent calls, calendar bookings, WhatsApp dispatches, staff warm transfers, and CRM updates in one centralized dashboard.
          </p>
        </div>

        {/* Double-Bezel Hardware Console Frame */}
        <div className="hardware-bezel-outer">
          <div className="hardware-bezel-inner">
            {/* Topbar */}
            <div className="ops-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--color-success)', boxShadow: '0 0 10px var(--color-success)' }} />
                <strong style={{ fontSize: '0.95rem', color: '#fff', fontFamily: 'var(--font-display)' }}>JobGen Central Command</strong>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-blue-400)', background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(59,130,246,0.25)', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-pill)', fontFamily: 'var(--font-mono)' }}>
                  v3.2 PRODUCTION
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.8125rem' }}>
                <span style={{ color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)' }}>
                  <Radio size={13} />
                  <span>Jenny & Olivia Active</span>
                </span>
                <span style={{ color: 'var(--color-white-50)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                  42 Concurrent Channels
                </span>
              </div>
            </div>

            {/* Split 3-Column Ops Layout */}
            <div className="ops-grid">
              {/* Left Nav Strip */}
              <div className="ops-sidebar">
                <button
                  type="button"
                  onClick={() => setActiveTab('telemetry')}
                  className={`ops-nav-item ${activeTab === 'telemetry' ? 'is-active' : ''}`}
                >
                  <BarChart3 size={16} />
                  <span>Call Throughput</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('inbound')}
                  className={`ops-nav-item ${activeTab === 'inbound' ? 'is-active' : ''}`}
                >
                  <Phone size={16} />
                  <span>Jenny Inbound Logs</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('outbound')}
                  className={`ops-nav-item ${activeTab === 'outbound' ? 'is-active' : ''}`}
                >
                  <Users size={16} />
                  <span>Olivia Outbound Leads</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('guardrails')}
                  className={`ops-nav-item ${activeTab === 'guardrails' ? 'is-active' : ''}`}
                >
                  <Shield size={16} />
                  <span>Guardrail Policy Logs</span>
                </button>

                <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--color-blue-400)', marginBottom: '0.25rem' }}>
                    CRM SYNC STATUS
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 600 }}>
                    Connected to HubSpot
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-white-50)' }}>
                    Last write: 12 seconds ago
                  </div>
                </div>
              </div>

              {/* Center Stage: Real-Time Charts & Metrics */}
              <div className="ops-center-stage">
                {/* 3 Metric Pills */}
                <div className="ops-stat-strip">
                  <div className="ops-stat-box">
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--color-white-50)', display: 'block', marginBottom: '0.35rem' }}>
                      CALLS TODAY
                    </span>
                    <strong style={{ fontSize: '1.45rem', color: '#fff', fontWeight: 800 }}>
                      {CONSOLE_STATS.callsToday}
                    </strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-success)', marginTop: '0.2rem' }}>
                      {CONSOLE_STATS.callsChange}
                    </div>
                  </div>

                  <div className="ops-stat-box">
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--color-white-50)', display: 'block', marginBottom: '0.35rem' }}>
                      BOOKED SLOTS
                    </span>
                    <strong style={{ fontSize: '1.45rem', color: '#fff', fontWeight: 800 }}>
                      {CONSOLE_STATS.appointmentsBooked}
                    </strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-blue-400)', marginTop: '0.2rem' }}>
                      {CONSOLE_STATS.appointmentsDetail}
                    </div>
                  </div>

                  <div className="ops-stat-box">
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--color-white-50)', display: 'block', marginBottom: '0.35rem' }}>
                      OPPORTUNITY
                    </span>
                    <strong style={{ fontSize: '1.45rem', color: '#fff', fontWeight: 800 }}>
                      {CONSOLE_STATS.revenueFollowedUp}
                    </strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-white-50)', marginTop: '0.2rem' }}>
                      {CONSOLE_STATS.revenueDetail}
                    </div>
                  </div>
                </div>

                {/* SVG Live Throughput Curve */}
                <div className="ops-chart-container">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff' }}>
                      Real-Time Concurrency Spectrum (Past 24 Hours)
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#60A5FA' }}>
                        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#3B82F6' }} /> Today's Calls
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-white-50)' }}>
                        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} /> Baseline
                      </span>
                    </div>
                  </div>

                  <div style={{ height: '210px', width: '100%', position: 'relative' }}>
                    <svg viewBox="0 0 700 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.45" />
                          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      <line x1="0" y1="50" x2="700" y2="50" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
                      <line x1="0" y1="100" x2="700" y2="100" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
                      <line x1="0" y1="150" x2="700" y2="150" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />

                      <path
                        d="M0,140 C100,135 150,110 230,105 C310,100 370,70 450,75 C530,80 600,120 700,110"
                        fill="none"
                        stroke="rgba(255,255,255,0.18)"
                        strokeWidth="2"
                        strokeDasharray="5"
                      />

                      <path
                        d="M0,150 C80,140 140,115 220,95 C300,75 360,40 440,50 C520,60 600,95 700,80 L700,200 L0,200 Z"
                        fill="url(#chartGradient)"
                      />

                      <path
                        d="M0,150 C80,140 140,115 220,95 C300,75 360,40 440,50 C520,60 600,95 700,80"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="3"
                      />

                      <circle cx="440" cy="50" r="5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right: Live Event Feed */}
              <div className="ops-feed-panel">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#fff' }}>
                    Live Event Stream
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-blue-400)', fontFamily: 'var(--font-mono)' }}>
                    REAL-TIME
                  </span>
                </div>

                {RECENT_ACTIVITY.map((item, idx) => (
                  <div key={idx} className="ops-feed-item">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <strong style={{ color: '#fff', fontSize: '0.85rem' }}>{item.client}</strong>
                      <span style={{ fontSize: '0.6875rem', color: 'var(--color-blue-400)', fontFamily: 'var(--font-mono)' }}>
                        {item.agent}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-white-50)', marginBottom: '0.35rem' }}>
                      {item.type} · {item.time}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: item.status.includes('Booked') || item.status.includes('Qualified') ? 'var(--color-success)' : 'var(--color-white-70)', fontWeight: 600 }}>
                      ✓ {item.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
