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
  Clock,
  CheckCircle,
  LucideIcon,
} from "lucide-react";
import Button from "@/components/Button";
import { Service } from "@/lib/services";

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

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch(() => {});
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-card to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              Our Services
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Comprehensive Hearing Care Services
            </h1>
            <p className="text-lg text-muted">
              From diagnostic evaluations to advanced hearing solutions, we
              provide complete audiological care using the latest technology and
              evidence-based practices.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <Clock className="h-4 w-4" />
                        {service.duration}
                      </div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                      {service.title}
                    </h2>
                    <p className="text-muted mb-6">
                      {service.fullDescription}
                    </p>

                    {/* What's included */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-foreground mb-3">
                        What&apos;s Included:
                      </h3>
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {service.features.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-[var(--success)] flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-foreground">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link href="/contact">
                      <Button>
                        Schedule Appointment
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>

                  {/* Image placeholder */}
                  <div
                    className={`relative aspect-[4/3] bg-gradient-to-br from-primary/10 to-[var(--primary-light)]/10 rounded-2xl ${
                      index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <IconComponent className="w-24 h-24 text-primary/30" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-muted mb-8 max-w-2xl mx-auto">
              Our team is here to help. Contact us for a consultation and
              we&apos;ll recommend the best services for your specific hearing
              needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">Contact Us Today</Button>
              </Link>
              <Link href="tel:+6480055551">
                <Button variant="outline" size="lg">
                  Call 029 0451 0839
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
