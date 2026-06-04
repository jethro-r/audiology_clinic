import Link from "next/link";
import {
  Ear,
  Headphones,
  Volume2,
  Shield,
  Wrench,
  ArrowRight,
  CheckCircle,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Button from "@/components/Button";
import AnimateInView from "@/components/AnimateInView";
import { type Service } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  Ear,
  Headphones,
  Volume2,
  Shield,
  Wrench,
};

export default function ServicesContent({ services }: { services: Service[] }) {
  return (
    <div className="space-y-16">
      {services.map((service, index) => {
        const IconComponent = iconMap[service.iconName] || Ear;

        return (
          <AnimateInView key={service.id}>
            <div
              id={service.slug}
              className={`grid lg:grid-cols-2 gap-6 lg:gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {service.title}
                </h2>
                <div
                  className="rich-text text-muted mb-6"
                  dangerouslySetInnerHTML={{ __html: service.fullDescription }}
                />

                {service.idealFor && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-1">
                      Ideal if:
                    </h3>
                    <p className="text-muted text-sm">
                      {service.idealFor}
                    </p>
                  </div>
                )}

                {service.features && service.features.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-3">
                      Includes:
                    </h3>
                    <ul className="space-y-2">
                      {service.features.map((item) => {
                        const tooltip = service.featureTooltips?.[item];
                        return (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span
                              className={tooltip ? "text-primary border-b border-dotted border-muted cursor-help" : "text-primary"}
                              title={tooltip || ""}
                            >
                              {item}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {service.note && (
                  <div className="mb-6 text-sm text-muted">
                    {service.note}
                  </div>
                )}

                <Link href="/booking">
                  <Button>
                    {service.buttonText || "Book Assessment"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Image */}
              <div
                className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${
                  index % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                ) : (
                  <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                    <IconComponent className="w-24 h-24 text-primary/30" />
                  </div>
                )}
              </div>
            </div>
          </AnimateInView>
        );
      })}
    </div>
  );
}
