"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  Download,
  ChevronDown,
  BookOpen,
  HelpCircle,
  CreditCard,
  Calendar,
} from "lucide-react";
import Button from "@/components/Button";
import { useState } from "react";

const firstVisitInfo = [
  {
    title: "Before Your Appointment",
    items: [
      "Bring your insurance card and photo ID",
      "Make a list of your medications",
      "Note any specific hearing concerns",
      "Bring a family member if possible (helpful for communication assessment)",
      "Arrive 15 minutes early to complete paperwork",
    ],
  },
  {
    title: "During Your Appointment",
    items: [
      "We'll review your medical and hearing history",
      "You'll receive a comprehensive hearing evaluation",
      "Tests are painless and take about 60-90 minutes",
      "Results are explained immediately after testing",
      "We'll discuss treatment options if needed",
    ],
  },
  {
    title: "After Your Appointment",
    items: [
      "You'll receive a copy of your test results",
      "We'll provide a treatment plan if applicable",
      "Schedule any follow-up appointments needed",
      "Contact us with any questions that arise",
    ],
  },
];

const insuranceInfo = {
  accepted: [
    "ACC (Accident Compensation Corporation)",
    "Southern Cross Health Insurance",
    "NIB New Zealand",
    "UniMed",
    "Partners Life",
    "AIA Health Insurance",
    "nib Health Insurance",
    "Private payment options available",
  ],
  notes: [
    "Coverage varies by plan—we recommend verifying benefits before your visit",
    "We can help you understand your ACC entitlements",
    "Flexible payment plans available for services not covered by insurance",
    "We accept EFTPOS, credit cards, and bank transfers",
    "ACC may cover hearing services following an accident - please contact us to discuss",
  ],
};

const faqs = [
  {
    question: "How do I know if I have hearing loss?",
    answer:
      "Common signs include frequently asking people to repeat themselves, turning up the TV volume, difficulty hearing in noisy environments, and feeling like others are mumbling. If you experience any of these, we recommend a hearing evaluation.",
  },
  {
    question: "At what age should I start getting my hearing checked?",
    answer:
      "We recommend baseline hearing tests for adults starting at age 50, with annual follow-ups thereafter. However, anyone experiencing hearing difficulties should be tested regardless of age.",
  },
  {
    question: "How long do hearing aids last?",
    answer:
      "With proper care and maintenance, hearing aids typically last 5-7 years. Technology advances may prompt earlier upgrades to take advantage of new features.",
  },
  {
    question: "Will hearing aids restore my hearing to normal?",
    answer:
      "While hearing aids significantly improve hearing ability, they don't restore hearing to normal. They amplify sounds to make them clearer and more accessible based on your specific hearing loss pattern.",
  },
  {
    question: "Can hearing loss be prevented?",
    answer:
      "Some hearing loss can be prevented by protecting your ears from loud noises, using ear protection in noisy environments, and avoiding putting objects in your ears. Regular check-ups can also help detect issues early.",
  },
  {
    question: "What should I do if my hearing aid stops working?",
    answer:
      "First, check the battery and make sure the hearing aid is clean. If it still doesn't work, contact us for a repair appointment. We offer same-day minor repairs and can arrange manufacturer repairs for major issues.",
  },
];

const downloadableForms = [
  { name: "New Patient Registration Form", type: "PDF" },
  { name: "Medical History Questionnaire", type: "PDF" },
  { name: "HIPAA Privacy Notice", type: "PDF" },
  { name: "Patient Rights & Responsibilities", type: "PDF" },
  { name: "Financial Policy", type: "PDF" },
];

const articles = [
  {
    title: "Understanding the Different Types of Hearing Loss",
    excerpt:
      "Learn about conductive, sensorineural, and mixed hearing loss, their causes, and treatment options.",
    category: "Education",
  },
  {
    title: "How to Choose the Right Hearing Aid for Your Lifestyle",
    excerpt:
      "A guide to selecting hearing aids based on your daily activities, preferences, and hearing needs.",
    category: "Hearing Aids",
  },
  {
    title: "Living with Tinnitus: Coping Strategies That Work",
    excerpt:
      "Practical tips and treatments for managing tinnitus and improving your quality of life.",
    category: "Tinnitus",
  },
  {
    title: "Protecting Your Hearing: A Complete Guide",
    excerpt:
      "Everything you need to know about preventing noise-induced hearing loss at home and work.",
    category: "Prevention",
  },
];

export default function ResourcesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
              Patient Resources
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] mb-6">
              Resources & Information
            </h1>
            <p className="text-lg text-[var(--muted)]">
              Everything you need to know about your visit, insurance, and
              hearing health. We&apos;re here to make your experience as smooth as
              possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Calendar className="h-6 w-6 text-[var(--primary)]" />
              <h2 className="text-3xl font-bold text-[var(--foreground)]">
                What to Expect at Your First Visit
              </h2>
            </div>
            <p className="text-[var(--muted)] max-w-2xl mx-auto">
              We want you to feel prepared and comfortable. Here&apos;s what to
              expect before, during, and after your appointment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {firstVisitInfo.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[var(--card)] rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[var(--muted)]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Information */}
      <section className="py-16 bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="h-6 w-6 text-[var(--primary)]" />
                <h2 className="text-3xl font-bold text-[var(--foreground)]">
                  Insurance & Payment
                </h2>
              </div>
              <p className="text-[var(--muted)] mb-6">
                We accept most major insurance plans and offer flexible payment
                options to make hearing healthcare accessible to everyone.
              </p>

              <h3 className="font-semibold text-[var(--foreground)] mb-3">
                Accepted Insurance Plans
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {insuranceInfo.accepted.map((plan) => (
                  <span
                    key={plan}
                    className="bg-white px-3 py-1 rounded-full text-sm text-[var(--foreground)] border border-[var(--border)]"
                  >
                    {plan}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-[var(--foreground)] mb-3">
                Important Notes
              </h3>
              <ul className="space-y-3">
                {insuranceInfo.notes.map((note) => (
                  <li
                    key={note}
                    className="flex items-start gap-2 text-[var(--muted)]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                    {note}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Link href="/contact">
                  <Button>Questions About Insurance?</Button>
                </Link>
              </div>
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
            <div className="flex items-center justify-center gap-2 mb-4">
              <HelpCircle className="h-6 w-6 text-[var(--primary)]" />
              <h2 className="text-3xl font-bold text-[var(--foreground)]">
                Frequently Asked Questions
              </h2>
            </div>
            <p className="text-[var(--muted)]">
              Find answers to common questions about hearing health and our
              services.
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

      {/* Downloadable Forms */}
      <section className="py-16 bg-[var(--card)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <FileText className="h-6 w-6 text-[var(--primary)]" />
              <h2 className="text-3xl font-bold text-[var(--foreground)]">
                Downloadable Forms
              </h2>
            </div>
            <p className="text-[var(--muted)]">
              Save time by completing forms before your visit. Print, fill out,
              and bring to your appointment.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {downloadableForms.map((form, index) => (
              <motion.div
                key={form.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg border border-[var(--border)] p-4 flex items-center justify-between hover:border-[var(--primary)]/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-[var(--primary)]" />
                  <span className="font-medium text-[var(--foreground)]">
                    {form.name}
                  </span>
                </div>
                <button className="flex items-center gap-1 text-[var(--primary)] hover:text-[var(--primary-dark)] transition-colors">
                  <Download className="h-4 w-4" />
                  <span className="text-sm">{form.type}</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Articles */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="h-6 w-6 text-[var(--primary)]" />
              <h2 className="text-3xl font-bold text-[var(--foreground)]">
                Hearing Health Articles
              </h2>
            </div>
            <p className="text-[var(--muted)] max-w-2xl mx-auto">
              Learn more about hearing health, hearing aids, and how to protect
              your hearing.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {articles.map((article, index) => (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[var(--card)] rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <span className="inline-block bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-1 rounded-full text-sm font-medium mb-3">
                  {article.category}
                </span>
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                  {article.title}
                </h3>
                <p className="text-[var(--muted)]">{article.excerpt}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
