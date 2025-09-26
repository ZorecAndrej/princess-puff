# Operations

## Performance Targets and SLAs

**Page Load Performance:**
- Homepage: < 2s (LCP)
- Product pages: < 2.5s (LCP)  
- Lighthouse Performance: > 90

**Availability SLA:**
- 99% uptime during business hours (9 AM - 9 PM CET)
- Planned maintenance: Sundays 3-5 AM CET

**API Response Times:**
- GET endpoints: < 200ms (p95)
- POST endpoints: < 500ms (p95)

## Error Handling & Recovery

**Frontend Error Boundary:**
```typescript
// app/error.tsx
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-playfair mb-4">Something went wrong!</h2>
        <button onClick={reset} className="btn-primary">
          Try again
        </button>
      </div>
    </div>
  );
}
```

**API Error Responses:**
```typescript
// Consistent error format
{
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "The requested product could not be found",
    "timestamp": "2025-01-25T10:30:00Z",
    "requestId": "req_abc123"
  }
}
```

## Scaling Strategy

**Phase 1 (MVP - Current):**
- Vercel Hobby/Pro: Handles 100k+ monthly visits
- Railway Starter: Sufficient for content management
- Cloudflare Free: Basic DDoS protection

**Phase 2 (Growth):**
- Vercel Pro: Increased functions, analytics
- Railway Pro: Remove cold starts, better performance
- Cloudflare Pro: Advanced security, analytics

**Phase 3 (E-commerce):**
- Vercel Enterprise: SLA, dedicated support
- Dedicated Database: Managed PostgreSQL cluster
- Redis Cache: For session and cart management

## Maintenance Procedures

**Weekly Tasks:**
- Review error logs
- Check performance metrics
- Update content as needed
- Security updates review

**Monthly Tasks:**
- Dependency updates
- Backup restoration test
- Performance audit
- SEO review

**Quarterly Tasks:**
- Security audit
- API key rotation
- Architecture review
- Cost optimization

## Incident Response

**Severity Levels:**
- **P1:** Site completely down
- **P2:** Key features broken (contact forms)
- **P3:** Minor features affected
- **P4:** Cosmetic issues

**Response Times:**
- P1: 30 minutes
- P2: 2 hours
- P3: 24 hours
- P4: Next sprint

**Escalation Path:**
1. Developer on-call
2. Technical lead
3. External support (Vercel/Railway)
