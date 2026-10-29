"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export type AccordionItem = {
  question: string;
  answer: string;
};

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div key={item.question} className={cn("overflow-hidden rounded-2xl transition-shadow duration-200", isOpen ? "glass-strong" : "glass")}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-700"
              >
                {item.question}
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-lg leading-none text-brand-700 transition-transform duration-200",
                    isOpen && "rotate-45",
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            {/* Answers stay in the server HTML (hidden, not unmounted) so crawlers still see them. */}
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen} className="px-5 pb-5 text-base text-ink-700">
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
