import Image from 'next/image';

/**
 * HeroSection displays the main hero area with luxury donut image and tagline
 * Server Component optimized for performance
 *
 * @component
 * @example
 * <HeroSection />
 */
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-donut.jpg"
          alt="Princess Puff signature luxury donut on elegant black background"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-90"
        />
        {/* Gradient Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1
          className="font-playfair text-5xl md:text-7xl lg:text-8xl text-gold-400 mb-6 animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          Princess Puff
        </h1>
        <p
          className="text-xl md:text-2xl lg:text-3xl text-gold-400/90 font-light animate-fade-in"
          style={{ animationDelay: '0.6s' }}
        >
          Luxury Redefined in Every Bite
        </p>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        aria-hidden="true"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="text-gold-400/50"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
