// Global types for gtag.js — the shared snippet behind both Google Analytics 4
// (Measurement IDs like "G-XXXXXXXXXX") and Google Ads conversion tracking
// (IDs like "AW-XXXXXXXXXX"). Loaded in src/app/layout.tsx.
// Docs: https://developers.google.com/gtagjs/reference/api

interface Window {
  dataLayer: Record<string, unknown>[];
  gtag: (
    command: "config" | "event" | "js" | "set" | "get",
    targetOrCommand: string | Date,
    ...args: unknown[]
  ) => void;
}
