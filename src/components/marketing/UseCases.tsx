import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { useCases } from "@/content/features";

export function UseCases() {
  return (
    <Section>
      <SectionHeading eyebrow="Made for you" title="Backup that fits your life" />
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {useCases.map((useCase) => (
          <li key={useCase.title}>
            <Card className="h-full text-center">
              <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-linear-to-br from-cyan-100 to-violet-100 text-violet-700">
                <Icon name={useCase.icon} size={26} />
              </span>
              <h3 className="mt-4 text-xl font-semibold text-ink-900">{useCase.title}</h3>
              <p className="mt-2 text-base text-ink-700">{useCase.description}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
