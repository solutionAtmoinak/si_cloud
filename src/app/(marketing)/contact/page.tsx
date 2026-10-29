import { ContactForm } from "@/components/marketing/ContactForm";
import { PageHero } from "@/components/marketing/PageHero";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact CloudVault | Sales, Support & Billing Help",
  description:
    "Get in touch with the CloudVault team for sales questions, account support or billing help. Send a message or email us and we will help you get started.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Contact us" description="Questions about plans, billing or your account? We are happy to help." />
      <Section className="pt-6 md:pt-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <Card className="h-fit">
            <h2 className="text-xl font-semibold text-ink-900">Other ways to reach us</h2>
            <ul className="mt-4 space-y-4 text-base text-ink-700">
              <li className="flex items-start gap-3">
                <Icon name="mail" size={20} className="mt-1 shrink-0 text-brand-700" />
                <a href={`mailto:${site.contactEmail}`} className="break-all text-brand-700 underline underline-offset-4">
                  {site.contactEmail}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="clock" size={20} className="mt-1 shrink-0 text-brand-700" />
                <span>[PLACEHOLDER: support hours]</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="map-pin" size={20} className="mt-1 shrink-0 text-brand-700" />
                <span>[PLACEHOLDER: company registered address]</span>
              </li>
            </ul>
          </Card>
        </div>
      </Section>
    </>
  );
}
