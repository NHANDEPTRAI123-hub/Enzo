"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Project", href: "/project" },
  { label: "Community", href: "#" },
  { label: "Leaderboard", href: "#" },
];

interface NavbarProps {
  isProjectPage?: boolean;
}

const Navbar = ({ isProjectPage = false }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isProjectPage) return; // Disable scroll animations on project page

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolled from top
      setIsScrolled(currentScrollY > 1);

      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 1) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isProjectPage]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav
      className={`${
        isProjectPage ? "static" : "fixed top-0 left-0 right-0"
      } z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300 ${
        isProjectPage
          ? "bg-transparent border-b border-gray-200"
          : isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm"
          : "bg-transparent border-b border-gray-200"
      } ${isProjectPage || isVisible ? "translate-y-0" : "-translate-y-full"}`}
      style={{ maxWidth: "1366px", margin: "0 auto" }}
    >
      {/* Logo */}
      <div className="shrink-0">
        <Image
          src="/ui/logo.svg"
          alt="Enzo Logo"
          width={70}
          height={70}
          className="w-14 h-auto sm:w-14 sm:h-14 lg:w-[70px] lg:h-[70px]"
        />
      </div>

      {/* Navigation Links - Desktop */}
      <div className="hidden md:flex items-center gap-8 lg:gap-20">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm text-black font-poppin hover:text-purple-600 transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Right Side - Desktop Icons */}
      <div className="hidden md:flex items-center gap-2 sm:gap-4">
        <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Image
            src="/ui/language.svg"
            alt="Language"
            width={50}
            height={50}
            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-[50px] lg:h-[50px]"
          />
        </button>
        <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Image
            src="/ui/mode.svg"
            alt="Theme Mode"
            width={50}
            height={50}
            className="sm:w-10 sm:h-10 lg:w-[50px] lg:h-[50px]"
          />
        </button>
      </div>

      {/* Hamburger Button - Mobile */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMobileMenuOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="var(--icon-black)"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="var(--icon-black)"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 h-1000 bg-black/50 z-9998 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-1000 w-45 bg-white/80 backdrop-blur-md z-9999 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col border-none p-6 pt-20">
          {/* Close Button */}
          <button
            onClick={toggleMobileMenu}
            className="absolute top-5 right-3 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="var(--icon-black)"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={toggleMobileMenu}
                className="text-lg font-poppins text-black hover:text-purple-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex flex-col items-left gap-4 mt-8">
            <button className="hover:bg-gray-100 rounded-lg transition-colors ">
              <Image
                src="/ui/language.svg"
                alt="Language"
                width={40}
                height={40}
                className="w-16 h-16"
              />
            </button>
            <button className="hover:bg-gray-100 rounded-lg transition-colors">
              <Image
                src="/ui/mode.svg"
                alt="Theme Mode"
                width={40}
                height={40}
                className="w-16 h-16"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
