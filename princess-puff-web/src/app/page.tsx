import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Princess Puff - Luxury Donuts Belgrade',
  description:
    "Experience the epitome of donut artistry. Princess Puff brings luxury, elegance, and unforgettable taste to Belgrade's finest palates.",
  openGraph: {
    title: 'Princess Puff - Luxury Donuts Belgrade',
    description:
      "Experience the epitome of donut artistry. Princess Puff brings luxury, elegance, and unforgettable taste to Belgrade's finest palates.",
    url: 'https://princesspuff.rs',
    siteName: 'Princess Puff',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Princess Puff - Luxury Donuts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Princess Puff - Luxury Donuts Belgrade',
    description: 'Experience the epitome of donut artistry.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Princess Puff',
  description: 'Luxury donut boutique in Belgrade offering artisanal, premium donuts.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Belgrade',
    addressCountry: 'RS',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 44.7866,
    longitude: 20.4489,
  },
  url: 'https://princesspuff.rs',
  telephone: '+381-XXX-XXXX',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '09:00',
      closes: '21:00',
    },
  ],
  priceRange: '$$$',
};

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import BrandStorySection from '@/components/sections/BrandStorySection';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Skip Navigation Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-gold-400 text-black px-4 py-2 rounded"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content" className="bg-black">
        <HeroSection />

        {/* CTA Buttons Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/products" className="w-full sm:w-auto">
                <Button variant="primary" className="w-full sm:w-auto">
                  Shop Luxe
                </Button>
              </Link>
              <Link href="/business" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full sm:w-auto">
                  Partner With Us
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <BrandStorySection />
      </main>

      <Footer />
    </>
  );
}
