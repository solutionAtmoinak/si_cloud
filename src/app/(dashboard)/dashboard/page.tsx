import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { FREE_TRIAL } from "@/config/plans";
import { mockDashboard } from "@/config/mock-dashboard";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Dashboard (Demo) | CloudVault",
  description: "A demo of the CloudVault dashboard with sample data. Sign-up is not yet available.",
  path: "/dashboard",
  noIndex: true,
});

export default function DashboardPage() {
  const { usedGB, totalGB, trialDaysLeft, recentBackups, planName } = mockDashboard;
  const usedPercent = Math.round((usedGB / totalGB) * 100);
  const trialPercent = Math.round((trialDaysLeft / FREE_TRIAL.durationDays) * 100);

  return (
    <Container className="py-10 md:py-14">
      <p role="status" className="glass flex items-start gap-3 rounded-2xl border-amber-400 p-4 text-base font-semibold text-ink-900">
        <Icon name="info" size={22} className="mt-0.5 shrink-0 text-brand-700" />
        <span>Demo mode. Sign-up is not yet available. Everything on this page is demo data.</span>
      </p>

      <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
        <SectionHeading as="h1" align="left" eyebrow="Demo data" title="Your backup" />
        <Badge variant="brand">{planName}</Badge>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <Card className="md:col-span-2">
          <h2 className="text-lg font-semibold text-ink-900">Storage</h2>
          <p className="mt-3 text-3xl font-extrabold text-ink-900">
            {usedGB} GB <span className="text-base font-semibold text-ink-700">of {totalGB} GB used</span>
          </p>
          <div
            role="progressbar"
            aria-label="Storage used"
            aria-valuenow={usedPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            className="mt-4 h-4 overflow-hidden rounded-full bg-white/80"
          >
            <div className="h-full rounded-full bg-linear-to-r from-cyan-500 via-brand-600 to-violet-600" style={{ width: `${usedPercent}%` }} />
          </div>
          <p className="mt-2 text-sm text-ink-700">{usedPercent}% used</p>
        </Card>

        <Card className="flex flex-col">
          <h2 className="text-lg font-semibold text-ink-900">Free trial</h2>
          <p className="mt-3 text-3xl font-extrabold text-ink-900">
            {trialDaysLeft} <span className="text-base font-semibold text-ink-700">days left</span>
          </p>
          <div className="mt-4 h-4 overflow-hidden rounded-full bg-white/80" aria-hidden="true">
            <div className="h-full rounded-full bg-linear-to-r from-accent-500 to-cyan-500" style={{ width: `${trialPercent}%` }} />
          </div>
          <ButtonLink href="/pricing" className="mt-6">
            Upgrade
          </ButtonLink>
        </Card>
      </div>

      <Card className="mt-5">
        <h2 className="text-lg font-semibold text-ink-900">Recent backups</h2>
        <ul className="mt-4 divide-y divide-white/70">
          {recentBackups.map((backup) => (
            <li key={backup.id} className="flex items-center gap-4 py-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon name={backup.icon} size={22} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-base font-semibold text-ink-900">{backup.name}</span>
                <span className="block text-sm text-ink-700">
                  {backup.kind} · {backup.items} items · {backup.sizeLabel}
                </span>
              </span>
              <span className="hidden text-sm text-ink-700 sm:block">{backup.when}</span>
            </li>
          ))}
        </ul>
      </Card>
    </Container>
  );
}
