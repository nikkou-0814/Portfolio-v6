import React, { useEffect, useState, useRef, useCallback, FC, useMemo } from 'react';
import Image from 'next/image';
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from 'framer-motion';
import { OpeningAnimationProps, Sparkle} from '@/types/opening'

const OpeningAnimation: FC<OpeningAnimationProps> = ({ onAnimationComplete, projects }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const [step, setStep] = useState(1);
  const [textFill, setTextFill] = useState(0);
  const [backgroundFill, setBackgroundFill] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [sparklePositions, setSparklePositions] = useState<Sparkle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const nikkouRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const oppositeTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
  const backgroundColor = oppositeTheme === 'dark' ? '#0a0a0a' : '#ffffff';
  const textColor = oppositeTheme === 'dark' ? '#ffffff' : '#000000';
  const gradientStart = resolvedTheme === 'dark' ? '#a855f7' : '#9333ea';
  const gradientEnd = resolvedTheme === 'dark' ? '#ec4899' : '#db2777';
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

  const generateSparklesFromFill = useCallback((currentFill: number, prevFill: number): Sparkle[] => {
    if (currentFill <= prevFill) return [];
    
    const newFillWidth = currentFill - prevFill;
    const textEl = textRef.current;
    if (!textEl) return [];
    const textRect = textEl.getBoundingClientRect();
    const totalWidth = textRect.width;
    const numSparkles = Math.floor(newFillWidth / 2) + 3;
    const newSparkles: Sparkle[] = Array(numSparkles).fill(0).map((_, i) => {
      const fillPosition = prevFill + (Math.random() * newFillWidth);
      const xOffset = (fillPosition / 100) * totalWidth;
      const absoluteX = textRect.left + xOffset;
      const absoluteY = textRect.top + Math.random() * textRect.height;

      return {
        id: Date.now() + i,
        x: absoluteX,
        y: absoluteY,
        size: Math.random() * 4 + 2,
        velocityX: (Math.random() - 0.5) * 4,
        velocityY: -Math.random() * 3 - 2,
        opacity: Math.random() * 0.7 + 0.3,
        rotation: Math.random() * 360,
        rotationVelocity: (Math.random() - 0.5) * 6,
        color: Math.random() > 0.5 ? gradientStart : gradientEnd
      };
    });
    return newSparkles;
  }, [gradientStart, gradientEnd, textRef]);

  useEffect(() => {
    if (sparklePositions.length === 0) return;
    const gravity = 0.15;
    const friction = 0.98;
    const animationFrame = requestAnimationFrame(() => {
      setSparklePositions(prevPositions => 
        prevPositions
          .map(sparkle => ({
            ...sparkle,
            x: sparkle.x + sparkle.velocityX,
            y: sparkle.y + sparkle.velocityY,
            velocityY: sparkle.velocityY + gravity,
            velocityX: sparkle.velocityX * friction,
            rotation: sparkle.rotation + sparkle.rotationVelocity,
            opacity: sparkle.opacity - 0.01,
            size: sparkle.size > 0.5 ? sparkle.size - 0.02 : sparkle.size
          }))
          .filter(sparkle => sparkle.opacity > 0)
      );
    });
    return () => cancelAnimationFrame(animationFrame);
  }, [sparklePositions]);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(2), 1000);
    const timer2 = setTimeout(() => setStep(3), 2000);
    const timer3 = setTimeout(() => {
      const startTime = Date.now();
      const duration = 2000;

      const fillInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = cubicBezier(customEasing[0], customEasing[1], customEasing[2], customEasing[3], progress);
        const newFill = easedProgress * 100;

        const newSparkles = generateSparklesFromFill(newFill, prevFillRef.current);
        if (newSparkles.length > 0) {
          setSparklePositions(prev => [...prev, ...newSparkles]);
        }

        setTextFill(newFill);
        prevFillRef.current = newFill;

        if (progress >= 1) {
          clearInterval(fillInterval);
          setStep(4);
        }
      }, 16);
    }, 3000);
    const timer4 = setTimeout(() => setStep(5), 6000);
    const timer5 = setTimeout(() => {
      const startTime = Date.now();
      const duration = 1000;

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
    }, 8000);
    const timer6 = setTimeout(() => {
      setOpacity(0);
      setTimeout(() => {
        if (onAnimationComplete) onAnimationComplete();
      }, 500);
    }, 10000);

    return () => {
      [timer1, timer2, timer3, timer4, timer5, timer6].forEach(timer => clearTimeout(timer));
    };
  }, [resolvedTheme, onAnimationComplete, customEasing, generateSparklesFromFill]);

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
                className="text-8xl font-bold" 
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
                  className="absolute top-0 left-0 text-8xl font-bold overflow-hidden whitespace-nowrap"
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

          {sparklePositions.map((sparkle) => (
            <div
              key={`dynamic-sparkle-${sparkle.id}`}
              className="absolute"
              style={{
                width: `${sparkle.size}px`,
                height: `${sparkle.size}px`,
                backgroundColor: sparkle.color,
                borderRadius: '50%',
                left: `${sparkle.x}px`,
                top: `${sparkle.y}px`,
                opacity: sparkle.opacity,
                transform: `rotate(${sparkle.rotation}deg)`,
                filter: 'blur(1px)',
                pointerEvents: 'none',
                zIndex: 60
              }}
            />
          ))}

          {step >= 4 && step < 6 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 53 }}>
              <div className="relative">
                {projects.slice(0, 12).map((project, index) => {
                  const angle = (index / 12) * Math.PI * 2;
                  const radius = 300; 

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
                        width: '160px',
                        height: '100px',
                        left: '-80px',
                        top: '-50px',
                      }}
                    >
                      <Image 
                        src={project.image} 
                        alt={project.title.en} 
                        width={160} 
                        height={100} 
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
