import JsonLd from "./JsonLd";
import { SITE_URL } from "@/lib/site";
import type { Article } from "@/lib/data";

// Article markup for blog posts.
export default function ArticleSchema({ article }: { article: Article }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.excerpt,
        ...(article.imageUrl ? { image: article.imageUrl } : {}),
        ...(article.publishedAt
          ? { datePublished: article.publishedAt.toISOString() }
          : {}),
        author: {
          "@type": "Person",
          name: article.author ?? "Veritas Hearing",
        },
        publisher: {
          "@type": "Organization",
          name: "Veritas Hearing",
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/frontend/icon.png`,
          },
        },
        mainEntityOfPage: `${SITE_URL}/resources/articles/${article.slug}`,
      }}
    />
  );
}
