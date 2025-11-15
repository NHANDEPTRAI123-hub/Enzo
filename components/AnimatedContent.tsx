'use client';

import React, { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedContentProps {
  children: ReactNode;
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
  duration?: number;
  ease?: string | ((progress: number) => number);
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?  : number;
  onComplete?: () => void;
  className?: string;
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  onComplete,
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const axis = direction === 'horizontal' ? 'x' : 'y';
    const offset = reverse ? -distance : distance;
    const startPct = threshold * 100;

    // Wait for images and layout to settle before initializing
    const initAnimation = () => {
      gsap.set(el, {
        [axis]: offset,
        scale,
        opacity: animateOpacity ? initialOpacity : 1
      });

      gsap.to(el, {
        [axis]: 0,
        scale: 1,
        opacity: 1,
        duration,
        ease,
        delay,
        onComplete,
        scrollTrigger: {
          trigger: el,
          start: `top ${100 - startPct}%`,
          toggleActions: 'play none none none',
          once: true
        }
      });
    };

    // Small delay to ensure DOM is ready and scroll position is restored
    const timer = setTimeout(() => {
      initAnimation();
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.killTweensOf(el);
    };
  }, [
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    onComplete
  ]);

  return <div ref={ref} className={className}>{children}</div>;
};

export default AnimatedContent;
