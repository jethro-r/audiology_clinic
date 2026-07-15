"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Fires Meta Pixel `PageView` events on client-side route changes.
 *
 * Mirrors the GaPageView component: the App Router navigates without a full
 * page reload, so the base code's initial PageView never re-fires. This sends
 * the subsequent PageViews on every navigation.
 */
export default function MetaPageView() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!pixelId) return;

    // The base code in layout.tsx already sent the initial PageView;
    // skip the first render so we don't double-count it.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (typeof window.fbq !== "function") return;

    window.fbq("track", "PageView");
  }, [pixelId, pathname]);

  return null;
}
