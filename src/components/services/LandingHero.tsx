import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import Button from "@/components/Button";
import RealEarChart from "@/components/services/RealEarChart";
import { PHONE_DISPLAY, PHONE_TEL, type LandingHero as LandingHeroData } from "@/lib/servicePage";

interface LandingHeroProps {
  hero: LandingHeroData;
  serviceTitle: string;
  serviceImage?: string | null;
}

/**
 * Service landing hero — follows the site's homepage hero pattern:
 * primary green band, two-column grid, headline with gold accent,
 * gold primary CTA + outlined phone CTA.
 */
export default function LandingHero({
  hero,
  serviceTitle,
  serviceImage,
}: LandingHeroProps) {
  const showChart = hero.visual === "chart";
  const showImage = !showChart && hero.visual !== "none" && serviceImage;

  return (
    <section className="bg-primary pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <p className="text-sm text-white/65 mb-6 lg:mb-8">
          <Link href="/services" className="text-white/75 hover:text-white transition-colors">
            Services
          </Link>
          {" / "}
          {serviceTitle}
        </p>

        <div
          className={`grid gap-8 lg:gap-12 items-center ${
            showChart || showImage ? "lg:grid-cols-2" : ""
          }`}
        >
          {/* Content */}
          <div className="animate-slide-in-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4 sm:mb-6">
              {hero.headline}
              {hero.headlineAccent && (
                <>
                  {" "}
                  <span className="text-secondary">{hero.headlineAccent}</span>
                </>
              )}
            </h1>

            {hero.intro && (
              <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8 max-w-xl">
                {hero.intro}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/booking">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  {hero.primaryCtaText || "Book a hearing test"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              {hero.secondaryCta !== "none" && (
                <a href={`tel:${PHONE_TEL}`}>
                  <Button variant="outline-light" size="lg" className="w-full sm:w-auto">
                    <Phone className="mr-2 h-4 w-4" />
                    Call {PHONE_DISPLAY}
                  </Button>
                </a>
              )}
            </div>

            {hero.trustLine && (
              <p className="mt-6 text-sm text-white/65">{hero.trustLine}</p>
            )}
          </div>

          {/* Visual */}
          {showChart && (
            <div className="animate-slide-in-right" style={{ animationDelay: "200ms" }}>
              <RealEarChart />
            </div>
          )}
          {showImage && (
            <div className="animate-slide-in-right" style={{ animationDelay: "200ms" }}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={serviceImage!}
                  alt={serviceTitle}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
