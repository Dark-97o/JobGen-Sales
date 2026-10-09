import React from 'react';
import { Star, Play, Quote, CheckCircle2 } from 'lucide-react';

export default function TestimonialSection() {
  return (
    <section className="section-spacing">
      <div className="container">
        <div className="hardware-bezel-outer">
          <div className="hardware-bezel-inner" style={{ padding: '4rem 3rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '3.5rem', alignItems: 'center' }}>
              {/* Left Column: Quote & Author */}
              <div>
                <div style={{ display: 'flex', gap: '5px', marginBottom: '1.5rem', color: '#F59E0B' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={18} fill="#F59E0B" />
                  ))}
                </div>

                <blockquote style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 2vw, 1.65rem)', fontWeight: 600, color: '#fff', lineHeight: 1.45, marginBottom: '2rem' }}>
                  “Jenny answers every single inbound call on the first ring, books straight into our staff diary, and auto-dispatches the tax intake checklists we used to lose. It’s like adding an <span className="gradient-blue-text" style={{ fontWeight: 800 }}>experienced receptionist</span> to our firm — with zero human downtime.”
                </blockquote>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{ width: '3.25rem', height: '3.25rem', borderRadius: 'var(--radius-pill)', background: 'linear-gradient(135deg, var(--color-blue-500), var(--color-blue-700))', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem', boxShadow: '0 0 20px rgba(37,99,235,0.4)' }}>
                    MG
                  </div>
                  <div>
                    <strong style={{ fontSize: '1.1rem', color: '#fff', display: 'block', fontWeight: 700 }}>
                      Mandar Gokhale
                    </strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-white-50)' }}>
                      Managing Director · M&S Business Solutions
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-success)' }}>$65,000+</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-white-50)' }}>Annual Overhead Saved</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#93C5FD' }}>100%</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-white-50)' }}>After-Hours Calls Captured</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Video Case Study Embed */}
              <div style={{ position: 'relative', borderRadius: '18px', overflow: 'hidden', aspectRatio: '16/9', boxShadow: '0 25px 60px rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <iframe
                  src="https://www.youtube.com/embed/CA_NEg3xJz0?rel=0&playsinline=1"
                  title="How This Accounting Firm Saves $65K+ a Year — customer testimonial"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
