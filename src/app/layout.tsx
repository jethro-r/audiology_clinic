import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NavigationProgress from "@/components/NavigationProgress";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Veritas Hearing | Hear better. Live fully",
    template: "%s | Veritas Hearing",
  },
  icons: {
    icon: "/frontend/icon.png",
    apple: "/frontend/icon.png",
  },
  description:
    "Veritas Hearing is an independent, clinician-led audiology practice dedicated to providing clear, honest, and evidence-based hearing care. Accurate diagnosis, personalised treatment, no sales pressure.",
  keywords: [
    "audiology",
    "hearing aids",
    "hearing test",
    "audiologist",
    "tinnitus",
    "hearing loss",
    "ear protection",
    "Hamilton",
    "Auckland",
    "New Zealand",
    "hearing care",
    "evidence-based",
    "independent audiology",
  ],
  authors: [{ name: "Veritas Hearing" }],
  openGraph: {
    type: "website",
    locale: "en_NZ",
    siteName: "Veritas Hearing",
    title: "Veritas Hearing | Hear better. Live fully",
    description:
      "Independent, clinician-led audiology practice providing clear, honest, and evidence-based hearing care in New Zealand.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veritas Hearing | Hear better. Live fully",
    description:
      "Independent, clinician-led audiology practice providing evidence-based hearing care.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // GA4 + Meta Pixel scripts are loaded conditionally by ConsentProvider
  // (mounted in the (site) layout) based on the visitor's cookie choice.
  // Vercel Analytics + Speed Insights remain here as first-party,
  // non-ad tracking that doesn't require consent.
  return (
    <html lang="en">
      <body className="antialiased">
        <NavigationProgress />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
