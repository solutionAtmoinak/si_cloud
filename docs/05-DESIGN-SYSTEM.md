# 05 – Design System

## 1. Brand
- **Personality**: trustworthy, calm, modern, Indian-market friendly (clear pricing, warm tone, no jargon).
- **Voice**: simple English, short sentences. Avoid technical jargon on marketing pages.
- **Tone examples**:
  - Good: "Your photos, safe in one place. Start your free month today."
  - Avoid: "Leverage our enterprise-grade distributed storage infrastructure."

## 2. Color palette

| Token | Hex | Use |
|-------|-----|-----|
| `brand-600` | `#0F6FFF` | Primary buttons, links |
| `brand-700` | `#0B57CC` | Hover states |
| `brand-50` | `#EEF5FF` | Section backgrounds, badges |
| `accent-500` | `#16A34A` | Success, "Save ₹x" labels |
| `accent-amber` | `#F59E0B` | "Most popular" badge |
| `ink-900` | `#0B1220` | Headings |
| `ink-700` | `#334155` | Body text |
| `ink-500` | `#64748B` | Muted text (min contrast 4.5:1 on white) |
| `surface` | `#FFFFFF` | Page background |
| `surface-muted` | `#F8FAFC` | Alternating sections |
| `border` | `#E2E8F0` | Dividers, card borders |
| `danger-600` | `#DC2626` | Errors |

Dark mode: optional, Phase 4. If added, define tokens as CSS variables in `globals.css`.

### Tailwind config extension
```ts
// tailwind.config.ts (extend theme.colors)
colors: {
  brand: { 50: "#EEF5FF", 600: "#0F6FFF", 700: "#0B57CC" },
  accent: { 500: "#16A34A", amber: "#F59E0B" },
  ink: { 500: "#64748B", 700: "#334155", 900: "#0B1220" },
  surface: { DEFAULT: "#FFFFFF", muted: "#F8FAFC" },
  danger: { 600: "#DC2626" },
},
```

## 3. Typography
- **Primary font**: Plus Jakarta Sans (headings and body), loaded with `next/font/google`.
- **Fallback**: `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.
- **Future**: Noto Sans Devanagari and Noto Sans Bengali for multi-language pages.

| Style | Mobile | Desktop | Weight |
|-------|--------|---------|--------|
| H1 | 32px / 40px | 56px / 64px | 800 |
| H2 | 26px / 34px | 40px / 48px | 700 |
| H3 | 20px / 28px | 24px / 32px | 600 |
| Body | 16px / 26px | 18px / 28px | 400 |
| Small | 14px / 22px | 14px / 22px | 400 |

Body text never below 16px on mobile.

## 4. Spacing, layout, radius
- Spacing scale: Tailwind default (4px base).
- Container: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`.
- Section padding: `py-16 md:py-24`.
- Radius: `rounded-xl` for cards, `rounded-lg` for inputs and buttons, `rounded-full` for badges.
- Shadows: subtle only. `shadow-sm` for cards, `shadow-lg` for the highlighted pricing card.

## 5. Components (build in `src/components/ui/`)

| Component | Variants / notes |
|-----------|------------------|
| `Button` | primary, secondary, ghost, link. sizes sm, md, lg. min height 44px on mobile (touch target). |
| `Badge` | default, brand, success, amber |
| `Card` | default, highlighted |
| `Input`, `Textarea`, `Label` | always paired with a visible label, error text linked via `aria-describedby` |
| `Toggle` (billing cycle) | segmented control with `role="radiogroup"` |
| `Accordion` | for FAQ, keyboard accessible, `aria-expanded` |
| `Container`, `Section` | layout primitives |
| `PriceDisplay` | shows ₹ amount, `/mo` or `/yr`, and the strikethrough monthly equivalent |

## 6. Key marketing components

- **Header**: logo left, nav center (Features, Pricing, Security, FAQ), CTA right ("Start free trial"). Mobile: hamburger with a full-screen sheet. Sticky with backdrop blur.
- **Hero**: H1 with value proposition, subheading mentioning "1 month free · 5 GB", two CTAs (primary: Start free trial; secondary: View pricing), trust row ("256-bit encryption", "Made for India", "Cancel anytime").
- **Feature grid**: 3–6 cards, icon + title + one-line description.
- **Pricing cards**: three cards, Plus highlighted, toggle above. Each card shows storage, price, features list, CTA.
- **Trust strip**: logos or badges (only if real). Placeholder until available.
- **FAQ accordion**: 8–12 questions.
- **Footer**: product links, company links, legal links, contact email, copyright with current year.

## 7. Iconography
- Use `lucide-react` icons (add dependency in Phase 1 with approval).
- Icon size 20px in text, 24px in feature cards. Stroke width default.

## 8. Imagery
- Use illustrations or real product screenshots. No stock images with fake people in tech contexts.
- All images WebP/AVIF via `next/image`.
- Hero image or illustration under 150 KB.

## 9. Motion
- Subtle only: 150–200 ms transitions on hover and focus. Respect `prefers-reduced-motion`.

## 10. Accessibility checklist
- [ ] Contrast ratio ≥ 4.5:1 for body text, ≥ 3:1 for large text and UI components
- [ ] Focus ring visible on every interactive element (`focus-visible:ring-2 ring-brand-600`)
- [ ] Keyboard navigation for header, toggle, accordion, forms
- [ ] Skip-to-content link as the first focusable element
- [ ] Form errors announced (`aria-live="polite"`)
- [ ] Language attribute set to `en-IN`
- [ ] Touch targets at least 44×44px

## 11. Responsive breakpoints
Tailwind defaults: `sm` 640, `md` 768, `lg` 1024, `xl` 1280. Design at 360px first.

## 12. Glassmorphism layer (added 2026-10-29, user request)
The site uses a light "aurora" background with frosted-glass panels instead of flat white sections. Colour tokens in section 2 are unchanged.

- **Background**: `AuroraBackground` (fixed, decorative) draws four blurred colour blobs over a soft blue-violet-cyan gradient set on `body`.
- **Panels**: `glass` and `glass-strong` utilities in `globals.css` (translucent white, blur, white border, soft indigo shadow, opaque fallback when `backdrop-filter` is unsupported). Cards, header, footer, toggle, accordion items and inputs all use them.
- **Primary button**: gradient `brand-700` to `indigo-600` with white text (white on `brand-600` is only about 4.4:1, below AA).
- **Accent text**: `text-gradient` utility for one highlighted phrase per page at most.
- **Contrast rule**: body and muted text on glass use `ink-700` or `ink-900`; avoid `ink-500` on glass.
- **Motion**: blob drift and floating chips are disabled by `prefers-reduced-motion`.
- **Gotcha**: `backdrop-filter` makes an element the containing block for `position: fixed` children. Render full-screen overlays (the mobile menu) through a portal.
