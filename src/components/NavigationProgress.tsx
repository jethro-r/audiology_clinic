"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type ProgressState = "idle" | "loading" | "completing";

export default function NavigationProgress() {
  const pathname = usePathname();
  const [state, setState] = useState<ProgressState>("idle");
  const completeTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      // Walk up from click target to find an anchor tag
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Only trigger for local, non-hash, non-external links
      if (
        href.startsWith("/") &&
        !href.startsWith("#") &&
        !target.hasAttribute("target")
      ) {
        setState("loading");
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // When pathname changes, navigation is done — complete the bar
  useEffect(() => {
    if (state === "loading") {
      setState("completing");
      completeTimerRef.current = setTimeout(() => {
        setState("idle");
      }, 400);
    }

    return () => {
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
    };
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  if (state === "idle") return null;

  return (
    <div
      className="fixed top-0 left-0 h-[2px] z-[60]"
      style={{
        width: state === "completing" ? "100%" : undefined,
        backgroundColor: "var(--secondary)",
        opacity: state === "completing" ? 0 : 1,
        transition: state === "completing"
          ? "width 200ms ease-out, opacity 300ms ease-out 100ms"
          : "none",
        animation:
          state === "loading" ? "progress-load 2s ease-out forwards" : "none",
      }}
    />
  );
}
