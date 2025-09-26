import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from '../Navigation';

// Mock useRef
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useRef: () => ({ current: null }),
  };
});

describe('Navigation', () => {
  it('renders desktop navigation links', () => {
    render(<Navigation />);
    
    const productsLink = screen.getByRole('link', { name: 'Products' });
    const contactLink = screen.getByRole('link', { name: 'Contact' });
    
    expect(productsLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
    expect(productsLink).toHaveAttribute('href', '/products');
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('renders mobile menu toggle button', () => {
    render(<Navigation />);
    
    const toggleButton = screen.getByRole('button', { name: 'Toggle menu' });
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(toggleButton).toHaveAttribute('aria-controls', 'mobile-menu');
  });

  it('toggles mobile menu when button is clicked', () => {
    render(<Navigation />);
    
    const toggleButton = screen.getByRole('button', { name: 'Toggle menu' });
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Initially closed
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');
    expect(mobileMenu).toHaveClass('translate-x-full');
    
    // Click to open
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    expect(mobileMenu).toHaveAttribute('aria-hidden', 'false');
    expect(mobileMenu).toHaveClass('translate-x-0');
  });

  it('closes mobile menu when close button is clicked', () => {
    render(<Navigation />);
    
    const toggleButton = screen.getByRole('button', { name: 'Toggle menu' });
    fireEvent.click(toggleButton);
    
    const closeButton = screen.getByRole('button', { name: 'Close menu' });
    fireEvent.click(closeButton);
    
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes mobile menu when overlay is clicked', () => {
    render(<Navigation />);
    
    const toggleButton = screen.getByRole('button', { name: 'Toggle menu' });
    fireEvent.click(toggleButton);
    
    const overlay = screen.getByRole('button', { name: 'Toggle menu' }).parentElement?.querySelector('.fixed.inset-0');
    expect(overlay).toBeInTheDocument();
    
    if (overlay) {
      fireEvent.click(overlay);
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    }
  });

  it('handles body overflow when menu opens and closes', () => {
    render(<Navigation />);
    
    const toggleButton = screen.getByRole('button', { name: 'Toggle menu' });
    
    // Open menu
    fireEvent.click(toggleButton);
    expect(document.body.style.overflow).toBe('hidden');
    
    // Close menu
    fireEvent.click(toggleButton);
    expect(document.body.style.overflow).toBe('unset');
  });

  it('closes mobile menu when a link is clicked', () => {
    render(<Navigation />);
    
    const toggleButton = screen.getByRole('button', { name: 'Toggle menu' });
    fireEvent.click(toggleButton);
    
    const mobileProductsLink = screen.getAllByRole('link', { name: 'Products' })[1];
    fireEvent.click(mobileProductsLink);
    
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('applies correct styling classes', () => {
    render(<Navigation />);
    
    const desktopNav = screen.getByRole('navigation');
    expect(desktopNav).toHaveClass('hidden', 'md:flex');
    
    const toggleButton = screen.getByRole('button', { name: 'Toggle menu' });
    expect(toggleButton).toHaveClass('md:hidden');
  });

  it('cleans up body overflow on unmount', () => {
    const { unmount } = render(<Navigation />);
    
    const toggleButton = screen.getByRole('button', { name: 'Toggle menu' });
    fireEvent.click(toggleButton);
    expect(document.body.style.overflow).toBe('hidden');
    
    unmount();
    expect(document.body.style.overflow).toBe('unset');
  });
});