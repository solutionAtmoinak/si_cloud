import { Card } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import { howItWorks } from "@/content/features";

export function HowItWorks() {
  return (
    <Section>
      <SectionHeading eyebrow="How it works" title="Safe in three simple steps" />
      <ol className="mt-10 grid gap-5 md:grid-cols-3">
        {howItWorks.map((step, index) => (
          <li key={step.title}>
            <Card className="h-full">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-linear-to-br from-brand-700 to-violet-600 text-lg font-extrabold text-white shadow-md shadow-indigo-600/30">
                {index + 1}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-ink-900">{step.title}</h3>
              <p className="mt-2 text-base text-ink-700">{step.description}</p>
            </Card>
          </li>
        ))}
      </ol>
    </Section>
  );
}
