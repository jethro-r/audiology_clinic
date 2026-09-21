import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Services",
  description:
    "Comprehensive hearing care services including hearing evaluations, hearing aid fitting, tinnitus management, custom ear protection, and pediatric audiology at Veritas Hearing Clinic.",
  openGraph: {
    url: "/services",
    title: "Hearing Care Services | Veritas Hearing Audiology Clinic",
    description:
      "From diagnostic evaluations to advanced hearing solutions. We offer hearing aids, tinnitus management, custom ear protection, and pediatric audiology services.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
