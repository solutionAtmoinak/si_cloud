import { ButtonLink } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { Hero } from "@/components/marketing/Hero";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { PricingCards } from "@/components/marketing/PricingCards";
import { TrustRow } from "@/components/marketing/TrustRow";
import { UseCases } from "@/components/marketing/UseCases";
import { FREE_TRIAL, lowestMonthlyPriceINR } from "@/config/plans";
import { homeFaqs } from "@/content/faq";
import { homeFeatures } from "@/content/features";
import { buildMetadata } from "@/lib/seo";
import { formatINR } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Cloud Backup in India | 1 Month Free, 5 GB | CloudVault",
  description: `Secure cloud backup for Indian families and businesses. Start with ${FREE_TRIAL.storageGB} GB free for one month, then plans from ${formatINR(lowestMonthlyPriceINR())}/month. Prices in INR, GST included.`,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustRow />
      <HowItWorks />
      <Section>
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to keep your files safe"
          description="Simple tools that work quietly in the background."
        />
        <div className="mt-10">
          <FeatureGrid features={homeFeatures} />
        </div>
      </Section>
      <Section>
        <SectionHeading
          eyebrow="Pricing"
          title="Simple pricing in ₹"
          description={`Every plan starts with a ${FREE_TRIAL.durationDays}-day free trial. Save with yearly billing.`}
        />
        <div className="mt-10">
          <PricingCards />
        </div>
      </Section>
      <UseCases />
      <Section>
        <SectionHeading eyebrow="FAQ" title="Questions? We have answers" />
        <div className="mx-auto mt-10 max-w-3xl">
          <Accordion items={homeFaqs} />
          <div className="mt-8 text-center">
            <ButtonLink href="/faq" variant="secondary">
              Read all questions
            </ButtonLink>
          </div>
        </div>
      </Section>
      <CtaBanner />
    </>
  );
}
