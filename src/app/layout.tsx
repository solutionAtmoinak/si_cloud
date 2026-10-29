import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AuroraBackground } from "@/components/layout/AuroraBackground";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/config/site";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
};

// OPEN: add `logo` once a logo file exists under public/.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  contactPoint: {
    "@type": "ContactPoint",
    email: site.contactEmail,
    contactType: "customer support",
    areaServed: "IN",
    availableLanguage: ["en"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-3 focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-ink-900"
        >
          Skip to main content
        </a>
        <AuroraBackground />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </body>
    </html>
  );
}
