import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home, { metadata } from './page';

// Mock the components
vi.mock('@/components/layout/Header', () => ({
  default: () => <header data-testid="header">Header</header>,
}));

vi.mock('@/components/layout/Footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}));

vi.mock('@/components/sections/HeroSection', () => ({
  default: () => <section data-testid="hero-section">HeroSection</section>,
}));

vi.mock('@/components/sections/BrandStorySection', () => ({
  default: () => <section data-testid="brand-story-section">BrandStorySection</section>,
}));

vi.mock('@/components/ui/Button', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

describe('Home Page', () => {
  it('renders all homepage sections', () => {
    render(<Home />);

    // Check for skip navigation link
    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');

    // Check for header
    expect(screen.getByTestId('header')).toBeInTheDocument();

    // Check for main content with correct id
    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('id', 'main-content');

    // Check for hero section
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();

    // Check for CTA buttons
    const shopButton = screen.getByRole('button', { name: 'Shop Luxe' });
    expect(shopButton).toBeInTheDocument();

    const partnerButton = screen.getByRole('button', { name: 'Partner With Us' });
    expect(partnerButton).toBeInTheDocument();

    // Check for brand story section
    expect(screen.getByTestId('brand-story-section')).toBeInTheDocument();

    // Check for footer
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders CTA buttons with correct links', () => {
    render(<Home />);

    const shopLink = screen.getByRole('link', { name: /shop luxe/i });
    expect(shopLink).toHaveAttribute('href', '/products');

    const partnerLink = screen.getByRole('link', { name: /partner with us/i });
    expect(partnerLink).toHaveAttribute('href', '/business');
  });

  it('includes structured data script', () => {
    const { container } = render(<Home />);

    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();

    if (script) {
      const jsonData = JSON.parse(script.innerHTML);
      expect(jsonData['@type']).toBe('LocalBusiness');
      expect(jsonData.name).toBe('Princess Puff');
      expect(jsonData.address.addressLocality).toBe('Belgrade');
    }
  });

  it('has accessibility-friendly skip navigation', () => {
    render(<Home />);

    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toHaveClass('sr-only');
    expect(skipLink).toHaveClass('focus:not-sr-only');
  });
});

describe('Home Page Metadata', () => {
  it('has correct metadata configuration', () => {
    expect(metadata.title).toBe('Princess Puff - Luxury Donuts Belgrade');
    expect(metadata.description).toContain('Experience the epitome of donut artistry');
    expect(metadata.openGraph?.title).toBe('Princess Puff - Luxury Donuts Belgrade');
    expect(metadata.openGraph?.locale).toBe('en_US');
    expect((metadata.openGraph as any)?.type).toBe('website');
  });
});
