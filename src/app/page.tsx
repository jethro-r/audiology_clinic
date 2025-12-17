"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Ear,
  Headphones,
  Volume2,
  Shield,
  Users,
  Clock,
  Award,
  Heart,
  ChevronDown,
  ArrowRight,
  Quote,
} from "lucide-react";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import Button from "@/components/Button";
import { useState } from "react";

const services = [
  {
    title: "Hearing Evaluations",
    description:
      "Comprehensive diagnostic testing to assess your hearing health and identify any issues.",
    icon: Ear,
    href: "/services#evaluations",
    duration: "60-90 minutes",
  },
  {
    title: "Hearing Aid Fitting",
    description:
      "Expert fitting and programming of hearing aids tailored to your specific hearing needs.",
    icon: Headphones,
    href: "/services#hearing-aids",
    duration: "60-90 minutes",
  },
  {
    title: "Tinnitus Management",
    description:
      "Effective strategies and treatments to help manage and reduce tinnitus symptoms.",
    icon: Volume2,
    href: "/services#tinnitus",
    duration: "45-60 minutes",
  },
  {
    title: "Custom Ear Protection",
    description:
      "Custom-molded ear protection for musicians, hunters, swimmers, and industrial workers.",
    icon: Shield,
    href: "/services#ear-protection",
    duration: "30-45 minutes",
  },
];

const stats = [
  { value: "100%", label: "Independent", icon: Shield },
  { value: "60min", label: "Appointments", icon: Clock },
  { value: "Direct", label: "Audiologist Access", icon: Users },
  { value: "NZ", label: "Qualified", icon: Award },
];

const testimonials: { name: string; quote: string; rating: number }[] = [
  // Testimonials will be added as we receive genuine patient feedback
];

const faqs = [
  {
    question: "What should I expect at my first appointment?",
    answer:
      "Your first visit includes a comprehensive hearing assessment, discussion of your concerns and lifestyle, and clear explanation of results. Allow about 60 minutes. There's no obligation to purchase anything—the goal is to understand your hearing health.",
  },
  {
    question: "Do you accept ACC?",
    answer:
      "Yes, I'm a registered ACC provider. If your hearing loss is related to noise exposure at work or an accident, you may be eligible for funded hearing aids and services. I can help you navigate this process.",
  },
  {
    question: "Why choose an independent audiologist?",
    answer:
      "Independent audiologists like me have no sales targets or corporate quotas. I can recommend any brand that suits you best, or honestly tell you if you don't need hearing aids. My only focus is what's right for your hearing.",
  },
  {
    question: "How much do hearing aids cost?",
    answer:
      "Hearing aids range from around $2,500 to $10,000+ per pair depending on technology level. I'll always discuss your budget upfront and recommend options that match both your hearing needs and financial situation. There's no pressure to choose premium options.",
  },
  {
    question: "I'm not sure if I need a hearing test. What are the signs?",
    answer:
      "Common signs include asking people to repeat themselves, turning up the TV louder than others prefer, difficulty hearing in noisy places, or feeling like people mumble. If you're unsure, a hearing test can give you clarity—there's no harm in checking.",
  },
  {
    question: "What types of hearing aids do you offer?",
    answer:
      "I work with multiple leading manufacturers and can fit a wide range of styles—from discreet in-ear devices to powerful behind-the-ear options. I'll recommend what's best for your specific hearing loss, not what has the highest margin.",
  },
  {
    question: "Is there a trial period for hearing aids?",
    answer:
      "Yes, I offer a trial period so you can experience how hearing aids work in your daily life before committing. I want you to be completely satisfied with your decision.",
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
            <span className="text-[var(--primary)] font-medium">Our Services</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mt-2 mb-4">
              Comprehensive Hearing Care
            </h2>
            <p className="text-[var(--muted)] max-w-2xl mx-auto">
              From diagnostic evaluations to advanced hearing solutions, we
              provide complete audiological care to help you hear your best.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service.title} {...service} index={index} />
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
      <section className="py-16 bg-[var(--primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
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
      <section className="py-16 lg:py-24 bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[var(--primary)] font-medium">
              My Promise
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mt-2 mb-4">
              What You Can Expect
            </h2>
            <p className="text-[var(--muted)] max-w-2xl mx-auto">
              As a new independent practice, I'm building my reputation on
              honest, quality care. Here's my commitment to you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-sm border border-[var(--border)]"
            >
              <Quote className="h-10 w-10 text-[var(--primary)]/20 mb-4" />
              <p className="text-[var(--foreground)] mb-4 font-medium">
                No Pressure Sales
              </p>
              <p className="text-[var(--muted)] text-sm">
                I'll never push you toward products you don't need. If hearing aids
                aren't necessary, I'll tell you honestly.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-sm border border-[var(--border)]"
            >
              <Quote className="h-10 w-10 text-[var(--primary)]/20 mb-4" />
              <p className="text-[var(--foreground)] mb-4 font-medium">
                Clear Explanations
              </p>
              <p className="text-[var(--muted)] text-sm">
                I'll explain your results in plain language and make sure you
                understand all your options before making any decisions.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-sm border border-[var(--border)]"
            >
              <Quote className="h-10 w-10 text-[var(--primary)]/20 mb-4" />
              <p className="text-[var(--foreground)] mb-4 font-medium">
                Ongoing Support
              </p>
              <p className="text-[var(--muted)] text-sm">
                Your care doesn't end when you leave. I'm here for adjustments,
                questions, and support whenever you need it.
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
            <span className="text-[var(--primary)] font-medium">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mt-2 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-[var(--muted)]">
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
                className="border border-[var(--border)] rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-[var(--card)] transition-colors"
                >
                  <span className="font-medium text-[var(--foreground)]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-[var(--muted)] transition-transform duration-200 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4 text-[var(--muted)]">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Take the First Step?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Whether you're concerned about your hearing or just want a baseline
              check, I'm here to help. No pressure, no obligation—just honest
              answers about your hearing health.
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
              <Link href="tel:+6478389888">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-[var(--primary)]"
                >
                  Call 0800 555 051
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
