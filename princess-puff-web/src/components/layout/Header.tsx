'use client';

import Link from 'next/link';
import Navigation from './Navigation';
import { useState, useEffect } from 'react';

/**
 * Header component for Princess Puff website
 * Client Component to handle scroll-based styling
 *
 * @component
 * @example
 * <Header />
 */
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-black shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="font-playfair text-2xl font-bold text-gold-400 hover:opacity-90 transition-opacity">
            Princess Puff
          </span>
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
