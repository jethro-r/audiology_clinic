import JsonLd, { stripHtml } from "./JsonLd";

// FAQPage markup for FAQ content — the homepage accordion (DB rows) and
// article FAQ sections (parsed from rich text) both satisfy this shape.
export default function FaqSchema({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
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
