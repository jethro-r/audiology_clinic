import Link from "next/link";
import {
  Shield,
  Clock,
  Award,
  ArrowRight,
} from "lucide-react";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import Button from "@/components/Button";
import FaqAccordion from "@/components/FaqAccordion";
import AnimateInView from "@/components/AnimateInView";
import { Section, SectionHeader, CTASection } from "@/components/sections";
import { type Service, type FAQ } from "@/lib/data";

export default function HomePageContent({
  services,
  faqs,
}: {
  services: Service[];
  faqs: FAQ[];
}) {
  return (
    <>
      <Hero />

      {/* Services Overview */}
      <Section variant="cream">
        <SectionHeader
          label="Our Services"
          title="Comprehensive Hearing Care"
          description="From diagnostic evaluations to advanced hearing solutions, we provide complete audiological care to help you hear your best."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.shortDescription}
              iconName={service.iconName}
              href={`/services#${service.slug}`}
              index={index}
            />
          ))}
        </div>

        <AnimateInView className="text-center mt-10">
          <Link href="/services">
            <Button variant="outline">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </AnimateInView>
      </Section>

      {/* My Promise Section */}
      <Section variant="primary" className="border-y border-white/10">
        <SectionHeader
          title="Our Promise"
          variant="dark"
        />
        <div className="grid md:grid-cols-3 gap-6 md:gap-12">
          <AnimateInView className="text-center">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-white/10 flex items-center justify-center">
              <Shield className="w-7 h-7 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Independent Guidance
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Advice you can trust — we work for your hearing, not brands.
            </p>
          </AnimateInView>
          <AnimateInView delay={100} className="text-center">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-white/10 flex items-center justify-center">
              <Award className="w-7 h-7 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Evidence-Based Advice
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Understand your hearing clearly with objective testing and honest recommendations.
            </p>
          </AnimateInView>
          <AnimateInView delay={200} className="text-center">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-white/10 flex items-center justify-center">
              <Clock className="w-7 h-7 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Ongoing Premium Care
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Long-term follow-up and fine-tuning to keep your hearing at its best.
            </p>
          </AnimateInView>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section variant="white" containerClassName="max-w-3xl">
        <SectionHeader
          label=""
          title="Frequently Asked Questions"
          description="Find answers to common questions about our services and what to expect."
        />
        <FaqAccordion faqs={faqs} />
      </Section>

      <CTASection
        title="Start your hearing journey with confidence"
        description="Independent guidance and professional support help you make decisions that truly suit your needs."
        primaryButton={{
          text: "Book Assessment",
          href: "/booking",
        }}
        variant="primary"
      />
    </>
  );
}
