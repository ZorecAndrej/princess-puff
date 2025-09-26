# Internationalization Strategy

## i18n Architecture

**Approach:** English-first with Serbian language support structure from day one
**Implementation:** Next.js i18n routing with Strapi localization plugin

## Configuration

```typescript
// next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'sr-Latn'], // Serbian Latin script
    localeDetection: false // Start with manual selection
  }
}
```

## Strapi Setup

```javascript
// config/plugins.js
module.exports = {
  i18n: {
    enabled: true,
    config: {
      defaultLocale: 'en',
      locales: ['en', 'sr-Latn']
    }
  }
}
```

## Frontend Implementation

```typescript
// lib/i18n/translations.ts
export const translations = {
  en: {
    nav: {
      home: 'Home',
      products: 'Products',
      about: 'About',
      contact: 'Contact',
      business: 'Business'
    },
    cta: {
      learnMore: 'Learn More',
      contactUs: 'Contact Us',
      viewProducts: 'View Products'
    }
  },
  'sr-Latn': {
    nav: {
      home: 'Početna',
      products: 'Proizvodi',
      about: 'O nama',
      contact: 'Kontakt',
      business: 'Poslovno'
    },
    cta: {
      learnMore: 'Saznaj više',
      contactUs: 'Kontaktiraj nas',
      viewProducts: 'Pogledaj proizvode'
    }
  }
}
```

## Content Strategy

1. **Phase 1 (MVP):** English content with Serbian UI labels
2. **Phase 2:** Full Serbian content translation in Strapi
3. **URL Structure:** `/sr/products` for Serbian, `/products` for English
