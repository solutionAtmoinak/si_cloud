# CLAUDE.md – Instructions for Claude Code

Read this file first in every session. Then read the document relevant to your task in `docs/`.

## Project
Cloud backup website for Indian customers (working name: CloudVault). Public marketing site first, then authenticated dashboard, backend, database, and Razorpay payments.

## Current phase
Phase 1: frontend only. Check `docs/07-ROADMAP.md` for the current task. Do not build backend or payment code until the roadmap says so.

## Tech stack (do not change without asking)
- Next.js (App Router), React, TypeScript (strict mode)
- Tailwind CSS
- ESLint (Next.js config)
- Fonts via `next/font/google`
- Images via `next/image`
- Links via `next/link`

## Non-negotiable rules
1. **SEO and SSR first.** Marketing pages must render HTML on the server. Use Server Components by default. Add `"use client"` only for interactive pieces (toggles, menus, forms, billing switch). Keep client components as small leaves.
2. **Every public page exports `metadata` or `generateMetadata`** with a unique `title`, `description`, `alternates.canonical`, and Open Graph data. See `docs/04-SEO.md`.
3. **Prices come only from `src/config/plans.ts`.** Never hardcode a price in a component.
4. **Currency is INR.** Format with `Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" })`.
5. **Mobile first.** Design for 360px width first, then scale up. Test layouts at 360, 768, 1280.
6. **Accessibility.** Semantic HTML, one `<h1>` per page, labelled form inputs, visible focus states, color contrast at WCAG AA minimum.
7. **No secrets in code.** Use `.env.local` for keys. Never commit `.env*` files. Add a `.env.example` when env vars are introduced.
8. **No localStorage or sessionStorage for anything important** in Phase 1 mocks. Use in-memory state or the server-side config.
9. **Do not add dependencies without a reason.** Prefer the platform and the libraries listed in `docs/03-ARCHITECTURE.md`. Ask before adding a new UI kit.
10. **Indian context.** Use "Indian Rupee (₹)", GST-inclusive wording, UPI as a payment method, and en-IN locale. Respect the DPDP Act 2023 in any data-related copy.

## Code conventions
- Components: PascalCase files, default export for page and layout components, named exports for reusable components.
- Utilities: camelCase. Config: `src/config/`. Types: `src/types/`.
- Use `type` for object shapes and props. Avoid `any`. Use `unknown` and narrow it.
- Prefer `async` Server Components that read from `src/config/` or `src/lib/` over client-side fetching.
- Keep Tailwind classes readable. Extract a component instead of duplicating long class strings more than twice.
- Use `cn()` helper (from `src/lib/utils.ts`) for conditional classes.
- Comments: only where the reason is not obvious.

## Commands
- Dev server: `npm run dev`
- Type check: `npx tsc --noEmit`
- Lint: `npm run lint`
- Build (run before saying a task is done): `npm run build`

A task is not complete until `npm run build` passes with no errors and no type errors.

## Output expectations when you change code
- Give complete, drop-in-ready files when creating or replacing a file. Do not show partial snippets for files that will be replaced.
- Briefly explain what changed and why, in a few sentences.
- If something in the docs conflicts with a request, stop and ask instead of guessing.
- Mark any unresolved decision with `OPEN:` in code comments and list it in your final summary.

## Do not
- Do not build login, database, or Razorpay code in Phase 1.
- Do not invent prices, storage limits, or legal wording. Use the values in `docs/02-PRICING.md` and placeholders in `docs/06-PAGES-AND-CONTENT.md` marked `[PLACEHOLDER]`.
- Do not use `pages/` router. Use `app/`.
- Do not use `next/head`. Use the Metadata API.
- Do not use client-side-only rendering for marketing content.
