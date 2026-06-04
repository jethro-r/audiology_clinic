import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Button from "./Button";

export default function Hero() {
  return (
    <section className="relative bg-primary pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-12 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="animate-slide-in-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4 sm:mb-6">
              Independent hearing care, <br className="hidden sm:block" />
              <span className="text-secondary">delivered with integrity</span>
            </h1>
            <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8 max-w-xl">
              Veritas Hearing is a locally owned clinic providing high-standard, independent audiology care. We offer precise diagnostics, access to leading hearing technologies, and ongoing support — with transparent, ethical pricing and recommendations made solely in your best interest.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/booking">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Book Your Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-slide-in-right" style={{ animationDelay: "200ms" }}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/frontend/hero-clinic.webp"
                alt="Veritas Hearing professional care"
                fill
                sizes="50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
