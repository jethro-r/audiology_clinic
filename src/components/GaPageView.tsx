"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Fires GA4 `page_view` events on client-side route changes.
 *
 * The Next.js App Router performs client-side navigation without a full page
 * reload, so gtag's automatic initial page_view (sent once by the `config`
 * call in the root layout) never re-fires. This component sends the
 * subsequent page_views on every navigation.
 *
 * Pathname-only by design: `useSearchParams()` would force the whole layout
 * into dynamic rendering. UTM/query params on the initial landing URL are
 * still captured by the config-driven first page_view.
 */
export default function GaPageView() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!gaId) return;

    // The config('G-…') call in layout.tsx already sent the initial page_view;
    // skip the first render so we don't double-count it.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (typeof window.gtag !== "function") return;

    window.gtag("event", "page_view", {
      page_path: pathname,
      page_location: `${window.location.origin}${pathname}`,
      send_to: gaId,
    });
  }, [gaId, pathname]);

  return null;
}
