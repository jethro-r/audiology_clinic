import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NavigationProgress from "@/components/NavigationProgress";
import GaPageView from "@/components/GaPageView";
import MetaPageView from "@/components/MetaPageView";
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

  // Meta Pixel base code. Fires the initial PageView on load; client-side
  // route changes are handled by the MetaPageView component below.
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const hasPixel = Boolean(pixelId);

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
        {hasPixel && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window,document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${pixelId}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
        {children}
        <GaPageView />
        <MetaPageView />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
