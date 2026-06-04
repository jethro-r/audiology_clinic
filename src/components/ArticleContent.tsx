import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Badge from "@/components/Badge";
import { type Article } from "@/lib/data";

function formatDate(date: Date | string | null | undefined) {
  if (!date) return null;
  return new Date(date).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function ArticleContent({ article }: { article: Article }) {
  return (
    <>
      {/* Back link */}
      <Link
        href="/resources"
        className="inline-flex items-center gap-2 text-muted hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Resources
      </Link>

      <article className="animate-fade-in">
        {/* Meta information */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted">
          {article.publishedAt && (
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(article.publishedAt)}
            </span>
          )}
          {article.author && (
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {article.author}
            </span>
          )}
          {article.categories.map((cat) => (
            <Badge key={cat} variant="primary">{cat}</Badge>
          ))}
        </div>

        {/* Featured image */}
        {article.imageUrl && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              quality={90}
              className="object-cover"
            />
          </div>
        )}

        {/* Article content */}
        <div className="prose prose-lg max-w-none">
          {article.content ? (
            <div
              className="rich-text text-foreground/90 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          ) : (
            <p className="text-muted italic">
              Full article content coming soon.
            </p>
          )}
        </div>
      </article>

      {/* Back to resources CTA */}
      <div className="mt-12 pt-8 border-t border-border">
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Resources
        </Link>
      </div>
    </>
  );
}
