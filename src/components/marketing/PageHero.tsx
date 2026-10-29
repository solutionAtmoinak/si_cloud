import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Section";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

// The only h1 on inner pages.
export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="pb-6 pt-14 md:pb-10 md:pt-20">
      <Container>
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={description} />
      </Container>
    </section>
  );
}
