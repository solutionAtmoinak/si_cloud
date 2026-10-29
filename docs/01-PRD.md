# 01 – Product Requirements Document (PRD)

## 1. Summary
A web-based cloud backup service for Indian consumers and small businesses. Users back up files, photos, and documents from their devices to encrypted cloud storage, with a free 1-month trial and affordable monthly and yearly plans billed in INR.

## 2. Goals
- Acquire users through organic search (SEO) and paid campaigns later.
- Convert free-trial users to paid plans.
- Build trust for first-time cloud backup users in India (security, privacy, support in Indian languages later).
- Keep prices low and clear, with no hidden charges.

## 3. Non-goals (Phase 1)
- Actual file upload or sync
- User accounts and authentication
- Payments
- Native mobile apps
- Multi-language UI (English only at launch; Hindi and Bengali are a later phase)

## 4. Target users
| Persona | Need | Key message |
|---------|------|-------------|
| Working professional | Phone photos and documents safe from loss or theft | "Never lose a photo again" |
| Student | Cheap storage for projects and media | "Affordable storage with a free month to try" |
| Small business owner | Invoices, accounts, and shared documents secured | "Secure business backups in ₹" |
| Family organiser | Shared family photo archive | "One safe place for family memories" |

## 5. Core user journeys
1. **Discover**: user searches "cloud backup India" → lands on a page → understands the offer.
2. **Compare**: user opens pricing → toggles monthly/yearly → sees savings in ₹.
3. **Start trial**: user clicks "Start free trial" → signup (Phase 2) → gets 5 GB for 1 month.
4. **Upgrade**: trial ends → user chooses a paid plan → pays via Razorpay (Phase 3).

## 6. Functional requirements

### Phase 1 (frontend, static content)
- FR-1: Public marketing pages (home, features, pricing, security, FAQ, about, contact, legal pages).
- FR-2: Pricing page with monthly/yearly toggle that updates displayed prices and shows annual savings.
- FR-3: Plans rendered from a single config file.
- FR-4: Free trial badge and clear "1 month free · 5 GB" messaging on home and pricing.
- FR-5: Contact form UI (submission handled later; Phase 1 shows success state only).
- FR-6: SEO: metadata, sitemap, robots, structured data, OG images.
- FR-7: Dashboard UI shell with mock data (no real auth), behind a route group, clearly marked as mock.

### Phase 2 (backend and database)
- FR-8: Signup and login (email + password, OTP to mobile optional). Email verification required.
- FR-9: Trial activation: one free trial per account, 5 GB, 30 days from activation.
- FR-10: Storage quota enforcement by the server.
- FR-11: File upload and download via signed URLs.
- FR-12: Account settings, change password, delete account.

### Phase 3 (payments)
- FR-13: Razorpay checkout for monthly and yearly plans.
- FR-14: Webhook handling for payment success, failure, and refunds.
- FR-15: Plan upgrade, downgrade, and cancellation.
- FR-16: Invoices with GST details.

### Phase 4 (hardening and launch)
- FR-17: Rate limiting, audit logs, security headers, backup of the backup system.
- FR-18: Email notifications (trial ending in 3 days, payment receipts).
- FR-19: Analytics with consent banner.

## 7. Non-functional requirements
- **Performance**: LCP under 2.5 s on 4G mobile, CLS under 0.1, INP under 200 ms.
- **SEO**: All marketing pages server-rendered with complete HTML for crawlers.
- **Availability**: 99.9% target after Phase 4.
- **Security**: TLS everywhere, encryption at rest, passwords hashed with bcrypt or argon2.
- **Privacy**: DPDP Act 2023 compliance. Consent for marketing. Right to access and erase data.
- **Data residency**: Store user data in India (AWS Mumbai or equivalent). Decision marked OPEN in `03-ARCHITECTURE.md`.
- **Accessibility**: WCAG 2.1 AA.
- **Browsers**: Latest two versions of Chrome, Edge, Safari, Firefox, and Android Chrome.

## 8. Success metrics
- Organic sessions per month from India
- Trial signup rate from pricing page
- Trial-to-paid conversion rate
- Monthly churn
- Average revenue per user (ARPU)

## 9. Risks
| Risk | Mitigation |
|------|------------|
| Low trust in an unknown brand | Clear security page, transparent pricing, visible support contact |
| Storage cost exceeds revenue on free trial | Enforce 5 GB hard cap; no free tier beyond 1 month |
| Payment failures on UPI | Retry flow, multiple methods via Razorpay |
| Data breach | Encryption, least-privilege access, security audit before launch |
| SEO competition | Long-tail content (Phase 4), local Indian keywords |
