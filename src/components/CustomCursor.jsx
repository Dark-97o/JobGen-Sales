import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const arrowRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Disable on touch / mobile devices
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const arrow = arrowRef.current;
    const container = containerRef.current;
    if (!arrow || !container) return;

    document.body.classList.add('has-custom-cursor');

    let mouseX = -100;
    let mouseY = -100;
    let isVisible = false;
    let animId = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        container.classList.add('is-visible');
        container.classList.remove('is-hidden');
      }

      // Check hovered element for interactive feedback
      const target = e.target;
      if (target && target.closest) {
        const interactive = target.closest(
          'a, button, [role="button"], input[type="range"], input[type="checkbox"], input[type="radio"], select, .clickable, .compact-clay-pill, .compact-clay-chip, .segmented-switch-btn, .nav-btn, .pill-btn, .action-btn, label, [data-cursor="pointer"]'
        );
        const textInput = target.closest(
          'input[type="text"], input[type="number"], input[type="email"], input[type="password"], textarea, [contenteditable="true"]'
        );

        if (textInput) {
          container.classList.add('is-text');
          container.classList.remove('is-hovering');
        } else if (interactive) {
          container.classList.add('is-hovering');
          container.classList.remove('is-text');
        } else {
          container.classList.remove('is-hovering');
          container.classList.remove('is-text');
        }
      }
    };

    const onMouseDown = () => {
      container.classList.add('is-clicking');
    };

    const onMouseUp = () => {
      container.classList.remove('is-clicking');
    };

    const onMouseLeave = () => {
      isVisible = false;
      container.classList.remove('is-visible');
      container.classList.add('is-hidden');
    };

    const onMouseEnter = () => {
      isVisible = true;
      container.classList.add('is-visible');
      container.classList.remove('is-hidden');
    };

    // Instant zero-lag 120fps direct tracking
    const render = () => {
      arrow.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    animId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div ref={containerRef} className="custom-cursor-container is-hidden" aria-hidden="true">
      {/* Modern Black Arrow with White Outline */}
      <div ref={arrowRef} className="custom-arrow-pointer">
        {/* Normal Arrow Pointer */}
        <div className="arrow-svg-wrapper">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="modern-arrow-svg"
          >
            <defs>
              <filter id="arrowShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="rgba(0, 0, 0, 0.45)" />
                <feDropShadow dx="0" dy="0.5" stdDeviation="0.75" floodColor="rgba(0, 0, 0, 0.35)" />
              </filter>
            </defs>

            <path
              d="M 1 1 L 1 18 L 5.6 14 L 9.4 22 L 12.4 20.6 L 8.6 12.6 L 14.8 12.6 L 1 1 Z"
              fill="#000000"
              stroke="#FFFFFF"
              strokeWidth="1.75"
              strokeLinejoin="round"
              strokeLinecap="round"
              filter="url(#arrowShadow)"
            />
          </svg>
        </div>

        {/* Text Input Caret Mode */}
        <div className="arrow-text-caret-wrapper">
          <svg
            width="14"
            height="22"
            viewBox="0 0 14 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="modern-text-caret-svg"
          >
            <path
              d="M 3 2 H 11 M 7 2 V 20 M 3 20 H 11"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 3 2 H 11 M 7 2 V 20 M 3 20 H 11"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
