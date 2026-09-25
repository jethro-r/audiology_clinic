import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, AudioWaveform } from "lucide-react";
import { PageHero, Section, SectionHeader, CTASection } from "@/components/sections";
import Button from "@/components/Button";
import AnimateInView from "@/components/AnimateInView";
import JsonLd from "@/components/schema/JsonLd";
import { SITE_URL } from "@/lib/site";

const title = "Phonak EON — What's New in Phonak's 2026 Flagship";
const description =
  "The Phonak EON is here: WindBlock 2.0 with up to 50dB wind noise reduction, 25% smaller and 20% lighter than Infinio Sphere, 700 environment scans per second, and 38-hour battery life. Book an assessment at Veritas Hearing to try it.";

export const metadata: Metadata = {
  alternates: { canonical: "/hearing-aids/eon" },
  title,
  description,
  openGraph: {
    url: "/hearing-aids/eon",
    title,
    description,
    images: [{ url: "/frontend/eon-launch-booth.webp" }],
  },
};

interface EonStat {
  id: string;
  stat: string;
  label: string;
  sub: string;
  image?: string;
}

const eonStats: EonStat[] = [
  {
    id: "windblock",
    stat: "50dB",
    label: "WindBlock 2.0 wind noise reduction",
    sub: 'Demoed live on the "Crater Rim Track" scenario at launch',
    image: "/frontend/eon-windblock-demo.webp",
  },
  {
    id: "size",
    stat: "25%",
    label: "Smaller & 20% lighter",
    sub: "Than the previous Infinio Sphere generation",
  },
  {
    id: "scans",
    stat: "700x",
    label: "Environment scans per second",
    sub: "AutoSense OS AI 8.0, powered by the HyperSonic chip",
  },
  {
    id: "battery",
    stat: "38hrs",
    label: "Battery life",
    sub: "A full day, and then some",
  },
];

export default function PhonakEonPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        badge="Now at Veritas Hearing"
        title="Phonak EON"
        description="What's actually new in Phonak's 2026 flagship"
      >
        <div className="mt-6">
          <Link href="/booking">
            <Button variant="secondary" size="lg">
              Book an assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </PageHero>

      {/* Stats */}
      <Section variant="white">
        <SectionHeader label="Phonak EON" title="The headline numbers" />
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {eonStats.map((stat, i) => (
            <AnimateInView key={stat.id} delay={i * 100}>
              <div className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-colors">
                {stat.image ? (
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={stat.image}
                      alt="Live WindBlock 2.0 wind noise reduction demo at the Phonak EON launch"
                      fill
                      quality={90}
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover object-[center_30%]"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-[4/3] bg-background flex items-center justify-center">
                    <AudioWaveform
                      className="h-12 w-12 text-secondary"
                      strokeWidth={1.5}
                    />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-4xl font-bold text-primary">{stat.stat}</p>
                  <h3 className="text-lg font-semibold text-primary mt-2">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-muted mt-2">{stat.sub}</p>
                </div>
              </div>
            </AnimateInView>
          ))}
        </div>
      </Section>

      {/* Proof */}
      <Section variant="cream">
        <AnimateInView>
          <div className="max-w-4xl mx-auto bg-white rounded-lg border-2 border-secondary/60 overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
              <div className="relative aspect-[4/3] md:aspect-auto md:h-full min-h-[280px]">
                <Image
                  src="/frontend/eon-launch-booth.webp"
                  alt="Veritas Hearing clinician at the official Phonak EON launch booth in Auckland"
                  fill
                  quality={90}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <span className="block text-2xl font-semibold text-primary mb-3">
                  We were there.
                </span>
                <p className="text-muted leading-relaxed">
                  Our clinician attended Phonak&apos;s official EON launch in
                  Auckland — this isn&apos;t secondhand marketing copy.
                </p>
              </div>
            </div>
          </div>
        </AnimateInView>
      </Section>

      {/* CTA */}
      <CTASection
        variant="primary"
        title="Hear it for yourself"
        description="Book an assessment and try the Phonak EON — independent advice, no sales pressure."
        primaryButton={{ text: "Book an assessment", href: "/booking" }}
      />

      {/* Product JSON-LD (no offers — no public pricing) */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Phonak EON",
          brand: { "@type": "Brand", name: "Phonak" },
          description:
            "Phonak's 2026 flagship hearing aid: WindBlock 2.0 with up to 50dB wind noise reduction, 25% smaller and 20% lighter than the previous Infinio Sphere generation, 700 environment scans per second via AutoSense OS AI 8.0 on the HyperSonic chip, and 38-hour battery life.",
          image: [`${SITE_URL}/frontend/eon-launch-booth.webp`],
          url: `${SITE_URL}/hearing-aids/eon`,
        }}
      />
    </>
  );
}
