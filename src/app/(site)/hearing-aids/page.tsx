import { PageHero, Section, SectionHeader, CTASection } from "@/components/sections";
import HearingAidTypeCards from "@/components/HearingAidTypeCards";
import HearingAidBrands from "@/components/HearingAidBrands";
import HearingAidCare from "@/components/HearingAidCare";
import HearingAidStyles from "@/components/HearingAidStyles";
import { hearingAidTypes, brands, comprehensiveCareItems } from "@/lib/hearingAidData";

export default function HearingAidsPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        badge="Our Hearing Aids"
        title="Hearing Aids"
        description="Explore Hearing Aids and Hearing Aid manufacturers"
      />

      {/* Introduction */}
      <Section variant="white">
        <div className="max-w-6xl mx-auto">
          <p className="text-lg text-primary leading-relaxed">
            There are many hearing aid manufacturers on the market right now and there are hundreds of hearing aids to choose from. As an independent clinic, we are not owned by a hearing aid company and we are able to recommend the most suitable hearing aid(s) for you.
          </p>
          <p className="text-lg text-primary leading-relaxed mt-4">
            The price of each manufacturer&apos;s hearing aids is determined, by and large, by the level of technology
            – not so much the shape, or size, or style (although there can be slight variation in price depending on
            how much customisation you require). Ring and book a 30 minute chat with us if you are not sure about what
            you need, or what you&apos;ve been quoted.
          </p>
        </div>
      </Section>

      {/* Hearing Aid Type Cards */}
      <Section variant="cream" containerClassName="max-w-4xl">
        <SectionHeader title="Explore Hearing Aid Types" centered />
        <HearingAidTypeCards types={hearingAidTypes} />
      </Section>

      {/* Brands */}
      <Section variant="white" containerClassName="max-w-4xl">
        <SectionHeader label="Brands" title="Trusted Hearing Aid Brands" />
        <HearingAidBrands brands={brands} />
      </Section>

      {/* Comprehensive Care */}
      <Section variant="cream">
        <SectionHeader label="Comprehensive Care" title="What is included when you get hearing aids" />
        <HearingAidCare items={comprehensiveCareItems} />
      </Section>

      {/* Detailed Hearing Aid Styles */}
      <Section variant="white">
        <SectionHeader
          label="Hearing Aid Styles"
          title="Hearing Aid Styles in Detail"
          description="Each style has unique advantages. Learn more about which might be right for you."
        />
        <HearingAidStyles types={hearingAidTypes} />
      </Section>

      {/* CTA Section */}
      <CTASection
        title="Not sure where to start?"
        description="Book a hearing assessment or a chat with us to find the right hearing aid for you."
        primaryButton={{ text: "Contact us", href: "/contact" }}
        variant="primary"
      />
    </>
  );
}
