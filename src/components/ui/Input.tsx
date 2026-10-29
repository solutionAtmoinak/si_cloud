import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const fieldStyles =
  "block w-full rounded-xl border bg-white/70 px-3.5 py-2.5 text-base text-ink-900 backdrop-blur placeholder:text-ink-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 disabled:opacity-50";

type FieldProps = { invalid?: boolean };

// Pair every field with a visible <Label htmlFor>; link error text via aria-describedby.
export function Input({ invalid = false, className, ...props }: ComponentProps<"input"> & FieldProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(fieldStyles, "min-h-11", invalid ? "border-danger-600" : "border-white/80", className)}
      {...props}
    />
  );
}
