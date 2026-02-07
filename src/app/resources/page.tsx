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
      </Section>
    </>
  );
}
