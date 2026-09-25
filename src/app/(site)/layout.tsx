import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsentProvider from "@/components/ConsentProvider";
import LocalBusinessSchema from "@/components/schema/LocalBusinessSchema";
import { getFooterServices } from "@/lib/data";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footerServices = await getFooterServices();

  return (
    <>
      <LocalBusinessSchema />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer services={footerServices} />
      <ConsentProvider />
    </>
  );
}
