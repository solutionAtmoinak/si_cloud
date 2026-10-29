import type { Metadata } from "next";
import { PLANS } from "@/config/plans";
import { site } from "@/config/site";
import type { FaqItem } from "@/content/faq";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

// Served by src/app/opengraph-image.tsx. Pages that set their own openGraph object lose the
// file-based image, so every page references it explicitly (the ?hash Next adds is only a cache-buster).
const defaultOgImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} – cloud backup for India` };

export function buildMetadata({ title, description, path, noIndex = false }: PageSeo): Metadata {
  const url = new URL(path, site.url).toString();
  return {
    title: { absolute: title },
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
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage.url],
    },
  };
}

// Offers are generated from plans.ts so structured data can never drift from the visible prices.
export function buildPricingSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${site.name} Cloud Backup`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Android, iOS",
    offers: PLANS.flatMap((plan) => [
      {
        "@type": "Offer",
        name: `${plan.name} Monthly`,
        price: String(plan.monthlyPriceINR),
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: `${plan.name} Yearly`,
        price: String(plan.yearlyPriceINR),
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
    ]),
  };
}

export function buildFaqSchema(items: FaqItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
