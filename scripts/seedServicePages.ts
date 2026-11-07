// Seeds the "Hearing Aid Fittings" service with its landing page content,
// from the client-approved design (sam/hearing-aid-fittings_1.html +
// sam/developer-notes.md).
//
// Run: npx tsx scripts/seedServiceLanding.ts
//
// Idempotent: upserts by slug, so it can be re-run safely. It only touches
// the service with slug "hearing-aid-fittings".

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SLUG = "hearing-aid-fittings";

async function main() {
  const pageContent = {
    hero: {
      headline: "Hearing aid fittings,",
      headlineAccent: "measured — not guessed",
      intro:
        "Every fitting at Veritas Hearing is checked with real-ear measurement, tested with speech in background noise, and reviewed against goals you set. Then we keep fine-tuning until they're right — and look after them for three years at no extra charge.",
      trustLine: "Independent clinic · Every hearing aid brand · MNZAS audiologist",
      primaryCtaText: "Book a hearing test",
      secondaryCta: "call",
      visual: "chart",
    },
    featureCards: {
      eyebrow: "Our fitting process",
      heading: "Why we check, rather than assume",
      intro:
        "Fitting software starts from an estimate based on an average ear. Your ear canal's size and shape change what actually reaches your eardrum — often in the pitches that make speech clear. So every fitting includes three checks.",
      cards: [
        {
          icon: "Activity",
          title: "Real-ear measurement",
          body: "A soft, thin tube sits in your ear canal beside the hearing aid and measures the sound arriving at your eardrum. We adjust until it matches your prescription, pitch by pitch.",
        },
        {
          icon: "MessageSquare",
          title: "Speech-in-noise testing",
          body: "Background noise is where most people struggle. We test how well you follow speech in noise with and without your hearing aids, so you can see the difference.",
        },
        {
          icon: "Target",
          title: "Goals you set",
          body: "Before fitting, we note the situations that matter to you — the dinner table, meetings, the grandkids on the phone — and check progress against them at every follow-up.",
        },
      ],
    },
    steps: {
      eyebrow: "Step by step",
      heading: "How it works, start to finish",
      intro: "Six steps, with the same audiologist the whole way through.",
      highlightStep: 3,
      steps: [
        {
          title: "Hearing test",
          body: "A full assessment in our sound booth, including tympanometry and bone conduction, with a written report that's yours to keep. If wax is in the way, we can remove it by microsuction on the spot ($50).",
        },
        {
          title: "Choosing hearing aids",
          body: "We're independent and can source every brand, so the recommendation is about your hearing, lifestyle and budget — not a supplier deal.",
        },
        {
          title: "Fitting appointment",
          body: "We program your aids, verify them with real-ear measurement, run speech-in-noise testing, and show you how to insert, clean and charge them. Allow about 60 minutes.",
        },
        {
          title: "60-day trial, money-back guarantee",
          body: "Wear them at home, at work, at the café. If they're not right for you, return them within 60 days for a full refund.",
        },
        {
          title: "Follow-ups and fine-tuning",
          body: "Your brain takes time to adjust to new sound. Follow-up appointments are included, and we fine-tune and re-check against your goals as you settle in.",
        },
        {
          title: "Three years of aftercare",
          body: "Cleans, checks and adjustments for three years, at no extra charge. Pop in whenever something doesn't sound right.",
        },
      ],
    },
    audience: {
      heading: "Wherever you're starting from",
      columns: [
        {
          icon: "User",
          title: "New to hearing aids",
          body: "Start with a hearing test. If hearing aids will help, we'll talk through options from every brand and fit them with the full verification process.",
          linkText: "Book a hearing test",
          linkHref: "/booking",
        },
        {
          icon: "Wrench",
          title: "Bought your aids elsewhere",
          body: "Aids from another clinic or online that never quite sounded right? Most can be reprogrammed and verified with real-ear measurement — some are locked to the provider that sold them, and we'll tell you honestly if yours are. Fee: $650.",
          linkText: "Call to check your aids",
          linkHref: "tel:+642904510839",
        },
        {
          icon: "ShieldCheck",
          title: "Funded clients",
          body: "We work with ACC, the Enable subsidy and Veterans' Affairs. We'll check what you may be eligible for at your assessment.",
          linkText: "Book an assessment",
          linkHref: "/booking",
        },
      ],
    },
    faq: {
      heading: "Frequently Asked Questions",
      intro: "What to expect from a hearing aid fitting at Veritas",
      items: [
        {
          question: "Which hearing aid brand suits me?",
          answer:
            "There's no single best brand — it depends on your hearing, your lifestyle, what you want to connect to, and your budget. Because we're independent and can source every brand, we recommend what suits you rather than what we're tied to selling.",
        },
        {
          question: "Do you offer specialised services for Mandarin speakers?",
          answer:
            "Yes. Your appointments — from the hearing test through to fitting and follow-ups — can be held in Mandarin, so you and your family can ask questions and understand every step. Testing is done in Mandarin too: speech testing and speech-in-noise testing use Mandarin speech materials, so the results reflect how you actually hear the language you speak every day.",
          answerZh:
            "是的。從聽力檢查、助聽器驗配到後續追蹤，每次約診都可以用中文（國語）進行，讓您和家人能放心提問，清楚了解每一個步驟。測試同樣以中文進行：語音聽力測試及噪音環境下的語音辨識測試都採用中文語音材料，讓結果真實反映您聆聽日常所用語言的能力。",
        },
        {
          question: "Can you adjust hearing aids I bought online or from another clinic?",
          answer:
            "Usually, yes. Some aids are locked to the original provider or can't be programmed by a clinic — call us with the brand and model and we'll tell you before you come in.",
        },
        {
          question: "What if the hearing aids don't suit me?",
          answer:
            "First we'll fine-tune — most issues are settings, not the device. If they're still not right, you can return them within 60 days for a full refund.",
        },
        {
          question: "How much does it cost?",
          answer:
            "Hearing aids come in different technology levels to suit different needs and budgets. What matters just as much is the care you receive — and at Veritas, that care is the same whichever level you choose. There are no hidden fees: your fitting, follow-ups and three years of aftercare are all included in the price.",
        },
      ],
    },
    cta: {},
    seo: {
      title: "Hearing Aid Fittings in Hamilton | Veritas Hearing",
      description:
        "Hearing aid fittings verified with real-ear measurement and speech-in-noise testing. Independent audiologist in Frankton, Hamilton. 60-day trial, 3 years' aftercare, Mandarin testing available.",
    },
  };

  const result = await prisma.service.upsert({
    where: { slug: SLUG },
    create: {
      slug: SLUG,
      title: "Hearing Aid Fittings",
      shortDescription:
        "Hearing aid fittings verified with real-ear measurement and speech-in-noise testing. Independent audiologist in Frankton, Hamilton.",
      fullDescription:
        "<p>Hearing aid fittings at Veritas Hearing are verified with real-ear measurement and speech-in-noise testing, so you know your aids deliver what your prescription calls for. Every fitting includes a 60-day trial and three years of aftercare.</p>",
      iconName: "Headphones",
      features: [
        "Real-ear measurement verification",
        "Speech-in-noise testing",
        "60-day money-back trial",
        "3 years of aftercare included",
        "Every hearing aid brand — fully independent",
      ],
      idealFor: "Anyone buying hearing aids, or wondering whether their current aids are set up correctly",
      sortOrder: 15,
      showOnHomepage: false,
      showInFooter: false,
      isLive: true,
      pageContent,
    },
    update: {
      title: "Hearing Aid Fittings",
      isLive: true,
      pageContent,
    },
  });

  console.log(`Seeded service page: ${result.title} (${result.slug}, isLive=${result.isLive})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
