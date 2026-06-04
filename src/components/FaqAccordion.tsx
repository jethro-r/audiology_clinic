"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import AnimateInView from "@/components/AnimateInView";
import { type FAQ } from "@/lib/data";

export default function FaqAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <AnimateInView key={index} delay={index * 50}>
          <div className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-white hover:bg-card transition-colors gap-4"
            >
              <span className="font-medium text-foreground text-sm sm:text-base">
                {faq.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 text-muted transition-transform duration-200 ${
                  openFaq === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openFaq === index && (
              <div
                className="px-4 sm:px-5 pb-4 text-muted text-sm sm:text-base rich-text"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            )}
          </div>
        </AnimateInView>
      ))}
    </div>
  );
}
