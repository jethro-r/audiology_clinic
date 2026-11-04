import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getServicesDirect, getServiceBySlugDirect } from "@/lib/data";
import { parseServiceLanding, PHONE_DISPLAY, PHONE_TEL } from "@/lib/serviceLanding";
import { CTASection } from "@/components/sections";
import LandingHero from "@/components/services/LandingHero";
import LandingFeatureCards from "@/components/services/LandingFeatureCards";
import LandingSteps from "@/components/services/LandingSteps";
import LandingAudience from "@/components/services/LandingAudience";
import LandingFaq from "@/components/services/LandingFaq";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Pre-render published landing pages; unpublished slugs render on demand.
export async function generateStaticParams() {
  const services = await getServicesDirect();
  return services
    .filter((s) => s.landingEnabled)
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlugDirect(slug);
  if (!service?.landingEnabled) return {};
  const landing = parseServiceLanding(service.landing);
  return {
    title: landing?.seo?.title || `${service.title} in Hamilton | Veritas Hearing`,
    description: landing?.seo?.description || service.shortDescription,
  };
}

export default async function ServiceLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceBySlugDirect(slug);

  if (!service) notFound();
  // Landing not published (or content removed) → send visitors to the
  // services listing instead of a dead end.
  if (!service.landingEnabled) redirect(`/services#${service.slug}`);

  const landing = parseServiceLanding(service.landing);
  if (!landing) notFound();

  return (
    <>
      <LandingHero
        hero={landing.hero}
        serviceTitle={service.title}
        serviceImage={service.image}
      />
      {landing.featureCards && <LandingFeatureCards data={landing.featureCards} />}
      {landing.steps && <LandingSteps data={landing.steps} />}
      {landing.audience && <LandingAudience data={landing.audience} />}
      {landing.faq && <LandingFaq data={landing.faq} />}
      <CTASection
        title={landing.cta?.heading || "It all starts with a hearing test"}
        description={
          landing.cta?.description ||
          "Book online, or call and talk to an audiologist. Sudden hearing loss? Call us — we'll see you the same day."
        }
        primaryButton={{ text: "Book Assessment", href: "/booking" }}
        secondaryButton={{ text: PHONE_DISPLAY, href: `tel:${PHONE_TEL}` }}
        variant="primary"
      />
    </>
  );
}
