"use client";

import { useEffect, useRef, useState } from "react";

type ProgressState = "idle" | "loading" | "completing";

// The (site) loading skeleton carries [data-page-skeleton]; while it is on
// screen the route has committed but real content hasn't arrived yet.
const SKELETON_SELECTOR = "[data-page-skeleton]";
// Backstop for clicks that never become navigations (e.g. an unmarked file
// download link). A visible skeleton means a navigation is in flight, so
// this stays silent then — the poll owns completion.
const STALL_MS = 10_000;
const HIDE_MS = 400; // matches the width + opacity transition duration

export default function NavigationProgress() {
  const [state, setState] = useState<ProgressState>("idle");
  const targetPathRef = useRef<string | null>(null);

  // The App Router exposes no global navigation events, so the bar starts on
  // qualifying link clicks: local, not the current page, not target/download.
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (
        !href?.startsWith("/") ||
        anchor.hasAttribute("target") ||
        anchor.hasAttribute("download")
      )
        return;

      const path = href.split("#")[0].split("?")[0];
      if (path === window.location.pathname) return;

      targetPathRef.current = path;
      setState("loading");
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // While loading, poll until the clicked page's content is actually on
  // screen: the URL has reached the target path, and the loading skeleton
  // (if one was shown) has been replaced by real content.
  useEffect(() => {
    if (state !== "loading") return;

    const finish = () => setState("completing");
    const poll = setInterval(() => {
      if (window.location.pathname !== targetPathRef.current) return;
      if (document.querySelector(SKELETON_SELECTOR)) return;
      finish();
    }, 100);

    const stall = setTimeout(() => {
      if (!document.querySelector(SKELETON_SELECTOR)) finish();
    }, STALL_MS);

    return () => {
      clearInterval(poll);
      clearTimeout(stall);
    };
  }, [state]);

  // Hide the bar once the completion transition has played.
  useEffect(() => {
    if (state !== "completing") return;
    const hide = setTimeout(() => setState("idle"), HIDE_MS);
    return () => clearTimeout(hide);
  }, [state]);

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
          state === "loading" ? "progress-load 20s ease-out forwards" : "none",
      }}
    />
  );
}
