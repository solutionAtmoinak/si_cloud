# 07 – Roadmap and Task Checklist

Claude Code: work through tasks in order. Mark each task `[x]` when done and `npm run build` passes. Stop at each `OPEN:` decision and ask the user.

## Phase 0 – Project setup
- [x] 0.1 Create Next.js app with TypeScript, Tailwind, ESLint, App Router, `src/` directory, import alias `@/*`
- [x] 0.2 Copy all docs into the project. Confirm `CLAUDE.md` is in the root.
- [x] 0.3 Create folder structure from `docs/03-ARCHITECTURE.md` (types/index.ts skipped until shared types exist)
- [x] 0.4 Add `.env.example` and confirm `.gitignore` excludes `.env*.local`
- [x] 0.5 Create `src/config/site.ts`, `src/config/plans.ts`, `src/config/navigation.ts`
- [x] 0.6 Create `src/lib/utils.ts` with `cn()` and `formatINR()`
- [x] 0.7 Configure `next/font/google` with Plus Jakarta Sans in root layout
- [x] 0.8 Extend Tailwind theme with tokens from `docs/05-DESIGN-SYSTEM.md`
- [x] 0.9 `npm run build` passes

## Phase 1 – Frontend marketing site (current phase)

### 1A. Foundations
- [x] 1.1 Root layout: `lang="en-IN"`, font, Header, Footer, skip link, `metadata` base with `metadataBase` from `site.url`
- [x] 1.2 UI primitives: Button, Badge, Card, Container, Section, Input, Textarea, Label, Toggle, Accordion
- [x] 1.3 Header with desktop nav and mobile sheet menu (client component, keyboard accessible)
- [x] 1.4 Footer with links from `navigation.ts`
- [x] 1.5 `buildMetadata()` helper in `src/lib/seo.ts`
- [x] 1.6 `JsonLd` component and Organization schema in root layout

### 1B. Pages
- [x] 1.7 Home page (all sections in `06-PAGES-AND-CONTENT.md`)
- [x] 1.8 Pricing page with yearly/monthly toggle (client island only for toggle)
- [x] 1.9 Features page
- [x] 1.10 Security page
- [x] 1.11 FAQ page using `src/content/faq.ts` + FAQPage JSON-LD
- [x] 1.12 About page
- [x] 1.13 Contact page (UI and validation, no submission)
- [x] 1.14 Legal pages: privacy, terms, refund-policy, shipping-and-delivery (structured placeholders)
- [x] 1.15 Dashboard mock shell with noindex and "Demo data" banner
- [x] 1.16 Custom 404 page

### 1C. SEO and quality
- [x] 1.17 `sitemap.ts` and `robots.ts`
- [x] 1.18 Default OG image via `opengraph-image.tsx`
- [x] 1.19 Pricing SoftwareApplication JSON-LD generated from `plans.ts`
- [x] 1.20 Every page has unique title, description, canonical
- [x] 1.21 Images use `next/image` with `alt` and `sizes` (no raster images yet; icons are inline SVG)
- [ ] 1.22 Responsive check at 360, 768, 1280 widths (done at 360 and 1280 plus no-overflow check at 768; visual review at 768 and a real phone pending)
- [ ] 1.23 Keyboard and screen-reader pass on header, toggle, accordion, forms
- [ ] 1.24 Lighthouse mobile: Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 95
- [x] 1.25 `npm run lint`, `npx tsc --noEmit`, `npm run build` all pass

**Phase 1 done when**: all 1.x tasks are checked and the user has reviewed the site on a phone.

## Phase 2 – Backend, database, auth, storage
- [ ] 2.1 Set up PostgreSQL and Prisma. OPEN: hosting provider.
- [ ] 2.2 Implement schema from `03-ARCHITECTURE.md` section 4
- [ ] 2.3 Auth (Auth.js), signup, email verification, login, logout
- [ ] 2.4 Trial activation logic (one per account, 30 days, 5 GB)
- [ ] 2.5 Quota enforcement service
- [ ] 2.6 Object storage integration with presigned upload and download
- [ ] 2.7 Folder and file API routes (Route Handlers)
- [ ] 2.8 Dashboard connected to real data (SSR with request-time data)
- [ ] 2.9 Account settings: profile, password change, delete account
- [ ] 2.10 Rate limiting on auth and upload routes
- [ ] 2.11 Unit and E2E tests for trial and quota logic

## Phase 3 – Payments (Razorpay)
- [ ] 3.1 Razorpay test account, keys in `.env.local`
- [ ] 3.2 Create plans in Razorpay Subscriptions dashboard matching `plans.ts` (monthly and yearly)
- [ ] 3.3 Checkout flow (server creates subscription, client opens Razorpay Checkout)
- [ ] 3.4 Webhook handler with signature verification (`/api/webhooks/razorpay`)
- [ ] 3.5 Subscription status sync to database
- [ ] 3.6 Upgrade, downgrade, cancel flows per `02-PRICING.md` section 4
- [ ] 3.7 Invoice generation with GST fields
- [ ] 3.8 Failure and retry handling
- [ ] 3.9 Switch to live keys after legal pages are approved by Razorpay

## Phase 4 – Hardening and launch
- [ ] 4.1 Security headers and CSP in `next.config.ts`
- [ ] 4.2 Audit log for account and billing actions
- [ ] 4.3 Email notifications (trial reminders, receipts)
- [ ] 4.4 Cookie consent banner and analytics (GA4 or Plausible)
- [ ] 4.5 Blog and first 5 SEO articles
- [ ] 4.6 Google Search Console and Bing Webmaster setup
- [ ] 4.7 Load test, backup-of-backup verification, restore drill
- [ ] 4.8 Penetration test or security review
- [ ] 4.9 Production deployment, monitoring (Sentry or equivalent), uptime alerts

## Phase 5 – Later enhancements
- Hindi and Bengali translations (`next-intl` or similar)
- Native Android and iOS apps
- Family and team plans
- Client-side encryption option
