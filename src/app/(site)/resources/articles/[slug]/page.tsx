import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getArticleBySlugDirect } from "@/lib/data";
import { PageHero, Section } from "@/components/sections";
import ArticleContent from "@/components/ArticleContent";

export const revalidate = 3600;

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlugDirect(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <PageHero
        badge={article.categories[0]}
        title={article.title}
        description={article.excerpt}
      />

      <Section variant="white">
        <div className="max-w-3xl mx-auto">
          <ArticleContent article={article} />
        </div>
      </Section>
    </>
  );
}
