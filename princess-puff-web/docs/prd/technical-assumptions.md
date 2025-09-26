# Technical Assumptions

## Repository Structure: Separate Repositories

The project will use separate repositories for better deployment isolation: one for the Next.js frontend and one for the Strapi CMS. This approach allows independent deployment cycles, separate CI/CD pipelines, and clearer security boundaries. Both repositories will live under the https://github.com/ZorecAndrej organization.

## Service Architecture

**Jamstack Architecture with Headless CMS:** The system will follow a decoupled architecture with Next.js serving as the static site generator/frontend and Strapi as the headless CMS. Next.js will fetch content at build time for optimal performance, with incremental static regeneration (ISR) for content updates. API routes in Next.js will handle form submissions and third-party integrations. This architecture provides excellent performance, security, and scalability while maintaining flexibility for future e-commerce additions.

## Testing Requirements

**Focused Testing Strategy for MVP:** Given the presentation-site nature and 6-week timeline, testing will prioritize critical paths. Unit tests for utility functions and data transformations, integration tests for form submissions and API routes, visual regression tests for key brand components, and manual testing checklist for CMS workflows and cross-browser compatibility. Full E2E test suite deferred to post-launch to meet timeline constraints.

## Additional Technical Assumptions and Requests

- **Framework Versions:** Next.js 14+ with App Router for modern React patterns and better performance
- **Styling Architecture:** Tailwind CSS with custom design system matching Luxe Noir brand guidelines, utilizing CSS custom properties for theming
- **Image Management:** Next/Image with Vercel's image optimization API, Cloudinary integration for CMS-uploaded images with automatic transformations
- **Form Handling:** Custom React Hook Form implementation with Zod validation, email notifications via Resend API
- **State Management:** Minimal client state using React Context for UI preferences, no heavy state management needed for MVP
- **Deployment Pipeline:** GitHub repository with Vercel's Git integration for automatic preview and production deployments
- **Content Delivery:** ISR (Incremental Static Regeneration) for all CMS-driven content with 5-minute revalidation, client-side fetching only for dynamic map data
- **Analytics Setup:** Google Analytics 4 with cookie consent management, custom events for inquiry conversions and B2B pathway tracking
- **Development Standards:** TypeScript for type safety, ESLint + Prettier for code consistency, conventional commits for clear history
- **CMS Configuration:** Strapi self-hosted on Railway, PostgreSQL database for content storage, S3-compatible object storage for media
- **Performance Budget:** Total page weight <2MB on mobile, <3MB on desktop; max 3 requests for critical rendering path
- **Browser Support:** Last 2 versions of Chrome, Firefox, Safari, Edge; iOS Safari 14+; Chrome Android 100+
- **Environment Strategy:** Local development with Docker Compose for database/services (keeping development simple and consistent), staging on Vercel preview, production on Vercel with custom domain
- **Language Strategy:** English-first launch with content structure prepared for Serbian translation via Strapi i18n plugin in Phase 2
- **Repository:** GitHub under https://github.com/ZorecAndrej organization with separate repos for frontend and CMS if needed
- **Security Layer:** Cloudflare proxy for DDoS protection and caching, environment variables for secrets management via Vercel and Railway
- **Media Storage:** Cloudflare R2 for S3-compatible object storage (egress-free), with Cloudinary for on-demand image transformations
- **Email Infrastructure:** Resend API with React Email for template management, proper SPF/DKIM setup for deliverability
- **Content Synchronization:** Strapi webhooks to trigger Vercel on-demand ISR, staging content workflow for preview before production
