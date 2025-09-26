# Epic 3: Customer Engagement & Business Pathways

**Goal:** Enable customers to connect with Princess Puff and discover physical locations while establishing clear B2B and B2C conversion paths. This epic makes the website commercially active by implementing all touchpoints needed to convert interest into inquiries and visits.

## Story 3.1: Contact Form Implementation

As a interested customer,
I want to easily contact Princess Puff with my inquiries,
so that I can learn more about products or partnerships.

### Acceptance Criteria
1: Dual forms - one for B2C inquiries, one for B2B partnerships
2: Form validation with clear error messages
3: Email notifications via Resend API (free tier) with API key in .env
4: Success confirmation message after submission
5: Basic spam protection (honeypot field)
6: Forms styled matching luxury brand aesthetic
7: Resend account created and API key configured (user task)
8: API endpoint documentation in /docs/api.md for contact form endpoints

### Technical Notes
- Resend free tier: 100 emails/day, perfect for MVP contact forms
- Environment variable: RESEND_API_KEY in .env
- API docs should include: Endpoint URL, Request format, Response format, Error codes
- Simple implementation: POST to /api/contact with JSON body

## Story 3.2: Business (B2B) Section

As a corporate buyer,
I want to understand Princess Puff's business offerings,
so that I can evaluate partnership opportunities.

### Acceptance Criteria
1: Dedicated /business page with professional tone
2: Corporate gifting benefits clearly outlined
3: Bulk order process explanation
4: Simple partnership inquiry form
5: Professional imagery showcasing packaging
6: Mobile-responsive layout

## Story 3.3: Location Pages with Maps

As a customer,
I want to find Princess Puff physical locations easily,
so that I can visit and purchase products.

### Acceptance Criteria
1: Locations overview page with all stores listed
2: Individual location pages with full details
3: Google Maps integration showing store location
4: Store hours, address, and contact information
5: Parking information and accessibility notes
6: "Get Directions" functionality

## Story 3.4: News/Announcements System

As a brand follower,
I want to stay updated on Princess Puff news and launches,
so that I don't miss new products or events.

### Acceptance Criteria
1: News listing page with article previews
2: Individual article pages with full content
3: CMS management for news articles
4: Basic categorization (Product Launch, Events, Press)
5: ISR for fresh content
6: Social sharing meta tags

## Future Enhancements - Epic 3 (Post-MVP)

**Contact & Forms:**
- Multi-step forms for complex inquiries
- File upload capability for B2B RFPs
- Automated email sequences based on inquiry type
- CRM integration for lead tracking
- Live chat integration
- WhatsApp Business integration
- Appointment booking for consultations

**B2B Section Enhancements:**
- Password-protected wholesale portal
- Downloadable product catalogs (PDF)
- Volume pricing calculator
- Case studies and testimonials
- Partnership success stories
- Sample request system
- B2B-specific product bundles
- Corporate account application

**Location Enhancements:**
- Real-time store hours (holiday updates)
- In-store event calendar
- Store-specific product availability
- Virtual store tours
- Staff profiles and recommendations
- Favorite store selection
- Distance-based store sorting
- Public transport directions

**News & Content:**
- Newsletter signup integration
- Author profiles for articles
- Comment system for engagement
- Related articles algorithm
- Tag-based navigation
- RSS feed generation
- Email notifications for new posts
- Content series support

**Advanced Features:**
- FAQ system with search
- Loyalty program information
- Gift card purchase system
- Event booking system
- Influencer collaboration portal
- Press kit download area
- Franchise inquiry system
