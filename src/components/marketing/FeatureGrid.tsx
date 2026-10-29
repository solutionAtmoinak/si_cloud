import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import type { Feature } from "@/content/features";

type FeatureGridProps = {
  features: Feature[];
  // Detail pages use h2 per feature (their own h1 sits above); the home grid sits under an h2 section heading.
  headingLevel?: "h2" | "h3";
};

export function FeatureGrid({ features, headingLevel: Heading = "h3" }: FeatureGridProps) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <li key={feature.title}>
          <Card className="group h-full transition-transform duration-200 hover:-translate-y-1">
            <div className="flex items-start justify-between gap-3">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-linear-to-br from-brand-50 to-violet-100 text-brand-700 shadow-inner">
                <Icon name={feature.icon} size={24} />
              </span>
              {feature.availability && <Badge variant="brand">{feature.availability}</Badge>}
            </div>
            <Heading className="mt-4 text-xl font-semibold text-ink-900">{feature.title}</Heading>
            <p className="mt-2 text-base text-ink-700">{feature.description}</p>
          </Card>
        </li>
      ))}
    </ul>
  );
}
