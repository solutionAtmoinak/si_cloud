# 06 – Pages and Content

Rules: every page has its own `metadata`, one `<h1>`, and a CTA. Text marked `[PLACEHOLDER]` must be replaced before launch. Do not invent facts about certifications, customers, or awards.

## Site map

| Route | Group | Phase | Purpose |
|-------|-------|-------|---------|
| `/` | marketing | 1 | Home, main conversion page |
| `/features` | marketing | 1 | What the product does |
| `/pricing` | marketing | 1 | Plans, toggle, trial CTA |
| `/security` | marketing | 1 | Encryption, data location, DPDP |
| `/faq` | marketing | 1 | Common questions |
| `/about` | marketing | 1 | Company story |
| `/contact` | marketing | 1 | Contact form (UI only in Phase 1) |
| `/privacy` | legal | 1 | Privacy policy |
| `/terms` | legal | 1 | Terms of service |
| `/refund-policy` | legal | 1 | Refund and cancellation policy |
| `/shipping-and-delivery` | legal | 1 | Digital service delivery terms |
| `/dashboard` | dashboard | 1 (mock) | Storage usage, files list (mock data) |
| `/login`, `/signup` | auth | 2 | Authentication |
| `/blog`, `/blog/[slug]` | marketing | 4 | Content SEO |
| `not-found` | root | 1 | Custom 404 |

## Home page (`/`)

**Metadata**
- Title: `Cloud Backup in India | 1 Month Free, 5 GB | CloudVault`
- Description: `Secure cloud backup for Indian families and businesses. Start with 5 GB free for one month. Plans from ₹99/month in INR.`

**Sections (in order)**
1. Hero: H1 "Back up your photos, files and documents. Safe in India." Subheading: "Start with 1 month free and 5 GB. Plans from ₹99/month." CTAs: Start free trial, See pricing.
2. Trust row: "256-bit encryption · Data stored in India [PLACEHOLDER: confirm] · Cancel anytime"
3. How it works: 3 steps (Install or open the app → Choose folders → We back up automatically). Phase 1: text only.
4. Feature grid: automatic backup, encrypted storage, version history, access from any device, family sharing (later), priority support.
5. Pricing teaser: 3 plan cards with the Yearly toggle, link to full pricing.
6. Use cases: students, families, small businesses, photographers.
7. FAQ teaser: 4 questions with link to `/faq`.
8. Final CTA: "Your first month is free. No card needed."

## Features page (`/features`)
- H1: "Everything you need to keep your files safe"
- Sections: Automatic backup, Encryption, Version history (Plus+), Restore anything, Device support, Shared folders (Pro).
- Each feature: title, 2-sentence description, one small illustration.
- CTA at bottom.

## Pricing page (`/pricing`)
- H1: "Simple pricing in ₹. Start free for 1 month."
- Yearly/Monthly toggle (default Yearly), with "Save up to 17%" label.
- Plan cards from `src/config/plans.ts`.
- Free trial banner: "Try 5 GB free for 30 days. No credit card required [OPEN]."
- Comparison table (storage, version history, support, sharing).
- GST note: "All prices are inclusive of GST."
- FAQ subset: refunds, cancellation, upgrades, payment methods (UPI, cards, netbanking, wallets via Razorpay).

## Security page (`/security`)
- H1: "How we keep your data safe"
- Sections: Encryption in transit (TLS 1.2+), encryption at rest, access control, data location (India) [PLACEHOLDER: confirm region], backups of the backup system, vulnerability reporting email, DPDP Act 2023 commitment.
- Do not claim certifications (ISO 27001, SOC 2) until obtained.

## FAQ page (`/faq`)
Question list (answers to be written in `src/content/faq.ts`):
1. What is the free trial? (1 month, 5 GB, no card [OPEN])
2. What happens when my trial ends?
3. Can I cancel anytime?
4. Do you offer refunds?
5. Which payment methods do you accept?
6. Are prices inclusive of GST?
7. Is my data safe?
8. Where is my data stored?
9. Can I upgrade or downgrade my plan?
10. Can I use it on my phone?
11. What files can I back up?
12. How do I contact support?

Each answer: 2–4 sentences, plain English.

## About page (`/about`)
- H1: "About CloudVault"
- Mission, team placeholder, location: [PLACEHOLDER: company registered address], contact.

## Contact page (`/contact`)
- H1: "Contact us"
- Form fields: name, email, phone (optional), topic (select: Sales, Support, Billing, Other), message.
- Phase 1: client-side validation, success message, no submission. Mark with `OPEN: submission endpoint`.
- Show support email and support hours [PLACEHOLDER].

## Legal pages (required for Razorpay merchant onboarding)
Razorpay reviews these pages before enabling live payments. Each must be published, accessible from the footer, and show the business legal name, address, contact, and grievance officer details.

| Page | Must include |
|------|--------------|
| `/privacy` | What data is collected, purpose, retention, third parties (Razorpay, email provider, hosting), user rights under DPDP Act 2023, grievance officer name and email [PLACEHOLDER], last updated date |
| `/terms` | Service description, account rules, acceptable use (no illegal content), trial and billing terms, suspension and termination, limitation of liability, governing law: India, jurisdiction [PLACEHOLDER: city] |
| `/refund-policy` | Refund window, eligibility conditions, how to request, processing time, cancellation steps. Must match `02-PRICING.md` section 4. |
| `/shipping-and-delivery` | Digital service delivery: service is activated instantly after payment confirmation, no physical shipment, activation issues contact [PLACEHOLDER] |

Legal text must be reviewed by a qualified lawyer before launch. Claude Code must not write final legal wording. It should insert the structure above with `[PLACEHOLDER]` markers.

## Dashboard (Phase 1 mock)
- Route under `(dashboard)` with `robots: noindex`.
- Shows: storage bar (e.g., "1.2 GB of 5 GB used"), trial days left, recent backups list, "Upgrade" button.
- All data is static mock data in `src/config/mock-dashboard.ts`, labelled "Demo data".
- Clear banner: "Demo mode. Sign-up is not yet available."

## 404 page
- H1: "Page not found"
- Links: Home, Pricing, Contact.
- Return HTTP 404 (default behaviour of `not-found.tsx`).

## Footer content
- Product: Features, Pricing, Security, FAQ
- Company: About, Contact
- Legal: Privacy, Terms, Refund Policy, Shipping and Delivery
- Bottom: "© {currentYear} CloudVault. All rights reserved." and "Made in India" (only if true).
