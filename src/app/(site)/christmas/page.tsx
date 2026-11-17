import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, ChevronDown } from "lucide-react";
import Button from "@/components/Button";
import { Section, SectionHeader, CTASection } from "@/components/sections";
import AnimateInView from "@/components/AnimateInView";
import LandingSteps from "@/components/services/LandingSteps";
import { PohutukawaDefs, PohutukawaDeco } from "@/components/christmas/Pohutukawa";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/servicePage";

export const metadata: Metadata = {
  title: "Free Christmas Hearing Check | Veritas Hearing, Frankton, Hamilton",
  description:
    "Free 15-minute hearing check with a speech-in-noise test, until 29 January. Wax removal $50 if needed. Every check goes in the draw to win a $100 matcha gift set. Frankton, Hamilton.",
  alternates: { canonical: "/christmas" },
};

/**
 * End-of-year campaign page (/christmas), rebuilt in the site's component
 * system from Paul's approved standalone design (sam/christmas.html).
 * Static content only — no database data beyond the shared site layout.
 */
export default function ChristmasPage() {
  return (
    <>
      <PohutukawaDefs />

      {/* Hero */}
      <section className="relative bg-primary pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pb-24 overflow-hidden">
        <PohutukawaDeco className="absolute -top-4 -right-4 w-40 lg:w-64 opacity-60" />
        <PohutukawaDeco className="absolute -bottom-10 -left-6 w-40 lg:w-56 opacity-40 -scale-x-100" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="animate-slide-in-left">
              <span className="inline-block text-sm font-semibold tracking-wider uppercase text-secondary mb-3">
                Christmas offer · until 29 January
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4 sm:mb-6">
                Hear every voice <span className="text-secondary">this Christmas</span>
              </h1>
              <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8 max-w-xl">
                A free 15-minute hearing check: a hearing screen plus a speech-in-noise
                test, the closest thing to a noisy Christmas table you&rsquo;ll find in a
                clinic. Results on the spot, with Paul, an independent audiologist. No
                sales pitch.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/booking">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Book your free check
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Button>
                </Link>
                <Link href="/booking">
                  <Button variant="outline-light" size="lg" className="w-full sm:w-auto">
                    <span lang="zh-Hant">中文預約</span> · Book in Mandarin
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-sm text-white/65">
                Limited to 20 free checks a week. Every check goes in the draw to win a
                $100 matcha gift set from betweenleaves.
              </p>
            </div>

            <div className="relative animate-slide-in-right mb-5" style={{ animationDelay: "200ms" }}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/frontend/christmas-family.jpg"
                  alt="Grandparents sharing a moment with their grandchild at Christmas"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-5 left-5 bg-white rounded-xl shadow-lg px-5 py-3 flex items-center gap-3">
                <span className="text-2xl font-bold text-secondary">Free</span>
                <span className="text-sm text-muted leading-snug">
                  15-minute hearing check
                  <br />
                  with speech-in-noise test
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why speech in noise */}
      <Section variant="white">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <AnimateInView>
            <span className="inline-block text-sm font-semibold tracking-wider uppercase text-secondary-dark mb-2">
              Why this check is different
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              It tests the hardest kind of listening
            </h2>
            <p className="text-lg text-muted">
              Long tables, overlapping voices, music and kids make Christmas the toughest
              listening of the year. Many people pass a quiet beeps test but still
              struggle to follow conversation in noise. Our speech-in-noise test checks
              exactly that, so you&rsquo;ll know how you really hear when it&rsquo;s busy.
            </p>
          </AnimateInView>
          <AnimateInView delay={100}>
            <blockquote className="bg-white border border-border border-l-4 border-l-secondary rounded-lg p-6 sm:p-7 text-lg text-foreground leading-relaxed">
              Busy family gatherings are often when people first notice their hearing has
              changed. If you, or someone you love, keeps asking people to repeat
              themselves, this is a quick and easy first step.
            </blockquote>
          </AnimateInView>
        </div>
      </Section>

      {/* Offer ladder */}
      <Section variant="cream">
        <SectionHeader
          label="What's on offer"
          title="Start free. Go further only if you need to."
          description="Most people only need the free check. If it picks something up, Paul will explain your options. There's no pressure to book anything else."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimateInView className="h-full">
            <article className="bg-white border-2 border-secondary rounded-xl p-6 sm:p-7 h-full flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary-dark">
                Step 1
              </span>
              <h3 className="text-xl font-semibold text-foreground mt-2 mb-2">
                Free Christmas Hearing Check
              </h3>
              <p className="text-2xl font-bold text-primary mb-3">Free</p>
              <p className="text-muted">
                15 minutes: hearing screen plus speech-in-noise test. You leave with a
                result card showing whether a full assessment is recommended.
              </p>
            </article>
          </AnimateInView>
          <AnimateInView delay={100} className="h-full">
            <article className="bg-white border border-border rounded-xl p-6 sm:p-7 h-full flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary-dark">
                If you need it
              </span>
              <h3 className="text-xl font-semibold text-foreground mt-2 mb-2">
                Ear wax removal
              </h3>
              <p className="text-2xl font-bold text-primary mb-3">
                $50{" "}
                <s className="text-base font-medium text-muted">$65 usually</s>
              </p>
              <p className="text-muted">
                Microsuction for both ears, done at your check, using a loupe and video
                camera. No olive oil needed beforehand.
              </p>
            </article>
          </AnimateInView>
          <AnimateInView delay={200} className="h-full">
            <article className="bg-white border border-border rounded-xl p-6 sm:p-7 h-full flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary-dark">
                Recommended next step
              </span>
              <h3 className="text-xl font-semibold text-foreground mt-2 mb-2">
                Full hearing assessment
              </h3>
              <p className="text-2xl font-bold text-primary mb-3">$89</p>
              <p className="text-muted">
                Sound booth testing, tympanometry and bone conduction, with a written
                report you keep. Plus $50 if wax needs removing.
              </p>
            </article>
          </AnimateInView>
        </div>
        <AnimateInView delay={150}>
          <div className="mt-6 bg-primary/5 border border-border rounded-lg px-5 py-4 text-sm text-foreground">
            <span className="font-semibold">
              Already wear hearing aids from Veritas?
            </span>{" "}
            Book a Christmas clean, check and fine-tune before the holidays. It&rsquo;s
            part of your aftercare, so there&rsquo;s no charge.
          </div>
        </AnimateInView>
      </Section>

      {/* Prize */}
      <section className="relative bg-primary-dark py-16 lg:py-24 overflow-hidden">
        <PohutukawaDeco className="absolute -top-4 right-0 w-40 lg:w-64 opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <AnimateInView>
              <span className="inline-block text-sm font-semibold tracking-wider uppercase text-secondary mb-2">
                Two chances to win
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                Win a <span className="text-secondary">$100 matcha gift set</span>
              </h2>
              <p className="text-lg text-white/75 mb-10">
                Everyone who has a hearing check goes in the draw. There are two sets to
                be won, in partnership with betweenleaves.
              </p>
            </AnimateInView>
            <div className="grid sm:grid-cols-2 gap-5 mb-6">
              <AnimateInView delay={100}>
                <div className="bg-white/5 border border-white/10 rounded-lg p-5 sm:p-6 text-left h-full">
                  <p className="font-semibold text-white">Christmas draw</p>
                  <p className="text-secondary text-lg font-semibold my-1">Mon 21 Dec</p>
                  <p className="text-sm text-white/70">
                    Checks from 23 Nov to 18 Dec. Win it in time for Christmas.
                  </p>
                </div>
              </AnimateInView>
              <AnimateInView delay={200}>
                <div className="bg-white/5 border border-white/10 rounded-lg p-5 sm:p-6 text-left h-full">
                  <p className="font-semibold text-white">New Year draw</p>
                  <p className="text-secondary text-lg font-semibold my-1">Mon 1 Feb</p>
                  <p className="text-sm text-white/70">Checks from 19 Dec to 29 Jan.</p>
                </div>
              </AnimateInView>
            </div>
            <p className="text-sm text-white/60">
              Each set includes premium matcha powder, tea leaves, a whisk and a whisk
              bowl.
            </p>
          </div>
        </div>
      </section>

      {/* Why Veritas */}
      <Section variant="white">
        <SectionHeader
          label="Why Veritas Hearing"
          title="Honest hearing care, one person every visit"
          description="Free means free. You'll get a straight answer about your hearing, and that's it."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "The same face every visit",
              body: "You always see Paul, an MNZAS audiologist, never a rotating cast of strangers.",
            },
            {
              title: "Independent",
              body: "We can source every hearing aid brand, so advice is based on what suits you.",
            },
            {
              title: "No sales pitch",
              body: "We won't talk hearing aids at your free check unless you ask.",
            },
            {
              title: "Mandarin testing",
              body: "Checks in Mandarin, including Mandarin speech-in-noise testing.",
            },
          ].map((item, index) => (
            <AnimateInView key={item.title} delay={index * 100} className="h-full">
              <div className="bg-white border border-border rounded-xl p-6 h-full">
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted">{item.body}</p>
              </div>
            </AnimateInView>
          ))}
        </div>
      </Section>

      {/* Mandarin */}
      <Section variant="cream">
        <div className="max-w-3xl mx-auto">
          <AnimateInView>
            <div lang="zh-Hant">
              <span className="inline-block text-sm font-semibold tracking-wider uppercase text-secondary-dark mb-2">
                中文服務
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                聖誕佳節，聽清每一位家人的聲音
              </h2>
              <p className="text-lg text-muted mb-6">
                家庭聚會人多、聲音雜，是一年中最難聽清楚的時候。如果您或家人常常需要別人重複說話，現在正是檢查的好時機。
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "免費 15 分鐘聽力篩檢，以中文進行，包括中文噪音中語音測試，當場告訴您結果",
                  "如需清除耳垢，顯微抽吸只要 $50（原價 $65）",
                  "完整聽力評估 $89，附書面報告",
                  "共兩次抽獎（12 月 21 日及 2 月 1 日），每位接受檢查者都可參加，有機會贏得價值 $100 的 betweenleaves 抹茶禮盒（含高級抹茶粉、茶葉、茶筅及茶碗）",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/booking">
                <Button size="lg">
                  預約中文聽力檢查
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </AnimateInView>
          <AnimateInView delay={100}>
            <div lang="zh-Hans" className="mt-8 bg-white border border-border rounded-lg p-5 text-sm text-muted leading-relaxed">
              <span className="font-semibold text-foreground">简体中文：</span>
              免费 15 分钟听力筛检，以中文进行，包括中文噪音中语音测试。如需清除耳垢，只要
              $50（原价 $65）。完整听力评估 $89，附书面报告。每位接受检查者都可参加抽奖，有机会赢得价值
              $100 的 betweenleaves 抹茶礼盒。预约时请选择&ldquo;Free Christmas Hearing Check –
              Mandarin 中文&rdquo;。
            </div>
          </AnimateInView>
        </div>
      </Section>

      {/* How it works — reuses the service page steps component */}
      <LandingSteps
        data={{
          eyebrow: "How it works",
          heading: "Three simple steps",
          steps: [
            {
              title: "Book online",
              body: 'Choose "Free Christmas Hearing Check – English" or "– Mandarin 中文" and pick a time that suits.',
            },
            {
              title: "15 minutes with Paul",
              body: "A hearing screen and speech-in-noise test at our Frankton clinic. If wax is blocking your ears, we can remove it there and then.",
            },
            {
              title: "Know where you stand",
              body: "You leave with a result card and clear advice. You're automatically in the draw for the matcha gift set.",
            },
          ],
        }}
      />

      {/* Prize draw rules */}
      <section className="bg-white pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateInView>
            <details className="group border border-border rounded-lg bg-white overflow-hidden">
              <summary className="flex items-center justify-between gap-4 p-4 sm:p-5 font-medium text-foreground cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                Prize draw terms and conditions
                <ChevronDown
                  className="h-5 w-5 text-muted transition-transform duration-200 group-open:rotate-180 flex-shrink-0"
                  aria-hidden="true"
                />
              </summary>
              <ol className="px-5 sm:px-6 pb-5 list-decimal space-y-2.5 text-sm text-muted">
                <li>The promoter is Veritas Hearing, 37 Lake Road, Frankton, Hamilton.</li>
                <li>
                  Open to NZ residents aged 18 and over who have a free hearing check or a
                  full hearing assessment at Veritas Hearing between 23 November 2026 and
                  29 January 2027 (NZ time). Each person enters once, into the draw for
                  the period of their check. No purchase is needed to enter.
                </li>
                <li>
                  There are two prizes, one per draw. Each is a matcha gift set supplied
                  by betweenleaves, valued at $100 and including premium matcha powder,
                  tea leaves, a whisk and a whisk bowl. Prizes are not exchangeable for
                  cash.
                </li>
                <li>
                  Draw 1 covers checks from 23 November to 18 December 2026 and is drawn
                  at random on 21 December 2026. Draw 2 covers checks from 19 December
                  2026 to 29 January 2027 and is drawn at random on 1 February 2027. Each
                  winner is contacted by phone or email. If a winner can&rsquo;t be
                  reached within 14 days, a new winner will be drawn.
                </li>
                <li>
                  The winner&rsquo;s first name and suburb may be shared on Veritas
                  Hearing&rsquo;s social media, with their consent.
                </li>
                <li>
                  Entrants&rsquo; details are used only to run this draw and are not
                  shared with betweenleaves or anyone else without consent.
                </li>
              </ol>
            </details>
          </AnimateInView>
        </div>
      </section>

      {/* Contact / closing CTA */}
      <CTASection
        title="Book your free Christmas hearing check"
        description="37 Lake Road, Frankton, Hamilton · Monday to Friday, 8am to 5pm · Closed from 24 December for the holidays"
        primaryButton={{ text: "Book online", href: "/booking" }}
        secondaryButton={{ text: PHONE_DISPLAY, href: `tel:${PHONE_TEL}` }}
        variant="primary"
      />
    </>
  );
}
