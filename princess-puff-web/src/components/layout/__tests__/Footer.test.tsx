import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders all footer sections', () => {
    render(<Footer />);

    // Check for footer element
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();

    // Check for brand section
    expect(screen.getByText('Princess Puff')).toBeInTheDocument();
    expect(screen.getByText('Luxury Redefined in Every Bite')).toBeInTheDocument();

    // Check for contact section
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Belgrade, Serbia')).toBeInTheDocument();
    expect(screen.getByText('hello@princesspuff.rs')).toBeInTheDocument();

    // Check for social section
    expect(screen.getByText('Follow Us')).toBeInTheDocument();
  });

  it('has correct contact links', () => {
    render(<Footer />);

    const emailLink = screen.getByRole('link', { name: 'hello@princesspuff.rs' });
    expect(emailLink).toHaveAttribute('href', 'mailto:hello@princesspuff.rs');

    const phoneLink = screen.getByRole('link', { name: /\+381/ });
    expect(phoneLink).toHaveAttribute('href', 'tel:+381XXXXXXX');
  });

  it('has correct social media links', () => {
    render(<Footer />);

    const instagramLink = screen.getByLabelText('Follow us on Instagram');
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/princesspuff');
    expect(instagramLink).toHaveAttribute('target', '_blank');
    expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer');

    const facebookLink = screen.getByLabelText('Follow us on Facebook');
    expect(facebookLink).toHaveAttribute('href', 'https://facebook.com/princesspuff');
    expect(facebookLink).toHaveAttribute('target', '_blank');
    expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('displays current year in copyright', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    const copyright = screen.getByText(new RegExp(`${currentYear} Princess Puff`));
    expect(copyright).toBeInTheDocument();
  });

  it('uses semantic HTML', () => {
    render(<Footer />);

    // Check for address element
    const address = screen.getByRole('group');
    expect(address.tagName).toBe('ADDRESS');
    expect(address).toHaveClass('not-italic');
  });

  it('has proper styling classes', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('bg-black', 'border-t', 'border-gold-400/20');
  });
});
