import React, { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';

export default function TestimonialSection() {
  const sectionRef = useRef(null);
  const iframeRef = useRef(null);

  const sendIframeCommand = (command, args = []) => {
    try {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: command, args }),
          '*'
        );
      }
    } catch (e) {
      // Safe cross-origin catch
    }
  };

  // Video & Audio play ONLY when this section is on screen; pause & mute when off screen
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleVisibility = (inView) => {
      if (inView) {
        sendIframeCommand('unMute');
        sendIframeCommand('playVideo');
      } else {
        sendIframeCommand('pauseVideo');
        sendIframeCommand('mute');
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        handleVisibility(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    // Active scroll listener for instant audio/video synchrony
    const onScroll = () => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15;
      handleVisibility(inView);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      sendIframeCommand('pauseVideo');
      sendIframeCommand('mute');
    };
  }, []);

  return (
    <section id="testimonial" ref={sectionRef} className="testimonial-dark-slide-section">
      {/* Background Slashed Angle Design with Video on the Right Slashed Area */}
      <div className="testimonial-slashed-bg-system" aria-hidden="true">
        {/* Deep Obsidian Left Canvas for 100% Crisp Text Contrast */}
        <div className="testimonial-left-bg-canvas" />

        {/* Right Slashed Background Video Area */}
        <div className="testimonial-video-slashed-pane">
          <div className="testimonial-video-scaler">
            <iframe
              ref={iframeRef}
              src="https://www.youtube.com/embed/CA_NEg3xJz0?autoplay=1&mute=0&loop=1&playlist=CA_NEg3xJz0&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&enablejsapi=1"
              title="Accounting Firm Case Study Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              className="testimonial-bg-iframe"
            />
          </div>
          {/* Directional vignette along the diagonal angle */}
          <div className="testimonial-video-angled-vignette" />
        </div>
      </div>

      {/* Foreground Content: Review, Name & Metrics on the LEFT side (Ultra-High Contrast) */}
      <div className="container testimonial-container relative z-10">
        <div className="testimonial-clean-layout">
          {/* Left Column: Direct High-Contrast Typography on Background */}
          <div className="testimonial-left-text-flow">
            {/* 5 Stars with Rating Score */}
            <div className="testimonial-stars-row" aria-label="5 out of 5 stars">
              <div className="testimonial-stars-list">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={22} fill="#F59E0B" color="#F59E0B" className="testimonial-star-icon" />
                ))}
              </div>
              <span className="testimonial-rating-score">5.0 / 5.0</span>
            </div>

            {/* The Review Quote — Ultra Crisp White on Dark */}
            <blockquote className="testimonial-review-quote">
              “Jenny answers every single inbound call on the first ring, books straight into our staff diary, and auto-dispatches the tax intake checklists we used to lose. It’s like adding an <span className="testimonial-blue-keyword">experienced receptionist</span> to our firm — with zero human downtime.”
            </blockquote>

            {/* Author Name & Role */}
            <div className="testimonial-author-card">
              <div className="testimonial-avatar" aria-hidden="true">
                MG
              </div>
              <div className="testimonial-author-meta">
                <strong className="testimonial-author-name">Mandar Gokhale</strong>
                <span className="testimonial-author-role">Managing Director · M&S Business Solutions</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="testimonial-metrics-strip">
              <div className="testimonial-metric-box">
                <div className="testimonial-metric-num">$65,000+</div>
                <div className="testimonial-metric-lbl">Annual Overhead Saved</div>
              </div>
              <div className="testimonial-metric-box">
                <div className="testimonial-metric-num">100%</div>
                <div className="testimonial-metric-lbl">After-Hours Captured</div>
              </div>
            </div>
          </div>

          {/* Right Column: Open Slashed Window for Video */}
          <div className="testimonial-right-video-window" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
