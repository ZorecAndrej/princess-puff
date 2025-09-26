import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeroSection from '../HeroSection';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ alt, fill, priority, ...props }: any) => (
    <img
      alt={alt}
      data-fill={fill}
      data-priority={priority}
      {...props}
      data-testid="luxury-image"
    />
  ),
}));

describe('HeroSection', () => {
  it('renders hero content correctly', () => {
    render(<HeroSection />);

    // Check for heading
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Princess Puff');
    expect(heading).toHaveClass('font-playfair', 'text-gold-400', 'animate-fade-in');

    // Check for tagline
    const tagline = screen.getByText('Luxury Redefined in Every Bite');
    expect(tagline).toBeInTheDocument();
    expect(tagline).toHaveClass('text-gold-400/90', 'font-light', 'animate-fade-in');
  });

  it('renders hero image with correct props', () => {
    render(<HeroSection />);

    const heroImage = screen.getByTestId('luxury-image');
    expect(heroImage).toHaveAttribute(
      'alt',
      'Princess Puff signature luxury donut on elegant black background'
    );
    expect(heroImage).toHaveAttribute('data-priority', 'true');
    expect(heroImage).toHaveAttribute('sizes', '100vw');
    expect(heroImage).toHaveClass('object-cover', 'opacity-90');
  });

  it('applies correct section structure', () => {
    const { container } = render(<HeroSection />);

    const section = container.querySelector('section');
    expect(section).toHaveClass(
      'relative',
      'min-h-screen',
      'flex',
      'items-center',
      'justify-center',
      'bg-black'
    );
  });

  it('has gradient overlay for text contrast', () => {
    const { container } = render(<HeroSection />);

    const overlay = container.querySelector('.bg-gradient-to-b');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveClass('from-black/50', 'via-transparent', 'to-black/70');
  });

  it('includes scroll indicator', () => {
    render(<HeroSection />);

    const scrollIndicator = document.querySelector('[aria-hidden="true"]');
    expect(scrollIndicator).toBeInTheDocument();
    expect(scrollIndicator).toHaveClass('animate-bounce');
  });

  it('has animation delays set', () => {
    render(<HeroSection />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveStyle({ animationDelay: '0.2s' });

    const tagline = screen.getByText('Luxury Redefined in Every Bite');
    expect(tagline).toHaveStyle({ animationDelay: '0.6s' });
  });
});
