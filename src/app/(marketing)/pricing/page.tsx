import { Accordion } from "@/components/ui/Accordion";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { PageHero } from "@/components/marketing/PageHero";
import { PricingCards } from "@/components/marketing/PricingCards";
import { JsonLd } from "@/components/seo/JsonLd";
import { FREE_TRIAL, PLANS, lowestMonthlyPriceINR } from "@/config/plans";
import { faqs } from "@/content/faq";
import { buildMetadata, buildPricingSchema } from "@/lib/seo";
import { formatINR, formatStorage } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Cloud Storage Plans in India | Pricing | CloudVault",
  description: `Compare CloudVault cloud backup plans in INR, from ${formatINR(lowestMonthlyPriceINR())}/month. Start with a 1-month free trial and ${FREE_TRIAL.storageGB} GB, and save with yearly billing. Prices include GST.`,
  path: "/pricing",
});

// Refunds, cancellation, upgrades, payment methods.
const pricingFaqs = [faqs[3], faqs[2], faqs[8], faqs[4]];

const comparisonRows: { label: string; value: (plan: (typeof PLANS)[number]) => string }[] = [
  { label: "Storage", value: (plan) => formatStorage(plan.storageGB) },
  { label: "Automatic backup", value: () => "Yes" },
  { label: "Version history", value: (plan) => (plan.versionHistoryDays ? `${plan.versionHistoryDays} days` : "Not included") },
  { label: "Shared folders", value: (plan) => (plan.sharedFolders ? "Yes" : "Not included") },
  { label: "Support", value: (plan) => plan.support },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple pricing in ₹. Start free for 1 month."
        description="No hidden fees and no setup charges. Cancel anytime."
      />

      <Section className="pt-6 md:pt-8">
        {/* OPEN: "No credit card required" depends on the trial card decision in docs/02-PRICING.md. */}
        <p className="glass mx-auto mb-12 flex max-w-2xl items-center justify-center gap-3 rounded-2xl px-5 py-4 text-center text-base font-semibold text-ink-900">
          <Icon name="zap" size={22} className="shrink-0 text-brand-700" />
          Try {FREE_TRIAL.storageGB} GB free for {FREE_TRIAL.durationDays} days. No credit card required.
        </p>
        <PricingCards headingLevel="h2" />
      </Section>

      <Section>
        <SectionHeading title="Compare plans" />
        {/* Focusable so keyboard users can scroll the table on narrow screens. */}
        <div tabIndex={0} role="region" aria-label="Plan comparison table" className="glass mt-10 overflow-x-auto rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700">
          <table className="w-full border-collapse text-left text-sm sm:text-base">
            <caption className="sr-only">Storage, version history, sharing and support for each plan</caption>
            <thead>
              <tr className="border-b border-white/70">
                <th scope="col" className="px-3 py-4 font-semibold text-ink-900 sm:px-5">
                  <span className="sr-only">Feature</span>
                </th>
                {PLANS.map((plan) => (
                  <th key={plan.id} scope="col" className="px-3 py-4 font-bold text-ink-900 sm:px-5">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label} className="border-b border-white/50 last:border-0">
                  <th scope="row" className="px-3 py-4 font-semibold text-ink-900 sm:px-5">
                    {row.label}
                  </th>
                  {PLANS.map((plan) => (
                    <td key={plan.id} className="px-3 py-4 text-ink-700 sm:px-5">
                      {row.value(plan)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-center text-sm text-ink-700">All prices are inclusive of GST.</p>
      </Section>

      <Section>
        <SectionHeading title="Billing questions" />
        <div className="mx-auto mt-10 max-w-3xl">
          <Accordion items={pricingFaqs} />
        </div>
      </Section>

      <CtaBanner />
      <JsonLd data={buildPricingSchema()} />
    </>
  );
}
