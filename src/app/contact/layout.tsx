import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Veritas Hearing to schedule an appointment or ask questions. Located at 37 Lake Road, Frankton, Hamilton 3204. Call 029 0451 0839.",
  openGraph: {
    title: "Contact Us | Veritas Hearing",
    description:
      "Schedule an appointment or get in touch with our team. We're here to help with your hearing healthcare needs.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
