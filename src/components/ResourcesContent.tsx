import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Badge from "@/components/Badge";
import AnimateInView from "@/components/AnimateInView";
import { type Article } from "@/lib/data";

export default function ResourcesContent({ articles }: { articles: Article[] }) {
  return (
    <div className="grid gap-4 sm:gap-6">
      {articles.map((article, index) => (
        <Link
          key={article.slug}
          href={`/resources/articles/${article.slug}`}
          className="block group"
        >
          <AnimateInView delay={index * 100}>
            <article className="bg-card rounded-xl p-5 sm:p-6 hover:shadow-md transition-all group-hover:shadow-lg">
              <div className="flex flex-wrap gap-1 mb-3">
                {article.categories.map((cat) => (
                  <Badge key={cat} variant="primary">{cat}</Badge>
                ))}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-secondary transition-colors">
                {article.title}
              </h3>
              <p className="text-muted mb-3">{article.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-sm text-secondary font-medium">
                Read more <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </article>
          </AnimateInView>
        </Link>
      ))}
    </div>
  );
}
