import { CtaBanner } from "@/components/marketing/CtaBanner";
import { PageHero } from "@/components/marketing/PageHero";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About CloudVault | Secure Cloud Backup Made for India",
  description:
    "CloudVault is a cloud backup service built for Indian families and small businesses, with clear rupee pricing, simple tools and a free first month to try.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="About CloudVault" description="Cloud backup that is simple, fairly priced and made for India." />
      <Section className="pt-6 md:pt-8">
        <div className="grid gap-5 md:grid-cols-3">
          <Card className="md:col-span-2">
            <h2 className="text-2xl font-bold text-ink-900">Our mission</h2>
            <p className="mt-3 text-base text-ink-700">
              Photos, invoices and school projects are too important to live on one phone or laptop. We want every family and small
              business in India to back up with confidence, pay in rupees and never worry about hidden charges.
            </p>
            <h2 className="mt-8 text-2xl font-bold text-ink-900">Our team</h2>
            <p className="mt-3 text-base text-ink-700">[PLACEHOLDER: write the company story and introduce the team.]</p>
          </Card>
          <Card>
            <h2 className="text-2xl font-bold text-ink-900">Find us</h2>
            <ul className="mt-4 space-y-4 text-base text-ink-700">
              <li className="flex items-start gap-3">
                <Icon name="map-pin" size={20} className="mt-1 shrink-0 text-brand-700" />
                <span>[PLACEHOLDER: company registered address]</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="mail" size={20} className="mt-1 shrink-0 text-brand-700" />
                <a href={`mailto:${site.contactEmail}`} className="break-all text-brand-700 underline underline-offset-4">
                  {site.contactEmail}
                </a>
              </li>
            </ul>
          </Card>
        </div>
      </Section>
      <CtaBanner />
    </>
  );
}
