# Backend Architecture (Detailed)

## API Design Patterns

**Hybrid Architecture:**
1. **Strapi CMS:** Content management and CRUD operations
2. **Next.js API Routes:** Custom business logic and integrations

**Next.js API Routes:**
```typescript
// app/api/contact/b2c/route.ts
export async function POST(request: Request) {
  const body = await request.json();
  
  // Validate
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  
  // Rate limiting - 5 requests per hour as per PRD
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const { success, headers } = await checkRateLimit(ip);
  
  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests. Maximum 5 submissions per hour.' }, 
      { status: 429, headers }
    );
  }
  
  // Process
  await sendEmail({
    to: process.env.B2C_EMAIL,
    subject: `New Inquiry: ${result.data.name}`,
    react: ContactEmailTemplate(result.data)
  });
  
  // Store in Strapi
  await strapi.create('contact-submissions', result.data);
  
  return NextResponse.json({ success: true });
}
```

## Service Layer Pattern

```typescript
// lib/services/ProductService.ts
export class ProductService {
  static async getFeatured(): Promise<Product[]> {
    const cached = await cache.get('featured-products');
    if (cached) return cached;
    
    const products = await strapi.find('products', {
      filters: { featured: true },
      populate: ['images', 'category'],
      sort: 'sort_order'
    });
    
    await cache.set('featured-products', products, 300); // 5 min
    return products;
  }
  
  static async getBySlug(slug: string): Promise<Product | null> {
    const products = await strapi.find('products', {
      filters: { slug },
      populate: '*'
    });
    
    return products[0] || null;
  }
}
```

## Authentication & Authorization

**Admin Access:** Strapi built-in with role-based access
**API Access:** Bearer tokens for Next.js → Strapi communication
**Future Customer Auth:** NextAuth.js prepared but not implemented for MVP

```typescript
// lib/auth/config.ts (prepared for future)
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // Customer login
    }),
    GoogleProvider({
      // OAuth option
    })
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' }
};
```

## Data Validation

**Zod Schemas:**
```typescript
// lib/schemas/contact.ts
export const contactB2CSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10).max(1000),
  productInterest: z.string().optional()
});

export const contactB2BSchema = contactB2CSchema.extend({
  company: z.string().min(2),
  role: z.string(),
  orderVolume: z.enum(['small', 'medium', 'large'])
});
```

## Error Handling

**Centralized Error Handler:**
```typescript
// lib/errors/handler.ts
export class APIError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string
  ) {
    super(message);
  }
}

// Usage
if (!product) {
  throw new APIError(404, 'PRODUCT_NOT_FOUND', 'Product not found');
}
```

## Rate Limiting

```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 requests per hour
});

export async function checkRateLimit(identifier: string) {
  const { success, limit, reset, remaining } = await ratelimit.limit(identifier);
  
  return {
    allowed: success,
    headers: {
      'X-RateLimit-Limit': limit.toString(),
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': new Date(reset).toISOString()
    }
  };
}
```
