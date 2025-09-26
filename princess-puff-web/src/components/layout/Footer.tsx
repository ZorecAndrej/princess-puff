/**
 * Footer component for Princess Puff website
 * Server Component providing site-wide footer with contact info and social links
 *
 * @component
 * @example
 * <Footer />
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gold-400/20 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="font-playfair text-2xl text-gold-400 mb-4">Princess Puff</h3>
            <p className="text-gold-400/70 text-sm">Luxury Redefined in Every Bite</p>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <h4 className="font-playfair text-lg text-gold-400 mb-4">Contact</h4>
            <address className="not-italic space-y-2 text-sm text-gold-400/70">
              <p>Belgrade, Serbia</p>
              <p>
                <a href="tel:+381XXXXXXX" className="hover:text-gold-400 transition-colors">
                  +381 XX XXX XXXX
                </a>
              </p>
              <p>
                <a
                  href="mailto:hello@princesspuff.rs"
                  className="hover:text-gold-400 transition-colors"
                >
                  hello@princesspuff.rs
                </a>
              </p>
            </address>
          </div>

          {/* Social Section */}
          <div className="text-center md:text-right">
            <h4 className="font-playfair text-lg text-gold-400 mb-4">Follow Us</h4>
            <div className="flex justify-center md:justify-end space-x-4">
              <a
                href="https://instagram.com/princesspuff"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-400/70 hover:text-gold-400 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://facebook.com/princesspuff"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-400/70 hover:text-gold-400 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-gold-400/20 text-center">
          <p className="text-sm text-gold-400/50">
            &copy; {currentYear} Princess Puff. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
