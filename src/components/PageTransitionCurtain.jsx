import React, { useState, useEffect, useRef } from 'react';

/**
 * PageTransitionCurtain
 * 
 * Orchestrates a three-column luxury curtain transition on page redirect:
 * 1. Three blue bars slide down from the top to fully cover the screen (staggered).
 *    - Left & Right: Deep Midnight Royal Cobalt with subtle glass shimmer.
 *    - Center: Radiant Electric Cobalt with glowing backlight halo & elevated drop shadow.
 * 2. In the middle bar, the JobGen white logo (no text) spins once 360 degrees.
 * 3. Page changes behind the curtain, and scroll position resets.
 * 4. The three bars slide back up (staggered), cleanly revealing the new page.
 */
export default function PageTransitionCurtain({
  isActive,
  onCovered,
  onComplete,
}) {
  const [phase, setPhase] = useState('idle'); // 'idle' | 'entering' | 'spinning' | 'exiting'

  // Preserve callback references across renders so parent state updates never cancel the transition timers
  const onCoveredRef = useRef(onCovered);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCoveredRef.current = onCovered;
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    if (!isActive) {
      setPhase('idle');
      return;
    }

    // Phase 1: Bars enter from top (staggered drop)
    setPhase('entering');

    // Phase 2: Once bars cover the screen (~480ms), logo spins 360deg
    const spinTimer = setTimeout(() => {
      setPhase('spinning');
    }, 480);

    // Phase 3: Spin completes (~980ms) -> change page underneath & bars exit upwards
    const exitTimer = setTimeout(() => {
      if (onCoveredRef.current) onCoveredRef.current();
      setPhase('exiting');
    }, 980);

    // Phase 4: Bars have exited above the screen (~1460ms) -> complete transition
    const doneTimer = setTimeout(() => {
      setPhase('idle');
      if (onCompleteRef.current) onCompleteRef.current();
    }, 1460);

    return () => {
      clearTimeout(spinTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [isActive]);

  // Immediately remove from DOM when idle or not active to never block user interaction
  if (!isActive || phase === 'idle') return null;

  return (
    <div
      className={`page-transition-curtain-root phase-${phase}`}
      aria-hidden="true"
    >
      {/* Left Bar: Deep Midnight Cobalt */}
      <div className="curtain-bar curtain-bar-left">
        <div className="curtain-bar-ambient-glow" />
      </div>
      
      {/* Center Bar: Radiant Electric Cobalt + Elevated Shadow + Halo + White Logo */}
      <div className="curtain-bar curtain-bar-center">
        <div className="curtain-logo-container">
          <div className={`curtain-logo-halo ${phase === 'spinning' ? 'is-active' : ''}`} />
          <img
            src="/assets/jobgen-white.webp"
            alt="JobGen"
            className={`curtain-logo-img ${phase === 'spinning' ? 'is-spinning' : ''} ${phase === 'exiting' ? 'is-exited' : ''}`}
          />
        </div>
      </div>

      {/* Right Bar: Deep Midnight Cobalt */}
      <div className="curtain-bar curtain-bar-right">
        <div className="curtain-bar-ambient-glow" />
      </div>
    </div>
  );
}
