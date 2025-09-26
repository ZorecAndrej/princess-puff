import React from 'react';

/**
 * Button component with luxury styling
 * Supports primary and secondary variants with all interaction states
 *
 * @component
 * @example
 * <Button variant="primary" onClick={() => console.log('clicked')}>
 *   Shop Now
 * </Button>
 */

/**
 * Props for the Button component
 */
export interface ButtonProps {
  /** Button content */
  children: React.ReactNode;
  /** Visual variant of the button */
  variant: 'primary' | 'secondary';
  /** Click handler */
  onClick?: () => void;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** HTML button type */
  type?: 'button' | 'submit' | 'reset';
  /** Optional className for additional styling */
  className?: string;
  /** Optional aria-label for accessibility */
  ariaLabel?: string;
}

export function Button({
  children,
  variant,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  ariaLabel,
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center
    px-6 py-3
    font-inter font-medium text-base
    tracking-wide uppercase
    transition-all duration-300 ease-in-out
    focus-gold
  `;

  const variantStyles = {
    primary: `
      bg-gold text-black
      hover:opacity-90 hover:shadow-lg
      active:scale-[0.98]
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
    secondary: `
      bg-transparent text-gold
      border-2 border-gold
      hover:bg-gold hover:text-black hover:shadow-lg
      active:scale-[0.98]
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gold
    `,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
