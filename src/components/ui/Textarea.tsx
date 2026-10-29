import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { fieldStyles } from "./Input";

export function Textarea({
  invalid = false,
  className,
  ...props
}: ComponentProps<"textarea"> & { invalid?: boolean }) {
  return (
    <textarea
      aria-invalid={invalid || undefined}
      className={cn(fieldStyles, "min-h-32", invalid ? "border-danger-600" : "border-white/80", className)}
      {...props}
    />
  );
}
