import React, { useRef, useEffect } from 'react';

export default function OrganicContourBackground({ strokeColor = 'rgba(37, 39, 30, 0.20)' }) {
  const canvasRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frameId = 0;
    let cols = 0;
    let rows = 0;
    let step = 16;
    let values = null;
    let isVisible = true;
    let lastDrawTime = 0;
    let currentDarkRatio = 0;

    // Observe canvas visibility so it consumes ZERO CPU when scrolled away
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry.isIntersecting;
        if (isVisible && !reduceMotion && !frameId) {
          frameId = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.01 }
    );
    observer.observe(canvas);

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Highly optimized step size (reduced grid density for 10x faster execution)
      step = Math.max(16, Math.min(22, width / 70));
      cols = Math.ceil(width / step) + 1;
      rows = Math.ceil(height / step) + 1;
      values = new Float32Array(cols * rows);
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    function field(x, y, t) {
      const nx = x / Math.max(width, 1);
      const ny = y / Math.max(height, 1);
      return (
        0.95 * Math.sin(nx * 5.2 + Math.sin(ny * 3.4 + t * 0.20) * 1.05 + t * 0.17) +
        0.82 * Math.cos(ny * 5.0 - Math.sin(nx * 3.0 - t * 0.15) * 0.95 + t * 0.13) +
        0.52 * Math.sin((nx * 2.1 + ny * 2.8) * 6.0 + t * 0.11) +
        0.34 * Math.cos(nx * 10.0 - ny * 7.0 + t * 0.09)
      );
    }

    const levels = [-0.10, 0.60];

    function edgePoint(x1, y1, v1, x2, y2, v2, level) {
      const den = v2 - v1;
      const f = Math.abs(den) < 1e-6 ? 0.5 : (level - v1) / den;
      return [x1 + (x2 - x1) * f, y1 + (y2 - y1) * f];
    }

    function checkCrmDarkSection() {
      const crmSection = document.getElementById('crm-campaign-pipeline');
      if (!crmSection) return 0;
      const rect = crmSection.getBoundingClientRect();
      const vh = window.innerHeight;

      // When section is in view:
      if (rect.top < vh && rect.bottom > 0) {
        // Entering smoothly as top approaches center
        if (rect.top > 0) {
          const enterRatio = 1 - rect.top / vh;
          return Math.min(1, Math.max(0, (enterRatio - 0.15) / 0.6));
        }
        // Exiting smoothly as bottom approaches top
        if (rect.bottom < vh * 0.8) {
          return Math.min(1, Math.max(0, rect.bottom / (vh * 0.8)));
        }
        // Pinned and fully active
        return 1;
      }
      return 0;
    }

    function draw(t) {
      ctx.clearRect(0, 0, width, height);
      if (!values) return;

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          values[j * cols + i] = field(i * step, j * step, t);
        }
      }

      ctx.beginPath();
      for (const level of levels) {
        for (let j = 0; j < rows - 1; j++) {
          for (let i = 0; i < cols - 1; i++) {
            const x = i * step;
            const y = j * step;
            const a = values[j * cols + i];
            const b = values[j * cols + i + 1];
            const c = values[(j + 1) * cols + i + 1];
            const d = values[(j + 1) * cols + i];
            const pts = [];
            if ((a < level) !== (b < level)) pts.push(edgePoint(x, y, a, x + step, y, b, level));
            if ((b < level) !== (c < level)) pts.push(edgePoint(x + step, y, b, x + step, y + step, c, level));
            if ((c < level) !== (d < level)) pts.push(edgePoint(x + step, y + step, c, x, y + step, d, level));
            if ((d < level) !== (a < level)) pts.push(edgePoint(x, y + step, d, x, y, a, level));

            if (pts.length === 2) {
              ctx.moveTo(pts[0][0], pts[0][1]);
              ctx.lineTo(pts[1][0], pts[1][1]);
            } else if (pts.length === 4) {
              const center = (a + b + c + d) / 4;
              if ((center < level) === (a < level)) {
                ctx.moveTo(pts[0][0], pts[0][1]); ctx.lineTo(pts[3][0], pts[3][1]);
                ctx.moveTo(pts[1][0], pts[1][1]); ctx.lineTo(pts[2][0], pts[2][1]);
              } else {
                ctx.moveTo(pts[0][0], pts[0][1]); ctx.lineTo(pts[1][0], pts[1][1]);
                ctx.moveTo(pts[2][0], pts[2][1]); ctx.lineTo(pts[3][0], pts[3][1]);
              }
            }
          }
        }
      }

      // Smooth color transition from dark gray to white contour lines
      const r = Math.round(37 + (255 - 37) * currentDarkRatio);
      const g = Math.round(39 + (255 - 39) * currentDarkRatio);
      const b = Math.round(30 + (255 - 30) * currentDarkRatio);
      const a = (0.20 + 0.15 * currentDarkRatio).toFixed(3);

      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
      ctx.lineWidth = 1.1 + 0.2 * currentDarkRatio;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }

    const start = performance.now();
    function tick(now) {
      if (!isVisible) {
        frameId = 0;
        return;
      }

      // Update dark transition smoothly
      const targetDark = checkCrmDarkSection();
      currentDarkRatio += (targetDark - currentDarkRatio) * 0.12;
      if (Math.abs(targetDark - currentDarkRatio) < 0.005) {
        currentDarkRatio = targetDark;
      }

      // Update black backdrop opacity directly
      if (backdropRef.current) {
        backdropRef.current.style.opacity = currentDarkRatio.toFixed(3);
      }

      // Throttle rendering to ~30fps for smooth ambient wave and zero CPU lag
      if (now - lastDrawTime >= 32) {
        draw((now - start) / 1000);
        lastDrawTime = now;
      }
      if (!reduceMotion) {
        frameId = requestAnimationFrame(tick);
      }
    }

    draw(0);
    if (!reduceMotion) {
      frameId = requestAnimationFrame(tick);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resize);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [strokeColor]);

  return (
    <>
      {/* Background that slowly turns black when scrolling to CRM pipeline */}
      <div
        ref={backdropRef}
        className="global-contour-dark-backdrop"
        aria-hidden="true"
      />
      <canvas
        ref={canvasRef}
        className="hero-contour-canvas"
        aria-hidden="true"
      />
    </>
  );
}
