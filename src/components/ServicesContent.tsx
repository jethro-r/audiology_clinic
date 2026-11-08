import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import { type Service } from "@/lib/data";

/**
 * /services index — one card per service, built from each service's short
 * description. Services whose individual page is live link through to it;
 * drafts (or services without a page) show as plain cards with a booking
 * link. Cards keep their slug anchor because the homepage service cards
 * link to /services#slug.
 */
export default function ServicesContent({ services }: { services: Service[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <ServiceCard
          key={service.id}
          id={service.slug}
          index={index}
          title={service.title}
          description={service.shortDescription}
          iconName={service.iconName}
          image={service.image || undefined}
          footer={
            <>
              {service.isLive && (
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center text-primary font-medium hover:gap-2 transition-all duration-200"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                </Link>
              )}
              <Link
                href="/booking"
                className="inline-flex items-center text-muted font-medium hover:text-primary transition-colors"
              >
                Book assessment
              </Link>
            </>
          }
        />
      ))}
    </div>
  );
}
