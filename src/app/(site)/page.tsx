import type { Metadata } from "next";
import { getServicesDirect, getFaqsDirect } from "@/lib/data";
import HomePageContent from "@/components/HomePageContent";
import FaqSchema from "@/components/schema/FaqSchema";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: { absolute: "Veritas Hearing | Independent Audiologist in Frankton, Hamilton" },
  description:
    "Honest, evidence-based hearing care with no sales pressure. Book a comprehensive hearing assessment with Paul Hsu, Frankton, Hamilton.",
  openGraph: {
    url: "/",
    title: "Veritas Hearing | Independent Audiologist in Frankton, Hamilton",
    description:
      "Honest, evidence-based hearing care with no sales pressure. Book a comprehensive hearing assessment with Paul Hsu, Frankton, Hamilton.",
  },
};

export default async function HomePage() {
  const [services, faqs] = await Promise.all([
    getServicesDirect({ homepage: true }),
    getFaqsDirect(),
  ]);

  return (
    <>
      <FaqSchema faqs={faqs} />
      <HomePageContent services={services} faqs={faqs} />
    </>
  );
}
