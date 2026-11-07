import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimateInView from "@/components/AnimateInView";
import { getLandingIcon } from "@/components/services/landingIcon";
import { type Service } from "@/lib/data";

/**
 * /services index — one card per service, built from each service's short
 * description. Services whose individual page is live link through to it;
 * drafts (or services without a page) show as plain cards.
 *
 * Each card keeps an id anchor ({slug}) because the homepage service cards
 * link to /services#slug.
 */
export default function ServicesContent({ services }: { services: Service[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => {
        const IconComponent = getLandingIcon(service.iconName);

        return (
          <AnimateInView key={service.id} delay={(index % 3) * 100} className="h-full">
            <article
              id={service.slug}
              className="bg-white border border-border rounded-xl p-6 h-full flex flex-col scroll-mt-24"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <IconComponent className="w-6 h-6" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">{service.title}</h2>
              <p className="text-muted mb-6">{service.shortDescription}</p>

              <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2">
                {service.isLive && (
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-primary font-medium inline-flex items-center gap-1.5 hover:text-primary-dark transition-colors"
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                )}
                <Link
                  href="/booking"
                  className="text-muted font-medium inline-flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  Book assessment
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          </AnimateInView>
        );
      })}
    </div>
  );
}
