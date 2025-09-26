# API Specification

## API Architecture

**Type:** RESTful API via Strapi
**Format:** JSON
**Authentication:** API tokens for Next.js, JWT for admin
**Versioning:** Path-based (/api/v1/)
**Rate Limiting:** 100 requests per minute per IP

## Core Endpoints

### Products
```
GET /api/products
GET /api/products/:slug
GET /api/products?filters[featured]=true
GET /api/products?filters[category][slug]=signature
```

### Categories
```
GET /api/categories
GET /api/categories/:slug
```

### Locations
```
GET /api/locations
GET /api/locations/:id
```

### News
```
GET /api/articles
GET /api/articles/:slug
GET /api/articles?filters[category]=product-launch
```

### Contact (Custom)
```
POST /api/contact/b2c
POST /api/contact/b2b
```

### Revalidation (Webhook)
```
POST /api/revalidate
Headers: x-strapi-signature
Body: { model, entry, event }
```

## Example API Responses

**Product List:**
```json
{
  "data": [
    {
      "id": "1",
      "attributes": {
        "name": "Royal Princess",
        "slug": "royal-princess",
        "description": "Our flagship donut...",
        "featured": true,
        "category": {
          "data": {
            "attributes": {
              "name": "Signature Collection",
              "slug": "signature"
            }
          }
        },
        "images": {
          "data": [
            {
              "attributes": {
                "url": "https://r2.princesspuff.rs/royal-princess-hero.webp",
                "width": 1200,
                "height": 800
              }
            }
          ]
        }
      }
    }
  ],
  "meta": {
    "pagination": {
      "total": 12
    }
  }
}
```

## API Client Example

```typescript
// lib/api/products.ts
export async function getProducts(params?: {
  featured?: boolean;
  category?: string;
}) {
  const query = qs.stringify({
    populate: ['category', 'images'],
    filters: {
      ...(params?.featured && { featured: true }),
      ...(params?.category && { category: { slug: params.category } })
    }
  });
  
  const res = await fetch(`${STRAPI_URL}/api/products?${query}`, {
    headers: { 'Authorization': `Bearer ${STRAPI_TOKEN}` },
    next: { tags: ['products'] } // Tag-based revalidation
  });
  
  return res.json();
}

// app/api/revalidate/route.ts
export async function POST(request: Request) {
  const signature = request.headers.get('x-strapi-signature');
  const body = await request.text();
  
  // Verify webhook signature
  if (!verifyWebhookSignature(signature, body)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const { model, entry } = JSON.parse(body);
  
  // Revalidate based on content type
  if (model === 'product') {
    revalidateTag('products');
    revalidateTag(`product-${entry.slug}`);
  } else if (model === 'homepage') {
    revalidatePath('/');
  }
  
  return Response.json({ revalidated: true });
}
```

## Error Handling

Standard HTTP status codes with consistent error format:
```json
{
  "error": {
    "status": 404,
    "name": "NotFoundError",
    "message": "Product not found",
    "details": {}
  }
}
```
