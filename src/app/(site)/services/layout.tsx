import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Comprehensive hearing care services including hearing evaluations, hearing aid fitting, tinnitus management, custom ear protection, and pediatric audiology at Veritas Hearing Clinic.",
  openGraph: {
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
