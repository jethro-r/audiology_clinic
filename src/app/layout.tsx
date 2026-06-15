import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NavigationProgress from "@/components/NavigationProgress";
import GaPageView from "@/components/GaPageView";
import "./globals.css";

export const metadata: Metadata = {
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
  // gtag.js loads the Google Tag container (GT-…) or a standalone GA4
  // Measurement ID (G-…). Google Ads is handled inside the container, and Ads
  // conversions are imported from GA4 key events — so no Ads config lives here.
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const hasGtag = Boolean(gaId);
  const gtagConfigs = gaId ? `gtag('config', '${gaId}');` : "";

  return (
    <html lang="en">
      <body className="antialiased">
        <NavigationProgress />
        {hasGtag && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                ${gtagConfigs}
              `}
            </Script>
          </>
        )}
        {children}
        <GaPageView />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
