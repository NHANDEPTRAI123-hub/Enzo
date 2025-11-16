'use client';

import React from 'react';
import Image from 'next/image';

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Documentation', href: '#docs' },
    { label: 'Tutorials', href: '#tutorials' },
  ],
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Blog', href: '#blog' },
    { label: 'Careers', href: '#careers' },
    { label: 'Contact', href: '#contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
    { label: 'Cookie Policy', href: '#cookies' },
    { label: 'Security', href: '#security' },
  ],
  community: [
    { label: 'Community', href: '#community' },
    { label: 'Leaderboard', href: '#leaderboard' },
    { label: 'Support', href: '#support' },
    { label: 'Feedback', href: '#feedback' },
  ],
};



const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-gray-200 bg-white">
      <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-12 sm:mb-16">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-2">
              <Image
                src="/ui/logo.svg"
                alt="Enzo Logo"
                width={60}
                height={60}
                className="relative bottom-2 lg:w-20 lg:h-auto"
              />
            
            <span className="text-xs sm:text-sm " style={{ color: 'var(--text-gray)' }}>
              Empowering young creators to transform ideas into successful projects with AI-powered collaboration tools.
            </span>
            
            
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-black">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm transition-colors hover:text-purple-600"
                    style={{ color: 'var(--text-gray)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-black">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm transition-colors hover:text-purple-600"
                    style={{ color: 'var(--text-gray)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-black">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm transition-colors hover:text-purple-600"
                    style={{ color: 'var(--text-gray)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Column */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-black">Community</h4>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm transition-colors hover:text-purple-600"
                    style={{ color: 'var(--text-gray)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs sm:text-sm text-center sm:text-left" style={{ color: 'var(--text-gray)' }}>
              © {currentYear} Enzo. All rights reserved.
            </span>
            
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-xs sm:text-sm transition-colors hover:text-purple-600"
                style={{ color: 'var(--text-gray)' }}
              >
                English
              </a>
              <span style={{ color: 'var(--text-gray)' }}>•</span>
              <a
                href="#"
                className="text-xs sm:text-sm transition-colors hover:text-purple-600"
                style={{ color: 'var(--text-gray)' }}
              >
                Status
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
