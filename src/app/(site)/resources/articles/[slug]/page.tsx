import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getArticleBySlugDirect } from "@/lib/data";
import { PageHero, Section } from "@/components/sections";
import ArticleContent from "@/components/ArticleContent";
import ArticleSchema from "@/components/schema/ArticleSchema";
import FaqSchema from "@/components/schema/FaqSchema";
import { extractArticleFaqs } from "@/lib/articleFaqs";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlugDirect(slug);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/resources/articles/${article.slug}` },
    openGraph: {
      type: "article",
      url: `/resources/articles/${article.slug}`,
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt?.toISOString(),
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlugDirect(slug);

  if (!article) {
    notFound();
  }

  // FAQ sections live inside the article rich text — emit FAQPage markup
  // automatically when one is present.
  const faqs = extractArticleFaqs(article.content);

  return (
    <>
      <ArticleSchema article={article} />
      {faqs.length > 0 && <FaqSchema faqs={faqs} />}
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
