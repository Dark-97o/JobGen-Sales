import React, { useState, useEffect, useRef } from 'react';

export default function IntroAnimation() {
  const [isPlaying, setIsPlaying] = useState(() => {
    try {
      return sessionStorage.getItem('jobgen_sales_intro_played') !== 'true';
    } catch {
      return false;
    }
  });
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef(null);
  const fadeTimerRef = useRef(null);
  const removeTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      if (removeTimerRef.current) clearTimeout(removeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      try {
        sessionStorage.setItem('jobgen_sales_intro_played', 'true');
      } catch {}

      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.volume = 0;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    }
  }, [isPlaying]);

  const handleEnded = () => {
    try {
      sessionStorage.setItem('jobgen_sales_intro_played', 'true');
    } catch {}
    fadeTimerRef.current = setTimeout(() => {
      setIsFadingOut(true);
      removeTimerRef.current = setTimeout(() => {
        setIsPlaying(false);
      }, 450);
    }, 1000);
  };

  const handleError = () => {
    try {
      sessionStorage.setItem('jobgen_sales_intro_played', 'true');
    } catch {}
    setIsPlaying(false);
  };

  const handleSkip = () => {
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    if (removeTimerRef.current) clearTimeout(removeTimerRef.current);
    setIsFadingOut(true);
    try {
      sessionStorage.setItem('jobgen_sales_intro_played', 'true');
    } catch {}
    removeTimerRef.current = setTimeout(() => {
      setIsPlaying(false);
    }, 300);
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (isPlaying && ['Escape', ' ', 'Enter'].includes(e.key)) {
        handleSkip();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isPlaying]);

  if (!isPlaying) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isFadingOut ? 0 : 1,
        pointerEvents: isFadingOut ? 'none' : 'auto',
        transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden',
      }}
    >
      <video
        ref={videoRef}
        src="/intronew.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        onError={handleError}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <button
        type="button"
        onClick={handleSkip}
        aria-label="Skip intro"
        style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          zIndex: 100000,
          background: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          color: '#FFFFFF',
          borderRadius: '9999px',
          padding: '8px 18px',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        Skip Intro ✕
      </button>
    </div>
  );
}
