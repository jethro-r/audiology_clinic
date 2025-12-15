"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Routes that should NOT show the main header/footer
  const isPortalRoute = pathname?.startsWith("/portal");
  const isAdminRoute = pathname?.startsWith("/admin");
  const hideMainLayout = isPortalRoute || isAdminRoute;

  if (hideMainLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
