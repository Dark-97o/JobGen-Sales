import React, { useRef, useEffect } from 'react';

const VERTEX_SHADER = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
    vUv = aPos * 0.5 + 0.5;
    gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform sampler2D uMap;
uniform vec2 uRes;
uniform vec2 uAtlas;
uniform vec2 uPtr;
uniform float uReach;
uniform vec3 uText;
uniform vec3 uShade;
uniform vec4 uAccent;
uniform vec2 uV0;
uniform vec2 uV1;
uniform vec2 uV2;
uniform float uHalf;

varying vec2 vUv;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

vec2 blurRG(vec2 uv, float e) {
    vec4 sum = vec4(0.0);
    for (int i = 0; i < 6; i++) {
        float fi = float(i);
        float th = radians(fi / 6.0 * 360.0);
        vec2 dir = vec2(cos(th), sin(th));
        vec2 off = dir * (hash(vec2(fi, uv.x + uv.y)) + e);
        sum += texture2D(uMap, uv + off * e);
    }
    return (sum / 6.0).rg;
}

vec2 segment(vec2 p, vec2 a, vec2 b) {
    vec2 ab = b - a;
    vec2 ap = p - a;
    float t = clamp(dot(ap, ab) / max(dot(ab, ab), 1e-8), 0.0, 1.0);
    return vec2(length(ap - ab * t), t);
}

float stroke(float d, float lw, float px) {
    return 1.0 - smoothstep(lw, lw + px, d);
}

float dashedLine(vec2 p, vec2 a, vec2 b, float lw, float px) {
    vec2 s = segment(p, a, b);
    float dash = step(0.5, fract(s.y * length(b - a) * 100.0));
    return stroke(s.x, lw, px) * dash;
}

float boxEdge(vec2 p, vec2 c, float h, float lw, float px) {
    vec2 q = abs(p - c) - vec2(h);
    float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0);
    return stroke(abs(d), lw, px);
}

void main() {
    float aspect = uRes.x / uRes.y;

    vec2 E = (vUv * uRes - (uRes - uAtlas) * 0.5) / uAtlas;
    float inside = step(0.0, E.x) * step(E.x, 1.0) * step(0.0, E.y) * step(E.y, 1.0);
    vec2 safeUv = clamp(E, 0.0, 1.0);

    float b = clamp(1.0 - E.y * 3.5, 0.0, 1.0) * 0.008;
    vec2 soft = blurRG(safeUv, b);
    vec2 sharp = blurRG(safeUv, b * 0.1);

    float d = length((vUv - uPtr) / vec2(1.0, aspect));
    float k = 1.0 - pow(smoothstep(0.0, max(uReach, 1e-4), d), 3.0);

    float mask = mix(soft.r, sharp.g, k) * inside;
    vec3 fill = mix(uShade, uText, smoothstep(0.0, 1.0, E.y));

    vec2 P = vec2(vUv.x * aspect, vUv.y);
    float px = 1.0 / uRes.y;
    float lw = px * 0.2;
    float lines = max(
        max(dashedLine(P, uV0, uV1, lw, px), dashedLine(P, uV1, uV2, lw, px)),
        dashedLine(P, uV2, uV0, lw, px)
    );
    float boxes = max(
        max(boxEdge(P, uV0, uHalf, lw, px), boxEdge(P, uV1, uHalf, lw, px)),
        boxEdge(P, uV2, uHalf, lw, px)
    );
    float A = max(lines, boxes) * uAccent.a * (1.0 - vUv.y);

    vec4 card = vec4(fill * mask, mask);
    vec4 comp = vec4(uAccent.rgb * A, A) + card * (1.0 - A);

    gl_FragColor = comp * pow(clamp(E.y, 0.0, 1.0), 0.7);
}
`;

const clamp = (val, min, max) => (val < min ? min : val > max ? max : val);
const fract = (val) => val - Math.floor(val);

function parseColorRGBA(colorStr, fallback = [1, 1, 1, 1]) {
  if (!colorStr) return fallback;
  const str = String(colorStr).trim();
  if (str.startsWith('#')) {
    let hex = str.slice(1);
    if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
    if (hex.length === 6) hex += 'ff';
    if (hex.length !== 8) return fallback;
    return [
      parseInt(hex.slice(0, 2), 16) / 255,
      parseInt(hex.slice(2, 4), 16) / 255,
      parseInt(hex.slice(4, 6), 16) / 255,
      parseInt(hex.slice(6, 8), 16) / 255,
    ];
  }
  const match = str.match(/^(rgba?|hsla?)\(([^)]*)\)$/i);
  if (!match) return fallback;
  const parts = match[2].split(/[\s,/]+/).filter(Boolean);
  if (parts.length < 3) return fallback;
  const toNorm = (v, max) => (v.endsWith('%') ? (parseFloat(v) / 100) * max : parseFloat(v));
  const a = parts.length > 3 ? clamp(parseFloat(parts[3]), 0, 1) : 1;
  return [
    clamp(toNorm(parts[0], 255) / 255, 0, 1),
    clamp(toNorm(parts[1], 255) / 255, 0, 1),
    clamp(toNorm(parts[2], 255) / 255, 0, 1),
    a,
  ];
}

function createShader(gl, type, source) {
  try {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  } catch (err) {
    console.error('createShader exception:', err);
    return null;
  }
}

function createProgram(gl, vsSource, fsSource) {
  try {
    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return null;
    const program = gl.createProgram();
    if (!program) return null;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.bindAttribLocation(program, 0, 'aPos');
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    return program;
  } catch (err) {
    console.error('createProgram exception:', err);
    return null;
  }
}

function renderTextAtlas(text, fontSpec, fontSizePx, dpr) {
  const measureCanvas = document.createElement('canvas');
  const measureCtx = measureCanvas.getContext('2d');
  if (!measureCtx) return null;

  const fontStr = `${fontSpec.style} ${fontSpec.weight} ${fontSizePx}px ${fontSpec.family}`;
  measureCtx.font = fontStr;
  try {
    if ('letterSpacing' in measureCtx) measureCtx.letterSpacing = fontSpec.letterSpacing;
  } catch (e) {}

  const metrics = measureCtx.measureText(text);
  const ascent = metrics.actualBoundingBoxAscent || fontSizePx * 0.8;
  const descent = metrics.actualBoundingBoxDescent || fontSizePx * 0.22;
  const textWidth = Math.max(1, metrics.width);

  const padding = fontSizePx * 0.12;
  const maxTexSize = 4096;
  const scale = Math.max((textWidth + padding * 2) / maxTexSize, (ascent + descent + padding * 2) / maxTexSize);
  let effectiveSize = fontSizePx;
  if (scale > 1) {
    effectiveSize = Math.max(8, fontSizePx / scale);
  }

  const canvasW = Math.max(1, Math.ceil(textWidth + padding * 2));
  const canvasH = Math.max(1, Math.ceil(ascent + descent + padding * 2));

  const atlasCanvas = document.createElement('canvas');
  atlasCanvas.width = canvasW;
  atlasCanvas.height = canvasH;
  const ctx = atlasCanvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvasW, canvasH);

  ctx.font = `${fontSpec.style} ${fontSpec.weight} ${effectiveSize}px ${fontSpec.family}`;
  try {
    if ('letterSpacing' in ctx) ctx.letterSpacing = fontSpec.letterSpacing;
  } catch (e) {}
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'left';
  ctx.globalCompositeOperation = 'lighter';

  // Fill in RED channel
  ctx.fillStyle = '#FF0000';
  ctx.fillText(text, padding, padding + ascent);

  // Stroke in GREEN channel
  const totalH = ascent + descent;
  ctx.strokeStyle = '#00FF00';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = Math.max(1, totalH * (4 / 440));
  ctx.setLineDash([0, Math.max(2, totalH * (12 / 440))]);
  ctx.strokeText(text, padding, padding + ascent);

  const ratio = fontSizePx / effectiveSize;
  return {
    canvas: atlasCanvas,
    cssW: canvasW * ratio,
    cssH: canvasH * ratio,
  };
}

export default function FooterKineticWordmark({
  text = 'JOBGEN',
  background = '#030712',
  textColor = '#FFFFFF',
  shade = 'rgba(255, 255, 255, 0.14)',
  accent = 'rgba(56, 189, 248, 0.7)',
  font = {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    fontWeight: 900,
    fontSize: '320px',
    letterSpacing: '-0.03em',
  },
  handles = { labels: true, size: 109, spread: 27 },
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const handleLabelsRef = useRef([null, null, null]);

  const accentRGBA = parseColorRGBA(accent, [0.22, 0.74, 0.97, 0.7]);
  const accentCSS = `rgb(${Math.round(accentRGBA[0] * 255)}, ${Math.round(accentRGBA[1] * 255)}, ${Math.round(accentRGBA[2] * 255)})`;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const glOptions = {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      powerPreference: 'high-performance',
    };
    const gl = canvas.getContext('webgl2', glOptions) || canvas.getContext('webgl', glOptions);
    if (!gl) return;

    const isWebGL2 = typeof WebGL2RenderingContext !== 'undefined' && gl instanceof WebGL2RenderingContext;
    const program = createProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
    if (!program) return;

    const uniforms = {
      map: gl.getUniformLocation(program, 'uMap'),
      res: gl.getUniformLocation(program, 'uRes'),
      atlas: gl.getUniformLocation(program, 'uAtlas'),
      ptr: gl.getUniformLocation(program, 'uPtr'),
      reach: gl.getUniformLocation(program, 'uReach'),
      text: gl.getUniformLocation(program, 'uText'),
      shade: gl.getUniformLocation(program, 'uShade'),
      accent: gl.getUniformLocation(program, 'uAccent'),
      v0: gl.getUniformLocation(program, 'uV0'),
      v1: gl.getUniformLocation(program, 'uV1'),
      v2: gl.getUniformLocation(program, 'uV2'),
      half: gl.getUniformLocation(program, 'uHalf'),
    };

    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.disable(gl.BLEND);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    let isRunning = true;
    let width = Math.max(1, container.offsetWidth);
    let height = Math.max(1, container.offsetHeight);
    let needsResize = true;
    let dpr = 1;
    let physW = 0;
    let physH = 0;
    let atlasNormW = 1;
    let atlasNormH = 1;
    let lastAtlasKey = '';

    const fontSpec = {
      family: font.fontFamily || 'Inter, system-ui, sans-serif',
      weight: String(font.fontWeight || '900'),
      style: font.fontStyle === 'italic' ? 'italic' : 'normal',
      size: Math.max(8, parseFloat(String(font.fontSize || 280)) || 280),
      letterSpacing: String(font.letterSpacing || '0px'),
    };

    function getScaledFontSize() {
      return fontSpec.size * (width / 1200);
    }

    function updateSize() {
      width = Math.max(1, container.offsetWidth);
      height = Math.max(1, container.offsetHeight);
      dpr = Math.min(2, window.devicePixelRatio || 1);
      const nw = Math.max(1, Math.round(width * dpr));
      const nh = Math.max(1, Math.round(height * dpr));
      if (nw !== physW || nh !== physH) {
        physW = nw;
        physH = nh;
        canvas.width = nw;
        canvas.height = nh;
      }
    }

    function updateAtlas() {
      const fontSizePx = Math.max(8, getScaledFontSize());
      const atlas = renderTextAtlas(text, fontSpec, fontSizePx, dpr);
      if (!atlas) return;

      atlasNormW = Math.max(1e-4, atlas.cssW / fontSizePx);
      atlasNormH = Math.max(1e-4, atlas.cssH / fontSizePx);

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlas.canvas);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

      const isPow2W = !(atlas.canvas.width & (atlas.canvas.width - 1));
      const isPow2H = !(atlas.canvas.height & (atlas.canvas.height - 1));
      if (isWebGL2 || (isPow2W && isPow2H)) {
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      } else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }
    }

    // Handles simulation state
    const targetPtr = { x: -0.5, y: 0.5 };
    const curPtr = { x: -0.5, y: 0.5 };
    const baseNodes = [
      { x: -0.5, y: 0.5 },
      { x: -0.5, y: 0.5 },
      { x: -0.5, y: 0.5 },
    ];
    const animatedNodes = [
      { x: -0.5, y: 0.5 },
      { x: -0.5, y: 0.5 },
      { x: -0.5, y: 0.5 },
    ];

    let hasPointer = false;
    let wanderTimer = 0;
    let waveTime = 0;

    function recomputeBaseNodes(px, py, spreadX, spreadY) {
      const ix = Math.floor(px / spreadX);
      const iy = Math.floor(py / spreadY);
      const candidates = [];
      for (let sx = -1; sx <= 1; sx++) {
        for (let sy = -1; sy <= 1; sy++) {
          const cx = (ix + sx + 0.5) * spreadX;
          const cy = (iy + sy + 0.5) * spreadY;
          candidates.push({ x: cx, y: cy, d: Math.hypot(cx - px, cy - py) });
        }
      }
      candidates.sort((a, b) => a.d - b.d);
      for (let i = 0; i < 3; i++) {
        baseNodes[i].x = candidates[i + 1].x;
        baseNodes[i].y = candidates[i + 1].y;
      }
    }

    const onPointerMove = (evt) => {
      hasPointer = true;
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      targetPtr.x = (evt.clientX - rect.left) / rect.width;
      targetPtr.y = 1 - (evt.clientY - rect.top) / rect.height;
    };

    const onPointerLeave = () => {
      hasPointer = false;
    };

    const footerEl = container.closest('footer') || container;
    footerEl.addEventListener('pointermove', onPointerMove, { passive: true });
    footerEl.addEventListener('pointerleave', onPointerLeave, { passive: true });

    let rafId = 0;
    let lastTime = 0;

    function render(time) {
      if (!isRunning) return;
      const dt = lastTime ? Math.min(0.1, (time - lastTime) / 1000) : 0.016;
      lastTime = time;

      if (needsResize) {
        needsResize = false;
        updateSize();
      }

      const atlasKey = [text, fontSpec.family, fontSpec.weight, fontSpec.letterSpacing, dpr, Math.ceil(Math.max(8, getScaledFontSize()) / 64)].join('|');
      if (atlasKey !== lastAtlasKey) {
        lastAtlasKey = atlasKey;
        updateAtlas();
      }

      // Physics update
      const speedNorm = 50 / 50;
      const spreadX = Math.max(0.01, (handles.spread || 27) / 100);
      const spreadY = spreadX * 0.6;
      const aspect = width / height;

      if (hasPointer) {
        recomputeBaseNodes(targetPtr.x * aspect, targetPtr.y, spreadX, spreadY);
      } else {
        const textH = (atlasNormH * Math.max(8, getScaledFontSize())) / height;
        targetPtr.x += dt * 0.5 * speedNorm;
        targetPtr.y = (1 - textH) / 2 + 0.28 * textH;
        if (targetPtr.x > 1.5) {
          targetPtr.x = -0.5;
          curPtr.x = -0.5;
        }
        wanderTimer += dt;
        if (wanderTimer >= 0.2) {
          wanderTimer = 0;
          recomputeBaseNodes(targetPtr.x * aspect, targetPtr.y, spreadX, spreadY);
        }
      }

      const damping = clamp(((60) / 100) * 20 * dt, 0, 1);
      curPtr.x += (targetPtr.x - curPtr.x) * damping;
      curPtr.y += (targetPtr.y - curPtr.y) * damping;
      waveTime += dt * speedNorm;

      for (let i = 0; i < 3; i++) {
        const bn = baseNodes[i];
        const nx = Math.round(bn.x / spreadX - 0.5);
        const ny = Math.round(bn.y / spreadY - 0.5);
        const phX = nx * 1.618 + ny * 2.718 + i;
        const phY = nx * 2.718 + ny * 1.618 + i;
        const offX = Math.sin(waveTime * 1.3 + phX) * (spreadX * 0.08);
        const offY = Math.sin(waveTime * 1.69 + phY) * (spreadY * 0.04);
        animatedNodes[i].x = bn.x + offX;
        animatedNodes[i].y = bn.y + offY;
      }

      // GL Draw
      gl.viewport(0, 0, physW, physH);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(uniforms.map, 0);
      gl.uniform2f(uniforms.res, physW, physH);

      const fSize = Math.max(8, getScaledFontSize());
      gl.uniform2f(uniforms.atlas, atlasNormW * fSize * dpr, atlasNormH * fSize * dpr);
      gl.uniform2f(uniforms.ptr, curPtr.x, curPtr.y);
      gl.uniform1f(uniforms.reach, (290 / 1000) * (width / 1200));

      const parsedText = parseColorRGBA(textColor, [1, 1, 1, 1]);
      gl.uniform3f(uniforms.text, parsedText[0], parsedText[1], parsedText[2]);

      const parsedShade = parseColorRGBA(shade, [1, 1, 1, 0.14]);
      gl.uniform3f(uniforms.shade, parsedShade[0], parsedShade[1], parsedShade[2]);

      gl.uniform4f(uniforms.accent, accentRGBA[0], accentRGBA[1], accentRGBA[2], accentRGBA[3]);

      gl.uniform2f(uniforms.v0, animatedNodes[0].x, animatedNodes[0].y);
      gl.uniform2f(uniforms.v1, animatedNodes[1].x, animatedNodes[1].y);
      gl.uniform2f(uniforms.v2, animatedNodes[2].x, animatedNodes[2].y);

      const handleHalf = ((handles.size || 109) / 100) * 0.008;
      gl.uniform1f(uniforms.half, handleHalf);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      // DOM Handles translation
      if (handles.labels) {
        for (let i = 0; i < 3; i++) {
          const lbl = handleLabelsRef.current[i];
          if (!lbl) continue;
          const lx = (animatedNodes[i].x / aspect) * width;
          const ly = (1 - animatedNodes[i].y) * height;
          lbl.style.transform = `translate3d(${lx}px, ${ly}px, 0)`;
        }
      }

      rafId = requestAnimationFrame(render);
    }

    rafId = requestAnimationFrame(render);

    const resizeObserver = new ResizeObserver(() => {
      needsResize = true;
    });
    resizeObserver.observe(container);

    return () => {
      isRunning = false;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      footerEl.removeEventListener('pointermove', onPointerMove);
      footerEl.removeEventListener('pointerleave', onPointerLeave);
      gl.deleteProgram(program);
      gl.deleteBuffer(quadBuffer);
      gl.deleteTexture(texture);
    };
  }, [text, background, textColor, shade, accent]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background,
        width: '100%',
        height: '100%',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
      {handles.labels && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              ref={(el) => {
                handleLabelsRef.current[idx] = el;
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                fontSize: '10px',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                color: accentCSS,
                padding: '2px 4px',
                pointerEvents: 'none',
                userSelect: 'none',
                willChange: 'transform',
                letterSpacing: '0.05em',
                fontWeight: 600,
                textShadow: '0 0 8px rgba(56, 189, 248, 0.6)',
              }}
            >
              H{idx + 1}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
