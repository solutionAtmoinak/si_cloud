# Project Context – CloudVault

Living record of project state and key decisions. Update it at the end of every work session or when a decision is made. Newest entries go at the top of each log. Source-of-truth docs stay in `docs/`; this file records what happened and why.

**Last updated:** 2026-10-29

## 1. Snapshot
- **Product:** cloud backup website for Indian customers (working name CloudVault).
- **Current phase:** Phase 1, frontend only (no backend, auth, database or payments). Dummy data throughout.
- **Roadmap position:** Phase 0 done. Phase 1A and 1B done. 1C done except 1.22 (768 visual and real-phone review), 1.23 (keyboard and screen-reader pass) and 1.24 (Lighthouse).
- **Quality gate:** `npm run lint`, `npx tsc --noEmit` and `npm run build` pass. 16 routes prerendered as static.
- **Design:** glassmorphism on a light aurora background (user request, 2026-10-29). See `docs/05-DESIGN-SYSTEM.md` section 12.

## 2. Stack as built
| Area | Choice |
|------|--------|
| Framework | Next.js 16.4.3, App Router, React 19.3, TypeScript strict |
| Styling | Tailwind CSS v4, tokens and glass utilities in `src/app/globals.css` (no `tailwind.config.ts`) |
| Font | Plus Jakarta Sans via `next/font/google`, CSS variable `--font-plus-jakarta` |
| Icons | Own inline SVG set in `src/components/ui/Icon.tsx` (no `lucide-react`; adding it needs approval) |
| Dependencies added | None beyond the scaffold |

## 3. Folder layout (`src/`)
```
src/app/
  layout.tsx, page.tsx (home), not-found.tsx, sitemap.ts, robots.ts, opengraph-image.tsx, globals.css
  (marketing)/  features, pricing, security, faq, about, contact
  (legal)/      privacy, terms, refund-policy, shipping-and-delivery
  (dashboard)/  dashboard   (demo data, noindex)
src/components/
  ui/         Button, Badge, Card, Container, Section(+SectionHeading), Label, Input, Textarea, Icon, Toggle*, Accordion*
  layout/     Header, Footer, AuroraBackground, MobileMenu*
  marketing/  Hero, HeroVisual, TrustRow, HowItWorks, FeatureGrid, UseCases, CtaBanner, PageHero,
              PricingCards*, PriceDisplay, ContactForm*, LegalPage
  seo/        JsonLd
src/config/   site.ts, plans.ts, navigation.ts, mock-dashboard.ts
src/content/  faq.ts, features.ts, legal.ts
src/lib/      utils.ts (cn, formatINR, formatStorage), seo.ts (buildMetadata, buildPricingSchema, buildFaqSchema)
src/types/    empty (no shared types yet)
```
`*` = client component. Everything else is a Server Component.

## 4. Key decisions
| Date | Decision | Why |
|------|----------|-----|
| 2026-10-29 | Glassmorphism redesign: light aurora background, `glass` / `glass-strong` utilities, gradient primary buttons. Kept light (not dark). | User found the first design too basic. Light keeps text contrast at WCAG AA. |
| 2026-10-29 | Primary button uses `brand-700` to `indigo-600` gradient, not `brand-600`. | White on `#0F6FFF` is about 4.4:1, below AA for normal text. |
| 2026-10-29 | Mobile menu renders through a portal. | `backdrop-filter` on the glass header traps `position: fixed` children inside the header. |
| 2026-10-29 | Header hides its CTA with a wrapper div (`hidden md:block`), not a class on the button. | The button's own `inline-flex` overrode `hidden` and the CTA wrapped onto three lines at 360px. |
| 2026-10-29 | "Start free trial" links to `/dashboard` (`trialHref` in `navigation.ts`). | `/signup` is Phase 2. The demo dashboard banner already says sign-up is unavailable. Change to `/signup` in Phase 2. |
| 2026-10-29 | `buildMetadata()` sets the OG image explicitly to `/opengraph-image`. | Pages that set their own `openGraph` object lose the file-based image; the audit showed og:image only on home. |
| 2026-10-29 | `buildMetadata()` sets `title: { absolute }`. | Doc titles already include the brand; avoids the root `%s \| CloudVault` template doubling it. |
| 2026-10-29 | Moved `app/` into `src/app/`, alias `@/*` is `./src/*`. | Roadmap 0.1 and CLAUDE.md require `src/`. |
| 2026-10-29 | Kept `cacheComponents: true` and `partialPrefetching: true` (came with the scaffold). | Not a stack change. Consequence: `new Date()` fails prerender, see section 5. |
| 2026-10-29 | Footer year from a `"use cache"` function; sitemap uses `site.lastUpdated`. | Same Cache Components restriction. Bump `site.lastUpdated` when content changes. |
| 2026-10-29 | Accordion and FAQ answers stay in the HTML (`hidden`, not unmounted). | Crawlers see the text; matches FAQPage JSON-LD. |
| 2026-10-29 | Pricing structure fields (`versionHistoryDays`, `support`, `sharedFolders`) added to `Plan`. | The comparison table needs structured data; values copied from the feature lists in `02-PRICING.md`. |
| 2026-10-29 | Prices in page metadata are built from `plans.ts`, not typed in. | CLAUDE.md rule 3. |
| 2026-10-29 | Legal pages show a visible "Draft structure" notice. | Wording is `[PLACEHOLDER]` until a lawyer reviews it; visitors should not mistake it for final text. |
| 2026-10-29 | Dark mode removed from the scaffold CSS. | Design doc defers dark mode to Phase 4. |
| 2026-10-29 | `.gitignore` has `!.env.example` after `.env*`. | The scaffold rule would have ignored the example file. |

## 5. Working rules learned (Next 16 + Cache Components)
- `AGENTS.md` says this Next.js has breaking changes: read `node_modules/next/dist/docs/` before using an unfamiliar API.
- No `new Date()`, `Date.now()`, `Math.random()` or `crypto.randomUUID()` in prerendered Server Components. Wrap in `"use cache"`, move to a Client Component, or use a fixed value.
- Stale `.next/` after moving files causes bogus `tsc` errors from `.next/types/validator.ts`. Delete `.next` and rebuild (stop the dev server first).
- Tailwind v4: gradients are `bg-linear-to-r`, not `bg-gradient-to-r`. A `hidden` class loses to a component's own `inline-flex`; hide with a wrapper.
- Prices only from `src/config/plans.ts`; format with `formatINR()`.
- Port 3000 is often held by the user's dev server. Do not run `next start` there; use another port or leave it.

## 6. Open items (`OPEN:`)
| Item | Where | Needed from |
|------|-------|-------------|
| Final brand name and domain (`CloudVault`, `www.example.in` are placeholders) | `site.ts` | User |
| Support email, support hours, company address are placeholders | `site.ts`, contact, about, legal | User |
| Final INR prices are proposals | `plans.ts`, `02-PRICING.md` | Business |
| GST shown inclusive vs added at checkout (default inclusive) | pricing copy | Accountant |
| Free trial requires card? Copy says "No credit card required" (default) | pricing page, CTA banner, FAQ | User |
| Refund policy (7 days, under 1 GB) | FAQ, refund page | User |
| "Data stored in India" and storage region claims | trust row, security, FAQ | User |
| Security page details (encryption method, access policy, backups, security contact) | security page | User |
| Contact form does not send anything (no endpoint) | `ContactForm.tsx` | Phase 2 |
| "Start free trial" goes to demo dashboard until `/signup` exists | `navigation.ts` | Phase 2 |
| Organization JSON-LD has no `logo`; no logo asset yet | `layout.tsx` | Logo asset |
| Legal wording, grievance officer, business name, jurisdiction are `[PLACEHOLDER]` | `src/content/legal.ts` | Lawyer |
| Database / auth provider, hosting region | Phase 2 | User |

## 7. Session log
### 2026-10-29 (second pass)
- Added `docs/03-ARCHITECTURE.md` (by user). Folder layout now follows it.
- Redesigned the UI as glassmorphism (aurora background, glass panels, gradient buttons, floating hero preview).
- Built all Phase 1 pages: home (full), features, pricing (toggle, comparison table, FAQ, JSON-LD), security, FAQ (FAQPage JSON-LD), about, contact (validated form, no submit), four legal pages, demo dashboard, 404, sitemap, robots, OG image.
- Verified: one `<h1>` per page, unique titles (50 to 60 chars) and descriptions (about 140 to 160), canonical, noindex on dashboard, og:image on every page. No horizontal overflow at 360, 768 or 1280 on 13 routes. Mobile menu opens full-screen, closes on Escape, restores focus.
- Verification used headless Chrome over the DevTools protocol (scratch scripts, not in the repo). Screenshots were taken against the user's running dev server on port 3000.
- Not yet done: keyboard and screen-reader pass (1.23), Lighthouse (1.24), review on a real phone, 768 visual review.

### 2026-10-29 (first pass)
- Installed `code-review-graph` (MCP server in `.mcp.json`, hooks in `.claude/settings.json`, git pre-commit hook). Built the graph. Instruction injection into `CLAUDE.md` was declined, so `CLAUDE.md` is unchanged.
- Completed Phase 0 and Phase 1A: UI primitives, header, footer, root layout, `buildMetadata()`, JSON-LD.

## 8. Next steps
1. User reviews the design on a phone; adjust glass intensity, colours or copy.
2. Tasks 1.22 to 1.24: 768 review, keyboard and screen-reader pass, Lighthouse mobile run.
3. Replace placeholders (section 6) as the business confirms them.
4. Commit the work (nothing is committed yet).
5. Phase 2 only after the user says so: backend, database, auth.
