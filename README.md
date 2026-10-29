# CloudVault (working name) – Cloud Backup Website

A cloud backup service for Indian customers. Frontend first (Next.js), backend and database later, then Razorpay payments.

## Key facts
- Free tier: **1 month free trial with 5 GB storage**
- Paid plans: **monthly and yearly billing**, prices in INR (₹), GST-inclusive display
- Payments (later): **Razorpay** (UPI, cards, netbanking, wallets)
- Target: Indian consumers and small businesses, mobile-first, SEO-driven acquisition

## Tech stack
- Next.js (App Router) + React + TypeScript
- Tailwind CSS
- Server-side rendering (Server Components, `generateMetadata`, prerendered marketing pages)
- Later: PostgreSQL + Prisma, S3-compatible object storage (AWS ap-south-1 Mumbai or Cloudflare R2), Razorpay

## Documentation map
| File | Purpose |
|------|---------|
| `CLAUDE.md` | Instructions Claude Code reads automatically. Start here. |
| `docs/01-PRD.md` | Product requirements, users, features, scope |
| `docs/02-PRICING.md` | Plans, free trial rules, monthly/yearly pricing, billing rules |
| `docs/03-ARCHITECTURE.md` | Folder structure, rendering strategy, data layer, future backend |
| `docs/04-SEO.md` | Metadata, sitemap, robots, structured data, keywords, performance |
| `docs/05-DESIGN-SYSTEM.md` | Brand, colors, typography, components, accessibility |
| `docs/06-PAGES-AND-CONTENT.md` | Every page, its purpose, its content, legal pages |
| `docs/07-ROADMAP.md` | Phased task checklist for Claude Code |
| `docs/08-BACKEND-PAYMENTS.md` | Future API contract, auth, storage, Razorpay flow |

## How to start with Claude Code
1. Create the project folder and copy these files into it.
2. Create the Next.js app in this folder:
   ```bash
   npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
   ```
   (Accept the defaults if prompted. If the folder is not empty, run the command in a new folder and move the docs in.)
3. Open Claude Code in the project root and run:
   ```
   Read CLAUDE.md and docs/07-ROADMAP.md. Start Phase 1, task 1.1, and work through the Phase 1 checklist in order. Ask me before making any decision marked as "OPEN" in the docs.
   ```

## Open decisions (see individual docs for detail)
- Final brand name and domain (`CloudVault` is a placeholder)
- Whether GST is shown inclusive or added at checkout (default: inclusive)
- Whether the free trial requires a card at signup (default: no card)
- Database and auth provider (default: PostgreSQL + Prisma, Auth.js)
- Final INR price points (values in `02-PRICING.md` are proposals)
