import React, { useState, useEffect, useRef } from 'react';

/**
 * PageTransitionCurtain
 * 
 * Replaces previous page curtain with the requested Uiverse loading screen:
 * - Four-circle spinning loader (Uiverse by AbanoubMagdy1)
 * - Smooth fade-in overlay during page change
 * - onCovered called when opaque so route swaps and scroll resets
 * - Smooth fade-out once new page is ready
 * - Only used for page navigation redirects, leaves initial landing load untouched
 */
export default function PageTransitionCurtain({
  isActive,
  onCovered,
  onComplete,
}) {
  const [phase, setPhase] = useState('idle'); // 'idle' | 'in' | 'out'

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

    // Step 1: Fade overlay in
    setPhase('in');

    // Step 2: Once covered (~250ms), trigger page route swap & scroll reset
    const coveredTimer = setTimeout(() => {
      if (onCoveredRef.current) onCoveredRef.current();
    }, 250);

    // Step 3: Fade out after loader has animated cleanly (~650ms)
    const fadeOutTimer = setTimeout(() => {
      setPhase('out');
    }, 650);

    // Step 4: Complete transition & unmount (~920ms)
    const doneTimer = setTimeout(() => {
      setPhase('idle');
      if (onCompleteRef.current) onCompleteRef.current();
    }, 920);

    return () => {
      clearTimeout(coveredTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(doneTimer);
    };
  }, [isActive]);

  if (!isActive || phase === 'idle') return null;

  return (
    <div
      className={`page-transition-curtain-root page-transition-loader-root phase-${phase}`}
      aria-hidden="true"
    >
      {/* From Uiverse.io by AbanoubMagdy1 */}
      <div className="loader">
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
      </div>
    </div>
  );
}
