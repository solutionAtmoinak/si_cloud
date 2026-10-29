"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Toggle } from "@/components/ui/Toggle";
import { trialHref } from "@/config/navigation";
import { FREE_TRIAL, PLANS, maxYearlySavingPercent, type BillingCycle } from "@/config/plans";
import { formatStorage } from "@/lib/utils";
import { PriceDisplay } from "./PriceDisplay";

const cycleOptions: { value: BillingCycle; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

// The billing switch is the only interactive part, so the card markup renders on the server for crawlers.
export function PricingCards({ headingLevel: Heading = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const [cycle, setCycle] = useState<BillingCycle>("yearly");

  return (
    <div>
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Toggle label="Billing cycle" options={cycleOptions} value={cycle} onChange={setCycle} />
        <Badge variant="success">Save up to {maxYearlySavingPercent()}%</Badge>
      </div>

      <ul className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
        {PLANS.map((plan) => (
          <li key={plan.id} className={plan.highlight ? "md:-my-4" : undefined}>
            <Card highlighted={plan.highlight} className="relative flex h-full flex-col p-7">
              {plan.highlight && (
                <Badge variant="amber" className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most popular
                </Badge>
              )}
              <Heading className="text-2xl font-bold text-ink-900">{plan.name}</Heading>
              <p className="mt-1 text-base text-ink-700">{formatStorage(plan.storageGB)} of storage</p>
              <div className="mt-5">
                <PriceDisplay plan={plan} cycle={cycle} />
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-base text-ink-700">
                    <Icon name="check" size={20} className="mt-0.5 shrink-0 text-accent-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <ButtonLink href={trialHref} variant={plan.highlight ? "primary" : "secondary"} size="lg" className="mt-8 w-full">
                Start {FREE_TRIAL.durationDays}-day free trial
              </ButtonLink>
            </Card>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-center text-sm text-ink-700">All prices are inclusive of GST.</p>
    </div>
  );
}
