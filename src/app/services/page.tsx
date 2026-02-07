"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import Button from "@/components/Button";
import { type Service } from "@/lib/data";
import { PageHero, Section, CTASection } from "@/components/sections";

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, LucideIcon> = {
  Ear,
  Headphones,
  Volume2,
  Shield,
  Wrench,
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch('/api/services');
        if (res.ok) {
          const data = await res.json();
          setServices(data);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  return (
    <>
      <PageHero
        badge="Our Services"
        title="Comprehensive Hearing Care Services"
        description="From diagnostic evaluations to advanced hearing solutions, we provide complete audiological care using the latest technology and evidence-based practices."
      />

      <Section variant="white">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
        <div className="space-y-16">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Ear;

            return (
              <motion.div
                key={service.id}
                id={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-muted mb-6">
                    {service.fullDescription}
                  </p>

                  {/* Ideal if */}
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

                  {/* What's included */}
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

                  {/* Note */}
                  {service.note && (
                    <div className="mb-6 text-sm text-muted">
                      {service.note}
                    </div>
                  )}

                  {/* Button */}
                  <Link href="/contact">
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
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                      <IconComponent className="w-24 h-24 text-primary/30" />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
        )}
      </Section>

      <CTASection
        title="Not sure which service you need?"
        description="We can help you find the right option."
        primaryButton={{
          text: "Book Assessment",
          href: "/contact",
        }}
        variant="primary"
      />
    </>
  );
}
