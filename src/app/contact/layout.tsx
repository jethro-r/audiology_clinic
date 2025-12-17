import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Veritas Hearing to schedule an appointment or ask questions. Located at 42a Hillcrest Road, Hillcrest, Hamilton. Call 0800 555 051.",
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
