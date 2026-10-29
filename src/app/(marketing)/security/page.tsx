import { CtaBanner } from "@/components/marketing/CtaBanner";
import { PageHero } from "@/components/marketing/PageHero";
import { Card } from "@/components/ui/Card";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Secure Cloud Backup in India | Security | CloudVault",
  description:
    "Learn how CloudVault protects your files with encryption in transit and at rest, strict access control and a clear commitment to India's DPDP Act 2023.",
  path: "/security",
});

// Do not claim certifications (ISO 27001, SOC 2) until they are obtained.
const sections: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "lock",
    title: "Encryption in transit",
    body: "Everything you upload or download travels over TLS 1.2 or newer, so it cannot be read on the way.",
  },
  {
    icon: "shield-check",
    title: "Encryption at rest",
    body: "Files are encrypted while they sit in our storage. [PLACEHOLDER: confirm encryption method and key management.]",
  },
  {
    icon: "users",
    title: "Access control",
    body: "Your files belong to your account. Our team can only reach customer data when strictly needed to give support. [PLACEHOLDER: confirm internal access policy.]",
  },
  {
    icon: "map-pin",
    title: "Data location",
    body: "We plan to store your data in India. [PLACEHOLDER: confirm storage region and provider.]",
  },
  {
    icon: "server",
    title: "Backups of our backups",
    body: "We keep extra copies of our own systems so a single failure does not lose your files. [PLACEHOLDER: describe backup and restore drills.]",
  },
  {
    icon: "mail",
    title: "Report a vulnerability",
    body: `Found a security problem? Write to ${site.contactEmail}. [PLACEHOLDER: confirm a dedicated security contact.]`,
  },
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Security"
        title="How we keep your data safe"
        description="Your files are personal. Here is how we protect them, in plain words."
      />
      <Section className="pt-6 md:pt-8">
        <ul className="grid gap-5 md:grid-cols-2">
          {sections.map((section) => (
            <li key={section.title}>
              <Card className="flex h-full gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand-50 to-violet-100 text-brand-700">
                  <Icon name={section.icon} size={24} />
                </span>
                <div>
                  <h2 className="text-xl font-semibold text-ink-900">{section.title}</h2>
                  <p className="mt-2 text-base text-ink-700">{section.body}</p>
                </div>
              </Card>
            </li>
          ))}
        </ul>

        <Card className="glass-strong mt-5 flex gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-100 to-violet-100 text-violet-700">
            <Icon name="globe" size={24} />
          </span>
          <div>
            <h2 className="text-xl font-semibold text-ink-900">Our DPDP Act 2023 commitment</h2>
            <p className="mt-2 text-base text-ink-700">
              We collect only the data we need, tell you why we need it, and let you see, correct and delete it, as the Digital Personal
              Data Protection Act 2023 describes. [PLACEHOLDER: add grievance officer details and link to the privacy policy.]
            </p>
          </div>
        </Card>
      </Section>
      <CtaBanner />
    </>
  );
}
