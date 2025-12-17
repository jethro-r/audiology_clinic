"use client";

import { motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

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

export default function FAQPage() {
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
              FAQ
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-[var(--muted)]">
              Find answers to common questions about hearing health and our
              services. Can&apos;t find what you&apos;re looking for? Contact us directly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
    </>
  );
}
