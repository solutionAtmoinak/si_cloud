import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

export function Section({ className, children, ...props }: ComponentProps<"section">) {
  return (
    <section className={cn("py-14 md:py-20", className)} {...props}>
      <Container>{children}</Container>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  as?: "h1" | "h2";
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, as: Heading = "h2", align = "center" }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <p className="text-sm font-bold uppercase tracking-widest text-brand-700">{eyebrow}</p>}
      <Heading
        className={cn(
          "mt-2 font-extrabold text-ink-900",
          Heading === "h1"
            ? "text-[2rem] leading-10 md:text-5xl md:leading-[3.5rem]"
            : "text-[1.625rem] leading-[2.125rem] font-bold md:text-4xl md:leading-[3rem]",
        )}
      >
        {title}
      </Heading>
      {description && <p className="mt-4 text-ink-700">{description}</p>}
    </div>
  );
}
