import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Page not found | CloudVault",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Container className="py-24 text-center md:py-32">
      <SectionHeading
        as="h1"
        eyebrow="Error 404"
        title="Page not found"
        description="The page you are looking for does not exist or has moved."
      />
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink href="/" size="lg">
          Go to home
        </ButtonLink>
        <ButtonLink href="/pricing" size="lg" variant="secondary">
          See pricing
        </ButtonLink>
        <ButtonLink href="/contact" size="lg" variant="secondary">
          Contact us
        </ButtonLink>
      </div>
    </Container>
  );
}
