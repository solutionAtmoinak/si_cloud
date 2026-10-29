# 02 – Pricing and Plans

> **Status:** Proposed values. Prices are placeholders to be confirmed by the business. All values must live in `src/config/plans.ts`.

## 1. Pricing principles
- All prices in Indian Rupees (₹).
- Prices displayed **GST-inclusive** by default. (OPEN: confirm with accountant.)
- Monthly and yearly billing for every paid plan.
- Yearly plans give about two months free (roughly 16–17% off monthly).
- No hidden fees, no setup fees, no per-file charges.

## 2. Plans

| Plan | Storage | Monthly | Yearly | Yearly saving | Who it is for |
|------|---------|---------|--------|---------------|---------------|
| **Free Trial** | 5 GB | ₹0 for 30 days | — | — | Try the service |
| **Starter** | 50 GB | ₹99 | ₹999 | ₹189 | Students, single users |
| **Plus** | 200 GB | ₹249 | ₹2,499 | ₹489 | Families, photographers |
| **Pro** | 1 TB | ₹599 | ₹5,999 | ₹1,189 | Professionals, small businesses |

Yearly saving = (monthly × 12) − yearly price.

## 3. Free trial rules
- One free trial per account (tracked by verified email and, later, phone number).
- Duration: 30 days from activation.
- Storage: 5 GB hard limit. Uploads that would exceed it are rejected with a clear message.
- No credit card required at signup (OPEN: confirm; this improves signup rate but increases abuse).
- At trial end, the account moves to read-only for 14 days. Files are not deleted during this period.
- After 14 days of read-only, files are deleted after a 7-day final warning email.
- Reminder emails: day 23 (7 days left), day 28 (2 days left), day 30 (trial ended).

## 4. Billing rules
- Billing starts when the user chooses a paid plan. Trial days are not carried over to the paid period unless the user upgrades before trial end (OPEN).
- Monthly plans renew every 30 days from purchase date.
- Yearly plans renew every 365 days.
- **Upgrade**: takes effect immediately. The user pays the prorated difference.
- **Downgrade**: takes effect at the next billing cycle. The user keeps higher storage until then. If current usage exceeds the new limit, the user must delete files before the downgrade takes effect.
- **Cancellation**: access continues until the end of the paid period. No partial refunds for unused time on monthly plans.
- **Refunds**: full refund within 7 days of first paid purchase if storage usage is below 1 GB (OPEN: confirm policy).

## 5. Display rules (frontend)
- Monthly/yearly toggle defaults to **Yearly**.
- Show "Save ₹189 per year" next to yearly prices.
- Show the per-month equivalent for yearly plans: e.g., ₹999/year = "₹83/month". Round to the nearest rupee.
- The "Most popular" badge appears on **Plus**.
- Show the free trial CTA on every plan card: "Start 30-day free trial".

## 6. Config file (reference implementation)

Claude Code should create `src/config/plans.ts` with this structure:

```ts
// src/config/plans.ts
export type BillingCycle = "monthly" | "yearly";

export type Plan = {
  id: "starter" | "plus" | "pro";
  name: string;
  storageGB: number;
  monthlyPriceINR: number;
  yearlyPriceINR: number;
  highlight?: boolean;
  features: string[];
};

export const FREE_TRIAL = {
  storageGB: 5,
  durationDays: 30,
  readOnlyGraceDays: 14,
  deletionWarningDays: 7,
} as const;

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    storageGB: 50,
    monthlyPriceINR: 99,
    yearlyPriceINR: 999,
    features: ["50 GB encrypted storage", "Automatic backup", "Mobile and web access", "Email support"],
  },
  {
    id: "plus",
    name: "Plus",
    storageGB: 200,
    monthlyPriceINR: 249,
    yearlyPriceINR: 2499,
    highlight: true,
    features: ["200 GB encrypted storage", "Automatic backup", "Version history (30 days)", "Priority email support"],
  },
  {
    id: "pro",
    name: "Pro",
    storageGB: 1024,
    monthlyPriceINR: 599,
    yearlyPriceINR: 5999,
    features: ["1 TB encrypted storage", "Automatic backup", "Version history (90 days)", "Shared folders", "Priority support"],
  },
];

export function yearlySavingINR(plan: Plan): number {
  return plan.monthlyPriceINR * 12 - plan.yearlyPriceINR;
}

export function monthlyEquivalentINR(plan: Plan): number {
  return Math.round(plan.yearlyPriceINR / 12);
}
```

## 7. Future database fields (for Phase 2 planning)
- `plans`: id, name, storage_bytes, monthly_price_paise, yearly_price_paise, active
- Store money in **paise** (integer) in the database, never floats. Razorpay expects paise.
- `subscriptions`: user_id, plan_id, billing_cycle, status (trialing, active, past_due, cancelled, expired), current_period_start, current_period_end, razorpay_subscription_id
