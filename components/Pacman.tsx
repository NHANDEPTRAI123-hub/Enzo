'use client';

import React, { useEffect, useRef, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Pacman = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const dotLottieRef = useRef<{ play: () => void; pause: () => void } | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Calculate translation based on scroll position
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;
        
        // Check if section is at least 50% visible
        const sectionMiddle = sectionTop + (sectionHeight / 2);
        const viewportBottom = currentScrollY + viewportHeight;
        const viewportTop = currentScrollY;
        
        // Only start translation when 50% of section is visible
        if (viewportBottom >= sectionMiddle && viewportTop <= sectionMiddle) {
          // Calculate progress from when 50% becomes visible
          const visibleProgress = ((currentScrollY + viewportHeight - sectionMiddle) / (sectionHeight)) * 100;
          setTranslateX(Math.max(0, Math.min(visibleProgress, 100)));
        }
      }

      // Play animation when scrolling
      if (!isScrolling) {
        setIsScrolling(true);
        if (dotLottieRef.current) {
          dotLottieRef.current.play();
        }
      }

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set new timeout to pause animation after scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
        if (dotLottieRef.current) {
          dotLottieRef.current.pause();
        }
      }, 150); // 150ms delay after scroll stops
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isScrolling]);

  return (
    <section 
      ref={sectionRef}
      className="relative flex items-center justify-start px-0 sm:px-0 lg:px-0 py-6 sm:py-16 lg:py-0"
    >
      <div 
        className="relative right-32 sm:right-80 lg:right-105 w-100 h-auto sm:w-200 sm:h-auto lg:w-300 lg:h-auto transition-transform duration-100 ease-linear"
        style={{ 
          transform: `translateX(${translateX}%)`,
          willChange: 'transform'
        }}
      >
        <DotLottieReact
          dotLottieRefCallback={(ref) => {
            dotLottieRef.current = ref;
          }}
          src="https://lottie.host/6f6cc61c-f57a-4d85-adb7-e09c86ed2657/1wRsLzIl3L.json"
          loop
          autoplay={false}
          speed={1}
        />
      </div>
    </section>
  );
};

export default Pacman;
