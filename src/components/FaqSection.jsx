import React, { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import { FAQS } from '../data/landingData';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  const visibleFaqs = showAll ? FAQS : FAQS.slice(0, 4);

  return (
    <section id="faq" className="section-spacing faq-section-container">
      <div className="container">
        <div className="faq-header-center">
          <h2 className="section-title text-center faq-main-title">
            Everything you need to know
          </h2>
        </div>

        <div className="faq-list">
          {visibleFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`faq-item ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">{faq.q}</span>
                  <div className={`faq-plus-badge ${isOpen ? 'is-open' : ''}`} aria-hidden="true">
                    <Plus
                      size={20}
                      strokeWidth={2.2}
                      className="faq-plus-icon"
                      style={{
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />
                  </div>
                </button>

                <div className={`faq-expand-wrapper ${isOpen ? 'is-open' : ''}`}>
                  <div className="faq-expand-inner">
                    <div className="faq-answer-block">
                      <p className="faq-answer-text">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show More / Show Less Toggle Button */}
        {FAQS.length > 4 && (
          <div className="faq-show-more-wrapper">
            <button
              type="button"
              className="faq-show-more-btn"
              onClick={() => setShowAll(!showAll)}
            >
              <span>{showAll ? 'Show Less' : `Show More (${FAQS.length - 4} More)`}</span>
              <ChevronDown
                size={16}
                style={{
                  transform: showAll ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
