"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";
import Badge from "@/components/Badge";
import { PageHero, Section } from "@/components/sections";
import { type Article } from "@/lib/data";

export default function ArticlePage() {
  const params = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`/api/articles/${params.slug}`);
        if (res.ok) {
          const data = await res.json();
          setArticle(data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    
    if (params.slug) {
      fetchArticle();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <Section variant="white">
        <div className="text-center py-24">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Section>
    );
  }

  if (error || !article) {
    return (
      <Section variant="white">
        <div className="text-center py-24">
          <h1 className="text-2xl font-semibold mb-4">Article Not Found</h1>
          <p className="text-muted mb-6">The article you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link 
            href="/resources" 
            className="text-secondary hover:text-secondary/80 font-medium"
          >
            ← Back to Resources
          </Link>
        </div>
      </Section>
    );
  }

  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <PageHero
        badge={article.categories[0]}
        title={article.title}
        description={article.excerpt}
      />
      
      <Section variant="white">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link 
            href="/resources"
            className="inline-flex items-center gap-2 text-muted hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Resources
          </Link>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
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
                  className="object-cover"
                />
              </div>
            )}

            {/* Article content */}
            <div className="prose prose-lg max-w-none">
              {article.content ? (
                <div
                  className="rich-text text-foreground/90 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}
                />
              ) : (
                <p className="text-muted italic">
                  Full article content coming soon.
                </p>
              )}
            </div>
          </motion.article>

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
        </div>
      </Section>
    </>
  );
}
