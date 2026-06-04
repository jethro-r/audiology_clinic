import Badge from "@/components/Badge";
import Image from "next/image";

interface PageHeroProps {
  badge?: string;
  title: string;
  description?: string;
  image?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Standard page hero section for inner pages.
 * Uses bg-primary (forest green) with white text.
 *
 * Pattern: pt-12 pb-20 bg-primary
 * (pt-12 provides breathing room; sticky header doesn't block content on load)
 *
 * Optional: image prop adds a right-side image similar to homepage Hero
 */
export default function PageHero({
  badge,
  title,
  description,
  image,
  className = "",
  children,
}: PageHeroProps) {
  if (image) {
    // Layout with image on the right
    return (
      <section className={`pt-8 sm:pt-12 pb-14 sm:pb-20 bg-primary ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="animate-slide-in-left">
              {badge && (
              <Badge variant="outline-primary" className="mb-4">
                {badge}
              </Badge>
              )}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                {title}
              </h1>
              {description && (
                <p className="text-lg text-white/70">{description}</p>
              )}
              {children}
            </div>
            <div className="relative animate-slide-in-right" style={{ animationDelay: "200ms" }}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  fill
                  quality={90}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Default centered layout without image
  return (
    <section className={`pt-8 sm:pt-12 pb-14 sm:pb-20 bg-primary ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          {badge && (
          <Badge variant="outline-primary" className="mb-4">
            {badge}
          </Badge>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-white/70">{description}</p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
