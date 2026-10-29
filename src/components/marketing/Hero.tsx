import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { trialHref } from "@/config/navigation";
import { FREE_TRIAL, lowestMonthlyPriceINR } from "@/config/plans";
import { formatINR } from "@/lib/utils";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section className="pb-14 pt-12 md:pb-20 md:pt-20">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
        <div>
          <Badge variant="brand">
            <Icon name="zap" size={16} />
            {FREE_TRIAL.durationDays} days free · {FREE_TRIAL.storageGB} GB
          </Badge>
          <h1 className="mt-5 text-[2rem] font-extrabold leading-10 text-ink-900 md:text-6xl md:leading-[4rem]">
            Back up your photos, files and documents. <span className="text-gradient">Safe in India.</span>
          </h1>
          <p className="mt-5 max-w-xl text-ink-700">
            Start with 1 month free and {FREE_TRIAL.storageGB} GB. Plans from {formatINR(lowestMonthlyPriceINR())}/month.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={trialHref} size="lg">
              Start free trial
              <Icon name="arrow-right" size={20} />
            </ButtonLink>
            <ButtonLink href="/pricing" size="lg" variant="secondary">
              See pricing
            </ButtonLink>
          </div>
        </div>
        <HeroVisual />
      </Container>
    </section>
  );
}
