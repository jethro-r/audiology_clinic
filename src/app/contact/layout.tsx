import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact HearWell Audiology Clinic to schedule an appointment or ask questions. Located at 123 Healthcare Drive, Medical City. Call (555) 123-4567.",
  openGraph: {
    title: "Contact Us | HearWell Audiology Clinic",
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
