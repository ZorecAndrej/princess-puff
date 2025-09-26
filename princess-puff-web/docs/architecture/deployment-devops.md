# Deployment & DevOps

## CI/CD Pipeline

**GitHub Actions Workflow:**
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test:unit
      - run: npm run build

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## Environment Configuration

**Development:**
```env
# .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
STRAPI_URL=http://localhost:1337
STRAPI_TOKEN=local-dev-token
RESEND_API_KEY=re_dev_xxxx
```

**Production:**
```env
# Vercel Environment Variables
NEXT_PUBLIC_SITE_URL=https://princesspuff.rs
STRAPI_URL=https://princess-puff-cms.up.railway.app
STRAPI_TOKEN=prod-token-from-strapi
RESEND_API_KEY=re_prod_xxxx
GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Infrastructure as Code

**Vercel Configuration:**
```json
// vercel.json
{
  "functions": {
    "app/api/*": {
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ],
  "github": {
    "autoJobCancelation": true
  }
}
```

**Railway Configuration:**
```toml
# railway.toml
[build]
builder = "DOCKERFILE"
dockerfilePath = "./Dockerfile"

[deploy]
startCommand = "npm run start"
healthcheckPath = "/_health"
healthcheckTimeout = 300

[variables]
NODE_ENV = "production"
DATABASE_SSL = "true"
```

## Media Pipeline Configuration

**Strapi to R2 Upload Provider:**
```javascript
// config/plugins.js
module.exports = {
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        s3Options: {
          endpoint: process.env.R2_ENDPOINT, // https://accountid.r2.cloudflarestorage.com
          region: 'auto',
          credentials: {
            accessKeyId: process.env.R2_ACCESS_KEY_ID,
            secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
          },
        },
      },
      actionOptions: {
        upload: {
          Bucket: 'princess-puff-media',
          ACL: null, // R2 doesn't use ACL
        },
      },
    },
  },
};
```

**Next.js Image Configuration:**
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['media.princesspuff.rs'],
    loader: 'default',
    formats: ['image/webp'],
  },
};
```

**Media URL Structure:**
- Upload: Strapi → R2 via S3 API
- Serve: `https://media.princesspuff.rs/[path]` via Cloudflare
- No proxying through Next.js - direct CDN delivery

## Monitoring & Logging

**Application Monitoring:**
1. **Google Analytics 4:** Business KPIs, conversion tracking (implemented in Epic 1)
2. **Vercel Analytics:** Core Web Vitals, traffic patterns  
3. **Sentry:** Error tracking for production issues
4. **Railway Metrics:** Database performance, CMS uptime

**Analytics Implementation (Epic 1):**
```typescript
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <CookieBanner />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      </body>
    </html>
  )
}

// components/CookieBanner.tsx
'use client';

export function CookieBanner() {
  const [consent, setConsent] = useState<boolean | null>(null);
  
  useEffect(() => {
    if (consent === true) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
  }, [consent]);
  
  // Minimal GDPR-compliant banner
}
```

**Logging Strategy:**
```typescript
// lib/logger.ts
const logger = {
  info: (message: string, meta?: any) => {
    if (process.env.NODE_ENV === 'production') {
      console.log(JSON.stringify({ level: 'info', message, ...meta }));
    } else {
      console.log(`[INFO] ${message}`, meta);
    }
  },
  error: (message: string, error?: Error) => {
    console.error(JSON.stringify({ 
      level: 'error', 
      message, 
      error: error?.message,
      stack: error?.stack 
    }));
  }
};
```

## Security Considerations

1. **Environment Variables:** Never committed, rotated quarterly
2. **API Keys:** Scoped permissions, IP restrictions where possible
3. **HTTPS:** Enforced via Cloudflare and Vercel
4. **Headers:** Security headers via Vercel configuration
5. **Input Validation:** Zod schemas on all user inputs
6. **Rate Limiting:** On all public endpoints
7. **CORS:** Restricted to frontend domain only

## Backup Strategy

**Database Backups:**
- Railway automatic daily backups (7-day retention)
- Manual export before major changes
- Backup restore tested monthly

**Media Backups:**
- Cloudflare R2 versioning enabled
- Cross-region replication for disaster recovery

## Rollback Procedures

1. **Frontend:** Vercel instant rollback to previous deployment
2. **CMS:** Railway deployment rollback or database restore
3. **Content:** Strapi revision history for content rollback
