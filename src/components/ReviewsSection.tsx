import { Star, ArrowUpRight, Quote } from "lucide-react";
import { Section, SectionHeader } from "@/components/sections";
import AnimateInView from "@/components/AnimateInView";
import { reviews, googleReviewsUrl } from "@/lib/reviewsData";

/**
 * Homepage Google reviews section. Content comes from `src/lib/reviewsData.ts`
 * (real, consented Google reviews — see that file before changing copy).
 *
 * Deliberately no Review/AggregateRating JSON-LD: Google ignores self-serving
 * LocalBusiness review markup for star rich results, so the visible content
 * carries the conversion/AIEO value instead.
 */
function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-secondary text-secondary" : "text-border"
          }`}
        />
      ))}
    </div>
  );
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return parts.map((p) => p[0]).join("").toUpperCase();
}

export default function ReviewsSection() {
  return (
    <Section variant="cream" id="reviews">
      <SectionHeader
        label="Testimonials"
        title="What Our Patients Say"
        description="Real reviews from our patients on Google."
      />
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <AnimateInView
            key={review.author + review.date}
            delay={(index % 3) * 100}
          >
            <figure className="h-full flex flex-col bg-card rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <Stars rating={review.rating} />
                <Quote className="h-5 w-5 text-secondary/40" />
              </div>
              <blockquote className="text-muted text-sm leading-relaxed flex-1">
                {review.text}
              </blockquote>
              <figcaption className="flex items-center gap-3 mt-5 pt-4 border-t border-border">
                <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary flex-shrink-0">
                  {initials(review.author)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">
                    {review.author}
                  </span>
                  <span className="block text-xs text-muted">
                    Google review · {review.date}
                  </span>
                </span>
              </figcaption>
            </figure>
          </AnimateInView>
        ))}

        {/* Read-more card — completes the grid and funnels to Google */}
        <AnimateInView delay={200}>
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-full flex flex-col items-start justify-center bg-primary rounded-2xl p-6 border border-primary shadow-sm group"
          >
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-secondary text-secondary"
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-white">
              Read all our reviews on Google
            </span>
            <span className="inline-flex items-center gap-1.5 mt-2 text-sm text-white/70 group-hover:text-secondary transition-colors">
              See the full list on Google Maps
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        </AnimateInView>
      </div>
    </Section>
  );
}
