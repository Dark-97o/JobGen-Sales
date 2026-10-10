import React, { useState } from 'react';
import { PhoneIncoming, PhoneOutgoing, Check, ArrowRight, Zap, Calendar, Sparkles, MessageSquare, ArrowUpRight } from 'lucide-react';

export default function StrategicPillars({ onOpenDemo }) {
  const [inboundScenario, setInboundScenario] = useState('medical');
  const [outboundScenario, setOutboundScenario] = useState('realestate');

  const inboundScenarios = {
    medical: {
      title: "Clinic & Dental Intake",
      callerSays: "“Do you accept Delta Dental, and can I see Dr. Harrison on Tuesday?”",
      jennyResponse: "“Yes, we accept Delta Dental PPO! Dr. Harrison has 10:00 AM open Tuesday. Shall I secure that for you?”"
    },
    service: {
      title: "Emergency Home Contractor",
      callerSays: "“Our main water line just burst in the basement, need someone ASAP.”",
      jennyResponse: "“I’ve marked this as high priority. Collecting your address now and dispatching our on-call tech team.”"
    },
    legal: {
      title: "Law Firm Intake",
      callerSays: "“I was in an auto collision this morning and need legal representation.”",
      jennyResponse: "“I understand, I hope you’re safe. I’ll collect the accident details and book an immediate case assessment.”"
    }
  };

  const outboundScenarios = {
    realestate: {
      title: "Property Valuation Follow-Up",
      oliviaSays: "“Hi David! Following up on your home valuation request on 42 Elm St. Would you like our Q4 market comps?”",
      prospectSays: "“Sure, send them over. We might consider selling next spring.”"
    },
    education: {
      title: "Course Lead Reactivation",
      oliviaSays: "“Hi Sarah! You downloaded the AI Executive syllabus last month. We have 3 scholarship seats closing Friday.”",
      prospectSays: "“Oh great! Can I speak with an advisor about tuition financing?”"
    },
    b2b: {
      title: "SaaS Speed-to-Lead",
      oliviaSays: "“Hi Liam, noticed your team requested a JobGen enterprise demo 4 minutes ago. Are you free for a quick 5-min walk?”",
      prospectSays: "“Wow, that was fast. Yes, I have a few minutes right now!”"
    }
  };

  return (
    <section id="pillars" className="section-spacing">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 4rem' }}>
          <h2 className="section-title">
            Be there when they call. <br />
            <span className="gradient-text">Follow up when it matters most.</span>
          </h2>
          <p className="section-lead" style={{ margin: '0 auto' }}>
            Traditional organizations struggle between missed voicemail leads and high-cost call centers.
            JobGen powers both front-desk inbound reception and outbound pipeline generation in one unified system.
          </p>
        </div>

        <div className="pillars-grid">
          {/* Pillar 1: Inbound Reception (Jenny) */}
          <div className="hardware-bezel-outer">
            <div className="hardware-bezel-inner pillar-card">
              <div className="pillar-tag">
                <PhoneIncoming size={15} />
                <span>01 / INBOUND RECEPTION SENTINEL · JENNY</span>
              </div>

              <h3 className="pillar-title">
                Zero missed calls. 100% calendar booking.
              </h3>

              <p className="pillar-desc">
                Jenny answers on the first ring 24/7/365. She collects customer details, answers company FAQs, books appointments directly onto staff calendars, and triggers instant WhatsApp confirmations.
              </p>

              {/* Interactive Scenario Selector */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '1rem', marginBottom: '1.75rem' }}>
                <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--color-blue-400)', marginBottom: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Interactive Scenario Preview:
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
                  {Object.keys(inboundScenarios).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setInboundScenario(key)}
                      style={{
                        background: inboundScenario === key ? 'var(--color-blue-600)' : 'rgba(255,255,255,0.05)',
                        border: '1px solid ' + (inboundScenario === key ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'),
                        color: '#fff',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '0.3rem 0.65rem',
                        borderRadius: 'var(--radius-pill)',
                        cursor: 'pointer'
                      }}
                    >
                      {inboundScenarios[key].title}
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-white-70)', marginBottom: '0.4rem', fontStyle: 'italic' }}>
                  {inboundScenarios[inboundScenario].callerSays}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-blue-300)', fontWeight: 500 }}>
                  Jenny: {inboundScenarios[inboundScenario].jennyResponse}
                </div>
              </div>

              <ul className="pillar-checklist">
                <li>
                  <Check size={16} />
                  <span><strong>24/7 After-Hours & Overflow:</strong> Never send a customer to voicemail again.</span>
                </li>
                <li>
                  <Check size={16} />
                  <span><strong>Live Calendar Booking:</strong> Real-time slot reservation for Google, Outlook & Calendly.</span>
                </li>
                <li>
                  <Check size={16} />
                  <span><strong>Instant Document Intake:</strong> Auto-sends preparation checklists and intake forms via SMS.</span>
                </li>
                <li>
                  <Check size={16} />
                  <span><strong>Warm Human Transfer:</strong> Transmits live summary and caller details to human staff if requested.</span>
                </li>
              </ul>

              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-blue-400)', fontWeight: 600 }}>
                  Included in Inbound Suite
                </span>
                <button
                  type="button"
                  onClick={onOpenDemo}
                  className="btn-ghost"
                >
                  <span>Test Inbound Live</span>
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Pillar 2: Outbound Sales & Outreach (Olivia) */}
          <div className="hardware-bezel-outer">
            <div className="hardware-bezel-inner pillar-card">
              <div className="pillar-tag">
                <PhoneOutgoing size={15} />
                <span>02 / OUTBOUND PIPELINE SDR · OLIVIA</span>
              </div>

              <h3 className="pillar-title">
                Turn cold databases into qualified meetings.
              </h3>

              <p className="pillar-desc">
                Olivia proactively connects with your dormant leads, downloaded content prospects, and web form submissions within 60 seconds. She qualifies interest and books qualified discovery calls.
              </p>

              {/* Interactive Scenario Selector */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '1rem', marginBottom: '1.75rem' }}>
                <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--color-blue-400)', marginBottom: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Interactive Scenario Preview:
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
                  {Object.keys(outboundScenarios).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setOutboundScenario(key)}
                      style={{
                        background: outboundScenario === key ? 'var(--color-blue-600)' : 'rgba(255,255,255,0.05)',
                        border: '1px solid ' + (outboundScenario === key ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'),
                        color: '#fff',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '0.3rem 0.65rem',
                        borderRadius: 'var(--radius-pill)',
                        cursor: 'pointer'
                      }}
                    >
                      {outboundScenarios[key].title}
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-blue-300)', fontWeight: 500, marginBottom: '0.4rem' }}>
                  Olivia: {outboundScenarios[outboundScenario].oliviaSays}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-white-70)', fontStyle: 'italic' }}>
                  {outboundScenarios[outboundScenario].prospectSays}
                </div>
              </div>

              <ul className="pillar-checklist">
                <li>
                  <Check size={16} />
                  <span><strong>Speed-to-Lead Under 60 Seconds:</strong> Calls web leads the exact moment they hit your CRM.</span>
                </li>
                <li>
                  <Check size={16} />
                  <span><strong>Dormant Database Reactivation:</strong> Respectful, contextual calls to re-engage past contacts.</span>
                </li>
                <li>
                  <Check size={16} />
                  <span><strong>Strict Compliance & DNC Filtering:</strong> Automatic timezone checking and do-not-call honoring.</span>
                </li>
                <li>
                  <Check size={16} />
                  <span><strong>Calendar Synchronization:</strong> Passes booked appraisals and demos straight to sales rep diaries.</span>
                </li>
              </ul>

              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-blue-400)', fontWeight: 600 }}>
                  Included in Sales Suite
                </span>
                <button
                  type="button"
                  onClick={onOpenDemo}
                  className="btn-ghost"
                >
                  <span>Test Outbound Live</span>
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
