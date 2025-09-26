# Princess Puff Web

Luxury cosmetics e-commerce platform built with Next.js 14, TypeScript, and Tailwind CSS. This frontend application showcases premium cosmetic products with an elegant, performance-focused user experience.

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.17.0
- npm >= 9.0.0

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd princess-puff-web
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the development server with Turbopack |
| `npm run build` | Build the application for production |
| `npm start` | Start the production server |
| `npm test` | Run tests with Vitest |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Lint TypeScript files with ESLint |
| `npm run lint:fix` | Fix linting issues automatically |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run type-check` | Run TypeScript type checking |

## 🔧 Environment Variables

Copy `.env.example` to `.env.local` and update with your values:

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_NAME` | Application name displayed in UI | Princess Puff |
| `NEXT_PUBLIC_APP_URL` | Public application URL | http://localhost:3000 |
| `NEXT_PUBLIC_STRAPI_URL` | Strapi CMS URL (future integration) | http://localhost:1337 |
| `STRAPI_API_TOKEN` | Strapi authentication token | - |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID (optional) | - |
| `CONTACT_EMAIL_TO` | Contact form recipient email | - |
| `SMTP_HOST` | SMTP server host | - |
| `SMTP_PORT` | SMTP server port | 587 |
| `SMTP_USER` | SMTP username | - |
| `SMTP_PASS` | SMTP password | - |
| `NODE_ENV` | Environment (development/production) | development |

## 🏗 Project Structure

```
princess-puff-web/
├── src/
│   ├── app/                    # Next.js 14 app directory
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/
│   │   └── ui/                # Reusable UI components
│   ├── lib/
│   │   ├── utils/             # Utility functions
│   │   └── types/             # TypeScript type definitions
│   ├── styles/
│   │   └── globals.css        # Global styles and Tailwind imports
│   └── test/
│       └── setup.ts           # Test configuration
├── public/                    # Static assets
├── .env.example              # Environment variables template
├── .husky/                   # Git hooks
├── eslint.config.js          # ESLint configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── vitest.config.ts          # Vitest test configuration
```

## 🛠 Technology Stack

- **Framework:** Next.js 14.2.21 with App Router
- **Language:** TypeScript 5.3.3
- **Styling:** Tailwind CSS 4.x
- **Testing:** Vitest + React Testing Library
- **Code Quality:** ESLint + Prettier + Husky
- **Package Manager:** npm

## 🎨 Design System

The application uses a luxury-themed design system with:

- **Primary Colors:**
  - Black: `#000000` (princess-black)
  - Gold: `#D4A574` (princess-gold)
  
- **Typography:**
  - Display Font: Playfair Display (serif)
  - Body Font: Inter (sans-serif)

- **Responsive Breakpoints:**
  - xs: 375px (Small phones)
  - sm: 640px (Large phones)
  - md: 768px (Tablets)
  - lg: 1024px (Desktop)
  - xl: 1280px (Large desktop)
  - 2xl: 1536px (Luxury displays)

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure the following settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
   - Node.js Version: 18.x

3. Set up environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

For development with watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```

## 🔍 Code Quality

This project uses automated code quality tools:

- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for pre-commit hooks
- **lint-staged** for running checks on staged files

Pre-commit hooks automatically run linting and formatting on staged files.

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vitest Documentation](https://vitest.dev)

## 📝 License

This project is proprietary and confidential.