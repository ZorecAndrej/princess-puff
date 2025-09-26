# Documentation and Knowledge Base

## Code Documentation Standards

**Component Documentation:**
```typescript
/**
 * ProductCard - Displays a single product in the luxury grid
 * 
 * @component
 * @example
 * <ProductCard product={product} priority={true} />
 * 
 * @param {Product} product - Product data from CMS
 * @param {boolean} [priority=false] - Load image with priority
 */
export function ProductCard({ product, priority = false }: ProductCardProps) {
  // Implementation
}
```

**API Documentation:**
```typescript
/**
 * Submit B2C contact form
 * @route POST /api/contact/b2c
 * @body {ContactB2CInput} - Contact form data
 * @returns {ContactResponse} - Success or error response
 * @throws {ValidationError} - Invalid input data
 * @throws {RateLimitError} - Too many requests
 */
```

## System Documentation

**Architecture Decision Records (ADRs):**
```markdown
# ADR-001: Use ISR over SSR for Product Pages

# Status
Accepted

# Context
Product pages need to display fresh content while maintaining performance.

# Decision
Use Incremental Static Regeneration with 5-minute cache.

# Consequences
- Excellent performance (static serving)
- Near-real-time content updates
- Slight delay for content changes
- Lower server costs than SSR
```

## Development Guides

1. **Getting Started Guide**
2. **Component Development Guide**
3. **CMS Content Management Guide**
4. **Deployment Guide**
5. **Troubleshooting Guide**

## API Documentation

Auto-generated from TypeScript types:
```bash
npm run docs:api
# Generates OpenAPI spec from route handlers
```
