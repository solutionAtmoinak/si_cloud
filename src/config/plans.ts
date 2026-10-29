export type BillingCycle = "monthly" | "yearly";

export type Plan = {
  id: "starter" | "plus" | "pro";
  name: string;
  storageGB: number;
  monthlyPriceINR: number;
  yearlyPriceINR: number;
  highlight?: boolean;
  features: string[];
  // Structured copies of the feature list, used by the comparison table.
  versionHistoryDays: number | null;
  support: string;
  sharedFolders: boolean;
};

export const FREE_TRIAL = {
  storageGB: 5,
  durationDays: 30,
  readOnlyGraceDays: 14,
  deletionWarningDays: 7,
} as const;

// OPEN: prices are proposals from docs/02-PRICING.md, to be confirmed by the business.
export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    storageGB: 50,
    monthlyPriceINR: 99,
    yearlyPriceINR: 999,
    features: ["50 GB encrypted storage", "Automatic backup", "Mobile and web access", "Email support"],
    versionHistoryDays: null,
    support: "Email",
    sharedFolders: false,
  },
  {
    id: "plus",
    name: "Plus",
    storageGB: 200,
    monthlyPriceINR: 249,
    yearlyPriceINR: 2499,
    highlight: true,
    features: ["200 GB encrypted storage", "Automatic backup", "Version history (30 days)", "Priority email support"],
    versionHistoryDays: 30,
    support: "Priority email",
    sharedFolders: false,
  },
  {
    id: "pro",
    name: "Pro",
    storageGB: 1024,
    monthlyPriceINR: 599,
    yearlyPriceINR: 5999,
    features: ["1 TB encrypted storage", "Automatic backup", "Version history (90 days)", "Shared folders", "Priority support"],
    versionHistoryDays: 90,
    support: "Priority",
    sharedFolders: true,
  },
];

export function yearlySavingINR(plan: Plan): number {
  return plan.monthlyPriceINR * 12 - plan.yearlyPriceINR;
}

export function monthlyEquivalentINR(plan: Plan): number {
  return Math.round(plan.yearlyPriceINR / 12);
}

export function lowestMonthlyPriceINR(): number {
  return Math.min(...PLANS.map((plan) => plan.monthlyPriceINR));
}

// Highest yearly discount across plans, as a whole percentage. Drives "Save up to X%" labels.
export function maxYearlySavingPercent(): number {
  return Math.max(
    ...PLANS.map((plan) => Math.round((yearlySavingINR(plan) / (plan.monthlyPriceINR * 12)) * 100)),
  );
}
