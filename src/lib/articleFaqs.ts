import { stripHtml } from "@/components/schema/JsonLd";

export interface ArticleFaq {
  question: string;
  answer: string;
}

// Articles embed their FAQ section in the rich-text content (TipTap HTML).
// Two shapes are in use across published articles:
//   <h2>FAQ</h2><h3>Question?</h3><p>Answer</p>…
//   <h2><strong>FAQ</strong></h2><p><strong>Question?</strong> Answer</p>…
// Answers may span multiple <p> blocks — continuation paragraphs are appended
// to the previous question. Labelled paragraphs such as
// <p><strong>Related:</strong> …</p> are notes, not Q&As, and are skipped.
// Returns [] when the article has no FAQ section, so callers can skip the
// FAQPage schema entirely.
export function extractArticleFaqs(content: string | null | undefined): ArticleFaq[] {
  if (!content) return [];

  // The FAQ section runs from its <h2> heading to the next <h2> (or end).
  let section: string | null = null;
  for (const heading of content.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)) {
    if (/faq|frequently asked/i.test(stripHtml(heading[1]))) {
      const rest = content.slice(heading.index! + heading[0].length);
      const nextH2 = rest.search(/<h2[\s>]/i);
      section = nextH2 === -1 ? rest : rest.slice(0, nextH2);
      break;
    }
  }
  if (section === null) return [];

  const faqs: ArticleFaq[] = [];
  let current: ArticleFaq | null = null;
  const flush = () => {
    if (current && current.question && current.answer) faqs.push(current);
    current = null;
  };

  for (const block of section.matchAll(/<(h3|p)\b[^>]*>([\s\S]*?)<\/\1>/gi)) {
    const tag = block[1].toLowerCase();
    const inner = block[2];

    // <h3>Question?</h3> always starts a new Q&A.
    if (tag === "h3") {
      flush();
      const question = stripHtml(inner);
      if (question) current = { question, answer: "" };
      continue;
    }

    // <p>: a leading <strong> ending in "?" starts a new Q&A; a leading
    // <strong> ending in ":" is a labelled note (e.g. "Related:") — skip;
    // anything else continues the current answer.
    const lead = inner.match(/^<strong[^>]*>([\s\S]*?)<\/strong>/i);
    if (lead && stripHtml(lead[1]).endsWith("?")) {
      flush();
      current = {
        question: stripHtml(lead[1]),
        answer: stripHtml(inner.slice(lead[0].length)),
      };
    } else if (lead && /:$/.test(stripHtml(lead[1]))) {
      continue;
    } else if (current) {
      current.answer = `${current.answer} ${stripHtml(inner)}`.trim();
    }
  }
  flush();

  return faqs;
}
