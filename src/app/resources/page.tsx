"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Download,
  BookOpen,
  Calendar,
} from "lucide-react";
import Badge from "@/components/Badge";
import { PageHero, Section, SectionHeader } from "@/components/sections";

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

const downloadableForms = [
  { name: "New Patient Registration Form", type: "PDF" },
  { name: "Medical History Questionnaire", type: "PDF" },
  { name: "Privacy Act Information Sheet", type: "PDF" },
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
  return (
    <>
      <PageHero
        badge="Patient Resources"
        title="Resources & Information"
        description="Everything you need to know about your visit, insurance, and hearing health. We're here to make your experience as smooth as possible."
      />

      <Section variant="white">
        <SectionHeader
          title="What to Expect at Your First Visit"
          description="We want you to feel prepared and comfortable. Here's what to expect before, during, and after your appointment."
        />
        <div className="grid md:grid-cols-3 gap-8">
          {firstVisitInfo.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-muted"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section variant="cream" containerClassName="max-w-4xl">
        <SectionHeader
          title="Downloadable Forms"
          description="Save time by completing forms before your visit. Print, fill out, and bring to your appointment."
        />
        <div className="grid sm:grid-cols-2 gap-4">
          {downloadableForms.map((form, index) => (
            <motion.div
              key={form.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg border border-border p-4 flex items-center justify-between hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <span className="font-medium text-foreground">
                  {form.name}
                </span>
              </div>
              <button className="flex items-center gap-1 text-primary hover:text-primary-dark transition-colors">
                <Download className="h-4 w-4" />
                <span className="text-sm">{form.type}</span>
              </button>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section variant="white">
        <SectionHeader
          title="Hearing Health Articles"
          description="Learn more about hearing health, hearing aids, and how to protect your hearing."
        />
        <div className="grid sm:grid-cols-2 gap-6">
          {articles.map((article, index) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <Badge variant="primary" className="mb-3">
                {article.category}
              </Badge>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {article.title}
              </h3>
              <p className="text-muted">{article.excerpt}</p>
            </motion.article>
          ))}
        </div>
      </Section>
    </>
  );
}
