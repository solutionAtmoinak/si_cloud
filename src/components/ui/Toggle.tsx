"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type ToggleOption<T extends string> = {
  value: T;
  label: string;
};

type ToggleProps<T extends string> = {
  label: string;
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

// Segmented control built on native radios, so arrow-key navigation works without extra code.
export function Toggle<T extends string>({ label, options, value, onChange, className }: ToggleProps<T>) {
  const name = useId();

  return (
    <div role="radiogroup" aria-label={label} className={cn("glass inline-flex rounded-full p-1", className)}>
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            "relative inline-flex min-h-11 cursor-pointer items-center rounded-full px-6 text-sm font-semibold transition-all duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-700",
            option.value === value
              ? "bg-linear-to-r from-brand-700 to-indigo-600 text-white shadow-md shadow-indigo-600/30"
              : "text-ink-700 hover:text-ink-900",
          )}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={option.value === value}
            onChange={() => onChange(option.value)}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}
