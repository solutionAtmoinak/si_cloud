import { Accordion } from "@/components/ui/Accordion";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/marketing/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqs } from "@/content/faq";
import { buildFaqSchema, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cloud Backup FAQ India | Common Questions | CloudVault",
  description:
    "Answers about the free trial, billing, GST, refunds, payment methods, data safety and where your files are stored. Everything to know before you back up.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Frequently asked questions" description="Short, clear answers about CloudVault." />
      <Section className="pt-6 md:pt-8">
        <div className="mx-auto max-w-3xl">
          <Accordion items={faqs} />
          <div className="glass mt-10 rounded-2xl p-6 text-center">
            <h2 className="text-xl font-semibold text-ink-900">Still have a question?</h2>
            <p className="mt-2 text-base text-ink-700">Send us a message and we will help.</p>
            <ButtonLink href="/contact" className="mt-5">
              Contact us
            </ButtonLink>
          </div>
        </div>
      </Section>
      <JsonLd data={buildFaqSchema(faqs)} />
    </>
  );
}
