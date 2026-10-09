import React from 'react';
import { INTEGRATIONS } from '../data/landingData';

export default function IntegrationMarquee() {
  const repeated = [...INTEGRATIONS, ...INTEGRATIONS];

  return (
    <section className="marquee-section">
      <div className="container">
        <div className="marquee-title">
          BI-DIRECTIONAL SYNC ACROSS YOUR CRM, TELEPHONY & CALENDAR INFRASTRUCTURE
        </div>
      </div>
      <div className="marquee-track-wrapper" tabIndex={0} aria-label="JobGen supported integrations">
        <div className="marquee-row">
          {repeated.map((item, idx) => (
            <div key={`${item.name}-${idx}`} className="marquee-badge">
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: item.color,
                  display: 'inline-block',
                  boxShadow: `0 0 10px ${item.color}`
                }}
              />
              <span>{item.name}</span>
              <span style={{ fontSize: '0.6875rem', color: 'var(--color-white-50)', marginLeft: '0.2rem' }}>
                · {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
