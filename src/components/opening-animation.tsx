import React, { useEffect, useState, useRef, FC, useMemo } from 'react';
import Image from 'next/image';
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from 'framer-motion';
import { OpeningAnimationProps } from '@/types';

const OpeningAnimation: FC<OpeningAnimationProps> = ({ onAnimationComplete, projects }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [, setScreenSize] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      setIsMobile(window.innerWidth < 768);
    };
    
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const [step, setStep] = useState(1);
  const [textFill, setTextFill] = useState(0);
  const [backgroundFill, setBackgroundFill] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const nikkouRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const oppositeTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
  const backgroundColor = oppositeTheme === 'dark' ? '#0a0a0a' : '#ffffff';
  const textColor = oppositeTheme === 'dark' ? '#ffffff' : '#000000';
  const themeBackgroundColor = resolvedTheme === 'dark' ? '#0a0a0a' : '#ffffff';
  const cssEasing = 'cubic-bezier(0.19, 1, 0.22, 1)';
  const customEasing = useMemo(() => [0.19, 1, 0.22, 1], []);

  const cubicBezier = (x1: number, y1: number, x2: number, y2: number, t: number): number => {
    const cx = 3 * x1;
    const bx = 3 * (x2 - x1) - cx;
    const ax = 1 - cx - bx;
    const cy = 3 * y1;
    const by = 3 * (y2 - y1) - cy;
    const ay = 1 - cy - by;
    const sampleCurveX = (t: number): number => ((ax * t + bx) * t + cx) * t;
    const sampleCurveY = (t: number): number => ((ay * t + by) * t + cy) * t;
    const sampleCurveDerivativeX = (t: number): number => (3 * ax * t + 2 * bx) * t + cx;
    const solveWithGuess = (x: number, epsilon: number, t: number): number => {
      for (let i = 0; i < 8; i++) {
        const currentX = sampleCurveX(t) - x;
        if (Math.abs(currentX) < epsilon) {
          return t;
        }
        const currentSlope = sampleCurveDerivativeX(t);
        if (Math.abs(currentSlope) < epsilon) {
          break;
        }
        t = t - currentX / currentSlope;
      }
      return t;
    };
    const findX = (t: number): number => {
      let t0 = 0;
      let t1 = 1;
      let t2 = t;
      if (t === 0) return 0;
      if (t === 1) return 1;
      while (t2 > t0 && t2 < t1) {
        const x2 = sampleCurveX(t2);
        if (Math.abs(x2 - t) < 0.001) {
          return t2;
        }
        if (t > x2) {
          t0 = t2;
        } else {
          t1 = t2;
        }
        t2 = (t1 - t0) * 0.5 + t0;
      }
      return solveWithGuess(t, 0.001, (t1 + t0) / 2);
    };
    return sampleCurveY(findX(t));
  };

  const prevFillRef = useRef(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(2), 500);
    const timer2 = setTimeout(() => setStep(3), 800);
    const timer3 = setTimeout(() => {
      const startTime = Date.now();
      const duration = 1500;

      const fillInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = cubicBezier(customEasing[0], customEasing[1], customEasing[2], customEasing[3], progress);
        const newFill = easedProgress * 100;

        setTextFill(newFill);
        prevFillRef.current = newFill;

        if (progress >= 1) {
          clearInterval(fillInterval);
          setStep(4);
        }
      }, 16);
    }, 1200);
    const timer4 = setTimeout(() => setStep(5), 4000);
    const timer5 = setTimeout(() => {
      const startTime = Date.now();
      const duration = 800;

      const backgroundFillInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = cubicBezier(customEasing[0], customEasing[1], customEasing[2], customEasing[3], progress);
        const newFill = easedProgress * 100;

        setBackgroundFill(newFill);

        if (progress >= 1) {
          clearInterval(backgroundFillInterval);
          setStep(6);
        }
      }, 16);
    }, 5500);
    const timer6 = setTimeout(() => {
      setOpacity(0);
      setTimeout(() => {
        if (onAnimationComplete) onAnimationComplete();
      }, 500);
    }, 7000);

    return () => {
      [timer1, timer2, timer3, timer4, timer5, timer6].forEach(timer => clearTimeout(timer));
    };
  }, [resolvedTheme, onAnimationComplete, customEasing]);

  return (
    <>
      {mounted && (
        <AnimatePresence>
          <motion.div
            ref={containerRef}
            initial={{ opacity: 1, backgroundColor: themeBackgroundColor }}
            animate={{ opacity: opacity, backgroundColor: backgroundColor }}
            transition={{
              opacity: { duration: 0.5, ease: customEasing },
              backgroundColor: { delay: 0.5, duration: 1, ease: customEasing }
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              overflow: 'hidden',
              backgroundColor: themeBackgroundColor
            }}
          >
            {step >= 5 && (
              <div 
                className="absolute top-0 left-0 w-full"
                style={{ 
                  height: `${backgroundFill}%`, 
                  backgroundColor: themeBackgroundColor,
                  transition: `height 0.016s ${cssEasing}`,
                  zIndex: 51
                }}
              />
            )}

            {step >= 2 && (
              <div className="relative" ref={nikkouRef} style={{ zIndex: 52 }}>
                <motion.h1 
                  ref={textRef}
                  className={`font-bold ${isMobile ? 'text-5xl' : 'text-8xl'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  transition={{ duration: 1, ease: customEasing }}
                  style={{ 
                    color: textColor
                  }}
                >
                  nikkou
                </motion.h1>

                {step >= 3 && (
                  <div 
                    ref={textContainerRef}
                    className={`absolute top-0 left-0 font-bold overflow-hidden whitespace-nowrap ${isMobile ? 'text-5xl' : 'text-8xl'}`}
                    style={{ 
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                      style={{ 
                        width: `${textFill}%`,
                        transition: `width 0.016s ${cssEasing}`
                      }}
                    >
                      nikkou
                    </div>
                  </div>
                )}
              </div>
            )}

            {step >= 4 && step < 6 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 53 }}>
                <div className="relative">
                  {projects.slice(0, isMobile ? 6 : 12).map((project, index) => {
                    const totalProjects = isMobile ? 6 : 12;
                    const angle = (index / totalProjects) * Math.PI * 2;
                    const radius = isMobile ? 150 : 300; 
                    const projectSize = isMobile ? 120 : 160;
                    const projectHeight = isMobile ? 75 : 100;

                    return (
                      <motion.div
                        key={`project-${index}`}
                        initial={{ 
                          opacity: 0, 
                          scale: 0.5,
                          x: 0,
                          y: 0,
                          rotate: 0
                        }}
                        animate={{ 
                          opacity: [0, 1, 1, 0], 
                          scale: [0.5, 1, 1, 0.8],
                          x: [0, 0, Math.cos(angle) * radius, Math.cos(angle) * radius * 2],
                          y: [0, 0, Math.sin(angle) * radius, Math.sin(angle) * radius * 2],
                          rotate: [0, 0, 0, 0]
                        }}
                        transition={{ 
                          duration: 3.5, 
                          times: [0, 0.1, 0.7, 1],
                          ease: customEasing,
                          delay: index * 0.1
                        }}
                        className="absolute rounded-lg overflow-hidden shadow-lg"
                        style={{
                          width: `${projectSize}px`,
                          height: `${projectHeight}px`,
                          left: `-${projectSize/2}px`,
                          top: `-${projectHeight/2}px`,
                        }}
                      >
                        <Image 
                          src={project.image} 
                          alt={project.title.en} 
                          width={projectSize} 
                          height={projectHeight} 
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default OpeningAnimation;
