import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/resources" },
  title: "Patient Resources",
  description:
    "Patient resources including what to expect at your first visit, insurance information, FAQs, downloadable forms, and hearing health articles.",
  openGraph: {
    url: "/resources",
    title: "Patient Resources | Veritas Hearing Audiology Clinic",
    description:
      "Everything you need for your visit - first appointment guide, insurance info, FAQs, and downloadable forms.",
  },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
