import Link from 'next/link';

/**
 * BrandStorySection displays an elegant teaser of the Princess Puff brand story
 * Server Component for optimal performance
 *
 * @component
 * @example
 * <BrandStorySection />
 */
export default function BrandStorySection() {
  return (
    <section className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center space-y-8">
          {/* Section Heading */}
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-gold-400">
            Our Story
          </h2>

          {/* Decorative Divider */}
          <div className="flex justify-center">
            <div className="w-24 h-0.5 bg-gold-400/50" />
          </div>

          {/* Story Excerpt */}
          <div className="space-y-6 text-gold-400/80 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            <p>
              Princess Puff was born from a vision to transform the humble donut into an
              extraordinary culinary experience. In the heart of Belgrade, we craft each piece as a
              work of art, where traditional techniques meet innovative flavors.
            </p>
            <p>
              Every donut tells a story of passion, precision, and the relentless pursuit of
              perfection. From our signature glazes to our hand-selected ingredients, we believe
              luxury is found in every detail.
            </p>
          </div>

          {/* Read More Link */}
          <div className="pt-8">
            <Link
              href="/about"
              className="inline-flex items-center space-x-2 text-gold-400 hover:text-gold-300 transition-colors group"
            >
              <span className="text-base uppercase tracking-wider font-medium">Discover More</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="transform group-hover:translate-x-1 transition-transform"
                strokeWidth="2"
              >
                <path d="M5 12h14m-7-7l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
