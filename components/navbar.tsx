import React from 'react';
import Image from 'next/image';

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Project', href: '#' },
  { label: 'Community', href: '#' },
  { label: 'Leaderboard', href: '#' },
];

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 bg-transparent border-b border-gray-200 dark:border-gray-800">
      {/* Logo */}
      <div className="shrink-0">
        <Image src="/ui/logo.svg" alt="Enzo Logo" width={70} height={70} />
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-20">
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
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
          <Image src="/ui/language.svg" alt="Language" width={50} height={50} />
        </button>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
          <Image src="/ui/mode.svg" alt="Theme Mode" width={50} height={50} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
