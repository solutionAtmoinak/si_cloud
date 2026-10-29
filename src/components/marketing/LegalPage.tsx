import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/Section";
import { site } from "@/config/site";
import type { LegalDocument } from "@/content/legal";

export function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <>
      <section className="pb-6 pt-14 md:pb-10 md:pt-20">
        <Container>
          <SectionHeading as="h1" eyebrow="Legal" title={document.title} description={document.intro} />
        </Container>
      </section>

      <section className="pb-14 md:pb-20">
        <Container className="max-w-3xl">
          <p className="glass mb-6 flex items-start gap-3 rounded-2xl p-4 text-sm text-ink-900">
            <Icon name="info" size={20} className="mt-0.5 shrink-0 text-brand-700" />
            <span>
              Draft structure. Items marked [PLACEHOLDER] must be completed and reviewed by a qualified lawyer before launch.
            </span>
          </p>

          <Card className="space-y-8 p-6 sm:p-8">
            <dl className="grid gap-x-6 gap-y-1 text-sm text-ink-700 sm:grid-cols-[auto_1fr]">
              <dt className="font-semibold text-ink-900">Business name</dt>
              <dd>[PLACEHOLDER: legal business name]</dd>
              <dt className="font-semibold text-ink-900">Address</dt>
              <dd>[PLACEHOLDER: registered address]</dd>
              <dt className="font-semibold text-ink-900">Contact</dt>
              <dd>{site.contactEmail}</dd>
              <dt className="font-semibold text-ink-900">Last updated</dt>
              <dd>[PLACEHOLDER: date]</dd>
            </dl>

            {document.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-bold text-ink-900">{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-3 text-base text-ink-700">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-3 list-disc space-y-1.5 pl-6 text-base text-ink-700">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </Card>
        </Container>
      </section>
    </>
  );
}
