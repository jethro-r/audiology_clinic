import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/booking" },
  title: "Book an Assessment",
  description:
    "Book a comprehensive hearing assessment online with Paul Hsu at Veritas Hearing, Frankton, Hamilton. Choose a time that suits you.",
  openGraph: {
    url: "/booking",
    title: "Book an Assessment | Veritas Hearing",
    description:
      "Book a comprehensive hearing assessment online with Paul Hsu at Veritas Hearing, Frankton, Hamilton. Choose a time that suits you.",
  },
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
