'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Project', href: '#' },
  { label: 'Community', href: '#' },
  { label: 'Leaderboard', href: '#' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolled from top
      setIsScrolled(currentScrollY > 10);

      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm'
          : 'bg-transparent border-b border-gray-200'
      } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      style={{ maxWidth: '1366px', margin: '0 auto' }}
    >
      {/* Logo */}
      <div className="shrink-0">
        <Image src="/ui/logo.svg" alt="Enzo Logo" width={70} height={70} className="w-12 h-12 sm:w-14 sm:h-14 lg:w-[70px] lg:h-[70px]" />
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8 lg:gap-20">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm font-poppins text-foreground hover:text-purple-600 transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Image src="/ui/language.svg" alt="Language" width={50} height={50} className="w-8 h-8 sm:w-10 sm:h-10 lg:w-[50px] lg:h-[50px]" />
        </button>
        <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Image src="/ui/mode.svg" alt="Theme Mode" width={50} height={50} className="w-8 h-8 sm:w-10 sm:h-10 lg:w-[50px] lg:h-[50px]" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
