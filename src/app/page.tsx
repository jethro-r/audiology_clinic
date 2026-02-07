"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Shield,
  Clock,
  Award,
  ChevronDown,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import Button from "@/components/Button";
import { Section, SectionHeader, CTASection } from "@/components/sections";
import { useState, useEffect } from "react";
import { type Service } from "@/lib/data";

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
    async function fetchServices() {
      try {
        const res = await fetch('/api/services?homepage=true');
        if (res.ok) {
          const data = await res.json();
          setServices(data);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    }
    fetchServices();
  }, []);

  return (
    <>
      <Hero />

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

      {/* My Promise Section */}
      <Section variant="primary" className="border-y border-white/10">
        <SectionHeader
          title="Our Promise"
          variant="dark"
        />
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-white/10 flex items-center justify-center">
              <Shield className="w-7 h-7 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Independent Guidance
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Advice you can trust — we work for your hearing, not brands.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-white/10 flex items-center justify-center">
              <Award className="w-7 h-7 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Evidence-Based Advice
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Understand your hearing clearly with objective testing and honest recommendations.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-white/10 flex items-center justify-center">
              <Clock className="w-7 h-7 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Ongoing Premium Care
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
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
