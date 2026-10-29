import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type CardProps = ComponentProps<"div"> & { highlighted?: boolean };

export function Card({ highlighted = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6",
        highlighted ? "glass-strong ring-2 ring-indigo-500/70" : "glass",
        className,
      )}
      {...props}
    />
  );
}
