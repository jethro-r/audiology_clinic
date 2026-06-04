import { getArticlesDirect } from "@/lib/data";
import { PageHero, Section } from "@/components/sections";
import ResourcesContent from "@/components/ResourcesContent";

export const revalidate = 3600;

export default async function ResourcesPage() {
  const articles = await getArticlesDirect();

  return (
    <>
      <PageHero
        badge="Patient Resources"
        title="Resources & Information"
        description="Everything you need to know about your visit, insurance, and hearing health. We're here to make your experience as smooth as possible."
      />
      <Section variant="white">
        <ResourcesContent articles={articles} />
      </Section>
    </>
  );
}
