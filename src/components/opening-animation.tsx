import React, { useEffect, useState, useRef, FC, useMemo, useCallback } from 'react';
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from 'framer-motion';
import { OpeningAnimationProps } from '@/types';

const LETTERS = ['n', 'i', 'k', 'k', 'o', 'u'];

const OpeningAnimation: FC<OpeningAnimationProps> = ({ onAnimationComplete }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const [step, setStep] = useState(0);
  const [backgroundFill, setBackgroundFill] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const oppositeTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
  const backgroundColor = oppositeTheme === 'dark' ? '#0a0a0a' : '#ffffff';
  const themeBackgroundColor = resolvedTheme === 'dark' ? '#0a0a0a' : '#ffffff';
  const customEasing = useMemo<[number, number, number, number]>(() => [0.19, 1, 0.22, 1], []);

  const popPalette = useMemo(
    () =>
      oppositeTheme === 'dark'
        ? ['#ff4d8d', '#ffd166', '#7dd3fc', '#b8f97d', '#c084fc', '#fb7185']
        : ['#ec4899', '#f59e0b', '#0ea5e9', '#22c55e', '#8b5cf6', '#ef4444'],
    [oppositeTheme]
  );

  const cubicBezier = useCallback((x1: number, y1: number, x2: number, y2: number, t: number): number => {
    const cx = 3 * x1;
    const bx = 3 * (x2 - x1) - cx;
    const ax = 1 - cx - bx;
    const cy = 3 * y1;
    const by = 3 * (y2 - y1) - cy;
    const ay = 1 - cy - by;
    const sampleCurveX = (t: number): number => ((ax * t + bx) * t + cx) * t;
    const sampleCurveY = (t: number): number => ((ay * t + by) * t + cy) * t;
    const sampleCurveDerivativeX = (t: number): number => (3 * ax * t + 2 * bx) * t + cx;
    const findX = (x: number): number => {
      const t0 = 0, t1 = 1;
      let t2 = x;
      if (x === 0) return 0;
      if (x === 1) return 1;
      for (let i = 0; i < 16; i++) {
        const cx = sampleCurveX(t2);
        if (Math.abs(cx - x) < 0.0001) return t2;
        const dx = sampleCurveDerivativeX(t2);
        if (Math.abs(dx) < 1e-6) break;
        t2 = t2 - (cx - x) / dx;
        t2 = Math.max(t0, Math.min(t1, t2));
      }
      return t2;
    };
    return sampleCurveY(findX(t));
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 200),
      setTimeout(() => setStep(2), 1000),
      setTimeout(() => setStep(3), 1100),
      setTimeout(() => setStep(4), 1700),
      setTimeout(() => {
        const startTime = Date.now();
        const duration = 900;
        const interval = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = cubicBezier(0.4, 0, 0.2, 1, progress);
          setBackgroundFill(eased * 100);
          if (progress >= 1) {
            clearInterval(interval);
            setStep(5);
          }
        }, 16);
      }, 1700),
      setTimeout(() => {
        setOpacity(0);
        setTimeout(() => {
          if (onAnimationComplete) onAnimationComplete();
        }, 600);
      }, 2700),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, [resolvedTheme, onAnimationComplete, customEasing, cubicBezier]);

  const sparkles = useMemo(() => {
    return Array.from({ length: isMobile ? 16 : 28 }).map((_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 4 + Math.random() * (isMobile ? 6 : 10),
      delay: Math.random() * 2,
      duration: 1.5 + Math.random() * 2,
      color: popPalette[i % popPalette.length],
    }));
  }, [isMobile, popPalette]);

  return (
    <>
      {mounted && (
        <AnimatePresence>
          <motion.div
            ref={containerRef}
            initial={{ opacity: 1, backgroundColor: themeBackgroundColor }}
            animate={{ opacity, backgroundColor }}
            transition={{
              opacity: { duration: 0.6, ease: customEasing },
              backgroundColor: { delay: 0.2, duration: 0.8, ease: customEasing }
            }}
            style={{
              position: 'fixed',
              top: 0, left: 0,
              width: '100vw', height: '100vh',
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              overflow: 'hidden',
              backgroundColor: themeBackgroundColor,
            }}
          >
            {step >= 1 && step < 5 && sparkles.map((s, i) => (
              <motion.div
                key={`sparkle-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0.3, 1, 0],
                  scale: [0, 1, 0.6, 1.1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: s.duration,
                  delay: s.delay + 0.3,
                  ease: 'easeInOut',
                  repeat: 2,
                  repeatType: 'loop',
                }}
                style={{
                  position: 'absolute',
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  width: s.size,
                  height: s.size,
                  zIndex: 52,
                }}
              >
                <svg viewBox="0 0 20 20" fill={s.color} style={{ width: '100%', height: '100%' }}>
                  <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" />
                </svg>
              </motion.div>
            ))}

            <>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: customEasing }}
                className="absolute rounded-full"
                style={{
                  top: '-5%',
                  right: '-8%',
                  width: isMobile ? '180px' : '300px',
                  height: isMobile ? '180px' : '300px',
                  backgroundColor: popPalette[2],
                  filter: isMobile ? 'blur(80px)' : 'blur(120px)',
                  zIndex: 51,
                }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3, ease: customEasing }}
                className="absolute rounded-full"
                style={{
                  bottom: '-8%',
                  left: '-5%',
                  width: isMobile ? '220px' : '320px',
                  height: isMobile ? '220px' : '320px',
                  backgroundColor: popPalette[4],
                  filter: isMobile ? 'blur(80px)' : 'blur(120px)',
                  zIndex: 51,
                }}
              />
            </>

            {step >= 4 && (
              <div
                className="absolute inset-0"
                style={{
                  clipPath: `circle(${backgroundFill * 1.5}vmax at 100% 100%)`,
                  backgroundColor: themeBackgroundColor,
                  zIndex: 55,
                }}
              />
            )}

            {step >= 1 && (
              <div className="relative flex items-center justify-center" style={{ zIndex: 56 }}>
                <div className="flex">
                  {LETTERS.map((letter, i) => (
                    <motion.span
                      key={`letter-${i}`}
                      className={`font-bold ${isMobile ? 'text-5xl' : 'text-8xl'} inline-block`}
                      initial={{ opacity: 0, y: 60, scale: 0.3, rotate: -15 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotate: 0,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 12,
                        delay: i * 0.08,
                      }}
                      style={{
                        color: step >= 2 ? '#9333ea' : (oppositeTheme === 'dark' ? '#ffffff' : '#000000'),
                        filter: step >= 3
                          ? `drop-shadow(0 0 ${isMobile ? '12px' : '20px'} #a855f7)`
                          : `drop-shadow(0 0 0px transparent)`,
                        transition: 'filter 1.2s ease, color 0.6s ease',
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>

                {step >= 3 && step < 5 && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{
                      duration: 1.5,
                      ease: 'easeInOut',
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <span
                      className={`font-bold ${isMobile ? 'text-5xl' : 'text-8xl'} opacity-0`}
                      aria-hidden
                    >
                      nikkou
                    </span>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default OpeningAnimation;
