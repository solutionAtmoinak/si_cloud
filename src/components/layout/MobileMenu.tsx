"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { NavLink } from "@/config/navigation";
import { buttonStyles } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

type MobileMenuProps = {
  links: NavLink[];
  cta: NavLink;
};

const iconButton =
  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-ink-900 hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700";

export function MobileMenu({ links, cta }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const openButton = openButtonRef.current;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      openButton?.focus();
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={openButtonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className={iconButton}
      >
        <span className="sr-only">Open menu</span>
        <Icon name="menu" />
      </button>

      {/* Portal: the glass header uses backdrop-filter, which would otherwise clip a fixed child to the header. */}
      {open &&
        createPortal(
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
          className="glass-strong fixed inset-0 z-50 flex flex-col rounded-none px-4 py-3"
        >
          <div className="flex justify-end">
            <button ref={closeButtonRef} type="button" onClick={() => setOpen(false)} className={iconButton}>
              <span className="sr-only">Close menu</span>
              <Icon name="x" />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-4 flex flex-1 flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center rounded-xl px-3 text-xl font-semibold text-ink-900 hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700"
              >
                {link.label}
              </Link>
            ))}
            <Link href={cta.href} onClick={() => setOpen(false)} className={buttonStyles({ size: "lg", className: "mt-6" })}>
              {cta.label}
            </Link>
          </nav>
        </div>,
        document.body,
      )}
    </div>
  );
}
