"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { Cookie } from "lucide-react";
import Button from "./Button";
import GaPageView from "./GaPageView";
import MetaPageView from "./MetaPageView";

/**
 * Consent gate for third-party tracking (GA4 + Meta Pixel).
 *
 * - On first visit: shows a cookie banner. No third-party scripts load
 *   until the visitor accepts.
 * - On accept: writes `veritas-cookie-consent = "accepted"` to localStorage,
 *   mounts the GA4 + Meta Pixel scripts, and mounts GaPageView / MetaPageView
 *   so subsequent route changes are tracked. The scripts' inline init fires
 *   the initial page_view automatically; GaPageView/MetaPageView skip their
 *   first render to avoid double-counting it.
 * - On decline: writes `veritas-cookie-consent = "declined"`. No scripts load,
 *   no events fire, no third-party requests are made.
 * - On return visits: reads localStorage and either mounts scripts (accepted)
 *   or does nothing (declined). The banner only reappears if storage is empty.
 *
 * Vercel Analytics / Speed Insights are intentionally NOT gated here — they
 * remain in the root layout because they are first-party and privacy-friendly.
 */
type ConsentState = "loading" | "accepted" | "declined" | "unset";

const CONSENT_KEY = "veritas-cookie-consent";

export default function ConsentProvider() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const [state, setState] = useState<ConsentState>("loading");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored === "accepted" || stored === "declined") {
        setState(stored);
      } else {
        setState("unset");
      }
    } catch {
      // localStorage unavailable (private mode, disabled storage, etc.)
      setState("unset");
    }
  }, []);

  const setConsent = (choice: "accepted" | "declined") => {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      // Ignore write failures — banner just reappears next visit.
    }
    setState(choice);
  };

  return (
    <>
      {state === "accepted" && (
        <>
          {gaId && (
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
                  gtag('config', '${gaId}');
                `}
              </Script>
              <GaPageView />
            </>
          )}
          {pixelId && (
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
              <MetaPageView />
            </>
          )}
        </>
      )}

      {state === "unset" && (
        <div
          className="fixed bottom-0 inset-x-0 z-[60] px-4 pb-4 sm:pb-6 animate-fade-in"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
        >
          <div className="max-w-5xl mx-auto bg-primary-dark text-white rounded-2xl shadow-2xl border border-white/10 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-white/80 leading-relaxed">
                We use cookies to improve your experience and understand
                website traffic. By clicking &quot;Accept&quot;, you agree to
                our use of cookies.{" "}
                <Link
                  href="/privacy-policy"
                  className="text-secondary underline hover:text-secondary-light transition-colors"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
            <div className="flex gap-2 sm:flex-shrink-0">
              <button
                type="button"
                onClick={() => setConsent("declined")}
                className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 px-3 py-2 text-sm min-h-[36px] border-2 border-white/40 text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 cursor-pointer"
              >
                Decline
              </button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setConsent("accepted")}
              >
                Accept
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
