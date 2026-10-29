# 03 – Architecture

## 1. Overview
- **Frontend**: Next.js App Router, TypeScript, Tailwind CSS, deployed on Vercel (or AWS Amplify / self-hosted Node).
- **Backend (Phase 2)**: Next.js Route Handlers for a first version, extracted to a separate service only if needed.
- **Database (Phase 2)**: PostgreSQL with Prisma.
- **File storage (Phase 2)**: S3-compatible object storage. Prefer AWS `ap-south-1` (Mumbai) or Cloudflare R2 with India-region policies. (OPEN)
- **Auth (Phase 2)**: Auth.js (NextAuth v5) with email magic link or credentials. (OPEN: or Clerk, or custom.)
- **Payments (Phase 3)**: Razorpay Subscriptions API with webhooks.
- **Email**: Resend or AWS SES (OPEN).

## 2. Folder structure

```
cloud-backup-web/
├── CLAUDE.md
├── README.md
├── docs/
├── public/
│   ├── og/                      # static OG fallback images
│   ├── icons/
│   └── robots.txt               # optional; prefer app/robots.ts
├── src/
│   ├── app/
│   │   ├── layout.tsx           # root layout, fonts, global metadata, header/footer
│   │   ├── page.tsx             # home
│   │   ├── globals.css
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── (marketing)/
│   │   │   ├── features/page.tsx
│   │   │   ├── pricing/page.tsx
│   │   │   ├── security/page.tsx
│   │   │   ├── faq/page.tsx
│   │   │   ├── about/page.tsx
│   │   │   └── contact/page.tsx
│   │   ├── (legal)/
│   │   │   ├── privacy/page.tsx
│   │   │   ├── terms/page.tsx
│   │   │   ├── refund-policy/page.tsx
│   │   │   └── shipping-and-delivery/page.tsx   # Razorpay requires digital-service delivery terms
│   │   └── (dashboard)/           # Phase 1: mock shell only
│   │       └── dashboard/page.tsx
│   ├── components/
│   │   ├── layout/              # Header, Footer, MobileNav
│   │   ├── marketing/           # Hero, FeatureGrid, PricingCards, FAQAccordion, CTA
│   │   ├── ui/                  # Button, Card, Badge, Input, Toggle, Accordion
│   │   └── seo/                 # JsonLd.tsx
│   ├── config/
│   │   ├── site.ts              # site name, URL, contact, social links
│   │   ├── plans.ts             # pricing (see 02-PRICING.md)
│   │   └── navigation.ts        # menu items
│   ├── content/
│   │   └── faq.ts               # FAQ items as data
│   ├── lib/
│   │   ├── utils.ts             # cn(), formatINR()
│   │   └── seo.ts               # metadata helpers, JSON-LD builders
│   └── types/
│       └── index.ts
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 3. Rendering strategy (SSR and SEO)

| Route type | Strategy | Reason |
|------------|----------|--------|
| Marketing pages (`/`, `/features`, `/pricing`, `/faq`, legal) | **Static prerender at build** (server-rendered HTML, served from CDN) | Fastest, best for SEO, no server cost per request |
| Blog or content pages (Phase 4) | Static with `generateStaticParams` + revalidation (ISR) | Content updates without full rebuild |
| Dashboard and account pages (Phase 2+) | **Dynamic SSR** (`export const dynamic = "force-dynamic"` or request-time data) | Per-user data, must not be cached |
| API routes and webhooks | Route Handlers (`app/api/.../route.ts`) | Backend logic and Razorpay webhooks |

Rules:
- Default to Server Components. Only add `"use client"` for state, effects, or browser APIs.
- Fetch data in Server Components. Do not fetch on mount in Phase 1 marketing pages.
- Every page exports metadata (see `04-SEO.md`).
- Use `next/image` with explicit `width`/`height` or `fill` plus `sizes`.

## 4. Data layer

### Phase 1
- Static data in `src/config/` and `src/content/`.
- No database. No external calls on marketing pages.

### Phase 2 (planned Prisma schema outline)
```
User         id, email (unique), passwordHash, name, emailVerifiedAt, createdAt
Trial        id, userId, startedAt, endsAt, status
Subscription id, userId, planId, billingCycle, status, periodStart, periodEnd, razorpaySubscriptionId
Plan         id, name, storageBytes, monthlyPricePaise, yearlyPricePaise, active
File         id, userId, folderId, name, sizeBytes, mimeType, storageKey, checksum, createdAt, deletedAt
Folder       id, userId, parentId, name, createdAt
UsageDaily   id, userId, date, storageBytes
AuditLog     id, userId, action, metadata (json), ip, createdAt
```

## 5. Storage and security design (Phase 2)
- Upload via **presigned URLs** directly to object storage. Server checks quota before issuing the URL.
- Encryption at rest (SSE-S3 or KMS). Client-side encryption is a Phase 4 option.
- Files stored under `userId/fileId` keys. Never expose raw bucket URLs.
- Download via short-lived signed URLs (5 minutes).
- Rate limiting on auth and upload endpoints.
- Security headers in `next.config.ts`: CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy.

## 6. Environment variables

`.env.example` (Phase 1 needs only the first two):
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=CloudVault

# Phase 2
DATABASE_URL=
AUTH_SECRET=
S3_BUCKET=
S3_REGION=ap-south-1
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
EMAIL_FROM=

# Phase 3
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
```
Only `NEXT_PUBLIC_*` variables may be used in client code.

## 7. Performance budget
- Initial JS on marketing pages: under 120 KB gzipped.
- No client component on the home page except the mobile menu and FAQ accordion.
- Fonts: maximum two families, `display: "swap"`, subset to `latin` and `devanagari` later.
- Images: WebP or AVIF through `next/image`. Hero image under 150 KB.

## 8. Testing (from Phase 2)
- Unit: Vitest for `lib/` and pricing helpers.
- E2E: Playwright for signup, trial, pricing toggle.
- Lighthouse CI on marketing pages (SEO score 95+, Performance 90+ on mobile).
