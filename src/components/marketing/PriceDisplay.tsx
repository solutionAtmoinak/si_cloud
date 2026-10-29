import type { BillingCycle, Plan } from "@/config/plans";
import { monthlyEquivalentINR, yearlySavingINR } from "@/config/plans";
import { formatINR } from "@/lib/utils";

export function PriceDisplay({ plan, cycle }: { plan: Plan; cycle: BillingCycle }) {
  const isYearly = cycle === "yearly";
  const price = isYearly ? plan.yearlyPriceINR : plan.monthlyPriceINR;

  return (
    <div>
      <p className="flex flex-wrap items-baseline gap-x-2">
        <span className="text-4xl font-extrabold text-ink-900">{formatINR(price)}</span>
        <span className="text-base font-semibold text-ink-700">{isYearly ? "/yr" : "/mo"}</span>
        {isYearly && (
          <span className="text-base text-ink-700 line-through">
            <span className="sr-only">Monthly price over a year: </span>
            {formatINR(plan.monthlyPriceINR * 12)}
          </span>
        )}
      </p>
      {/* Reserve the line in monthly mode too, so cards do not jump when the toggle changes. */}
      <p className="mt-1 min-h-6 text-sm font-semibold text-ink-700">
        {isYearly && (
          <>
            {formatINR(monthlyEquivalentINR(plan))}/month ·{" "}
            <span className="text-green-800">Save {formatINR(yearlySavingINR(plan))} per year</span>
          </>
        )}
      </p>
    </div>
  );
}
