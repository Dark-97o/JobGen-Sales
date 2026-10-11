import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter Pilot',
    badge: 'Solo & Boutique Teams',
    description: 'Ideal for solo practices, local clinics, and boutique brokerages testing AI phone intake.',
    price: '$99',
    period: '/ month',
    featured: false,
    ctaText: 'Start 14-Day Free Trial',
    features: [
      'Up to 250 handled minutes',
      'Jenny 24/7 Inbound Reception',
      'Google & Outlook Calendar sync',
      'WhatsApp & SMS intake dispatch',
      'Standard email & chat support'
    ]
  },
  {
    id: 'growth',
    name: 'Growth Dual Engine',
    badge: 'MOST POPULAR',
    description: 'Full dual AI workforce: 24/7 Jenny reception plus proactive sales outreach and CRM sync.',
    price: '$299',
    period: '/ month',
    featured: true,
    ctaText: 'Deploy Growth Plan',
    features: [
      'Up to 1,000 handled minutes',
      'Both Jenny (Inbound) + Outbound outreach',
      'HubSpot, Salesforce & CRM writeback',
      'Live Warm Staff Transfer',
      'Custom Knowledge Base Ingestion',
      'Priority Solutions Engineer Setup'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise Scale',
    badge: 'Multi-Location & High Volume',
    description: 'For multi-location groups, high-volume call centers, and custom telephony architectures.',
    price: '$699',
    period: '/ month',
    featured: false,
    ctaText: 'Contact Enterprise',
    features: [
      '3,000+ handled minutes pool',
      'Unlimited concurrent lines',
      'Custom Fine-Tuned Voice Clones',
      'Dedicated Account Manager & SLA',
      'HIPAA BAA & SOC-2 Compliance Docs',
      'Custom Webhook & API Infrastructure'
    ]
  }
];

export default function PricingCalculator({ onOpenDemo }) {
  return (
    <section id="pricing" className="section-spacing pricing-clean-section">
      <div className="container pricing-clean-container">
        {/* Section Header - Aligned with other sections */}
        <div className="pricing-header-center">
          <h2 className="section-title text-center">
            <span className="pricing-headline-main">Transparent, predictable pricing</span> <br />
            <span className="text-full-blue pricing-headline-sub">built for immediate ROI.</span>
          </h2>
          <p className="section-lead text-center">
            No user-seat tax, no hidden telephony fees, and zero lock-in contracts. Upgrade, downgrade, or pause anytime with guaranteed uptime.
          </p>
        </div>

        {/* 3 Clean Tier Cards Grid */}
        <div className="pricing-clean-grid">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`pricing-clean-card ${plan.featured ? 'is-featured' : ''}`}
            >
              {/* Card Header & Badge */}
              <div className="pricing-card-header">
                <span className={`pricing-card-badge ${plan.featured ? 'is-featured' : ''}`}>
                  {plan.badge}
                </span>
                <h3 className="pricing-card-name">{plan.name}</h3>
                <p className="pricing-card-desc">{plan.description}</p>
              </div>

              {/* Price Row */}
              <div className="pricing-card-price-row">
                <span className="pricing-card-price">{plan.price}</span>
                <span className="pricing-card-period">{plan.period}</span>
              </div>

              {/* Features List */}
              <ul className="pricing-card-features">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="pricing-card-feature-item">
                    <div className="pricing-feature-check" aria-hidden="true">
                      <Check size={14} className="pricing-check-icon" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <div className="pricing-card-cta-wrapper">
                <button
                  type="button"
                  onClick={onOpenDemo}
                  className={`pricing-plan-btn ${plan.featured ? 'is-featured' : ''}`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
