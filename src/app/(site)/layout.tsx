import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getFooterServices } from "@/lib/data";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footerServices = await getFooterServices();

  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer services={footerServices} />
    </>
  );
}
