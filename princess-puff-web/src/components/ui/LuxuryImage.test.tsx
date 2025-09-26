import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import { LuxuryImage } from './LuxuryImage';
import React from 'react';

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, onLoad, className, priority, blurDataURL, ...props }: any) => {
    return (
      <img
        src={src}
        alt={alt}
        onLoad={onLoad}
        className={className}
        data-testid="luxury-image"
        data-priority={priority}
        data-blur={blurDataURL}
        {...props}
      />
    );
  },
}));

describe('LuxuryImage', () => {
  const defaultProps = {
    src: '/test-image.jpg',
    alt: 'Test luxury image',
    width: 400,
    height: 300,
  };

  it('renders with required props', () => {
    render(<LuxuryImage {...defaultProps} />);
    const image = screen.getByAltText('Test luxury image');
    expect(image).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<LuxuryImage {...defaultProps} className="custom-class" />);
    const container = screen.getByAltText('Test luxury image').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('shows loading state initially', () => {
    render(<LuxuryImage {...defaultProps} />);
    const loadingDiv = document.querySelector('.animate-pulse');
    expect(loadingDiv).toBeInTheDocument();
  });

  it('calls onLoad callback when image loads', async () => {
    const onLoadMock = vi.fn();
    render(<LuxuryImage {...defaultProps} onLoad={onLoadMock} />);

    const image = screen.getByTestId('luxury-image');

    await act(async () => {
      image.dispatchEvent(new Event('load'));
    });

    await waitFor(() => {
      expect(onLoadMock).toHaveBeenCalled();
    });
  });

  it('applies hover effect classes', () => {
    render(<LuxuryImage {...defaultProps} />);
    const image = screen.getByTestId('luxury-image');
    expect(image.className).toContain('hover:opacity-90');
    expect(image.className).toContain('hover:scale-105');
  });

  it('handles priority prop', () => {
    render(<LuxuryImage {...defaultProps} priority={true} />);
    const image = screen.getByTestId('luxury-image');
    expect(image).toHaveAttribute('data-priority', 'true');
  });

  it('applies responsive sizing when enabled', () => {
    render(<LuxuryImage {...defaultProps} responsive={true} />);
    const image = screen.getByTestId('luxury-image');
    expect(image).toHaveAttribute('sizes');
  });

  it('does not apply responsive sizing when disabled', () => {
    render(<LuxuryImage {...defaultProps} responsive={false} />);
    const image = screen.getByTestId('luxury-image');
    expect(image).not.toHaveAttribute('sizes');
  });

  it('uses blur placeholder when blurDataURL is provided', () => {
    const blurDataURL = 'data:image/jpeg;base64,/9j/4AAQ...';
    render(<LuxuryImage {...defaultProps} blurDataURL={blurDataURL} />);
    const image = screen.getByTestId('luxury-image');
    expect(image).toHaveAttribute('data-blur', blurDataURL);
  });

  it('removes loading state after image loads', async () => {
    render(<LuxuryImage {...defaultProps} />);

    const image = screen.getByTestId('luxury-image');
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument();

    await act(async () => {
      image.dispatchEvent(new Event('load'));
    });

    await waitFor(() => {
      expect(document.querySelector('.animate-pulse')).not.toBeInTheDocument();
    });
  });
});
