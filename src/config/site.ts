export const site = {
  name: "CloudVault",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.in",
  description: "Secure cloud backup for Indian families and businesses. 1 month free.",
  locale: "en-IN",
  currency: "INR",
  // [PLACEHOLDER] replace the domain and contact email before launch.
  contactEmail: "support@example.in",
  // Fixed date used for sitemap lastModified; Cache Components forbids new Date() during prerender.
  // Update when marketing content changes.
  lastUpdated: "2026-10-29",
  social: {
    twitter: "",
    linkedin: "",
    instagram: "",
  },
} as const;
