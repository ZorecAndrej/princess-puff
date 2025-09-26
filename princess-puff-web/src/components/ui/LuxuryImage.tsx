import React from 'react';
import Image from 'next/image';

/**
 * LuxuryImage component for displaying premium product images
 * Features lazy loading, blur placeholder, and hover effects
 *
 * @component
 * @example
 * <LuxuryImage
 *   src="/products/luxury-cream.jpg"
 *   alt="Luxury face cream"
 *   width={400}
 *   height={300}
 *   priority={false}
 * />
 */

/**
 * Props for the LuxuryImage component
 */
export interface LuxuryImageProps {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility - required */
  alt: string;
  /** Width of the image */
  width: number;
  /** Height of the image */
  height: number;
  /** Optional blur data URL for placeholder */
  blurDataURL?: string;
  /** Whether to load image with priority */
  priority?: boolean;
  /** Optional className for additional styling */
  className?: string;
  /** Optional callback when image loads */
  onLoad?: () => void;
  /** Enable responsive sizing */
  responsive?: boolean;
}

export function LuxuryImage({
  src,
  alt,
  width,
  height,
  blurDataURL,
  priority = false,
  className = '',
  onLoad,
  responsive = true,
}: LuxuryImageProps) {
  const [isLoading, setIsLoading] = React.useState(true);

  const handleLoad = () => {
    setIsLoading(false);
    if (onLoad) {
      onLoad();
    }
  };

  const sizes = responsive
    ? '(max-width: 375px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
    : undefined;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        sizes={sizes}
        quality={90}
        onLoad={handleLoad}
        className={`
          transition-all duration-300 ease-in-out
          ${isLoading ? 'opacity-0' : 'opacity-100'}
          hover:opacity-90 hover:scale-105
        `}
      />
      {isLoading && <div className="absolute inset-0 bg-gray-light animate-pulse" />}
    </div>
  );
}

export default LuxuryImage;
