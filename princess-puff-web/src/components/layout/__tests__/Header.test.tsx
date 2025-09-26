import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

// Mock the Navigation component
vi.mock('../Navigation', () => ({
  default: () => <nav data-testid="navigation">Navigation</nav>,
}));

describe('Header', () => {
  it('renders the header with logo and navigation', () => {
    render(<Header />);

    // Check for header element
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('fixed', 'top-0', 'z-50');

    // Check for logo link
    const logoLink = screen.getByRole('link');
    expect(logoLink).toHaveAttribute('href', '/');
    expect(logoLink).toHaveTextContent('Princess Puff');

    // Check for navigation
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
  });

  it('applies correct styling to logo', () => {
    render(<Header />);

    const logo = screen.getByText('Princess Puff');
    expect(logo).toHaveClass('font-playfair', 'text-2xl', 'font-bold', 'text-gold-400');
  });

  it('has proper fixed positioning and z-index', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50');
  });

  it('has transition classes for scroll behavior', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('transition-colors', 'duration-300');
  });

  it('initially has transparent background', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-transparent');
  });
});
