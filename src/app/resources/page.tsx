"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Badge from "@/components/Badge";
import { PageHero, Section } from "@/components/sections";
import { type Article } from "@/lib/data";

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

export default function ResourcesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch('/api/articles');
        if (res.ok) {
          const data = await res.json();
          setArticles(data);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);
  return (
    <>
      <PageHero
        badge="Patient Resources"
        title="Resources & Information"
        description="Everything you need to know about your visit, insurance, and hearing health. We're here to make your experience as smooth as possible."
      />
      <Section variant="white">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6">
          {articles.map((article, index) => (
            <Link 
              key={article.slug} 
              href={`/resources/articles/${article.slug}`}
              className="block group"
            >
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-5 sm:p-6 hover:shadow-md transition-all group-hover:shadow-lg"
              >
                <div className="flex flex-wrap gap-1 mb-3">
                  {article.categories.map((cat) => (
                    <Badge key={cat} variant="primary">{cat}</Badge>
                  ))}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-secondary transition-colors">
                  {article.title}
                </h3>
                <p className="text-muted mb-3">{article.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-sm text-secondary font-medium">
                  Read more <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.article>
            </Link>
          ))}
          </div>
        )}
      </Section>
    </>
  );
}
