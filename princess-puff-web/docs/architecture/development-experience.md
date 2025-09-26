# Development Experience

## Local Development Setup

**Prerequisites:**
```bash
# Required
node >= 18.17.0
npm >= 9.0.0

# Optional but recommended
Docker Desktop (for local Strapi)
```

**Quick Start (Frontend):**
```bash
# Clone and install
git clone https://github.com/ZorecAndrej/princess-puff-web.git
cd princess-puff-web
npm install

# Environment setup
cp .env.example .env.local
# Add Strapi URL and API token

# Run development
npm run dev
# Opens http://localhost:3000
```

**Quick Start (CMS):**
```bash
# Option 1: Use deployed Railway instance
# Just point frontend to Railway URL

# Option 2: Local Strapi
git clone https://github.com/ZorecAndrej/princess-puff-cms.git
cd princess-puff-cms
npm install
npm run develop
# Opens http://localhost:1337/admin
```

## Testing Strategy

**Unit Tests (Vitest):**
```typescript
// components/product/ProductCard.test.tsx
describe('ProductCard', () => {
  it('renders product information', () => {
    const product = createMockProduct();
    render(<ProductCard product={product} />);
    
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByAltText(product.name)).toHaveAttribute('src', product.images[0].url);
  });
});
```

**Integration Tests:**
```typescript
// app/api/contact/b2c/route.test.ts
describe('POST /api/contact/b2c', () => {
  it('sends email for valid submission', async () => {
    const response = await POST(createRequest({
      name: 'Test User',
      email: 'test@example.com',
      message: 'Interested in Royal Princess'
    }));
    
    expect(response.status).toBe(200);
    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: process.env.B2C_EMAIL
      })
    );
  });
});
```

**E2E Tests (Playwright):**
```typescript
// e2e/contact-flow.spec.ts
test('B2C contact flow', async ({ page }) => {
  await page.goto('/contact');
  await page.fill('[name="name"]', 'Test Customer');
  await page.fill('[name="email"]', 'customer@example.com');
  await page.fill('[name="message"]', 'I would like to order...');
  await page.click('button[type="submit"]');
  
  await expect(page.locator('.success-message')).toBeVisible();
});
```

**Testing Priorities for MVP:**
1. Critical path E2E tests (contact forms, product viewing)
2. Unit tests for utilities and data transformations  
3. Visual regression tests for key components
4. Manual testing checklist for CMS workflows

## Code Quality Tools

**ESLint Configuration:**
```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}
```

**Prettier Configuration:**
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

**Pre-commit Hooks (Husky):**
```bash
#!/bin/sh
npm run lint
npm run type-check
npm run test:unit
```

## Development Workflow

1. **Feature Branch Workflow:**
   ```bash
   git checkout -b feature/product-gallery
   # Develop feature
   npm run dev
   # Test
   npm run test
   # Submit PR
   ```

2. **Commit Convention:**
   ```
   feat: Add product filtering
   fix: Correct mobile menu z-index
   docs: Update API documentation
   style: Format product cards
   refactor: Extract form logic
   test: Add contact form tests
   chore: Update dependencies
   ```

3. **PR Template:**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change

   ## Testing
   - [ ] Unit tests pass
   - [ ] E2E tests pass
   - [ ] Manual testing completed

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Documentation updated
   ```
