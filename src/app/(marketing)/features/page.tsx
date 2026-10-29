import { CtaBanner } from "@/components/marketing/CtaBanner";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { PageHero } from "@/components/marketing/PageHero";
import { Section } from "@/components/ui/Section";
import { featureDetails } from "@/content/features";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Automatic Photo & File Backup in India | CloudVault",
  description:
    "See how CloudVault backs up your photos and files automatically, with encryption, version history, easy restore and shared folders. Try it free for one month.",
  path: "/features",
});

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="Everything you need to keep your files safe"
        description="Back up once and stop worrying. Here is what CloudVault does for you."
      />
      <Section className="pt-6 md:pt-8">
        <FeatureGrid features={featureDetails} headingLevel="h2" />
      </Section>
      <CtaBanner />
    </>
  );
}
