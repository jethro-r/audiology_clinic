"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Ear,
  Headphones,
  Volume2,
  Shield,
  Baby,
  Wrench,
  ArrowRight,
  Clock,
  CheckCircle,
} from "lucide-react";
import Button from "@/components/Button";

const services = [
  {
    id: "evaluations",
    title: "Comprehensive Hearing Evaluations",
    description:
      "Our thorough hearing evaluations provide a complete picture of your hearing health. Using state-of-the-art diagnostic equipment, we assess your ability to hear sounds at different pitches and volumes.",
    icon: Ear,
    duration: "60-90 minutes",
    includes: [
      "Complete medical history review",
      "Otoscopic examination",
      "Pure-tone audiometry",
      "Speech recognition testing",
      "Tympanometry",
      "Detailed results explanation",
    ],
  },
  {
    id: "hearing-aids",
    title: "Hearing Aid Fitting & Programming",
    description:
      "We offer the latest hearing aid technology from leading manufacturers. Our audiologists work with you to find the perfect solution based on your hearing needs, lifestyle, and budget.",
    icon: Headphones,
    duration: "60-90 minutes",
    includes: [
      "Personalized hearing aid selection",
      "Custom fitting and programming",
      "Real-ear measurements",
      "Communication strategies training",
      "30-day trial period",
      "Follow-up adjustments included",
    ],
  },
  {
    id: "tinnitus",
    title: "Tinnitus Management",
    description:
      "Tinnitus affects millions of people. Our comprehensive tinnitus management program helps you find relief through proven strategies and the latest treatment options.",
    icon: Volume2,
    duration: "45-60 minutes",
    includes: [
      "Comprehensive tinnitus evaluation",
      "Sound therapy options",
      "Cognitive behavioral strategies",
      "Hearing aid tinnitus features",
      "Relaxation techniques",
      "Ongoing support and counseling",
    ],
  },
  {
    id: "ear-protection",
    title: "Custom Ear Protection",
    description:
      "Protect your hearing with custom-molded ear protection designed for your specific needs. Ideal for musicians, hunters, swimmers, and industrial workers.",
    icon: Shield,
    duration: "30-45 minutes",
    includes: [
      "Custom ear impressions",
      "Musician earplugs",
      "Hunter/shooter protection",
      "Swim molds",
      "Industrial protection",
      "Sleep plugs",
    ],
  },
  {
    id: "pediatric",
    title: "Pediatric Audiology",
    description:
      "Early detection of hearing loss is crucial for speech and language development. Our pediatric services are designed to make testing comfortable and fun for children of all ages.",
    icon: Baby,
    duration: "45-60 minutes",
    includes: [
      "Age-appropriate testing methods",
      "Play audiometry",
      "School hearing screenings",
      "Hearing aid fittings for children",
      "Parent education and support",
      "Coordination with schools and specialists",
    ],
  },
  {
    id: "repairs",
    title: "Hearing Aid Repair & Maintenance",
    description:
      "Keep your hearing aids working at their best with our repair and maintenance services. We service all major brands and models.",
    icon: Wrench,
    duration: "15-30 minutes",
    includes: [
      "Cleaning and maintenance",
      "Minor repairs (same day)",
      "Major repairs (manufacturer)",
      "Reprogramming services",
      "Battery sales",
      "Accessories and supplies",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[var(--card)] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block bg-[var(--primary)]/10 text-[var(--primary)] px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              Our Services
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] mb-6">
              Comprehensive Hearing Care Services
            </h1>
            <p className="text-lg text-[var(--muted)]">
              From diagnostic evaluations to advanced hearing solutions, we
              provide complete audiological care using the latest technology and
              evidence-based practices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
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
                    <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center">
                      <service.icon className="h-6 w-6 text-[var(--primary)]" />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                      <Clock className="h-4 w-4" />
                      {service.duration}
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-4">
                    {service.title}
                  </h2>
                  <p className="text-[var(--muted)] mb-6">
                    {service.description}
                  </p>

                  {/* What's included */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-[var(--foreground)] mb-3">
                      What&apos;s Included:
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {service.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-[var(--success)] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[var(--foreground)]">
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
                  className={`relative aspect-[4/3] bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary-light)]/10 rounded-2xl ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <service.icon className="w-24 h-24 text-[var(--primary)]/30" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[var(--card)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-[var(--muted)] mb-8 max-w-2xl mx-auto">
              Our team is here to help. Contact us for a consultation and
              we&apos;ll recommend the best services for your specific hearing
              needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">Contact Us Today</Button>
              </Link>
              <Link href="tel:+15551234567">
                <Button variant="outline" size="lg">
                  Call (555) 123-4567
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
