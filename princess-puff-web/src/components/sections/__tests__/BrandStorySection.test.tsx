import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BrandStorySection from '../BrandStorySection';

describe('BrandStorySection', () => {
  it('renders brand story content', () => {
    render(<BrandStorySection />);

    // Check for heading
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Our Story');
    expect(heading).toHaveClass('font-playfair', 'text-gold-400');

    // Check for story paragraphs
    expect(screen.getByText(/Princess Puff was born from a vision/)).toBeInTheDocument();
    expect(screen.getByText(/Every donut tells a story/)).toBeInTheDocument();

    // Check for read more link
    const readMoreLink = screen.getByRole('link', { name: /discover more/i });
    expect(readMoreLink).toBeInTheDocument();
    expect(readMoreLink).toHaveAttribute('href', '/about');
  });

  it('applies correct section styling', () => {
    const { container } = render(<BrandStorySection />);

    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-black');
    expect(section).toHaveClass('py-20', 'md:py-32');
  });

  it('has decorative divider', () => {
    const { container } = render(<BrandStorySection />);

    const divider = container.querySelector('.w-24.h-0\\.5');
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass('bg-gold-400/50');
  });

  it('read more link has hover effects', () => {
    render(<BrandStorySection />);

    const readMoreLink = screen.getByRole('link', { name: /discover more/i });
    expect(readMoreLink).toHaveClass('hover:text-gold-300', 'transition-colors', 'group');
  });

  it('has proper text styling', () => {
    render(<BrandStorySection />);

    const paragraphs = screen.getAllByText(/Princess Puff|Every donut/);
    paragraphs.forEach((p) => {
      const parent = p.parentElement;
      expect(parent).toHaveClass('text-gold-400/80');
    });
  });

  it('contains arrow icon in read more link', () => {
    render(<BrandStorySection />);

    const link = screen.getByRole('link', { name: /discover more/i });
    const svg = link.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('group-hover:translate-x-1', 'transition-transform');
  });
});
