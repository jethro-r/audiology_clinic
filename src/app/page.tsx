"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Shield,
  Users,
  Clock,
  Award,
  ChevronDown,
  ArrowRight,
  Quote,
} from "lucide-react";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import Button from "@/components/Button";
import { useState, useEffect } from "react";
import { Service } from "@/lib/services";

const stats = [
  { value: "100%", label: "Independent", icon: Shield },
  { value: "Diagnostics", label: "Evidence-Based", icon: Clock },
  { value: "Ongoing", label: "Premium Care", icon: Users },
];

const faqs = [
  {
    question: "What should I expect at my first appointment?",
    answer:
      "Your first visit includes a comprehensive hearing assessment, discussion of your concerns, and clear guidance on suitable solutions tailored to your needs.",
  },
  {
    question: "How do I know if I need a hearing test?",
    answer:
      "If you notice difficulty following conversations, frequently ask people to repeat themselves, or struggle in noisy environments, a hearing test can provide clarity and peace of mind.",
  },
  {
    question: "Why choose an independent audiologist?",
    answer:
      "As an independent clinic, we provide unbiased advice and recommendations, focusing solely on your hearing needs rather than promoting specific brands or products.",
  },
  {
    question: "What type of hearing aids do you offer?",
    answer:
      "We offer a range of hearing aids across essential, standard, and premium tiers, chosen to suit your lifestyle, preferences, and hearing requirements.",
  },
  {
    question: "How much do hearing aids cost?",
    answer:
      "Hearing aid costs vary by technology and package. We provide clear, tiered options with transparent pricing to help you make informed decisions.",
  },
  {
    question: "Is there a trial period for hearing aids?",
    answer:
      "Yes. We offer a trial period so you can experience your hearing aids in real-life situations before making a final decision.",
  },
  {
    question: "How often should I have a hearing check?",
    answer:
      "Regular hearing checks are recommended at least once a year, or sooner if you notice changes, to ensure your hearing remains optimised.",
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch("/api/services?homepage=true")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch(() => {});
  }, []);

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Services Overview */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary font-medium">Our Services</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4">
              Comprehensive Hearing Care
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              From diagnostic evaluations to advanced hearing solutions, we
              provide complete audiological care to help you hear your best.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.shortDescription}
                iconName={service.iconName}
                href={`/services#${service.slug}`}
                duration={service.duration}
                index={index}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link href="/services">
              <Button variant="outline">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center text-white"
              >
                <stat.icon className="h-10 w-10 mx-auto mb-3 opacity-80" />
                <div className="text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* My Promise Section */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4">
              Our Promise

            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-sm border border-border"
            >
              <Quote className="h-10 w-10 text-primary/20 mb-4" />
              <p className="text-foreground mb-4 font-medium">
                Independent Guidance
              </p>
              <p className="text-muted text-sm">
                Advice you can trust — we work for your hearing, not brands.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-sm border border-border"
            >
              <Quote className="h-10 w-10 text-primary/20 mb-4" />
              <p className="text-foreground mb-4 font-medium">
               Clear, Evidence-Based Advice
              </p>
              <p className="text-muted text-sm">
                Understand your hearing clearly with objective testing and honest recommendations.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-sm border border-border"
            >
              <Quote className="h-10 w-10 text-primary/20 mb-4" />
              <p className="text-foreground mb-4 font-medium">
                Ongoing Premium Care
              </p>
              <p className="text-muted text-sm">
                Long-term follow-up and fine-tuning to keep your hearing at its best.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary font-medium">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted">
              Find answers to common questions about our services and what to
              expect.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="border border-border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-card transition-colors"
                >
                  <span className="font-medium text-foreground">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-muted transition-transform duration-200 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4 text-muted">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-primary-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Start your hearing journey with confidence
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Independent guidance and professional support help you make decisions that truly suit your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Schedule Appointment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services#hearing-aid-solutions">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary"
                >
                  Explore Hearing Aid Packages
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
