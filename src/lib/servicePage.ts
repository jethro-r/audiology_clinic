// Typed structure for CMS-driven service landing pages (/services/[slug]).
//
// A landing page is a fixed skeleton: hero (always) + four optional sections
// + closing CTA (always, with overridable copy). Content lives in the
// Service.pageContent JSON column and is edited in the admin services form.

export interface LandingHero {
  /** Main headline, first part (white on green) */
  headline: string;
  /** Optional accent tail rendered in gold, e.g. "measured — not guessed" */
  headlineAccent?: string;
  intro: string;
  /** Small line under the CTAs, e.g. "Independent clinic · Every brand" */
  trustLine?: string;
  /** Primary button text; links to /booking */
  primaryCtaText?: string;
  /** Secondary button: phone call link. Default "call" */
  secondaryCta?: "call" | "none";
  /** Hero visual: inline real-ear measurement chart, the service image, or none */
  visual?: "chart" | "image" | "none";
}

export interface LandingFeatureCards {
  eyebrow?: string;
  heading: string;
  intro?: string;
  cards: { icon: string; title: string; body: string }[];
}

export interface LandingSteps {
  eyebrow?: string;
  heading: string;
  intro?: string;
  /** 1-based index of the step card to highlight in gold; omit for none */
  highlightStep?: number;
  steps: { title: string; body: string }[];
}

export interface LandingAudience {
  heading: string;
  columns: {
    icon: string;
    title: string;
    body: string;
    linkText?: string;
    linkHref?: string;
  }[];
}

export interface LandingFaq {
  heading?: string;
  intro?: string;
  items: {
    question: string;
    answer: string;
    /** Optional Traditional Chinese paragraph, rendered with lang="zh-Hant-TW" */
    answerZh?: string;
  }[];
}

export interface LandingCta {
  heading?: string;
  description?: string;
}

export interface ServicePageContent {
  hero: LandingHero;
  featureCards?: LandingFeatureCards;
  steps?: LandingSteps;
  audience?: LandingAudience;
  faq?: LandingFaq;
  cta?: LandingCta;
  seo?: {
    title?: string;
    description?: string;
  };
}

// ---------------------------------------------------------------------------
// Normalisation — the landing column is admin-entered JSON; render defensively.
// ---------------------------------------------------------------------------

function str(v: unknown): string | undefined {
  return typeof v === "string" && v.trim() ? v : undefined;
}

function arr<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : [];
}

function num(v: unknown): number | undefined {
  return typeof v === "number" && Number.isFinite(v) ? v : undefined;
}

function parseCards(v: unknown): LandingFeatureCards["cards"] {
  return arr<Record<string, unknown>>(v)
    .map((c) => ({ icon: str(c.icon) ?? "CheckCircle", title: str(c.title) ?? "", body: str(c.body) ?? "" }))
    .filter((c) => c.title || c.body);
}

/**
 * Coerce an unknown JSON value into a renderable ServicePageContent.
 * Optional sections are included whenever they have items — headings are
 * optional (a section with cards but no heading still renders). Returns
 * null only when there is no page content at all; an empty hero is kept
 * so the route can apply withHeroFallback().
 */
export function parseServicePage(raw: unknown): ServicePageContent | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;

  const heroRaw = (r.hero ?? {}) as Record<string, unknown>;
  const hero: LandingHero = {
    headline: str(heroRaw.headline) ?? "",
    headlineAccent: str(heroRaw.headlineAccent),
    intro: str(heroRaw.intro) ?? "",
    trustLine: str(heroRaw.trustLine),
    primaryCtaText: str(heroRaw.primaryCtaText),
    secondaryCta: heroRaw.secondaryCta === "none" ? "none" : "call",
    visual:
      heroRaw.visual === "chart" || heroRaw.visual === "image" || heroRaw.visual === "none"
        ? heroRaw.visual
        : undefined,
  };

  const landing: ServicePageContent = { hero };

  const fcRaw = r.featureCards as Record<string, unknown> | undefined;
  if (fcRaw) {
    const cards = parseCards(fcRaw.cards);
    if (cards.length > 0) {
      landing.featureCards = {
        eyebrow: str(fcRaw.eyebrow),
        heading: str(fcRaw.heading) ?? "",
        intro: str(fcRaw.intro),
        cards,
      };
    }
  }

  const stepsRaw = r.steps as Record<string, unknown> | undefined;
  if (stepsRaw) {
    const steps = arr<Record<string, unknown>>(stepsRaw.steps)
      .map((s) => ({ title: str(s.title) ?? "", body: str(s.body) ?? "" }))
      .filter((s) => s.title || s.body);
    if (steps.length > 0) {
      landing.steps = {
        eyebrow: str(stepsRaw.eyebrow),
        heading: str(stepsRaw.heading) ?? "",
        intro: str(stepsRaw.intro),
        highlightStep: num(stepsRaw.highlightStep),
        steps,
      };
    }
  }

  const audRaw = r.audience as Record<string, unknown> | undefined;
  if (audRaw) {
    const columns = arr<Record<string, unknown>>(audRaw.columns)
      .map((c) => ({
        icon: str(c.icon) ?? "User",
        title: str(c.title) ?? "",
        body: str(c.body) ?? "",
        linkText: str(c.linkText),
        linkHref: str(c.linkHref),
      }))
      .filter((c) => c.title || c.body);
    if (columns.length > 0) {
      landing.audience = {
        heading: str(audRaw.heading) ?? "",
        columns,
      };
    }
  }

  const faqRaw = r.faq as Record<string, unknown> | undefined;
  if (faqRaw) {
    const items = arr<Record<string, unknown>>(faqRaw.items)
      .map((i) => ({
        question: str(i.question) ?? "",
        answer: str(i.answer) ?? "",
        answerZh: str(i.answerZh),
      }))
      .filter((i) => i.question && (i.answer || i.answerZh));
    if (items.length > 0) {
      landing.faq = {
        heading: str(faqRaw.heading),
        intro: str(faqRaw.intro),
        items,
      };
    }
  }

  const ctaRaw = r.cta as Record<string, unknown> | undefined;
  if (ctaRaw && (str(ctaRaw.heading) || str(ctaRaw.description))) {
    landing.cta = { heading: str(ctaRaw.heading), description: str(ctaRaw.description) };
  }

  const seoRaw = r.seo as Record<string, unknown> | undefined;
  if (seoRaw && (str(seoRaw.title) || str(seoRaw.description))) {
    landing.seo = { title: str(seoRaw.title), description: str(seoRaw.description) };
  }

  return landing;
}

/**
 * A live page must always render something, even mid-edit. When the hero has
 * no headline/intro yet, fall back to the service title + short description
 * so Paul can mark a page Live while it's still a work in progress.
 */
export function withHeroFallback(
  landing: ServicePageContent | null | undefined,
  title: string,
  shortDescription: string,
): ServicePageContent {
  if (landing && (landing.hero.headline.trim() || landing.hero.intro.trim())) return landing;
  if (!landing) {
    return { hero: { headline: title, intro: shortDescription } };
  }
  return {
    ...landing,
    hero: {
      ...landing.hero,
      headline: landing.hero.headline || title,
      intro: landing.hero.intro || shortDescription,
    },
  };
}

/** Site phone number, display and tel: formats (single source for landing pages) */
export const PHONE_DISPLAY = "029 045 10839";
export const PHONE_TEL = "+642904510839";
