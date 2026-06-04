import { getServicesDirect } from "@/lib/data";
import { PageHero, Section, CTASection } from "@/components/sections";
import ServicesContent from "@/components/ServicesContent";

export const revalidate = 3600;

export default async function ServicesPage() {
  const services = await getServicesDirect();

  return (
    <>
      <PageHero
        badge="Our Services"
        title="Comprehensive Hearing Care Services"
        description="From diagnostic evaluations to advanced hearing solutions, we provide complete audiological care using the latest technology and evidence-based practices."
      />

      <Section variant="white">
        <ServicesContent services={services} />
      </Section>

      <CTASection
        title="Not sure which service you need?"
        description="We can help you find the right option."
        primaryButton={{
          text: "Book Assessment",
          href: "/booking",
        }}
        variant="primary"
      />
    </>
  );
}
