# Frontend Architecture (Detailed)

## Component Architecture

**Design System Components:**
```typescript
// components/ui/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  luxe?: boolean; // Adds gold gradient
}

// components/ui/Card.tsx  
interface LuxuryCardProps {
  glow?: boolean; // Gold border glow
  hover?: 'lift' | 'glow' | 'none';
}
```

**Feature Components:**
```typescript
// components/product/ProductCard.tsx
export function ProductCard({ product }: { product: Product }) {
  return (
    <LuxuryCard hover="lift" className="group">
      <LuxuryImage
        src={product.images[0]?.url}
        alt={product.name}
        width={400}
        height={400}
        className="transition-transform group-hover:scale-105"
      />
      <CardContent>
        <h3 className="font-playfair text-gold">{product.name}</h3>
        <p className="text-gray-300">{product.description}</p>
      </CardContent>
    </LuxuryCard>
  );
}
```

## State Management Approach

**Context for UI State:**
```typescript
// contexts/UIContext.tsx
interface UIState {
  isMobileMenuOpen: boolean;
  isCartOpen: boolean; // Future
  cookieConsent: boolean;
}

export const UIContext = createContext<UIState>({});
```

**Server State via React Query (Future):**
- Currently using Next.js data fetching
- Ready to add React Query when dynamic features needed

**Form State via React Hook Form:**
```typescript
// Example contact form
const { register, handleSubmit } = useForm<ContactForm>({
  resolver: zodResolver(contactSchema)
});
```

## Routing Structure

```
# B2C Customer Journey
/                          # Homepage with dual pathway
/products                  # Product gallery (luxury focus)
/products/[slug]           # Product detail with ingredients
/about                     # Brand story and craftsmanship
/contact                   # B2C contact form
/locations                 # Store locations with maps
/locations/[id]            # Individual store details

# B2B Corporate Journey  
/business                  # B2B landing page
/business/corporate-gifts  # Corporate gifting options
/business/bulk-orders      # Bulk order information
/business/inquiry          # B2B contact form
/business/partnerships     # Partnership opportunities

# Shared Resources
/news                      # News and announcements
/news/[slug]               # Article detail
/privacy                   # Privacy policy
/terms                     # Terms of service
```

## Performance Optimization

1. **Image Optimization:**
   - Next/Image with Vercel optimization
   - Blur placeholders for luxury feel
   - Responsive image sizes
   - WebP with fallbacks

2. **Code Splitting:**
   - Route-based splitting automatic
   - Dynamic imports for heavy components
   - Lazy load map component

3. **Font Optimization:**
   - Next/font for Playfair Display
   - Subset for used characters
   - Font-display: optional for CLS

4. **Bundle Optimization:**
   - Tree shaking with Turbopack
   - Minimize client components
   - SVG optimization

## Mobile Responsiveness

**Breakpoints:**
```css
/* Tailwind config */
screens: {
  'xs': '375px',   // Small phones
  'sm': '640px',   // Large phones
  'md': '768px',   // Tablets
  'lg': '1024px',  // Desktop
  'xl': '1280px',  // Large desktop
  '2xl': '1536px'  // Luxury displays
}
```

**Mobile-First Components:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive grid */}
</div>
```

## React Server Components (RSC) Boundaries

**Server Components (Default):**
```typescript
// app/products/page.tsx - Server Component
export default async function ProductsPage() {
  const products = await getProducts(); // Direct fetch
  
  return <ProductGallery products={products} />;
}

// components/product/ProductGallery.tsx - Server Component
export function ProductGallery({ products }: Props) {
  return (
    <div className="grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**Client Components (Interactive):**
```typescript
// components/layout/Navigation.tsx
'use client';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false); // Client state
  
  return <nav>{/* Mobile menu logic */}</nav>;
}

// components/forms/ContactForm.tsx
'use client';

export function ContactForm() {
  const { register, handleSubmit } = useForm(); // Client-side form
  
  return <form>{/* Form fields */}</form>;
}
```

**Component Classification:**
- **Server Components:** Pages, ProductGallery, ProductCard, HeroSection, Footer, AboutContent
- **Client Components:** Navigation, ContactForm, LocationMap, ImageGallery, CookieBanner, MobileMenu
