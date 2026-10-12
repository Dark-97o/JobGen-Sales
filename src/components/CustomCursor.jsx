import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const pointerRef = useRef(null);
  const haloRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Disable on touch / mobile devices
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const pointer = pointerRef.current;
    const halo = haloRef.current;
    const container = containerRef.current;
    if (!pointer || !halo || !container) return;

    document.body.classList.add('has-custom-cursor');

    let mouseX = -100;
    let mouseY = -100;
    let haloX = -100;
    let haloY = -100;
    let isVisible = false;
    let animId = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        haloX = mouseX;
        haloY = mouseY;
        container.classList.add('is-visible');
        container.classList.remove('is-hidden');
      }

      // Check hovered element
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

    // 120fps render loop with lerp trailing halo
    const render = () => {
      // Lerp for trailing halo
      const ease = 0.16;
      haloX += (mouseX - haloX) * ease;
      haloY += (mouseY - haloY) * ease;

      // Update positions with pixel-perfect tip alignment
      pointer.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      halo.style.transform = `translate3d(${haloX}px, ${haloY}px, 0)`;

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
      {/* Fluid Trailing Halo */}
      <div ref={haloRef} className="custom-pointer-halo" />

      {/* Modern Pointer Container */}
      <div ref={pointerRef} className="custom-pointer-body">
        {/* Modern Arrow Mouse Pointer */}
        <div className="modern-arrow-wrapper">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="modern-pointer-svg"
          >
            <defs>
              <linearGradient id="jobgenPointerGrad" x1="0" y1="0" x2="16" y2="22" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0052FF" />
                <stop offset="45%" stopColor="#0047E0" />
                <stop offset="100%" stopColor="#071A52" />
              </linearGradient>
              <filter id="pointerShadow" x="-20%" y="-20%" width="160%" height="160%">
                <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="rgba(0, 82, 255, 0.45)" />
                <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="rgba(7, 26, 82, 0.3)" />
              </filter>
            </defs>

            {/* Aerodynamic pointer path */}
            <path
              d="M 1 1 L 1 18 L 5.6 14 L 9.4 22 L 12.4 20.6 L 8.6 12.6 L 14.8 12.6 L 1 1 Z"
              fill="url(#jobgenPointerGrad)"
              stroke="#FFFFFF"
              strokeWidth="1.75"
              strokeLinejoin="round"
              strokeLinecap="round"
              filter="url(#pointerShadow)"
            />

            {/* Specular glass highlight reflection */}
            <path
              d="M 2.2 3.2 L 2.2 14.5 L 5.2 12 L 2.2 3.2 Z"
              fill="rgba(255, 255, 255, 0.3)"
            />

            {/* Precision tip accent */}
            <circle cx="1.5" cy="1.5" r="1.25" fill="#FFFFFF" />
          </svg>
        </div>

        {/* Text Input Caret Mode */}
        <div className="modern-text-caret-wrapper">
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="modern-text-caret-svg"
          >
            <path
              d="M 4 2 H 12 M 8 2 V 22 M 4 22 H 12"
              stroke="#0052FF"
              strokeWidth="2.25"
              strokeLinecap="round"
            />
            <path
              d="M 4 2 H 12 M 8 2 V 22 M 4 22 H 12"
              stroke="#FFFFFF"
              strokeWidth="0.75"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
