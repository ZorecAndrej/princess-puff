'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

/**
 * Navigation component with mobile menu functionality
 * Client Component for handling mobile menu state and scroll behavior
 *
 * @component
 * @example
 * <Navigation />
 */
export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Clean up body overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        document.body.style.overflow = 'unset';
        menuButtonRef.current?.focus();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'unset';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        <Link
          href="/products"
          className="text-gold-400 hover:text-gold-300 transition-colors font-medium"
        >
          Products
        </Link>
        <Link
          href="/contact"
          className="text-gold-400 hover:text-gold-300 transition-colors font-medium"
        >
          Contact
        </Link>
      </nav>

      {/* Mobile Menu Toggle */}
      <button
        ref={menuButtonRef}
        onClick={toggleMenu}
        className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center group"
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
      >
        <span
          className={`block w-6 h-0.5 bg-gold-400 transition-all duration-300 ${
            isMenuOpen ? 'rotate-45 translate-y-1' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-gold-400 transition-all duration-300 my-1 ${
            isMenuOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-gold-400 transition-all duration-300 ${
            isMenuOpen ? '-rotate-45 -translate-y-1' : ''
          }`}
        />
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={closeMenu} />
      )}

      {/* Mobile Menu */}
      <nav
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-64 bg-black z-50 transform transition-transform duration-300 md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="p-6">
          <button
            onClick={closeMenu}
            className="absolute top-6 right-6 text-gold-400 hover:text-gold-300 transition-colors"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="mt-16 space-y-6">
            <Link
              href="/products"
              onClick={closeMenu}
              className="block text-gold-400 hover:text-gold-300 transition-colors text-xl font-medium"
            >
              Products
            </Link>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="block text-gold-400 hover:text-gold-300 transition-colors text-xl font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
