"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import AnimateInView from "@/components/AnimateInView";
import type { LandingFaq as LandingFaqData } from "@/lib/servicePage";

/**
 * Per-service FAQ accordion — same visual language as the site's global
 * FaqAccordion, but renders plain-text answers (as entered in the admin
 * landing editor) plus an optional Traditional Chinese paragraph that keeps
 * its lang="zh-Hant-TW" attribute for browsers and screen readers.
 */
export default function LandingFaq({ data }: { data: LandingFaqData }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            {data.heading || "Frequently Asked Questions"}
          </h2>
          {data.intro && <p className="text-lg text-muted">{data.intro}</p>}
        </div>

        <div className="space-y-4">
          {data.items.map((item, index) => (
            <AnimateInView key={index} delay={index * 50}>
              <div className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-white hover:bg-card transition-colors gap-4"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-medium text-foreground text-sm sm:text-base">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-muted transition-transform duration-200 flex-shrink-0 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-muted text-sm sm:text-base space-y-4">
                    {item.answer && <p>{item.answer}</p>}
                    {item.answerZh && <p lang="zh-Hant-TW">{item.answerZh}</p>}
                  </div>
                )}
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
}
