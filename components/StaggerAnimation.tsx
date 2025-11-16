'use client';

import React, { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StaggerItem {
  element: string;
  delay: number;
}

interface StaggerAnimationProps {
  children: ReactNode;
  items: StaggerItem[];
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
  duration?: number;
  ease?: string;
  threshold?: number;
  className?: string;
}

const StaggerAnimation: React.FC<StaggerAnimationProps> = ({
  children,
  items,
  distance = 80,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  ease = 'power3.out',
  threshold = 0.1,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const axis = direction === 'horizontal' ? 'x' : 'y';
    const offset = reverse ? -distance : distance;
    const startPct = threshold * 100;

    // Set initial state for all items
    items.forEach(({ element }) => {
      const el = container.querySelector(element);
      if (el) {
        gsap.set(el, {
          [axis]: offset,
          opacity: 0,
          visibility: 'visible',
          willChange: 'transform, opacity'
        });
      }
    });

    // Create staggered animations
    items.forEach(({ element, delay }) => {
      const el = container.querySelector(element);
      if (el) {
        gsap.to(el, {
          [axis]: 0,
          opacity: 1,
          duration,
          ease,
          delay,
          onComplete: () => {
            gsap.set(el, { clearProps: 'willChange' });
          },
          scrollTrigger: {
            trigger: container,
            start: `top ${100 - startPct}%`,
            toggleActions: 'play none none none',
            once: true,
            invalidateOnRefresh: false
          }
        });
      }
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(t => t.kill());
      items.forEach(({ element }) => {
        const el = container.querySelector(element);
        if (el) gsap.killTweensOf(el);
      });
    };
  }, [items, distance, direction, reverse, duration, ease, threshold]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default StaggerAnimation;
