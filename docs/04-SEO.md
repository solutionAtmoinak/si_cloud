# 04 – SEO Specification

## 1. Goals
- Rank for India-focused cloud backup and storage queries.
- Every public page is fully rendered on the server, with unique metadata and structured data.
- Pass Google Core Web Vitals on mobile.

## 2. Target keywords (starting list)
| Page | Primary keyword | Secondary keywords |
|------|-----------------|--------------------|
| Home | cloud backup India | online backup India, secure cloud storage India, backup service in India |
| Pricing | cloud storage plans India | cheap cloud storage India, cloud backup price in rupees, 1 TB cloud storage ₹ |
| Features | automatic photo backup | auto backup Android photos, file sync India |
| Security | secure cloud backup India | encrypted cloud storage, DPDP compliant backup |
| FAQ | cloud backup FAQ India | is cloud backup safe, how to backup phone photos |
| Starter/Plus/Pro (later) | 50 GB cloud storage India | 200 GB cloud storage, 1 TB cloud backup |

Keyword research must be validated with Google Keyword Planner or Search Console before launch. Mark keyword changes in this file.

## 3. Metadata rules
- `title`: 50–60 characters. Format: `Primary keyword | Brand`.
- `description`: 140–160 characters. Include the price or free trial where relevant.
- Each page has a unique canonical URL.
- `lang="en-IN"` on `<html>`.
- `robots`: index, follow for public pages. noindex for dashboard and auth pages.

### Reference metadata helper (`src/lib/seo.ts`)

```ts
import type { Metadata } from "next";
import { site } from "@/config/site";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export function buildMetadata({ title, description, path, noIndex = false }: PageSeo): Metadata {
  const url = new URL(path, site.url).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "en_IN",
      type: "website",
      images: [{ url: "/og/default.png", width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og/default.png"],
    },
  };
}
```

Example use in a page:
```ts
// src/app/(marketing)/pricing/page.tsx
export const metadata = buildMetadata({
  title: "Cloud Storage Plans in India | Pricing from ₹99/month | CloudVault",
  description: "Compare CloudVault cloud backup plans in INR. Start with a 1-month free trial and 5 GB. Save with yearly billing.",
  path: "/pricing",
});
```

## 4. Site config (`src/config/site.ts`)
```ts
export const site = {
  name: "CloudVault",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.in",
  description: "Secure cloud backup for Indian families and businesses. 1 month free.",
  locale: "en-IN",
  currency: "INR",
  contactEmail: "support@example.in",
  social: {
    twitter: "",
    linkedin: "",
    instagram: "",
  },
} as const;
```
`[PLACEHOLDER]`: replace the domain and contact email before launch.

## 5. Sitemap and robots

### `src/app/sitemap.ts`
```ts
import type { MetadataRoute } from "next";
import { site } from "@/config/site";

const staticPaths = ["/", "/features", "/pricing", "/security", "/faq", "/about", "/contact", "/privacy", "/terms", "/refund-policy", "/shipping-and-delivery"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return staticPaths.map((path) => ({
    url: new URL(path, site.url).toString(),
    lastModified: now,
    changeFrequency: path === "/" || path === "/pricing" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/pricing" ? 0.9 : 0.6,
  }));
}
```

### `src/app/robots.ts`
```ts
import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/dashboard", "/api/", "/login", "/signup"] },
    ],
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
```

## 6. Structured data (JSON-LD)
Add to the root layout (Organization + WebSite) and to the pricing page (SoftwareApplication with Offers in INR).

### Reusable component `src/components/seo/JsonLd.tsx`
```tsx
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
```

### Organization and WebSite (root layout)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CloudVault",
  "url": "https://www.example.in",
  "logo": "https://www.example.in/icons/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "support@example.in",
    "contactType": "customer support",
    "areaServed": "IN",
    "availableLanguage": ["en"]
  }
}
```

### Pricing page (SoftwareApplication + Offer)
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "CloudVault Cloud Backup",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web, Android, iOS",
  "offers": [
    { "@type": "Offer", "name": "Starter Monthly", "price": "99", "priceCurrency": "INR", "availability": "https://schema.org/InStock" },
    { "@type": "Offer", "name": "Plus Monthly", "price": "249", "priceCurrency": "INR", "availability": "https://schema.org/InStock" },
    { "@type": "Offer", "name": "Pro Monthly", "price": "599", "priceCurrency": "INR", "availability": "https://schema.org/InStock" }
  ]
}
```
Generate this from `plans.ts` rather than hardcoding in production.

### FAQ page
Use `FAQPage` schema generated from `src/content/faq.ts`.

## 7. Open Graph images
- Create `src/app/opengraph-image.tsx` for the default OG image using `next/og` (ImageResponse), 1200×630.
- Per-page OG images for pricing and features later.

## 8. Technical SEO checklist
- [ ] One `<h1>` per page
- [ ] Heading hierarchy h1 → h2 → h3, no skipped levels
- [ ] All images have meaningful `alt` text (decorative images use `alt=""`)
- [ ] Internal links use descriptive anchor text ("cloud backup plans" not "click here")
- [ ] Custom 404 page with links back to home and pricing
- [ ] `sitemap.xml` and `robots.txt` generated and reachable
- [ ] Google Search Console property verified (DNS verification)
- [ ] Google Analytics 4 or Plausible installed after consent (Phase 4)
- [ ] Bing Webmaster Tools submitted
- [ ] No duplicate titles or descriptions across pages
- [ ] Trailing-slash behaviour consistent (set in `next.config.ts`)
- [ ] HTTPS redirect and `www` canonicalisation configured at hosting level

## 9. Performance (Core Web Vitals targets)
| Metric | Target (mobile, 75th percentile) |
|--------|----------------------------------|
| LCP | ≤ 2.5 s |
| INP | ≤ 200 ms |
| CLS | ≤ 0.1 |

Practices: `next/font` with `display: swap`, `next/image` with `sizes`, no layout-shifting banners, defer non-critical scripts with `next/script strategy="lazyOnload"`.

## 10. Content SEO (Phase 4)
- Blog at `/blog/[slug]` with `generateStaticParams`.
- Target topics: "how to back up Android photos", "how to back up WhatsApp media", "GST invoice backup for small business", "DPDP Act data protection for small business".
- Each article: 1,000+ words, FAQ section, internal link to pricing.
