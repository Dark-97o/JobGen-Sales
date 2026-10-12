import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import * as THREE from 'three';
import { 
  ArrowRight, 
  Check, 
  X, 
  PhoneCall, 
  ShieldCheck, 
  Calendar, 
  Database, 
  Users, 
  MessageSquare, 
  BookOpen, 
  Target, 
  Zap, 
  Layers, 
  TrendingUp, 
  Cpu,
  Calculator 
} from 'lucide-react';

function FluidGradientBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const parseColor = (hex, fallback = '#ffffff') => {
      let c;
      try {
        c = new THREE.Color(hex || fallback);
      } catch {
        c = new THREE.Color(fallback);
      }
      return c;
    };

    // Configuration from CodeGrid & jobgen-candidates.vercel.app
    const config = {
      brushSize: 28,
      brushStrength: 0.65,
      distortionAmount: 2.6,
      fluidDecay: 0.982,
      trailLength: 0.82,
      stopDecay: 0.85,
      flowSpeed: 1.0,
      idleSpeed: 0.85,
      color1: '#071a52',
      color2: '#0c329b',
      color3: '#1d63ed',
      color4: '#38bdf8',
      colorIntensity: 1.08,
      softness: 0.95,
      dprMax: 1.5,
      softResetFrames: 12,
      softResetStrength: 0.15,
    };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, config.dprMax));
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const getSize = () => {
      const rect = container.getBoundingClientRect();
      return {
        width: Math.max(1, Math.floor(rect.width || window.innerWidth)),
        height: Math.max(1, Math.floor(rect.height || window.innerHeight)),
      };
    };

    const targetOptions = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
      depthBuffer: false,
      stencilBuffer: false,
    };

    let size = getSize();
    let renderTargetA = new THREE.WebGLRenderTarget(size.width, size.height, targetOptions);
    let renderTargetB = renderTargetA.clone();
    let readTarget = renderTargetA;
    let writeTarget = renderTargetB;

    const c1 = parseColor(config.color1);
    const c2 = parseColor(config.color2);
    const c3 = parseColor(config.color3);
    const c4 = parseColor(config.color4);

    const simMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(size.width, size.height) },
        iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
        iFrame: { value: 0 },
        iPreviousFrame: { value: null },
        uBrushSize: { value: config.brushSize },
        uBrushStrength: { value: config.brushStrength },
        uFluidDecay: { value: config.fluidDecay },
        uTrailLength: { value: config.trailLength },
        uStopDecay: { value: config.stopDecay },
        uSoftReset: { value: 0 },
        uFlowSpeed: { value: config.flowSpeed },
      },
      vertexShader,
      fragmentShader: `
        precision highp float;

        uniform float uSoftReset;
        uniform float iTime;
        uniform vec2 iResolution;
        uniform vec4 iMouse;
        uniform int iFrame;
        uniform sampler2D iPreviousFrame;
        uniform float uBrushSize;
        uniform float uBrushStrength;
        uniform float uFluidDecay;
        uniform float uTrailLength;
        uniform float uStopDecay;
        uniform float uFlowSpeed;

        varying vec2 vUv;

        vec2 ur, U;

        float ln(vec2 p, vec2 a, vec2 b) {
          return length(p - a - (b - a) * clamp(dot(p - a, b - a) / max(dot(b - a, b - a), 1e-4), 0.0, 1.0));
        }

        vec4 t(vec2 v, int a, int b) {
          vec2 coord = clamp((v + vec2(float(a), float(b))) / ur, vec2(0.001), vec2(0.999));
          return texture2D(iPreviousFrame, coord);
        }

        vec4 t(vec2 v) {
          vec2 coord = clamp(v / ur, vec2(0.001), vec2(0.999));
          return texture2D(iPreviousFrame, coord);
        }

        float area(vec2 a, vec2 b, vec2 c) {
          float A = length(b - c), B = length(c - a), C = length(a - b), s = 0.5 * (A + B + C);
          return sqrt(max(0.0, s * (s - A) * (s - B) * (s - C)));
        }

        void main() {
          U = vUv * iResolution;
          ur = iResolution.xy;

          if (iFrame < 1) {
            float w = 0.5 + sin(0.2 * U.x) * 0.5;
            float q = length(U - 0.5 * ur);
            gl_FragColor = vec4(0.1 * exp(-0.001 * q * q), 0.0, 0.0, w);
          } else {
            vec2 v = U,
                 A = v + vec2( 1.0,  1.0),
                 B = v + vec2( 1.0, -1.0),
                 C = v + vec2(-1.0,  1.0),
                 D = v + vec2(-1.0, -1.0);

            for (int i = 0; i < 8; i++) {
                v -= uFlowSpeed * t(v).xy;
                A -= uFlowSpeed * t(A).xy;
                B -= uFlowSpeed * t(B).xy;
                C -= uFlowSpeed * t(C).xy;
                D -= uFlowSpeed * t(D).xy;
            }

            vec4 me = t(v);
            vec4 n = t(v, 0, 1),
                 e = t(v, 1, 0),
                 s = t(v, 0, -1),
                 wv = t(v, -1, 0);
            vec4 ne = 0.25 * (n + e + s + wv);
            me = mix(t(v), ne, vec4(0.15, 0.15, 0.95, 0.0));
            me.z -= uFlowSpeed * 0.01 * ((area(A, B, C) + area(B, C, D)) - 4.0);

            vec4 pr = vec4(e.z, wv.z, n.z, s.z);
            me.xy = me.xy + (100.0 * uFlowSpeed) * vec2(pr.x - pr.y, pr.z - pr.w) / ur;

            float decay = pow(uFluidDecay, uFlowSpeed);
            me.xy *= decay;
            me.z  *= uTrailLength;

            float edgeDampX = smoothstep(0.0, 0.05, vUv.x) * smoothstep(1.0, 0.95, vUv.x);
            float edgeDampY = smoothstep(0.0, 0.05, vUv.y) * smoothstep(1.0, 0.95, vUv.y);
            me.xy *= edgeDampX * edgeDampY;

            if (iMouse.z > 0.0) {
              vec2 mousePos  = iMouse.xy;
              vec2 mousePrev = iMouse.zw;
              vec2 mouseVel  = mousePos - mousePrev;
              float velMagnitude = length(mouseVel);
              float q = ln(U, mousePos, mousePrev);
              vec2 m = mousePos - mousePrev;
              float l = length(m);
              if (l > 0.0) m = min(l, 10.0) * m / l;

              float brushSizeFactor = 1e-4 / uBrushSize;
              float strengthFactor  = 0.03 * uBrushStrength;

              float falloff = exp(-brushSizeFactor * q * q * q);
              falloff = pow(falloff, 0.5);

              me.xyw += (strengthFactor * uFlowSpeed) * falloff * vec3(m, 10.0);

              if (velMagnitude < 2.0) {
                float distToCursor = length(U - mousePos);
                float influence = exp(-distToCursor * 0.01);
                float cursorDecay = mix(1.0, uStopDecay, influence);
                me.xy *= cursorDecay;
                me.z  *= cursorDecay;
              }
            }

            me = mix(me, vec4(0.0), uSoftReset);

            gl_FragColor = clamp(me, -0.4, 0.4);
          }
        }
      `,
      depthTest: false,
      depthWrite: false,
    });

    const displayMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(size.width, size.height) },
        iFluid: { value: null },
        uDistortionAmount: { value: config.distortionAmount },
        uColor1: { value: c1 },
        uColor2: { value: c2 },
        uColor3: { value: c3 },
        uColor4: { value: c4 },
        uColorIntensity: { value: config.colorIntensity },
        uSoftness: { value: config.softness },
        uIdleSpeed: { value: config.idleSpeed },
      },
      vertexShader,
      fragmentShader: `
        precision highp float;
        precision highp int;

        uniform float iTime;
        uniform vec2 iResolution;
        uniform sampler2D iFluid;
        uniform float uDistortionAmount;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform vec3 uColor4;
        uniform float uColorIntensity;
        uniform float uSoftness;
        uniform float uIdleSpeed;

        varying vec2 vUv;

        void main() {
          vec4 fluid = texture2D(iFluid, vUv);
          vec2 fluidVel = fluid.xy;

          float aspect = iResolution.x / max(iResolution.y, 1.0);
          vec2 uv = (vUv - 0.5) * 2.0;
          uv.x *= clamp(aspect * 0.32, 1.0, 2.2);
          uv.y *= 1.1;

          uv += fluidVel * (0.5 * uDistortionAmount);

          float t = iTime * uIdleSpeed;

          float d = -t * 0.5;
          float a = 0.0;
          for (float i = 0.0; i < 8.0; ++i) {
            a += cos(i - d - a * uv.x);
            d += sin(uv.y * i + a);
          }
          d += t * 0.5;

          float mixer1 = cos(uv.x * d) * 0.5 + 0.5;
          float mixer2 = cos(uv.y * a) * 0.5 + 0.5;
          float mixer3 = sin(d + a) * 0.5 + 0.5;

          float smoothAmount = clamp(uSoftness * 0.1, 0.0, 0.9);
          mixer1 = mix(mixer1, 0.5, smoothAmount);
          mixer2 = mix(mixer2, 0.5, smoothAmount);
          mixer3 = mix(mixer3, 0.5, smoothAmount);

          vec3 col = mix(uColor1, uColor2, mixer1);
          col = mix(col, uColor3, mixer2);
          col = mix(col, uColor4, mixer3 * 0.4);

          col *= uColorIntensity;

          float edgeFactor = smoothstep(0.0, 0.07, vUv.x) * smoothstep(1.0, 0.93, vUv.x);
          vec3 edgeBlendColor = mix(uColor2, uColor3, 0.7);
          col = mix(edgeBlendColor, col, 0.85 + 0.15 * edgeFactor);

          gl_FragColor = vec4(col, 1.0);
        }
      `,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const simMesh = new THREE.Mesh(geometry, simMaterial);
    const displayMesh = new THREE.Mesh(geometry, displayMaterial);

    const simScene = new THREE.Scene();
    simScene.add(simMesh);

    const displayScene = new THREE.Scene();
    displayScene.add(displayMesh);

    let resetCounter = 0;
    const triggerSoftReset = (frames = 12, strength = 0.15) => {
      resetCounter = frames;
      simMaterial.uniforms.uSoftReset.value = strength;
    };

    const handleResize = ({ resetFluid = false } = {}) => {
      const { width: w, height: h } = getSize();
      renderer.setSize(w, h);
      simMaterial.uniforms.iResolution.value.set(w, h);
      displayMaterial.uniforms.iResolution.value.set(w, h);
      renderTargetA.setSize(w, h);
      renderTargetB.setSize(w, h);
      if (resetFluid) triggerSoftReset(config.softResetFrames, config.softResetStrength);
    };

    handleResize();

    let curMouseX = 0, curMouseY = 0, prevMouseX = 0, prevMouseY = 0, lastMoveTime = 0;

    const setMousePos = (x, y) => {
      if (prevMouseX === 0 && prevMouseY === 0) {
        prevMouseX = x;
        prevMouseY = y;
      } else {
        prevMouseX = curMouseX;
        prevMouseY = curMouseY;
      }
      curMouseX = x;
      curMouseY = y;
      lastMoveTime = performance.now();
      simMaterial.uniforms.iMouse.value.set(curMouseX, curMouseY, prevMouseX, prevMouseY);
    };

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        if (simMaterial.uniforms.iMouse.value.z > 0) {
          simMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
          prevMouseX = 0;
          prevMouseY = 0;
        }
        return;
      }

      const x = e.clientX - rect.left;
      const y = rect.height - (e.clientY - rect.top);
      const dx = x - curMouseX;
      const dy = y - curMouseY;
      const speedScale = Math.min(1.35, Math.max(0.8, 0.8 + Math.hypot(dx, dy) * 0.0035));

      simMaterial.uniforms.uBrushStrength.value = config.brushStrength;
      simMaterial.uniforms.uBrushSize.value = config.brushSize * speedScale;
      setMousePos(x, y);
    };

    const handlePointerLeave = () => {
      curMouseX = 0;
      curMouseY = 0;
      prevMouseX = 0;
      prevMouseY = 0;
      simMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
      simMaterial.uniforms.uBrushStrength.value = config.brushStrength;
      simMaterial.uniforms.uBrushSize.value = config.brushSize;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    let frameCount = 0;
    let animId = null;
    let isVisible = true;

    const animate = () => {
      if (!isVisible) {
        animId = null;
        return;
      }
      animId = requestAnimationFrame(animate);

      const time = performance.now() * 0.001;
      simMaterial.uniforms.iTime.value = time;
      displayMaterial.uniforms.iTime.value = time;
      simMaterial.uniforms.iFrame.value = frameCount;

      if (performance.now() - lastMoveTime > 120 && simMaterial.uniforms.iMouse.value.z > 0) {
        simMaterial.uniforms.iMouse.value.set(0, 0, 0, 0);
        prevMouseX = curMouseX;
        prevMouseY = curMouseY;
      }

      simMaterial.uniforms.iPreviousFrame.value = readTarget.texture;
      renderer.setRenderTarget(writeTarget);
      renderer.render(simScene, camera);

      if (resetCounter > 0) {
        resetCounter--;
        if (resetCounter === 0) simMaterial.uniforms.uSoftReset.value = 0;
      }

      displayMaterial.uniforms.iFluid.value = writeTarget.texture;
      renderer.setRenderTarget(null);
      renderer.render(displayScene, camera);

      const temp = readTarget;
      readTarget = writeTarget;
      writeTarget = temp;

      frameCount++;
    };

    const startAnim = () => {
      if (animId) cancelAnimationFrame(animId);
      lastMoveTime = performance.now();
      animId = requestAnimationFrame(animate);
    };

    startAnim();

    let resizeRaf = null;
    const onResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => handleResize({ resetFluid: false }));
    };
    window.addEventListener('resize', onResize);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', onResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      simMaterial.dispose();
      displayMaterial.dispose();
      renderTargetA.dispose();
      renderTargetB.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

function CompanyLogo({ name }) {
  switch (name) {
    case 'WhatsApp':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path fill="#25D366" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.37c1.45.79 3.08 1.19 4.74 1.19 5.46 0 9.92-4.45 9.92-9.91C21.96 6.45 17.5 2 12.04 2z"/>
          <path fill="#FFFFFF" d="M17.51 14.38c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.34.23-.64.08-.3-.15-1.26-.47-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.29-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.62-.93-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.02 1-1.02 2.43 0 1.43 1.05 2.8 1.2 3 .15.2 2.07 3.16 5.01 4.43.7.3 1.25.48 1.67.62.7.22 1.34.19 1.85.11.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.41-.07-.13-.2-.18-.4-.28z"/>
        </svg>
      );
    case 'Slack':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
          <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
          <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/>
          <path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E"/>
        </svg>
      );
    case 'Microsoft Teams':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path fill="#5059C9" d="M19.5 7.5a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5zM22 9h-5a1 1 0 0 0-1 1v6c0 .7.3 1.3.8 1.7.5.3 1.2.3 2 .3h2.2c1.1 0 2-.9 2-2v-6a1 1 0 0 0-1-1z" />
          <circle cx="9" cy="6" r="3.2" fill="#7B83EB" />
          <rect x="2" y="10" width="14" height="11" rx="2" fill="#5059C9" />
          <path d="M12.5 13.5h-7v2h2.2v4.5h2.6v-4.5h2.2v-2z" fill="#FFFFFF" />
        </svg>
      );
    case 'LinkedIn':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="#0A66C2" />
          <path fill="#FFFFFF" d="M19 19h-3.1v-4.9c0-1.2 0-2.7-1.6-2.7-1.6 0-1.9 1.3-1.9 2.6V19H9.3V9h3v1.4h.1c.4-.8 1.4-1.6 3-1.6 3.2 0 3.8 2.1 3.8 4.9V19zM6.5 7.6c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8zM8 19H5V9h3v10z"/>
        </svg>
      );
    case 'HubSpot':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path fill="#FF7A59" d="M17.5 10.8V8.6a2.1 2.1 0 1 0-1.6 0v2.2a6 6 0 0 0-3.3 1.9l-4.5-3.5a2.2 2.2 0 1 0-1.1 1.2l4.4 3.4a6 6 0 1 0 6.1-3zM16.7 18a3.7 3.7 0 1 1 0-7.4 3.7 3.7 0 0 1 0 7.4z"/>
        </svg>
      );
    case 'MYOB':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path fill="#6100A5" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.8 14.8c-1.4 1.4-3.6 1.4-5 0l-2.6-2.6c-.6-.6-.6-1.5 0-2.1.6-.6 1.5-.6 2.1 0l2 2c.6.6 1.6.6 2.1 0 .6-.6.6-1.6 0-2.1l-2.7-2.7c-1.2-1.2-3.1-1.2-4.2 0-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1 2.3-2.3 6.1-2.3 8.5 0l2.7 2.7c1.4 1.4 1.4 3.6 0 5l-.8.9z"/>
        </svg>
      );
    case 'Calendly':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path fill="#006BFF" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16.5c-3.59 0-6.5-2.91-6.5-6.5S8.41 5.5 12 5.5c2.1 0 3.96.99 5.16 2.53l-2.2 1.54C14.22 8.6 13.17 8 12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4c1.17 0 2.22-.6 2.96-1.57l2.2 1.54C15.96 17.51 14.1 18.5 12 18.5z"/>
        </svg>
      );
    case 'Google Drive':
      return (
        <svg viewBox="0 0 87.3 78" fill="none" aria-hidden="true">
          <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
          <path d="M43.65 25 57.4 1.2c-1.35-.8-2.9-1.2-4.5-1.2H34.4c-1.6 0-3.15.45-4.5 1.25z" fill="#00ac47"/>
          <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.5l5.85 10.15z" fill="#ea4335"/>
          <path d="M43.65 25 29.9 1.2C28.55 2 27.4 3.1 26.6 4.5L1.2 48.55C.4 49.95 0 51.5 0 53.05h27.5z" fill="#ffba00"/>
          <path d="M73.55 76.8H27.5L41.25 53h46.05c0 1.55-.4 3.1-1.2 4.5z" fill="#2684fc"/>
          <path d="M60.7 48.55 47.95 26.45 43.65 25l13.75-23.8c1.35.8 2.5 1.9 3.3 3.3l25.4 44.05z" fill="#00832d"/>
        </svg>
      );
    case 'Dropbox':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path fill="#0061FF" d="M6 3.5 0 7.4l4.9 3.9 6.1-4-5-3.8zm12 0-5 3.8 6.1 4 4.9-3.9-6-3.9zM0 15.2l6 3.9 5-3.8-6.1-4-4.9 3.9zm19.1-3.9-6.1 4 5 3.8 6-3.9-4.9-3.9zM12 16.2l-5 3.8 5 3.1 5-3.1-5-3.8z"/>
        </svg>
      );
    case 'Notion':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path fill="#000000" d="M4.46 3.59c-.58.05-.73.23-.7.86l.26 14.86c.03.47.34.73.9.7l14.47-.78c.7-.04.83-.34.8-.88L19.86 3.7c-.03-.5-.3-.72-.92-.68L4.46 3.59zm2.4 2.37h2.8c.4 0 .63.15.7.53l.03 8.35 4.35-8.48c.22-.4.48-.5.95-.5h2.12c.38 0 .58.2.58.55v10.5c0 .35-.15.55-.54.55h-2.1c-.38 0-.58-.2-.58-.55V8.5l-4.4 8.52c-.22.4-.48.5-.95.5H6.86c-.38 0-.58-.2-.58-.55V6.51c0-.35.2-.55.58-.55z"/>
        </svg>
      );
    case 'Zapier':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path fill="#FF4A00" d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.6 13h-4.2l3.4 3.4-1.4 1.4-3.4-3.4v4.2h-2v-4.2l-3.4 3.4-1.4-1.4 3.4-3.4H4.8v-2h4.2l-3.4-3.4 1.4-1.4 3.4 3.4V4.8h2v4.2l3.4-3.4 1.4 1.4-3.4 3.4h4.2v2z"/>
        </svg>
      );
    case 'Airtable':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path fill="#FCB400" d="M11.5 2.5L2 6.8l9.5 4.3 9.5-4.3-9.5-4.3zm0 2.2l6.8 3.1-6.8 3.1L4.7 7.8l6.8-3.1z"/>
          <path fill="#18BFFF" d="M2 9.5v8.3l8.5 4.2v-8.3L2 9.5zm7 10.4l-5.5-2.7v-4.9l5.5 2.7v4.9z"/>
          <path fill="#EC0677" d="M22 9.5l-8.5 4.2v8.3l8.5-4.2V9.5zm-1.5 7.7l-5.5 2.7v-4.9l5.5-2.7v4.9z"/>
        </svg>
      );
    case 'Salesforce':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path fill="#00A1E0" d="M19.4 9.1c-.6-2.5-2.9-4.3-5.6-4.3-1.6 0-3 .6-4 1.7-1.1-.9-2.5-1.5-4.1-1.5C2.6 5 0 7.6 0 10.8c0 .8.2 1.6.5 2.3C.2 13.8 0 14.6 0 15.5 0 18 2 20 4.5 20c.9 0 1.8-.3 2.5-.8 1.1 1.1 2.7 1.8 4.4 1.8 1.8 0 3.3-.7 4.5-1.9 1 .7 2.2 1.1 3.5 1.1 3.3 0 6-2.7 6-6 0-2.3-1.3-4.3-3.1-5.1z"/>
        </svg>
      );
    case 'Mailchimp':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="#FFE01B"/>
          <path fill="#000000" d="M16.5 9c-.4 0-.8.2-1 .5-.3-.3-.7-.5-1.1-.5-.8 0-1.5.7-1.5 1.5 0 .2 0 .4.1.6-1.1.2-2.1.8-2.8 1.7-.5-.4-1.2-.6-1.9-.6-1.5 0-2.7 1.2-2.7 2.7 0 .5.1.9.4 1.3-.3.6-.5 1.3-.5 2.1 0 2.2 2.2 4 5 4s4.8-1.5 5-3.4c.7-.2 1.3-.8 1.5-1.5.3-.9 0-1.8-.7-2.3.1-.4.2-.8.2-1.3-.1-1.7-1.4-2.8-2-2.8zM9 13.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
        </svg>
      );
    case 'Google Calendar':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="4" width="18" height="17" rx="3.5" fill="#FFFFFF" stroke="#4285F4" strokeWidth="2"/>
          <path fill="#4285F4" d="M3 6.5h18v3.5H3z"/>
          <rect x="7" y="2" width="2" height="4" rx="1" fill="#EA4335"/>
          <rect x="15" y="2" width="2" height="4" rx="1" fill="#EA4335"/>
          <text x="12" y="18" fill="#1A73E8" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">31</text>
        </svg>
      );
    case 'Stripe':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect width="24" height="24" rx="5" fill="#635BFF"/>
          <path fill="#FFFFFF" d="M14.6 10.9c-.8-.4-1.7-.6-2.5-.6-1 0-1.5.4-1.5 1 0 .7.8.9 2.2 1.4 1.9.7 2.7 1.6 2.7 3 0 2-1.6 3.3-4.2 3.3-1.1 0-2.3-.3-3.1-.7v-2.3c.9.5 2 .8 3 .8 1.1 0 1.6-.4 1.6-1.1 0-.8-.7-1-2.1-1.5-1.9-.7-2.8-1.5-2.8-3 0-1.9 1.5-3.2 3.9-3.2 1 0 2 .2 2.8.6v2.3z"/>
        </svg>
      );
    default:
      return null;
  }
}

const SCATTERED_COMPANIES = [
  // Top Safe Zone (above shrunk card & moving text: 9.5vh - 20vh)
  // Row 1 (high staggered ~9.5vh - 10.5vh)
  { name: 'WhatsApp', top: '10vh', left: '4vw', tilt: '-6deg', delay: '0s' },
  { name: 'Microsoft Teams', top: '9.5vh', left: '27vw', tilt: '5deg', delay: '1.4s' },
  { name: 'HubSpot', top: '10vh', left: '52vw', tilt: '-5deg', delay: '2.8s' },
  { name: 'Google Drive', top: '9.5vh', left: '76vw', tilt: '6deg', delay: '0.9s' },

  // Row 2 (mid-top staggered ~17.5vh - 18.5vh)
  { name: 'Slack', top: '18vh', left: '14vw', tilt: '6deg', delay: '1.1s' },
  { name: 'LinkedIn', top: '18.5vh', left: '39vw', tilt: '-7deg', delay: '2.5s' },
  { name: 'Calendly', top: '18vh', left: '64vw', tilt: '7deg', delay: '0.6s' },
  { name: 'Dropbox', top: '18.5vh', left: '88vw', tilt: '-6deg', delay: '3.1s' },

  // Bottom Safe Zone (below shrunk card & moving text: 76vh - 86vh)
  // Row 3 (mid-bottom staggered ~76vh - 77vh)
  { name: 'Notion', top: '76.5vh', left: '4vw', tilt: '5deg', delay: '2.2s' },
  { name: 'Airtable', top: '76vh', left: '18vw', tilt: '-6deg', delay: '0.4s' },
  { name: 'Mailchimp', top: '76.5vh', left: '52vw', tilt: '5deg', delay: '3.4s' },
  { name: 'Stripe', top: '76vh', left: '76vw', tilt: '-6deg', delay: '0.8s' },

  // Row 4 (low staggered ~84.5vh - 85.5vh)
  { name: 'Zapier', top: '84.5vh', left: '14vw', tilt: '-7deg', delay: '1.7s' },
  { name: 'Salesforce', top: '85vh', left: '39vw', tilt: '6deg', delay: '1.8s' },
  { name: 'Google Calendar', top: '84.5vh', left: '64vw', tilt: '-5deg', delay: '1.2s' },
  { name: 'MYOB', top: '85vh', left: '88vw', tilt: '7deg', delay: '2.9s' },
];

const JENNY_BULLET_POINTS = [
  {
    title: 'Instant 24/7 Call Answering',
    desc: 'Sub-second pickup with natural, human-level conversational intelligence.',
    icon: PhoneCall,
  },
  {
    title: 'Autonomous Lead Qualification',
    desc: 'Live assessment of caller intent, budget scope, urgency, and decision authority.',
    icon: ShieldCheck,
  },
  {
    title: 'Direct Calendar Scheduling',
    desc: 'Instantly books confirmed slots across Google Calendar, Calendly, and Outlook.',
    icon: Calendar,
  },
  {
    title: 'Real-Time CRM & SMS Sync',
    desc: 'Logs call audio, structured notes, and next actions directly into HubSpot & Salesforce.',
    icon: Database,
  },
  {
    title: 'Warm Human Rep Escalation',
    desc: 'Seamlessly transfers VIP accounts and high-intent callers to your team in real time.',
    icon: Users,
  },
  {
    title: 'Automated Post-Call Follow-Up',
    desc: 'Dispatches instant branded confirmation SMS texts and recap emails automatically.',
    icon: MessageSquare,
  },
  {
    title: 'Company Knowledge Retrieval',
    desc: 'Accurately answers complex pricing, product, and policy questions from your docs.',
    icon: BookOpen,
  },
];

const OLIVIA_BULLET_POINTS = [
  {
    title: 'Autonomous ICP Lead Discovery',
    desc: 'Identifies and verifies high-value decision-makers matching your ideal customer profile.',
    icon: Target,
  },
  {
    title: 'Hyper-Personalized Cold Calls',
    desc: 'Executes natural outbound voice conversations tailored to prospect role and industry.',
    icon: PhoneCall,
  },
  {
    title: 'Dynamic Objection Handling',
    desc: 'Fluidly overcomes timing hesitations, budget pushbacks, and competitor comparisons.',
    icon: Zap,
  },
  {
    title: 'Multi-Touch Nurture Sequences',
    desc: 'Orchestrates synchronized phone, email, and SMS touchpoints until interest is confirmed.',
    icon: Layers,
  },
  {
    title: 'Autonomous Demo Booking',
    desc: "Secures qualified sales meetings directly onto your closers' live calendars 24/7.",
    icon: Calendar,
  },
  {
    title: 'Closed-Loop Pipeline Updates',
    desc: 'Automatically advances deal stages, logs next actions, and writes deal summaries.',
    icon: TrendingUp,
  },
  {
    title: 'Self-Optimizing Pitch Intelligence',
    desc: 'Analyzes call outcomes and continuously refines conversation angles for higher win rates.',
    icon: Cpu,
  },
];

export default function Hero({ onOpenDemo, onOpenCalculator }) {
  const [activeAgent, setActiveAgent] = useState(null); // 'jenny' | 'olivia' | null
  const [closingAgent, setClosingAgent] = useState(null); // 'jenny' | 'olivia' | null
  const [mobileAgentTab, setMobileAgentTab] = useState('jenny'); // 'jenny' | 'olivia'
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);
  const autonomousRef = useRef(null);
  const crossRef = useRef(null);
  const heroRef = useRef(null);

  // Pinned Zoom-out & Fixed Dual-Agent Scroll Refs
  const trackRef = useRef(null);
  const cardRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const bigTextRef = useRef(null);
  const videoRef = useRef(null);
  const movingTextRef = useRef(null);
  const pillsRef = useRef(null);
  const jennyClusterRef = useRef(null);
  const oliviaClusterRef = useRef(null);
  const agentsStageRef = useRef(null);
  const pointsWrapRef = useRef(null);
  const activeAgentRef = useRef(activeAgent);
  const mobileAgentTabRef = useRef(mobileAgentTab);
  const isMobileRef = useRef(isMobile);

  useEffect(() => {
    activeAgentRef.current = activeAgent;
  }, [activeAgent]);

  useEffect(() => {
    mobileAgentTabRef.current = mobileAgentTab;
  }, [mobileAgentTab]);

  useEffect(() => {
    isMobileRef.current = isMobile;
  }, [isMobile]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectMobileAgent = (agentName) => {
    setMobileAgentTab(agentName);
    if (activeAgent && activeAgent !== agentName) {
      setActiveAgent(null);
    }
    if (trackRef.current) {
      const rect = trackRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalScrollable = rect.height - windowH;
      if (totalScrollable > 0) {
        // Jenny is stationed at ~0.39, Olivia at ~0.68
        const targetProgress = agentName === 'jenny' ? 0.39 : 0.68;
        const currentScroll = window.scrollY;
        const trackTopDoc = rect.top + currentScroll;
        const targetScroll = trackTopDoc + totalScrollable * targetProgress;
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }
  };

  // Smooth agent close handler: fades out bullet points and moves other agent in
  const handleToggleAgent = (agentName) => {
    if (closingAgent) return;
    if (activeAgent === agentName) {
      setClosingAgent(agentName);
      setTimeout(() => {
        setActiveAgent(null);
        setClosingAgent(null);
      }, 380);
    } else {
      setActiveAgent(agentName);
      setClosingAgent(null);
    }
  };

  // 60fps/120fps Scrub Sequence:
  // Phase 1: Hero Section Zooms Out (0.00 -> 0.14)
  // Phase 2: Automate Viewing Window (0.14 -> 0.26)
  // Phase 3: Transition to Jenny & Olivia in 2 scrolls (0.26 -> 0.42)
  // Phase 4: Jenny & Olivia Stationed & Interactive (0.42 -> 1.00) - No fade, no shift!
  useLayoutEffect(() => {
    let animationFrameId = null;

    const handleScroll = () => {
      if (!trackRef.current || !cardRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalScrollable = rect.height - windowH;
      if (totalScrollable <= 0) return;

      // Progress: 0.0 at top of hero track, 1.0 at bottom of hero track
      const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);

      // -------------------------------------------------------------
      // PHASE 1: Hero Zoom-Out & Fade-Out (progress 0.00 -> 0.14)
      // Card scales down (1.0 -> 0.45) AND fades out (1.0 -> 0.0)
      // so the background text behind it becomes completely visible!
      // -------------------------------------------------------------
      const zoomProgress = Math.min(progress / 0.14, 1);
      const scale = 1 - zoomProgress * 0.55; // 1.0 -> 0.45
      const radius = zoomProgress * 36;
      const shadowAlpha = (1 - zoomProgress) * 0.45;

      // Hero section fades out smoothly in tandem with the zoom
      const heroOpacity = Math.max(1 - zoomProgress * 1.15, 0);

      // Stage exit fade & translation when transitioning to Dual Agents (progress > 0.26)
      let stageExitY = 0;
      let stageExitOpacity = 1;
      if (progress > 0.26) {
        const fadeP = Math.min((progress - 0.26) / 0.10, 1);
        stageExitOpacity = Math.max(1 - fadeP, 0);
        stageExitY = -(fadeP * 100);
      }

      cardRef.current.style.transform = `scale(${scale}) translateY(${stageExitY}px)`;
      cardRef.current.style.borderRadius = `${radius}px`;
      cardRef.current.style.boxShadow = `0 30px 80px rgba(0, 0, 0, ${shadowAlpha}), 0 0 0 1px rgba(255, 255, 255, ${(1 - zoomProgress) * 0.35})`;
      cardRef.current.style.opacity = `${heroOpacity}`;
      cardRef.current.style.pointerEvents = heroOpacity < 0.08 ? 'none' : 'auto';
      cardRef.current.style.visibility = heroOpacity === 0 ? 'hidden' : 'visible';

      // Background moving text stack (Lines 1 & 2)
      if (movingTextRef.current) {
        const textEnterOpacity = Math.min(progress / 0.08, 1);
        const movingOpacity = textEnterOpacity * stageExitOpacity;
        movingTextRef.current.style.opacity = `${movingOpacity}`;
        movingTextRef.current.style.transform = `translateY(calc(-50% + ${stageExitY}px))`;
      }

      // Background text appearing from LEFT (Line 1) and RIGHT (Line 2) on scroll
      if (line1Ref.current && line2Ref.current) {
        const travelDistance = Math.max(window.innerWidth * 0.7, 650);
        const scrubProgress = Math.min(progress / 0.30, 1.35);

        // Line 1: Starts shifted off to the left and moves right on scroll
        const line1X = -travelDistance + scrubProgress * (travelDistance * 1.35);

        // Line 2: Starts shifted off to the right and moves left on scroll
        const line2X = travelDistance - scrubProgress * (travelDistance * 1.35);

        line1Ref.current.style.transform = `translate3d(${line1X}px, 0, 0)`;
        line2Ref.current.style.transform = `translate3d(${line2X}px, 0, 0)`;
      }

      // Red signature text: "Automate"
      if (bigTextRef.current) {
        const textScale = 0.8 + zoomProgress * 0.2;
        const textOpacity = zoomProgress * stageExitOpacity;
        bigTextRef.current.style.opacity = `${textOpacity}`;
        bigTextRef.current.style.transform = `translate(-50%, calc(-50% + ${stageExitY}px)) scale(${textScale}) rotate(-25deg)`;
      }

      // Floating company logos in Automate section
      if (pillsRef.current) {
        const pillsOpacity = zoomProgress * stageExitOpacity;
        pillsRef.current.style.opacity = `${pillsOpacity}`;
        pillsRef.current.style.transform = `translateY(${stageExitY}px)`;
      }

      // -------------------------------------------------------------
      // PHASE 3: Dual Agents Reveal (Jenny from Left, Olivia from Right)
      // They slide in horizontally from off-screen over the Fixed Cream Background.
      // Once docked, they stay locked at translateY(0px) and never move or fade!
      // -------------------------------------------------------------
      if (agentsStageRef.current) {
        if (progress < 0.25) {
          agentsStageRef.current.style.opacity = '0';
          agentsStageRef.current.style.pointerEvents = 'none';
        } else {
          agentsStageRef.current.style.opacity = '1';
          agentsStageRef.current.style.pointerEvents = 'auto';
        }
      }

      if (jennyClusterRef.current && oliviaClusterRef.current) {
        if (isMobileRef.current) {
          // =========================================================
          // MOBILE: Jenny and Olivia appear ONE BY ONE sequentially on scroll!
          // Phase 3A: Jenny arrives (0.26 -> 0.36), stations (0.36 -> 0.50), exits (0.50 -> 0.58)
          // Phase 3B: Olivia arrives (0.58 -> 0.68), stations (0.68 -> 0.88), exits (0.88 -> 0.98)
          // =========================================================
          if (progress < 0.25) {
            jennyClusterRef.current.style.transform = 'translateX(-115vw) translateY(0px)';
            jennyClusterRef.current.style.opacity = '0';
            oliviaClusterRef.current.style.transform = 'translateX(115vw) translateY(0px)';
            oliviaClusterRef.current.style.opacity = '0';
            if (mobileAgentTabRef.current !== 'jenny') {
              setMobileAgentTab('jenny');
            }
          } else if (progress < 0.53) {
            // JENNY ACTIVE
            if (mobileAgentTabRef.current !== 'jenny') {
              setMobileAgentTab('jenny');
            }
            if (activeAgentRef.current === 'olivia') {
              setActiveAgent(null);
            }

            // Olivia is off-screen
            oliviaClusterRef.current.style.transform = 'translateX(120vw) translateY(0px)';
            oliviaClusterRef.current.style.opacity = '0';

            if (progress < 0.33) {
              // Jenny entering from left
              const enterP = Math.min((progress - 0.25) / 0.08, 1);
              const ease = 1 - Math.pow(1 - enterP, 3);
              const jX = -(1 - ease) * 100;
              const jOp = Math.min(enterP * 1.6, 1);
              jennyClusterRef.current.style.transform = `translateX(${jX}vw) translateY(0px)`;
              jennyClusterRef.current.style.opacity = `${jOp}`;
            } else if (progress <= 0.46) {
              // Jenny stationed in center
              jennyClusterRef.current.style.transform = 'translateX(0vw) translateY(0px)';
              jennyClusterRef.current.style.opacity = '1';
            } else {
              // Jenny exiting smoothly to left
              const exitP = Math.min((progress - 0.46) / 0.07, 1);
              const jX = -exitP * 100;
              const jOp = Math.max(1 - exitP * 1.4, 0);
              jennyClusterRef.current.style.transform = `translateX(${jX}vw) translateY(0px)`;
              jennyClusterRef.current.style.opacity = `${jOp}`;
              if (activeAgentRef.current === 'jenny') {
                setActiveAgent(null);
              }
            }
          } else {
            // OLIVIA ACTIVE (progress >= 0.53)
            if (mobileAgentTabRef.current !== 'olivia') {
              setMobileAgentTab('olivia');
            }
            if (activeAgentRef.current === 'jenny') {
              setActiveAgent(null);
            }

            // Jenny is off-screen
            jennyClusterRef.current.style.transform = 'translateX(-120vw) translateY(0px)';
            jennyClusterRef.current.style.opacity = '0';

            if (progress < 0.62) {
              // Olivia entering from right
              const enterP = Math.min((progress - 0.53) / 0.09, 1);
              const ease = 1 - Math.pow(1 - enterP, 3);
              const oX = (1 - ease) * 100;
              const oOp = Math.min(enterP * 1.6, 1);
              oliviaClusterRef.current.style.transform = `translateX(${oX}vw) translateY(0px)`;
              oliviaClusterRef.current.style.opacity = `${oOp}`;
            } else if (progress <= 0.77) {
              // Olivia stationed in center
              oliviaClusterRef.current.style.transform = 'translateX(0vw) translateY(0px)';
              oliviaClusterRef.current.style.opacity = '1';
            } else {
              // Olivia subtle fade as next section approaches
              const exitP = Math.min((progress - 0.77) / 0.10, 1);
              const oOp = Math.max(1 - exitP * 1.3, 0);
              oliviaClusterRef.current.style.transform = `translateX(0vw) translateY(${exitP * 25}px)`;
              oliviaClusterRef.current.style.opacity = `${oOp}`;
              if (activeAgentRef.current === 'olivia' && progress > 0.85) {
                setActiveAgent(null);
              }
            }
          }
        } else {
          // DESKTOP: dual agents docked side-by-side
          if (progress < 0.26) {
            jennyClusterRef.current.style.transform = 'translateX(-115vw) translateY(0px)';
            jennyClusterRef.current.style.opacity = '0';
            oliviaClusterRef.current.style.transform = 'translateX(115vw) translateY(0px)';
            oliviaClusterRef.current.style.opacity = '0';
          } else {
            const enterP = Math.min((progress - 0.26) / 0.16, 1);
            const ease = 1 - Math.pow(1 - enterP, 3);
            const jennyX = -(1 - ease) * 115;
            const oliviaX = (1 - ease) * 115;
            const agentOpacity = Math.min(enterP * 1.8, 1);

            jennyClusterRef.current.style.transform = `translateX(${jennyX}vw) translateY(0px)`;
            jennyClusterRef.current.style.opacity = `${agentOpacity}`;
            oliviaClusterRef.current.style.transform = `translateX(${oliviaX}vw) translateY(0px)`;
            oliviaClusterRef.current.style.opacity = `${agentOpacity}`;
          }
        }
      }

      // Reset activeAgent only if user scrolls back UP past the agents entrance
      if (activeAgentRef.current && progress < 0.24) {
        setActiveAgent(null);
      }
    };

    const onScroll = () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={trackRef} className="hero-scroll-track">
      <div className="hero-sticky-frame">
        {/* Revealed Cream Theme Background with Misty Blue Floating Auras */}
        <div className="hero-revealed-white-bg" aria-hidden="true">
          {/* Floating Misty Blue Auras in places */}
          <div className="misty-blue-glow misty-glow-1" />
          <div className="misty-blue-glow misty-glow-2" />
          <div className="misty-blue-glow misty-glow-3" />

          {/* Dotted Pills of Companies Scattered Around Shrunk Hero Card (Automate Section) */}
          <div ref={pillsRef} className="hero-scattered-pills-wrap" style={{ opacity: 0 }}>
            {SCATTERED_COMPANIES.map((item, idx) => (
              <div
                key={idx}
                className="hero-dotted-pill"
                style={{
                  top: item.top,
                  left: item.left,
                  '--pill-tilt': item.tilt,
                  animationDelay: item.delay,
                }}
              >
                <span className="pill-logo">
                  <CompanyLogo name={item.name} />
                </span>
                <span className="pill-name">{item.name}</span>
              </div>
            ))}
          </div>

          {/* Stack of Moving Text Lines Centered Directly Behind Shrunk Hero Card With Zero Spacing */}
          <div ref={movingTextRef} className="hero-bg-text-stack" style={{ opacity: 0 }}>
            {/* Line 1: Appears from Left on scroll */}
            <div className="hero-bg-text-line hero-bg-line-1">
              <div ref={line1Ref} className="hero-bg-text-track">
                <span>
                  AUTONOMOUS REVENUE ENGINE • 24/7 AI SALES AGENTS • INSTANT QUALIFICATION • ZERO LATENCY CLOSING • SELF-DRIVING WORKFLOWS •&nbsp;
                </span>
                <span>
                  AUTONOMOUS REVENUE ENGINE • 24/7 AI SALES AGENTS • INSTANT QUALIFICATION • ZERO LATENCY CLOSING • SELF-DRIVING WORKFLOWS •&nbsp;
                </span>
              </div>
            </div>

            {/* Line 2: Appears from Right on scroll */}
            <div className="hero-bg-text-line hero-bg-line-2">
              <div ref={line2Ref} className="hero-bg-text-track">
                <span>
                  INTELLIGENT PIPELINE • NEXT-GEN CONVERSATIONAL AI • HIGHER CONVERSIONS • HYPER-PERSONALIZED OUTREACH • CLOSED-LOOP AUTOMATION •&nbsp;
                </span>
                <span>
                  INTELLIGENT PIPELINE • NEXT-GEN CONVERSATIONAL AI • HIGHER CONVERSIONS • HYPER-PERSONALIZED OUTREACH • CLOSED-LOOP AUTOMATION •&nbsp;
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* The Zooming-Out Hero Section Card */}
        <div ref={cardRef} className="hero-zoom-card">
          <section id="home" ref={heroRef} className="hero-cream-section">
            {/* Exact CodeGrid Interactive Fluid Gradient from jobgen-candidates.vercel.app (No contour lines per user request) */}
            <FluidGradientBackground />

            <div className="container hero-cream-container">
              {/* Left Side: Bold Thick Tall AUTONOMOUS BUSINESS Headline with Word-by-Word Load Reveal */}
              <div className="hero-cream-left">
                <h1 className="hero-cream-headline">
                  <span className="hero-handwritten-lead">
                    <span className="hero-word hero-word-1">Make</span>{' '}
                    <span className="hero-word hero-word-2">Your</span>{' '}
                    <span className="hero-word hero-word-3">Own</span>
                  </span>
                  <span ref={autonomousRef} className="hero-cream-headline-line">
                    <span className="hero-word hero-word-4">AUTONOMOUS</span>
                  </span>
                  <span className="hero-cream-headline-line hero-cream-headline-white">
                    <span className="hero-word hero-word-5">BUSINESS</span>
                  </span>
                </h1>

                <div className="hero-cream-cta-row hero-cta-load-fade">
                  <button
                    type="button"
                    onClick={onOpenDemo}
                    className="btn-cream-hero-cta"
                  >
                    <span>Book Free Demo</span>
                    <div className="btn-cream-hero-arrow">
                      <ArrowRight size={15} />
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={onOpenCalculator}
                    className="btn-cream-secondary-cta"
                  >
                    <Calculator size={15} style={{ marginRight: '6px' }} />
                    <span>Calculate Waiting Cost</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side: Hero Image Slowly Rising from Bottom on Page Load */}
            <div className="hero-image-bottom-anchor hero-image-load-rise">
              <img
                src="/assets/hero.png"
                alt="JobGen Autonomous Business"
                className="hero-image-direct"
              />
            </div>

            {/* Subtle Glow Dot Matrix Diagonal Cross 'X' at Bottom Right Corner */}
            <div ref={crossRef} className="hero-dot-matrix-cross" aria-hidden="true">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <filter id="whiteNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur1" />
                    <feMerge>
                      <feMergeNode in="blur1" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Diagonal Cross 'X' Dots Only - Refined Subtle Glow */}
                <g filter="url(#whiteNeonGlow)">
                  {[-23, -16.5, -10, -4.5, 4.5, 10, 16.5, 23].map((s) => (
                    <React.Fragment key={s}>
                      {/* Top-Left to Bottom-Right (\) */}
                      <circle
                        cx={32 + s}
                        cy={32 + s}
                        r="4.2"
                        fill="#FFFFFF"
                      />
                      {/* Bottom-Left to Top-Right (/) */}
                      <circle
                        cx={32 + s}
                        cy={32 - s}
                        r="4.2"
                        fill="#FFFFFF"
                      />
                    </React.Fragment>
                  ))}
                  {/* Center Intersection Dot */}
                  <circle cx="32" cy="32" r="5.2" fill="#FFFFFF" />
                </g>
              </svg>
            </div>
          </section>
        </div>

        {/* The Next Section: Dual Agents (Jenny & Olivia) Sliding In From Off-Screen */}
        <div ref={agentsStageRef} className="agents-stage" style={{ opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
          {/* Architectural City Skyline attached to bottom over the animated background */}
          <div className="agents-city-backdrop" aria-hidden="true">
            <img
              src="/assets/city.png"
              alt="City Skyline"
              className={`agents-city-img ${activeAgent && !closingAgent ? 'is-dimmed' : ''}`}
            />
          </div>

          {/* Mobile Agent Pill Switcher (Shown on screens <= 768px) */}
          <div className="mobile-agent-toggle-bar">
            <button
              type="button"
              className={`mobile-agent-tab-btn ${mobileAgentTab === 'jenny' ? 'is-active' : ''}`}
              onClick={() => handleSelectMobileAgent('jenny')}
            >
              <span className="mobile-tab-avatar-dot dot-jenny" />
              <span>Jenny · Reception</span>
            </button>
            <button
              type="button"
              className={`mobile-agent-tab-btn ${mobileAgentTab === 'olivia' ? 'is-active' : ''}`}
              onClick={() => handleSelectMobileAgent('olivia')}
            >
              <span className="mobile-tab-avatar-dot dot-olivia" />
              <span>Olivia · Sales</span>
            </button>
          </div>

          {/* Left Cluster: Jenny on Left */}
          <div
            ref={jennyClusterRef}
            style={{ transform: 'translateX(-115vw) translateY(0px)', opacity: 0 }}
            className={`agent-cluster agent-cluster-left ${
              activeAgent === 'olivia' && closingAgent !== 'olivia'
                ? 'agent-cluster-hidden-left'
                : ''
            }`}
          >
            <div className="agent-image-wrap">
              <picture className="agent-picture-cutout">
                <source media="(max-width: 768px)" srcSet="/assets/Jenny.png" />
                <img
                  src="/assets/jesss.png"
                  alt="Jenny"
                  className="agent-cutout-img agent-cutout-jesss"
                />
              </picture>
            </div>
            <div className="agent-info-block agent-info-jenny">
              <span className="agent-name-cursive">Jenny</span>
              <h2 className="agent-role-tall">Receptionist</h2>
              <div className="agent-desc-sub">
                <span>Inbound Sales</span>
              </div>
              <button
                type="button"
                className={`btn-agent-action ${
                  activeAgent === 'jenny' && closingAgent !== 'jenny' ? 'is-active' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleAgent('jenny');
                }}
                aria-label={activeAgent === 'jenny' ? 'Close details' : 'Explore Jenny'}
              >
                <ArrowRight size={18} strokeWidth={2.4} />
              </button>
            </div>
          </div>

          {/* Right Cluster: Olivia on Right */}
          <div
            ref={oliviaClusterRef}
            style={{ transform: 'translateX(115vw) translateY(0px)', opacity: 0 }}
            className={`agent-cluster agent-cluster-right ${
              activeAgent === 'jenny' && closingAgent !== 'jenny'
                ? 'agent-cluster-hidden-right'
                : ''
            }`}
          >
            <div className="agent-info-block agent-info-olivia">
              <span className="agent-name-cursive">Olivia</span>
              <h2 className="agent-role-tall">Sales Agent</h2>
              <div className="agent-desc-sub">
                <span>Outbound Sales</span>
              </div>
              <button
                type="button"
                className={`btn-agent-action ${
                  activeAgent === 'olivia' && closingAgent !== 'olivia' ? 'is-active' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleAgent('olivia');
                }}
                aria-label={activeAgent === 'olivia' ? 'Close details' : 'Explore Olivia'}
              >
                <ArrowRight size={18} strokeWidth={2.4} />
              </button>
            </div>
            <div className="agent-image-wrap">
              <picture className="agent-picture-cutout">
                <source media="(max-width: 768px)" srcSet="/assets/olivia.png" />
                <img
                  src="/assets/olivias.png"
                  alt="Olivia"
                  className="agent-cutout-img agent-cutout-olivias"
                />
              </picture>
            </div>
          </div>

          {/* When Jenny is clicked: Olivia disappears on the right, and Jenny's bullet points appear on the right! */}
          {(activeAgent === 'jenny' || closingAgent === 'jenny') && (
            <div
              ref={pointsWrapRef}
              className={`agent-text-points-wrap agent-points-right ${
                closingAgent === 'jenny' ? 'is-closing' : ''
              }`}
            >
              <div className="agent-points-mobile-bar">
                <span className="agent-points-mobile-title">Jenny • Core Capabilities</span>
                <button
                  type="button"
                  onClick={() => handleToggleAgent('jenny')}
                  className="agent-points-close-btn"
                  aria-label="Close Jenny capabilities"
                >
                  <X size={18} />
                </button>
              </div>
              {JENNY_BULLET_POINTS.map((pt, idx) => {
                const IconComp = pt.icon || PhoneCall;
                return (
                  <div
                    key={idx}
                    className="agent-text-point-item"
                    style={{ animationDelay: `${0.05 + idx * 0.07}s` }}
                  >
                    <div className="point-favicon-glass-circle" aria-hidden="true">
                      <IconComp size={16} className="point-favicon-icon" />
                    </div>
                    <div className="point-text-content">
                      <strong className="point-bold-title">{pt.title}</strong>
                      <span className="point-desc-text"> — {pt.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* When Olivia is clicked: Jenny disappears on the left, and Olivia's bullet points appear on the left! */}
          {(activeAgent === 'olivia' || closingAgent === 'olivia') && (
            <div
              ref={pointsWrapRef}
              className={`agent-text-points-wrap agent-points-left ${
                closingAgent === 'olivia' ? 'is-closing' : ''
              }`}
            >
              <div className="agent-points-mobile-bar">
                <span className="agent-points-mobile-title">Olivia • Outbound Capabilities</span>
                <button
                  type="button"
                  onClick={() => handleToggleAgent('olivia')}
                  className="agent-points-close-btn"
                  aria-label="Close Olivia capabilities"
                >
                  <X size={18} />
                </button>
              </div>
              {OLIVIA_BULLET_POINTS.map((pt, idx) => {
                const IconComp = pt.icon || Target;
                return (
                  <div
                    key={idx}
                    className="agent-text-point-item"
                    style={{ animationDelay: `${0.05 + idx * 0.07}s` }}
                  >
                    <div className="point-favicon-glass-circle" aria-hidden="true">
                      <IconComp size={16} className="point-favicon-icon" />
                    </div>
                    <div className="point-text-content">
                      <strong className="point-bold-title">{pt.title}</strong>
                      <span className="point-desc-text"> — {pt.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
