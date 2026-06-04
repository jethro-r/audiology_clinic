import { getServicesDirect, getFaqsDirect } from "@/lib/data";
import HomePageContent from "@/components/HomePageContent";

export const revalidate = 3600;

export default async function HomePage() {
  const [services, faqs] = await Promise.all([
    getServicesDirect({ homepage: true }),
    getFaqsDirect(),
  ]);

  return <HomePageContent services={services} faqs={faqs} />;
}
