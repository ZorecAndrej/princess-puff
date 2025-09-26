# Epic 2: Product Showcase & CMS Integration

**Goal:** Implement Strapi CMS to manage all content and create a stunning product showcase that highlights Princess Puff's artisanal donuts. This epic transforms the static homepage into a dynamic, CMS-driven site while adding the core business value - beautiful product presentation that drives customer desire.

## Story 2.1: Strapi Setup & Content Architecture

As a content manager,
I want a headless CMS where I can manage all website content,
so that I can update products and content without developer help.

### Acceptance Criteria
1: Strapi deployed on Railway Starter with PostgreSQL (document cold start workaround)
2: Content types: Product (name, slug, description, image, ingredients, allergens, featured), Homepage (hero_image, hero_text, featured_product_ids)
3: Cloudflare R2 configured with Strapi S3 plugin for media storage
4: API tokens configured for Next.js to fetch content
5: Basic seed data: 6 example products
6: Simple admin guide: "Click here first to wake up CMS" + basic tasks

## Story 2.2: Product Gallery Implementation

As a luxury shopper,
I want to browse all Princess Puff products in an elegant gallery,
so that I can explore the full range of artisanal donuts.

### Acceptance Criteria
1: Product grid layout with 3 columns on desktop, 1 on mobile
2: Product cards: image, name, brief description
3: Hover effect revealing "View Details" with smooth transition
4: All products displayed (no filtering in MVP)
5: ISR page with 5-minute revalidation
6: Loading state while products fetch

## Story 2.3: Individual Product Pages

As a potential customer,
I want detailed information about each donut,
so that I can appreciate the craftsmanship and ingredients.

### Acceptance Criteria
1: Hero product image with luxury presentation
2: Product name and full description with elegant typography
3: Ingredients list with allergens clearly marked
4: Dynamic routing (/products/[slug]) with ISR
5: Meta tags: title, description, og:image from CMS
6: 404 handling for invalid product slugs

## Story 2.4: Homepage Migration to CMS

As a content manager,
I want to update homepage content through the CMS,
so that I can keep the brand message fresh.

### Acceptance Criteria
1: Homepage hero image/text managed in Strapi
2: Featured products section pulling from CMS
3: Brand story content editable in CMS
4: Homepage still loads in under 3 seconds
5: ISR configured for 5-minute updates
6: Fallback content if CMS is down

## Future Enhancements - Epic 2 (Post-MVP)

**CMS & Infrastructure:**
- Docker Compose for consistent local development
- Railway Pro upgrade when cold starts become problematic
- Staging/preview environment for content testing
- Advanced content types (testimonials, press, team members)
- Webhook to Vercel for instant cache purging
- Multi-language content structure preparation

**Product Gallery Enhancements:**
- Category filtering system with dynamic categories from CMS
- Search functionality with auto-complete
- Sort options: newest, price (when added), popularity
- Pagination or infinite scroll for 20+ products
- Quick view modal without page navigation
- Grid/List view toggle
- Product badges (New, Seasonal, Limited Edition)

**Product Page Enhancements:**
- Multiple image gallery with zoom and lightbox
- 360° product view capability
- Related products algorithm (same category + popular)
- "Perfect for" suggestions section
- Social sharing buttons
- "Back in stock" notification signup
- Nutritional information table
- Serving suggestions carousel
- Print-friendly version for corporate buyers

**Performance & Technical:**
- Advanced image pipeline with automatic resizing on upload
- Blur placeholder generation for progressive loading
- WebP format serving with fallbacks
- CDN warming for popular products
- Predictive prefetching based on user behavior
- Advanced caching strategies per content type

**CMS Quality of Life:**
- Bulk product import/export via CSV
- Product duplication feature
- Rich text editor customization for brand voice
- Media library organization with folders and tags
- Automated image optimization on upload
- Content versioning and rollback
- SEO preview for each product
- Inventory tracking integration ready
