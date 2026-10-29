import { cacheLife } from "next/cache";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { footerNav } from "@/config/navigation";
import { site } from "@/config/site";

// new Date() is a prerender error under Cache Components; caching it keeps the footer in the static shell.
async function getCurrentYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await getCurrentYear();

  return (
    <footer className="px-3 pb-3 pt-10 sm:px-4">
      <Container className="glass rounded-3xl px-6 py-10 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className="text-xl font-extrabold text-ink-900">{site.name}</p>
            <p className="mt-2 text-sm text-ink-700">{site.description}</p>
            <p className="mt-4 text-sm">
              <a
                href={`mailto:${site.contactEmail}`}
                className="rounded text-brand-700 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700"
              >
                {site.contactEmail}
              </a>
            </p>
          </div>

          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="text-sm font-bold uppercase tracking-wide text-ink-900">{group.heading}</h2>
              <ul className="mt-3 space-y-1">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-11 items-center rounded text-base text-ink-700 hover:text-brand-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="mt-10 border-t border-white/70 pt-6 text-sm text-ink-700">
          © {year} {site.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
