import JsonLd, { stripHtml } from "./JsonLd";
import type { FAQ } from "@/lib/data";

// FAQPage markup for the homepage FAQ accordion.
export default function FaqSchema({ faqs }: { faqs: FAQ[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: stripHtml(faq.answer),
          },
        })),
      }}
    />
  );
}
