import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQS } from '../data/landingData';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="section-spacing">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem' }}>
          <h2 className="section-title">
            Everything you need to know <br />
            <span className="gradient-text">about deploying your AI workforce.</span>
          </h2>
          <p className="section-lead" style={{ margin: '0 auto' }}>
            Clear answers on voice reliability, telephony forwarding, calendar integration, guardrails, and rapid team deployment.
          </p>
        </div>

        <div className="faq-list">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="faq-item"
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    style={{
                      color: isOpen ? 'var(--color-blue-400)' : 'var(--color-white-50)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform var(--duration-snappy) var(--ease-snappy)',
                      flexShrink: 0,
                      marginLeft: '1rem'
                    }}
                  />
                </button>

                {isOpen && (
                  <div className="faq-answer-block">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
