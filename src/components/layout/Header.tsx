import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { headerCta, primaryNav } from "@/config/navigation";
import { site } from "@/config/site";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4">
      <Container className="glass flex h-16 items-center justify-between gap-4 rounded-2xl px-4 sm:px-5 lg:px-5">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg text-xl font-extrabold text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-brand-700 to-violet-600 text-white shadow-md shadow-indigo-600/30">
            <Icon name="cloud" size={20} />
          </span>
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {primaryNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex min-h-11 items-center rounded-xl px-3.5 text-base font-semibold text-ink-700 transition-colors duration-150 hover:bg-white/60 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Wrapper hides it: a `hidden` class on the link would lose to the button's own inline-flex. */}
          <div className="hidden md:block">
            <ButtonLink href={headerCta.href} size="sm">
              {headerCta.label}
            </ButtonLink>
          </div>
          <MobileMenu links={primaryNav} cta={headerCta} />
        </div>
      </Container>
    </header>
  );
}
