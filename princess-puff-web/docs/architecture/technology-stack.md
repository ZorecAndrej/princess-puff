# Technology Stack

## Technology Choices Table

| Category | Technology | Version | Purpose | Rationale |
|----------|------------|---------|---------|-----------|
| Language | TypeScript | 5.3+ | Full-stack type safety | Catches errors at compile time, improves developer productivity, essential for rapid MVP development |
| Frontend Framework | Next.js | 14.1+ | React meta-framework | App Router for modern patterns, built-in optimization, ISR support, Vercel integration |
| UI Framework | React | 18.2+ | Component library | Industry standard, vast ecosystem, perfect for luxury UI components |
| Styling | Tailwind CSS | 3.4+ | Utility-first CSS | Rapid prototyping, consistent design system, perfect for Luxe Noir aesthetic |
| State Management | React Context | Built-in | Simple state needs | No complex state required for MVP, keeps bundle size minimal |
| Backend/API | Strapi | 4.15+ | Headless CMS | User-friendly for content team, REST API out of box, plugin ecosystem |
| Database | PostgreSQL | 15+ | Relational database | Strapi default, reliable, handles all content needs |
| ORM/Query Builder | Strapi ORM | Built-in | Database abstraction | Comes with Strapi, no additional complexity |
| Validation | Zod | 3.22+ | Schema validation | TypeScript-first validation, works great with forms |
| Testing | Vitest + Playwright | Latest | Unit/E2E testing | Fast unit tests, reliable E2E, good DX |
| API Mocking | MSW | 2.0+ | API mocking | Enables frontend development without backend |
| Build Tool | Next.js + Turbopack | Built-in | Asset bundling | Zero-config with Next.js, fast builds |
| Deployment | Vercel + Railway | Latest | Hosting platforms | Best-in-class for respective services |

## Language Choices

**Primary Language:** TypeScript across the entire stack

**Rationale:** TypeScript provides type safety that catches errors during development rather than production. With a 12-14 day timeline, we can't afford runtime errors. The type system also serves as documentation and enables better IDE support, crucial for rapid development.

**Secondary Languages:**
- **CSS/SCSS:** For Tailwind customization and specific luxury brand styles
- **MDX:** For potential rich content in Strapi (future enhancement)
- **SQL:** For any complex queries or migrations

**Frontend-Specific Tech:**
- **next/font:** For optimized font loading (Playfair Display + Inter)
- **next/image:** For automatic image optimization
- **React Hook Form:** For form handling with minimal re-renders
- **date-fns:** For date formatting (lightweight alternative to moment)

**Backend-Specific Tech:**
- **Strapi Plugins:** Upload (S3 for R2), i18n (enabled from start for Serbian support), Email, Webhooks
- **node-cron:** For scheduled tasks if needed  
- **Winston:** For structured logging

## Code Organization Strategy

**Project Source Tree:**

```
princess-puff/                     # Root project directory
├── docs/                         # Architecture and documentation
│   ├── architecture.md          # This file - technical architecture
│   ├── prd.md                   # Product requirements document
│   ├── front-end-spec.md        # Frontend specifications
│   └── cost-optimization.md     # Infrastructure cost analysis
├── princess-puff-web/           # Frontend Next.js application
│   └── [see detailed structure below]
└── princess-puff-cms/           # Backend Strapi CMS
    └── [see detailed structure below]
```

**Frontend Repository Structure:**
```
princess-puff-web/
├── src/
│   ├── app/                    # Next.js 14 app directory
│   │   ├── (marketing)/       # Marketing pages group
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── products/      # Product pages
│   │   │   ├── about/         # About page
│   │   │   └── contact/       # Contact page
│   │   ├── business/          # B2B section
│   │   ├── api/               # API routes
│   │   │   ├── contact/       # Form submission
│   │   │   └── revalidate/    # ISR webhook
│   │   └── layout.tsx         # Root layout
│   ├── components/
│   │   ├── ui/                # Base UI components
│   │   ├── layout/            # Layout components
│   │   ├── product/           # Product-specific
│   │   └── forms/             # Form components
│   ├── lib/
│   │   ├── api/               # API client functions
│   │   ├── utils/             # Utility functions
│   │   └── types/             # TypeScript types
│   └── styles/
│       └── globals.css        # Tailwind + custom styles

princess-puff-cms/
├── src/
│   ├── api/                   # Custom API extensions
│   ├── components/            # Custom admin components
│   ├── plugins/               # Custom plugins
│   └── types/                 # TypeScript types
├── config/
│   ├── database.js           # Database config
│   ├── server.js             # Server config
│   └── plugins.js            # Plugin config
└── public/                   # Static assets
```

**Key Principles:**
- Co-locate related files (components with their styles/tests)
- Shared types in dedicated directories
- Clear separation of concerns
- Feature-based organization where appropriate

## Coding Standards

**Documentation Requirements:**

1. **JSDoc for All Public APIs:**
   ```typescript
   /**
    * Fetches products from the CMS with optional filtering
    * @param params - Optional filtering parameters
    * @param params.featured - Filter for featured products only
    * @param params.category - Filter by category slug
    * @returns Promise containing array of products with populated relations
    * @throws {APIError} When the API request fails
    * @example
    * const featured = await getProducts({ featured: true });
    */
   export async function getProducts(params?: ProductQueryParams): Promise<Product[]> {
     // implementation
   }
   ```

2. **Interface Documentation:**
   ```typescript
   /**
    * Represents a luxury product in the Princess Puff catalog
    */
   export interface Product {
     /** Unique identifier from CMS */
     id: string;
     /** Display name of the product */
     name: string;
     /** URL-friendly slug for routing */
     slug: string;
     /** Rich text description with ingredients */
     description: string;
     /** Whether this product should be featured on homepage */
     featured: boolean;
     /** Product images for gallery display */
     images: ProductImage[];
   }
   ```

3. **Component Documentation:**
   ```typescript
   /**
    * ProductCard displays a single product in the luxury grid layout
    * Used in product gallery and featured sections
    * 
    * @component
    * @example
    * <ProductCard 
    *   product={product} 
    *   priority={index < 3}
    *   onImageLoad={() => track('product_viewed')} 
    * />
    */
   export function ProductCard({ product, priority = false, onImageLoad }: ProductCardProps) {
     // implementation
   }
   ```

4. **API Route Documentation:**
   ```typescript
   /**
    * Handles B2C contact form submissions
    * 
    * @route POST /api/contact/b2c
    * @rateLimit 5 requests per hour per IP
    * @body {ContactB2CSchema} Contact form data
    * @returns {ContactResponse} Success response with confirmation
    * @throws {ValidationError} 400 - Invalid form data
    * @throws {RateLimitError} 429 - Too many requests
    * @throws {EmailError} 500 - Email service failure
    */
   export async function POST(request: Request) {
     // implementation
   }
   ```

**Code Style Guidelines:**

1. **TypeScript Strict Mode:** Always enabled for type safety
2. **Naming Conventions:**
   - Components: PascalCase (e.g., `ProductCard`, `ContactForm`)
   - Functions/Methods: camelCase (e.g., `getProducts`, `handleSubmit`)
   - Constants: UPPER_SNAKE_CASE (e.g., `API_TIMEOUT`, `MAX_RETRIES`)
   - Types/Interfaces: PascalCase with descriptive names
   - Files: kebab-case for components (e.g., `product-card.tsx`)

3. **Function Guidelines:**
   - Keep functions small and focused (single responsibility)
   - Use descriptive names that indicate what the function does
   - Avoid side effects in pure functions
   - Always define return types explicitly

4. **Error Handling:**
   ```typescript
   // Always use try-catch with proper error types
   try {
     const result = await riskyOperation();
     return { success: true, data: result };
   } catch (error) {
     logger.error('Operation failed', { error, context });
     throw new APIError(500, 'OPERATION_FAILED', 'Failed to complete operation');
   }
   ```

5. **Async/Await Patterns:**
   - Always use async/await over Promise chains
   - Handle errors properly with try-catch
   - Use Promise.all() for concurrent operations

6. **Import Organization:**
   ```typescript
   // 1. React/Next.js imports
   import { useState, useEffect } from 'react';
   import { NextResponse } from 'next/server';
   
   // 2. Third-party libraries
   import { z } from 'zod';
   import clsx from 'clsx';
   
   // 3. Internal imports (absolute paths)
   import { Button } from '@/components/ui/button';
   import { getProducts } from '@/lib/api/products';
   
   // 4. Types
   import type { Product, Category } from '@/lib/types';
   
   // 5. Styles (if any)
   import styles from './component.module.css';
   ```

7. **Component Structure:**
   - Props interface defined above component
   - Hooks at the top of component
   - Helper functions before return statement
   - Conditional rendering should be clear and readable

**Testing Standards:**

1. **Test File Naming:** `*.test.ts` or `*.spec.ts`
2. **Test Structure:** Arrange-Act-Assert pattern
3. **Test Coverage:** Minimum 80% for utilities, 60% for UI components
4. **Mock Data:** Centralized in `__mocks__` directory

**Performance Guidelines:**

1. **Memoization:** Use `React.memo` for expensive components
2. **Code Splitting:** Dynamic imports for heavy features
3. **Image Optimization:** Always use next/image with proper dimensions
4. **Bundle Size:** Monitor with `npm run analyze`
