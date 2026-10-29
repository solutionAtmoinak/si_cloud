import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "brand" | "success" | "amber";

const variants: Record<Variant, string> = {
  default: "glass text-ink-700",
  brand: "border border-brand-700/20 bg-brand-50/80 text-brand-700 backdrop-blur",
  success: "border border-green-700/20 bg-green-50/80 text-green-800 backdrop-blur",
  // ink-900 on amber keeps AA contrast; white on amber would not.
  amber: "bg-accent-amber text-ink-900 shadow-md shadow-amber-500/30",
};

type BadgeProps = ComponentProps<"span"> & { variant?: Variant };

export function Badge({ variant = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold", variants[variant], className)}
      {...props}
    />
  );
}
