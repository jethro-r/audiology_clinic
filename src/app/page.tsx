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
  CheckCircle,
} from "lucide-react";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import Button from "@/components/Button";
import { Section, SectionHeader, CTASection } from "@/components/sections";
import { useState } from "react";
import { getServices, type Service } from "@/lib/static-data";

const stats = [
  { value: "100%", label: "Independent", icon: Shield },
  { value: "Evidence-Based", label: "Diagnostics", icon: Clock },
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
  const services = getServices({ homepage: true });

  return (
    <>
      <Hero />

      {/* Value Proposition / Care Pathways Section */}
      <Section variant="cream">
        <SectionHeader
          label="Our Care Philosophy"
          title="Full Care at Every Visit"
          description="At Veritas Hearing, every client receives full, professional-standard care, whether you purchased your hearing aids here or elsewhere."
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-muted max-w-3xl mx-auto">
            Choose the pathway that suits your needs:
          </p>
        </motion.div>

        {/* Care Pathways Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Essential Care */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-border relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--secondary)]/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative">
              <div className="w-14 h-14 bg-[var(--secondary)]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Essential Care
              </h3>
              <p className="text-muted mb-6">
                Premium, professional care with one annual review and optional discounted maintenance services.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Precise diagnostics and assessment",
                  "Expert hearing aid fitting",
                  "Thorough verification and tuning",
                  "One annual review included",
                  "Optional discounted maintenance"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-primary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Ongoing Care */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-sm border-2 border-[var(--secondary)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--secondary)]/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute top-4 right-4">
              <span className="bg-[var(--secondary)] text-white text-xs font-semibold px-3 py-1 rounded-full">
                RECOMMENDED
              </span>
            </div>
            <div className="relative">
              <div className="w-14 h-14 bg-[var(--secondary)]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Ongoing Care
              </h3>
              <p className="text-muted mb-6">
                Unlimited annual reviews, scheduled maintenance, priority support, and LACE AI hearing training for continuous optimisation.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Everything in Essential Care",
                  "Unlimited annual reviews",
                  "Scheduled maintenance included",
                  "Priority booking and support",
                  "LACE AI hearing training"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-primary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-muted max-w-3xl mx-auto mb-8">
            Every visit ensures personalised attention, expert fitting, and thorough verification — because your hearing health deserves nothing less.
          </p>
          <Link href="/packages">
            <Button variant="outline" size="lg" className="border-[var(--secondary)] text-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white">
              Explore Care Packages
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </Section>

      {/* Services Overview */}
      <Section variant="white">
        <SectionHeader
          label="Our Services"
          title="Comprehensive Hearing Care"
          description="From diagnostic evaluations to advanced hearing solutions, we provide complete audiological care to help you hear your best."
        />
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
      </Section>

      {/* Stats Section */}
      <Section variant="primary" className="py-16">
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
      </Section>

      {/* My Promise Section */}
      <Section variant="cream">
        <SectionHeader
          title="Our Promise"
        />
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 shadow-sm border border-border"
          >

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
           
            <p className="text-foreground mb-4 font-medium">
              Ongoing Premium Care
            </p>
            <p className="text-muted text-sm">
              Long-term follow-up and fine-tuning to keep your hearing at its best.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section variant="white" containerClassName="max-w-3xl">
        <SectionHeader
          label=""
          title="Frequently Asked Questions"
          description="Find answers to common questions about our services and what to expect."
        />
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
      </Section>

      <CTASection
        title="Start your hearing journey with confidence"
        description="Independent guidance and professional support help you make decisions that truly suit your needs."
        primaryButton={{
          text: "Book Assessment",
          href: "/contact",
        }}
        variant="primary"
      />
    </>
  );
}
