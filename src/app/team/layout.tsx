import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the expert audiologists and caring staff at HearWell Audiology Clinic. Our team is dedicated to providing personalized hearing healthcare.",
  openGraph: {
    title: "Our Team | HearWell Audiology Clinic",
    description:
      "Meet our team of experienced audiologists and staff committed to your hearing health.",
  },
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
