import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Disable on touch / mobile devices
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    const container = containerRef.current;
    if (!cursor || !container) return;

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

      // Detect interactive elements to switch between arrow and hand pointer
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
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
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
      <div ref={cursorRef} className="custom-cursor-root">
        {/* 1. Delta Arrow Pointer (Matching Reference Image) */}
        <div className="cursor-arrow-view">
          <svg
            width="26"
            height="28"
            viewBox="0 0 24 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ref-arrow-svg"
          >
            <defs>
              <filter id="refArrowShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0.5" dy="1.5" stdDeviation="1.5" floodColor="rgba(0, 0, 0, 0.45)" />
              </filter>
            </defs>

            <g filter="url(#refArrowShadow)">
              {/* Outer black stroke */}
              <path
                d="M 2.5 2.5 L 2.5 22.5 L 8.5 17 L 18.5 18.5 Z"
                fill="#000000"
                stroke="#000000"
                strokeWidth="4"
                strokeLinejoin="miter"
                strokeLinecap="round"
              />
              {/* Middle crisp white stroke */}
              <path
                d="M 2.5 2.5 L 2.5 22.5 L 8.5 17 L 18.5 18.5 Z"
                fill="#000000"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinejoin="miter"
                strokeLinecap="round"
              />
              {/* Inner solid black fill */}
              <path
                d="M 2.5 2.5 L 2.5 22.5 L 8.5 17 L 18.5 18.5 Z"
                fill="#000000"
              />
            </g>
          </svg>
        </div>

        {/* 2. Similar Hand Pointer (For Links, Buttons, Clickables) */}
        <div className="cursor-hand-view">
          <svg
            width="26"
            height="28"
            viewBox="0 0 24 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ref-hand-svg"
          >
            <defs>
              <filter id="refHandShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0.5" dy="1.5" stdDeviation="1.5" floodColor="rgba(0, 0, 0, 0.45)" />
              </filter>
            </defs>

            <g filter="url(#refHandShadow)">
              {/* Outer black stroke */}
              <path
                d="M 5 1.5 C 4.2 1.5, 3.5 2.2, 3.5 3 L 3.5 11 C 2.5 11.5, 1 12.8, 1 14.5 C 1 16, 2.2 17.2, 3.8 17.2 L 4.5 17.2 L 4.5 21 C 4.5 22.8, 5.8 24, 7.5 24 L 13.5 24 C 15.5 24, 17 22.5, 17 20.5 L 17 14 C 17 12.8, 16.1 12, 15 12 C 14.7 12, 14.4 12.1, 14.2 12.2 C 13.9 11.1, 13 10.3, 12 10.3 C 11.8 10.3, 11.5 10.3, 11.3 10.4 C 11 9.4, 10.2 8.7, 9.2 8.7 C 8.9 8.7, 8.7 8.7, 8.5 8.8 L 8.5 3 C 8.5 2.2, 7.8 1.5, 7 1.5 Z"
                fill="#000000"
                stroke="#000000"
                strokeWidth="4"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {/* Middle crisp white stroke */}
              <path
                d="M 5 1.5 C 4.2 1.5, 3.5 2.2, 3.5 3 L 3.5 11 C 2.5 11.5, 1 12.8, 1 14.5 C 1 16, 2.2 17.2, 3.8 17.2 L 4.5 17.2 L 4.5 21 C 4.5 22.8, 5.8 24, 7.5 24 L 13.5 24 C 15.5 24, 17 22.5, 17 20.5 L 17 14 C 17 12.8, 16.1 12, 15 12 C 14.7 12, 14.4 12.1, 14.2 12.2 C 13.9 11.1, 13 10.3, 12 10.3 C 11.8 10.3, 11.5 10.3, 11.3 10.4 C 11 9.4, 10.2 8.7, 9.2 8.7 C 8.9 8.7, 8.7 8.7, 8.5 8.8 L 8.5 3 C 8.5 2.2, 7.8 1.5, 7 1.5 Z"
                fill="#000000"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {/* Inner solid black fill */}
              <path
                d="M 5 1.5 C 4.2 1.5, 3.5 2.2, 3.5 3 L 3.5 11 C 2.5 11.5, 1 12.8, 1 14.5 C 1 16, 2.2 17.2, 3.8 17.2 L 4.5 17.2 L 4.5 21 C 4.5 22.8, 5.8 24, 7.5 24 L 13.5 24 C 15.5 24, 17 22.5, 17 20.5 L 17 14 C 17 12.8, 16.1 12, 15 12 C 14.7 12, 14.4 12.1, 14.2 12.2 C 13.9 11.1, 13 10.3, 12 10.3 C 11.8 10.3, 11.5 10.3, 11.3 10.4 C 11 9.4, 10.2 8.7, 9.2 8.7 C 8.9 8.7, 8.7 8.7, 8.5 8.8 L 8.5 3 C 8.5 2.2, 7.8 1.5, 7 1.5 Z"
                fill="#000000"
              />
            </g>
          </svg>
        </div>

        {/* 3. Text Input Caret Mode */}
        <div className="cursor-text-view">
          <svg
            width="14"
            height="22"
            viewBox="0 0 14 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ref-text-svg"
          >
            <path
              d="M 3 2 H 11 M 7 2 V 20 M 3 20 H 11"
              stroke="#000000"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M 3 2 H 11 M 7 2 V 20 M 3 20 H 11"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 3 2 H 11 M 7 2 V 20 M 3 20 H 11"
              stroke="#000000"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
