# Epic 1: Foundation & Brand Homepage

**Goal:** Build the minimal viable foundation that enables rapid development while delivering a stunning homepage that proves the luxury vision. Focus only on what's needed now, not what might be needed later. Every line of code should directly contribute to showcasing Princess Puff's brand or enabling the next epic.

## Story 1.1: Minimal Next.js Setup

As a developer,
I want the absolute minimum setup to start building,
so that I can deliver value immediately without over-engineering.

### Acceptance Criteria
1: Next.js 14 with TypeScript in a GitHub repo
2: Vercel connected for automatic deployments
3: Tailwind CSS configured and working
4: .env.example with only essential vars
5: Single command to run locally (npm run dev)
6: Jest + React Testing Library configured with one example test passing (npm test)
7: README.md with setup instructions and npm commands

### Technical Notes
- Testing: Use `npm test` to run tests, keep one simple test (e.g., Home.test.tsx) to verify setup works
- README should include: Quick start (clone, install, run), Environment variables needed, Deployment notes

## Story 1.2: Luxe Noir Visual Foundation

As a developer,
I want the core visual elements that make the site feel luxury,
so that even the first page looks premium.

### Acceptance Criteria
1: Tailwind config with black/gold colors (#000000, #D4A574)
2: Playfair Display + Inter fonts loading optimally
3: CSS classes for luxury feel: .luxury-gradient, .gold-accent, .elegant-shadow
4: Image component that handles black backgrounds elegantly
5: Verify gold-on-black passes WCAG AA contrast

## Story 1.3: Homepage Implementation

As a visitor,
I want a stunning luxury homepage that loads fast and works on all devices,
so that I immediately understand Princess Puff is a premium brand.

### Acceptance Criteria
1: Hero section with princess donut on black background (mobile + desktop optimized)
2: Smooth fade-in animation for tagline "Luxury Redefined in Every Bite"
3: Brand story teaser with elegant typography
4: B2C "Shop Luxe" and B2B "Partner With Us" buttons
5: Simple header/footer (logo, minimal nav, contact)
6: Page loads in under 3 seconds on 4G
7: Looks perfect on iPhone and desktop Chrome

## Story 1.4: Production Deployment

As a business owner,
I want the homepage live on princesspuff.rs with HTTPS,
so that customers can start discovering our brand.

### Acceptance Criteria
1: Domain configured pointing to Vercel
2: HTTPS working with no warnings
3: Basic meta tags for SEO (title, description)
4: Social sharing image configured
5: Deployment actually works and site stays up

## Why This Epic Structure is Optimal:

**What we're building:** A single stunning homepage that proves the concept
**What we're NOT building:** Documentation systems, analytics, complex security, or features we don't need yet

**The brutal truth about optimal Epic 1:**
1. **Setup (Story 1.1):** Just enough to start coding - nothing more
2. **Visual Foundation (Story 1.2):** Only the styling needed for the homepage
3. **Homepage (Story 1.3):** The actual value delivery - what stakeholders care about
4. **Deployment (Story 1.4):** Making it real and accessible

**What we consciously removed and why:**
- **Storybook:** Build it when you have 10+ components, not 3
- **Analytics:** Add when you have user journeys beyond a single page
- **Cookie Consent:** Add with analytics - it's overhead until then
- **Security Headers:** Add when you have forms and user data
- **Error Tracking:** Add when you have real users hitting errors
- **Complex Navigation:** Build when you have somewhere to navigate to
- **PostgreSQL/Docker:** Add when you need a database (Epic 2 with Strapi)

**Time estimate:** 3-4 days instead of 2 weeks
**Value delivered:** Same (beautiful homepage live on the web)
**Technical debt:** None - we built what we need, when we need it

**This approach follows the principle:** "The best code is no code, and the second best code is code that directly delivers value."
