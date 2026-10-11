import React, { useEffect, useRef } from 'react';
import {
  Sparkles,
  Cpu,
  ShieldCheck,
  Calendar,
  MessageSquare,
  PhoneForwarded,
  Activity,
} from 'lucide-react';

export const CHECKPOINTS = [
  {
    id: 1,
    title: 'Real-Time Neural Speech with Zero Awkward Pauses',
    summary:
      'Streams bidirectional speech tokens in under 550ms with 24kHz uncompressed Opus audio. Supports fluid human interruptions, clarifying pauses, and empathetic inflection with verified sub-second latency across every live caller interaction.',
    icon: Cpu,
    side: 'left',
    image: '/assets/checkpoints/cp-1.jpg',
  },
  {
    id: 2,
    title: 'Strict Brand Voice Guardrails',
    summary:
      'Trained strictly on approved enterprise policy documentation, knowledge bases, and verified service menus. Deterministic fallback rules enforce 100% factual fidelity, eliminating hallucinations and ensuring your brand voice is flawlessly protected on every call.',
    icon: ShieldCheck,
    side: 'right',
    image: '/assets/checkpoints/cp-2.jpg',
  },
  {
    id: 3,
    title: 'Live Diary & CRM Writeback',
    summary:
      'Directly verifies live availability across Google Calendar, Microsoft Outlook, and custom CRM systems. Books appointments in real time, applies custom buffer rules, and writes back comprehensive caller dossiers without requiring any manual human staff entry.',
    icon: Calendar,
    side: 'left',
    image: '/assets/checkpoints/cp-3.jpg',
  },
  {
    id: 4,
    title: 'Immediate WhatsApp & SMS Automation',
    summary:
      'Instantly dispatches calendar confirmations, digital brochures, intake questionnaires, and location links via WhatsApp or SMS within seconds of call completion. Keeps prospective customers engaged immediately while conversation context is at its peak.',
    icon: MessageSquare,
    side: 'right',
    image: '/assets/checkpoints/cp-4.jpg',
  },
  {
    id: 5,
    title: 'Smart Human Warm Transfer',
    summary:
      'Intelligently identifies complex caller requests, high-value opportunities, or escalation criteria in real time. Dials your available human team, quietly whispers full caller context and dossier details, and bridges the live conversation seamlessly.',
    icon: PhoneForwarded,
    side: 'left',
    image: '/assets/checkpoints/cp-5.jpg',
  },
  {
    id: 6,
    title: 'Deep Call Telemetry & Transcript Logs',
    summary:
      'Produces verbatim word-for-word audio transcripts, caller sentiment tags, and structured CRM records within seconds of hanging up. Grants full operational transparency with searchable audit logs and automated conversation intelligence.',
    icon: Activity,
    side: 'right',
    image: '/assets/checkpoints/cp-6.jpg',
  },
];

// Wide-sweeping continuous organic curve across 1200 x 2760 viewBox
// Loops around the circular images and stays completely clear of all text blocks
const SCRIBBLE_WIDE_PATH_D = `
  M 600,40
  C 640,80 920,110 970,240
  C 1020,370 870,440 600,480
  C 330,520 180,590 230,720
  C 280,850 560,880 600,980
  C 640,1080 920,1110 970,1240
  C 1020,1370 870,1440 600,1480
  C 330,1520 180,1590 230,1720
  C 280,1850 560,1880 600,1980
  C 640,2080 920,2110 970,2240
  C 1020,2370 870,2440 600,2480
  C 330,2520 180,2570 230,2650
  C 270,2720 460,2750 600,2750
`.trim();

export default function PlatformJourney() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const logoGroupRef = useRef(null);
  const logoImageRef = useRef(null);
  const rowsRef = useRef([]);
  const terminusTextRef = useRef(null);

  // Direct Hardware-Accelerated Scroll Synchronizer (Zero React Re-Renders)
  useEffect(() => {
    const path = pathRef.current;
    const logoGroup = logoGroupRef.current;
    const logoImage = logoImageRef.current;
    const section = sectionRef.current;
    if (!path || !logoGroup || !logoImage || !section) return;

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength}px`;
    path.style.strokeDashoffset = `${pathLength}px`;

    // Set initial position
    const startPt = path.getPointAtLength(0);
    logoGroup.setAttribute('transform', `translate(${startPt.x}, ${startPt.y})`);
    logoImage.setAttribute('transform', `rotate(0)`);

    let targetP = 0;
    let currentP = 0;
    let animId = null;

    const updateScrollTarget = () => {
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Start as section upper reaches enters view, end near the last checkpoint
      const scrollStart = windowH * 0.45;
      const scrollTotal = rect.height - windowH * 0.35;
      const p = Math.max(0, Math.min(1, (scrollStart - rect.top) / Math.max(scrollTotal, 1)));
      targetP = p;
    };

    // Smooth physics loop updating SVG elements directly
    const CHECKPOINT_Y_THRESHOLDS = [200, 680, 1200, 1680, 2200, 2580];

    const renderLoop = () => {
      const diff = targetP - currentP;
      if (Math.abs(diff) > 0.0002) {
        currentP += diff * 0.12; // buttery responsive momentum
        const dist = currentP * pathLength;

        // 1. Instant zero-lag stroke update
        path.style.strokeDashoffset = `${pathLength - dist}px`;

        // 2. Exact mathematical position on the curve
        const pt = path.getPointAtLength(dist);
        logoGroup.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);

        // 3. Smooth rotation around its center as it travels
        logoImage.setAttribute('transform', `rotate(${currentP * 1440})`);

        // 4. Reveal checkpoint into full black only when the traveling logo reaches that checkpoint
        CHECKPOINT_Y_THRESHOLDS.forEach((threshY, i) => {
          const row = rowsRef.current[i];
          if (!row) return;
          if (pt.y >= threshY && currentP > 0.02) {
            row.classList.add('is-reached');
            row.classList.remove('is-pending');
          } else {
            row.classList.remove('is-reached');
            row.classList.add('is-pending');
          }
        });

        // 5. Reveal 'JOBGEN.AI' next to the right of the logo when it reaches the end of the line
        if (terminusTextRef.current) {
          if (currentP >= 0.93) {
            terminusTextRef.current.classList.add('is-visible');
            terminusTextRef.current.classList.remove('is-hidden');
          } else {
            terminusTextRef.current.classList.remove('is-visible');
            terminusTextRef.current.classList.add('is-hidden');
          }
        }
      }
      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    window.addEventListener('scroll', updateScrollTarget, { passive: true });
    updateScrollTarget();

    return () => {
      window.removeEventListener('scroll', updateScrollTarget);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section id="platform" ref={sectionRef} className="section-spacing platform-scribble-section">
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="scribble-section-header">
          <h2 className="section-title text-center">
            <span className="scribble-headline-main">Every conversation.</span> <br />
            <span className="text-full-blue scribble-headline-sub">A deterministic, owned outcome</span>
          </h2>
        </div>

        {/* The Scribble Track Canvas */}
        <div className="scribble-track-stage">
          {/* Wide-Travel SVG Scribble Line */}
          <div className="scribble-svg-container" aria-hidden="true">
            <svg
              viewBox="0 0 1200 2760"
              className="scribble-svg"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Linear gradient for active illuminated line */}
                <linearGradient id="scribbleWideGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="30%" stopColor="#2563EB" />
                  <stop offset="70%" stopColor="#1D4ED8" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>

                {/* Filter for smooth blue glow */}
                <filter id="scribbleWideGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* 1. Base Subtle Inactive Scribble Path */}
              <path
                d={SCRIBBLE_WIDE_PATH_D}
                className="scribble-path-base"
                fill="none"
                stroke="rgba(15, 23, 42, 0.12)"
                strokeWidth="3.5"
                strokeDasharray="9 9"
                strokeLinecap="round"
              />

              {/* 2. Active Illuminated Scribble Path with Direct strokeDashoffset */}
              <path
                ref={pathRef}
                d={SCRIBBLE_WIDE_PATH_D}
                className="scribble-path-active"
                fill="none"
                stroke="url(#scribbleWideGradient)"
                strokeWidth="4.5"
                strokeLinecap="round"
                filter="url(#scribbleWideGlow)"
              />

              {/* 3. Pure Spinning JobGen Logo Riding on the Line with Text Appearing to its Right at End */}
              <g ref={logoGroupRef} className="traveling-jobgen-logo-raw">
                <image
                  ref={logoImageRef}
                  href="/assets/jobgen-logo.webp"
                  x="-40"
                  y="-40"
                  width="80"
                  height="80"
                  preserveAspectRatio="xMidYMid meet"
                  style={{
                    filter: 'drop-shadow(0 6px 18px rgba(37, 99, 235, 0.65))',
                  }}
                />
                {/* Clean text appearing to the right of the logo with no dots or boxes */}
                <text
                  ref={terminusTextRef}
                  x="56"
                  y="0"
                  dominantBaseline="central"
                  className="traveling-logo-terminus-text is-hidden"
                >
                  JOBGEN<tspan fill="#2563EB">.AI</tspan>
                </text>
              </g>
            </svg>
          </div>

          {/* HTML Overlay of the 6 Checkpoint Rows (Text & Circular Photo Frame) */}
          <div className="scribble-rows-overlay">
            {CHECKPOINTS.map((cp, idx) => {
              const IconComp = cp.icon;

              return (
                <div
                  key={cp.id}
                  ref={(el) => (rowsRef.current[idx] = el)}
                  className="checkpoint-row-item is-pending"
                >
                  {/* Left Column: Text or Circular Photo depending on side */}
                  <div className="checkpoint-col col-left">
                    {cp.side === 'left' ? (
                      /* Compact Text-Only Checkpoint with Claymorphic Circular Icon to the Left of Headline */
                      <div className="checkpoint-text-block">
                        <div className="checkpoint-header-row">
                          <div className="checkpoint-clay-icon-circle" aria-hidden="true">
                            <IconComp size={24} className="checkpoint-favicon-icon" />
                          </div>
                          <h3 className="checkpoint-text-title">{cp.title}</h3>
                        </div>
                        <p className="checkpoint-text-desc">{cp.summary}</p>
                      </div>
                    ) : (
                      /* Opposite Side: Natural Photo in Circular Frame */
                      <div className="checkpoint-media-block">
                        <div className="checkpoint-circle-frame">
                          <img
                            src={cp.image}
                            alt={cp.title}
                            className="checkpoint-circle-img"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Circular Photo or Text depending on side */}
                  <div className="checkpoint-col col-right">
                    {cp.side === 'right' ? (
                      /* Compact Text-Only Checkpoint with Claymorphic Circular Icon to the Left of Headline */
                      <div className="checkpoint-text-block">
                        <div className="checkpoint-header-row">
                          <div className="checkpoint-clay-icon-circle" aria-hidden="true">
                            <IconComp size={24} className="checkpoint-favicon-icon" />
                          </div>
                          <h3 className="checkpoint-text-title">{cp.title}</h3>
                        </div>
                        <p className="checkpoint-text-desc">{cp.summary}</p>
                      </div>
                    ) : (
                      /* Opposite Side: Natural Photo in Circular Frame */
                      <div className="checkpoint-media-block">
                        <div className="checkpoint-circle-frame">
                          <img
                            src={cp.image}
                            alt={cp.title}
                            className="checkpoint-circle-img"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
