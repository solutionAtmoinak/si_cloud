import { Icon } from "@/components/ui/Icon";

// Decorative product preview with dummy data, hidden from assistive tech.
export function HeroVisual() {
  const rows = [
    { icon: "image", name: "Family trip 2026", meta: "128 photos" },
    { icon: "file-text", name: "GST invoices", meta: "34 files" },
    { icon: "folder", name: "College project", meta: "212 files" },
  ] as const;

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-md">
      <div className="glass-strong rounded-3xl p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-ink-900">My backup</p>
          <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-800">Protected</span>
        </div>

        <p className="mt-4 text-3xl font-extrabold text-ink-900">
          1.2 GB <span className="text-base font-semibold text-ink-700">of 5 GB used</span>
        </p>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/80">
          <div className="h-full w-1/4 rounded-full bg-linear-to-r from-cyan-500 via-brand-600 to-violet-600" />
        </div>

        <ul className="mt-5 space-y-2.5">
          {rows.map((row) => (
            <li key={row.name} className="flex items-center gap-3 rounded-2xl bg-white/60 p-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon name={row.icon} size={20} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-ink-900">{row.name}</span>
                <span className="block text-xs text-ink-700">{row.meta}</span>
              </span>
              <Icon name="check" size={18} className="text-accent-500" />
            </li>
          ))}
        </ul>
      </div>

      <div className="glass animate-float absolute -right-2 -top-5 flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-bold text-ink-900 sm:-right-6">
        <Icon name="lock" size={18} className="text-brand-700" />
        256-bit encrypted
      </div>
      <div className="glass animate-float absolute -bottom-5 -left-2 flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-bold text-ink-900 [animation-delay:-3s] sm:-left-6">
        <Icon name="cloud-upload" size={18} className="text-violet-700" />
        Backed up just now
      </div>
    </div>
  );
}
