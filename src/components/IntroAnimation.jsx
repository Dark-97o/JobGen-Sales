import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = [
  'Hello',
  'Bonjour',
  'Ciao',
  'Olà',
  'やあ',
  'Hallå',
  'Guten tag',
  'Hallo',
];

const wordVariants = {
  initial: { opacity: 0, y: 10 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.16, ease: 'easeIn' } },
};

export default function IntroAnimation({
  words = WORDS,
  backgroundColor = '#141516',
  textColor = '#FFFFFF',
  firstWordDelay = 350,
  wordInterval = 110,
  onComplete,
  className = '',
  style = {},
}) {
  const [hasPlayed] = useState(() => {
    try {
      return sessionStorage.getItem('jobgen_hello_intro_played') === 'true';
    } catch {
      return false;
    }
  });

  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(hasPlayed);

  useEffect(() => {
    const updateDimension = () => {
      setDimension({
        width: typeof window !== 'undefined' ? window.innerWidth : 1920,
        height: typeof window !== 'undefined' ? window.innerHeight : 1080,
      });
    };
    updateDimension();
    window.addEventListener('resize', updateDimension);
    return () => window.removeEventListener('resize', updateDimension);
  }, []);

  useEffect(() => {
    if (isFinished) return;

    if (isExiting) {
      document.body.style.overflow = '';
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.start();
        window.lenis.resize();
      }
    } else {
      document.body.style.overflow = 'hidden';
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.stop();
      }
    }

    return () => {
      document.body.style.overflow = '';
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.start();
        window.lenis.resize();
      }
    };
  }, [isExiting, isFinished]);

  useEffect(() => {
    if (isFinished) return;

    if (index === words.length - 1) {
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
        try {
          sessionStorage.setItem('jobgen_hello_intro_played', 'true');
        } catch {}

        const completeTimer = setTimeout(() => {
          setIsFinished(true);
          onComplete?.();
        }, 650);
        return () => clearTimeout(completeTimer);
      }, 120);
      return () => clearTimeout(exitTimer);
    }

    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, index === 0 ? firstWordDelay : wordInterval);

    return () => clearTimeout(timer);
  }, [index, words.length, firstWordDelay, wordInterval, isFinished, onComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    try {
      sessionStorage.setItem('jobgen_hello_intro_played', 'true');
    } catch {}
    setTimeout(() => {
      setIsFinished(true);
      onComplete?.();
    }, 350);
  };

  useEffect(() => {
    if (isFinished) return;
    const handleKeyDown = (e) => {
      if (['Escape', ' ', 'Enter'].includes(e.key)) {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFinished]);

  if (isFinished) return null;

  const w = dimension.width || (typeof window !== 'undefined' ? window.innerWidth : 1920);
  const h = dimension.height || (typeof window !== 'undefined' ? window.innerHeight : 1080);
  const g = Math.max(220, Math.min(Math.round(w * 0.32), 650));

  const initialPath = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + g} 0 ${h} L0 0`;
  const exitPath = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h} 0 ${h} L0 0`;

  const curveVariants = {
    initial: {
      d: initialPath,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: exitPath,
      transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1], delay: 0.15 },
    },
  };

  const slideUpVariants = {
    initial: { top: 0 },
    exit: {
      top: `calc(-100vh - ${g}px)`,
      transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1], delay: 0.08 },
    },
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          variants={slideUpVariants}
          initial="initial"
          exit="exit"
          className={`skiper8-preloader ${className}`}
          onClick={handleSkip}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            backgroundColor: 'transparent',
            overflow: 'visible',
            pointerEvents: 'auto',
            userSelect: 'none',
            cursor: 'pointer',
            ...style,
          }}
        >
          {w > 0 && (
            <>
              <div
                style={{
                  position: 'absolute',
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.p
                    key={words[index]}
                    variants={wordVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    style={{
                      fontFamily:
                        '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: 'clamp(36px, 5vw, 64px)',
                      fontWeight: 700,
                      letterSpacing: '-0.035em',
                      color: textColor,
                      margin: 0,
                      padding: 0,
                      textAlign: 'center',
                    }}
                  >
                    {words[index]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <svg
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `calc(100% + ${g}px)`,
                  overflow: 'visible',
                  pointerEvents: 'none',
                }}
              >
                <motion.path
                  variants={curveVariants}
                  initial="initial"
                  exit="exit"
                  fill={backgroundColor}
                />
              </svg>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
