import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import AuthProvider from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Veritas Hearing | Hear better. Live fully",
    template: "%s | Veritas Hearing",
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
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
