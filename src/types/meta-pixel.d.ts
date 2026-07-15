// Global types for the Meta (Facebook) Pixel, loaded in src/app/layout.tsx.
// `fbq` is the entry point for sending events to Meta (PageView, Lead, etc.).
// Docs: https://developers.facebook.com/docs/meta-pixel/reference

interface Window {
  fbq: (
    command: "init" | "track" | "trackCustom",
    eventNameOrPixelId: string,
    ...args: unknown[]
  ) => void;
  _fbq?: unknown;
}
