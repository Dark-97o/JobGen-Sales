import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, Calculator, ShieldCheck, Zap, HelpCircle } from 'lucide-react';

export default function PricingPage({ onOpenDemo, onOpenBooking, onOpenCalculator }) {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annually'
  const isAnnual = billingCycle === 'annually';

  const plans = [
    {
      id: 'starter',
      name: 'Starter Reception',
      badge: 'Boutique & Solo Practices',
      description: 'Ideal for local clinics, solo practices, and service trades testing 24/7 automated intake.',
      price: isAnnual ? '$79' : '$99',
      period: '/ month',
      subtext: isAnnual ? 'Billed annually ($948/yr)' : 'Billed monthly',
      featured: false,
      ctaText: 'Start 14-Day Free Pilot',
      features: [
        'Up to 250 handled voice minutes / mo',
        'Jenny 24/7 Inbound Receptionist',
        'Google & Outlook Calendar sync',
        'Instant WhatsApp & SMS dispatch',
        'Voicemail-to-text verbatim transcripts',
        'Standard email & live chat support',
      ],
    },
    {
      id: 'growth',
      name: 'Growth Dual Engine',
      badge: 'MOST POPULAR',
      description: 'Full dual AI workforce: 24/7 Jenny reception plus proactive sales outreach and CRM sync.',
      price: isAnnual ? '$239' : '$299',
      period: '/ month',
      subtext: isAnnual ? 'Billed annually ($2,868/yr)' : 'Billed monthly',
      featured: true,
      ctaText: 'Deploy Growth Engine',
      features: [
        'Up to 1,000 handled voice minutes / mo',
        'Both Jenny (Inbound) + Olivia (Outbound)',
        'Sub-5 minute lead reactivation outreach',
        'HubSpot, Salesforce & custom CRM sync',
        'Live warm staff call transfer',
        'Custom knowledge base ingestion',
        'Priority solution architect onboarding',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise Scale',
      badge: 'Multi-Location & High Volume',
      description: 'For franchise groups, multi-location practices, and high-volume custom telephony fleets.',
      price: isAnnual ? '$559' : '$699',
      period: '/ month',
      subtext: isAnnual ? 'Billed annually ($6,708/yr)' : 'Billed monthly',
      featured: false,
      ctaText: 'Contact Enterprise Team',
      features: [
        '3,000+ pooled voice minutes / mo',
        'Unlimited concurrent inbound lines',
        'Bespoke studio voice clones & accents',
        'Dedicated account manager & 99.9% SLA',
        'HIPAA BAA & SOC-2 compliance docs',
        'Custom Webhooks & REST API access',
        'Quarterly AI prompt calibration reviews',
      ],
    },
  ];

  const comparisonRows = [
    { title: 'Handled Voice Minutes', starter: '250 mins', growth: '1,000 mins', enterprise: '3,000+ mins (pooled)' },
    { title: 'Concurrent Call Lines', starter: '3 lines', growth: '10 lines', enterprise: 'Unlimited lines' },
    { title: 'Jenny 24/7 Receptionist', starter: 'Included', growth: 'Included', enterprise: 'Included' },
    { title: 'Olivia Proactive Sales Agent', starter: '—', growth: 'Included', enterprise: 'Included' },
    { title: 'Voice Response Latency', starter: '< 650ms', growth: '< 550ms', enterprise: '< 400ms (Dedicated Trunks)' },
    { title: 'Calendar Sync (Google / Outlook)', starter: 'Included', growth: 'Included', enterprise: 'Included' },
    { title: 'CRM 2-Way Sync (HubSpot, Salesforce)', starter: 'Add-on', growth: 'Included', enterprise: 'Included (Custom Data)' },
    { title: 'Warm Staff Call Transfer', starter: 'Basic', growth: 'Smart Priority Routing', enterprise: 'Multi-Department Matrix' },
    { title: 'Custom Voice Clone', starter: '—', growth: '—', enterprise: 'Studio Custom Clone' },
    { title: 'Compliance & Audit Logs', starter: 'Standard', growth: 'Advanced Logs', enterprise: 'HIPAA BAA & SOC-2 Ready' },
  ];

  return (
    <div className="pricing-page-root">
      {/* Header */}
      <section className="pricing-hero-section">
        <div className="container pricing-container">
          <div className="pricing-hero-badge">
            <span className="pricing-badge-dot" />
            <span>Transparent Autonomous Telephony Plans</span>
          </div>

          <h1 className="pricing-hero-title">
            Predictable Pricing for Autonomous Voice Operations
          </h1>

          <p className="pricing-hero-subtitle">
            Deploy intelligent voice agents that answer immediately, qualify customers, and book calendar appointments—at a fraction of traditional staffing overhead.
          </p>

          {/* Billing Switcher */}
          <div className="pricing-toggle-wrap">
            <button
              type="button"
              className={`pricing-toggle-btn ${billingCycle === 'monthly' ? 'is-active' : ''}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              className={`pricing-toggle-btn ${billingCycle === 'annually' ? 'is-active' : ''}`}
              onClick={() => setBillingCycle('annually')}
            >
              Annual Billing
              <span className="pricing-discount-pill">Save 20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="pricing-cards-section">
        <div className="container pricing-container">
          <div className="pricing-cards-grid">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`pricing-card-item ${plan.featured ? 'is-featured' : ''}`}
              >
                {plan.featured && (
                  <div className="pricing-popular-ribbon">
                    <Sparkles size={13} style={{ marginRight: '4px' }} />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div className="pricing-card-header">
                  {!plan.featured && (
                    <span className="pricing-plan-badge">{plan.badge}</span>
                  )}
                  <h3 className="pricing-plan-name">{plan.name}</h3>
                  <p className="pricing-plan-desc">{plan.description}</p>
                </div>

                <div className="pricing-price-block">
                  <div className="pricing-price-row">
                    <span className="pricing-price-val">{plan.price}</span>
                    <span className="pricing-price-period">{plan.period}</span>
                  </div>
                  <span className="pricing-price-sub">{plan.subtext}</span>
                </div>

                <button
                  type="button"
                  onClick={onOpenBooking || onOpenDemo}
                  className={`pricing-plan-btn ${plan.featured ? 'btn-featured' : 'btn-normal'}`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight size={15} />
                </button>

                <div className="pricing-features-list">
                  <span className="pricing-features-title">Everything included:</span>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="pricing-feat-line">
                      <Check size={16} className="pricing-check-icon" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Calculator Callout */}
          <div className="pricing-calc-callout">
            <div className="pricing-calc-inner">
              <div className="pricing-calc-left">
                <div className="pricing-calc-icon">
                  <Calculator size={26} color="#0052FF" />
                </div>
                <div>
                  <h4>Curious how much missed calls cost your business?</h4>
                  <p>Calculate your annual revenue leak from unanswered calls and staff wait time in 30 seconds.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenCalculator}
                className="pricing-calc-action-btn"
              >
                <span>Calculate Waiting Cost</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Matrix */}
      <section className="pricing-matrix-section">
        <div className="container pricing-container">
          <div className="pricing-section-center">
            <span className="pricing-badge-text">Detailed Matrix</span>
            <h2 className="pricing-matrix-title">Compare Capabilities by Plan</h2>
          </div>

          <div className="pricing-table-wrap">
            <table className="pricing-matrix-table">
              <thead>
                <tr>
                  <th style={{ width: '40%' }}>Core Capabilities</th>
                  <th style={{ width: '20%' }}>Starter</th>
                  <th style={{ width: '20%' }} className="highlight-col">Growth</th>
                  <th style={{ width: '20%' }}>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="row-title">{row.title}</td>
                    <td>{row.starter}</td>
                    <td className="highlight-col"><strong>{row.growth}</strong></td>
                    <td>{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Summary for Pricing */}
      <section className="pricing-faq-section">
        <div className="container pricing-container">
          <div className="pricing-section-center">
            <span className="pricing-badge-text">Frequently Asked Questions</span>
            <h2 className="pricing-faq-title">Billing & Onboarding Details</h2>
          </div>

          <div className="pricing-faq-grid">
            <div className="pricing-faq-card">
              <h4>What happens if we exceed our included monthly minutes?</h4>
              <p>Additional minutes are billed at a flat rate of $0.18/minute. You can also upgrade your plan tier anytime with zero interruption to your live phone numbers.</p>
            </div>

            <div className="pricing-faq-card">
              <h4>Do we need to change our existing business phone number?</h4>
              <p>No. You can easily forward unanswered calls, busy calls, or after-hours calls from your existing carrier (Telstra, Optus, AT&T, Verizon, RingCentral) directly to JobGen in under 3 minutes.</p>
            </div>

            <div className="pricing-faq-card">
              <h4>How long does setup and knowledge training take?</h4>
              <p>Most boutique practices go live within 24 to 48 hours. Our solutions engineers upload your website FAQ, appointment guidelines, and calendar integration during your onboarding walkthrough.</p>
            </div>

            <div className="pricing-faq-card">
              <h4>Is there a long-term lock-in contract?</h4>
              <p>No. Monthly plans can be cancelled or paused at any time without cancellation penalties. Annual plans come with a 20% discount and a 30-day money-back satisfaction guarantee.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
