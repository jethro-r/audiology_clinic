// Global types for gtag.js, loaded in src/app/layout.tsx. Here gtag is used
// only for GA4 (via the Google Tag container / a Measurement ID). Google Ads
// conversions are imported from GA4 key events — no Ads tag is fired in code.
// Docs: https://developers.google.com/gtagjs/reference/api

interface Window {
  dataLayer: Record<string, unknown>[];
  gtag: (
    command: "config" | "event" | "js" | "set" | "get",
    targetOrCommand: string | Date,
    ...args: unknown[]
  ) => void;
}
