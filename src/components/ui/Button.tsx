import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "link";
type Size = "sm" | "md" | "lg";

type StyleProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // brand-700 -> indigo-600 keeps white text above 4.5:1 contrast.
  primary:
    "bg-linear-to-r from-brand-700 to-indigo-600 text-white shadow-lg shadow-indigo-600/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-600/40",
  secondary: "glass text-ink-900 hover:-translate-y-0.5 hover:bg-white/85",
  ghost: "text-ink-900 hover:bg-white/60",
  link: "text-brand-700 underline-offset-4 hover:underline",
};

// min-h-11 = 44px touch target.
const sizes: Record<Size, string> = {
  sm: "min-h-11 px-4 text-sm",
  md: "min-h-11 px-5 text-base",
  lg: "min-h-12 px-7 text-base md:text-lg",
};

export function buttonStyles({ variant = "primary", size = "md", className }: StyleProps = {}): string {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = ComponentProps<"button"> & StyleProps;

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...props} />;
}

type ButtonLinkProps = ComponentProps<typeof Link> & StyleProps;

export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonStyles({ variant, size, className })} {...props} />;
}
