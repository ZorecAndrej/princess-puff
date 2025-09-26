import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import React from 'react';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button variant="primary">Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies primary variant styles', () => {
    render(<Button variant="primary">Primary Button</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-gold');
    expect(button.className).toContain('text-black');
  });

  it('applies secondary variant styles', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-transparent');
    expect(button.className).toContain('text-gold');
    expect(button.className).toContain('border-2');
    expect(button.className).toContain('border-gold');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(
      <Button variant="primary" onClick={handleClick}>
        Click me
      </Button>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables button when disabled prop is true', () => {
    const handleClick = vi.fn();
    render(
      <Button variant="primary" onClick={handleClick} disabled>
        Disabled
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies disabled styles', () => {
    render(
      <Button variant="primary" disabled>
        Disabled
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button.className).toContain('disabled:opacity-50');
    expect(button.className).toContain('disabled:cursor-not-allowed');
  });

  it('sets correct button type', () => {
    render(
      <Button variant="primary" type="submit">
        Submit
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('defaults to button type', () => {
    render(<Button variant="primary">Default</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('applies custom className', () => {
    render(
      <Button variant="primary" className="custom-class">
        Custom
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('applies aria-label when provided', () => {
    render(
      <Button variant="primary" ariaLabel="Close dialog">
        X
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Close dialog');
  });

  it('applies hover styles', () => {
    render(<Button variant="primary">Hover me</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('hover:opacity-90');
    expect(button.className).toContain('hover:shadow-lg');
  });

  it('applies active styles', () => {
    render(<Button variant="primary">Press me</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('active:scale-[0.98]');
  });

  it('applies focus styles', () => {
    render(<Button variant="primary">Focus me</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('focus-gold');
  });

  it('secondary variant hover styles', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button');
    expect(button.className).toContain('hover:bg-gold');
    expect(button.className).toContain('hover:text-black');
  });

  it('prevents hover effects when disabled', () => {
    render(
      <Button variant="secondary" disabled>
        Disabled Secondary
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button.className).toContain('disabled:hover:bg-transparent');
    expect(button.className).toContain('disabled:hover:text-gold');
  });
});
