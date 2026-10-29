import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { trialHref } from "@/config/navigation";

type CtaBannerProps = {
  title?: string;
  description?: string;
};

export function CtaBanner({
  title = "Your first month is free.",
  // OPEN: "No card needed" depends on the trial card decision in docs/02-PRICING.md.
  description = "No card needed. Start backing up in minutes and cancel anytime.",
}: CtaBannerProps) {
  return (
    <Section>
      <div className="glass-strong relative overflow-hidden rounded-3xl px-6 py-12 text-center sm:px-12 md:py-16">
        <div aria-hidden="true" className="pointer-events-none absolute -left-16 -top-16 size-64 rounded-full bg-brand-600/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -right-10 size-72 rounded-full bg-violet-500/25 blur-3xl" />
        <h2 className="relative text-[1.625rem] font-extrabold leading-[2.125rem] text-ink-900 md:text-4xl md:leading-[3rem]">{title}</h2>
        <p className="relative mx-auto mt-3 max-w-xl text-ink-700">{description}</p>
        <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={trialHref} size="lg">
            Start free trial
          </ButtonLink>
          <ButtonLink href="/pricing" size="lg" variant="secondary">
            See pricing
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
