import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about HearWell Audiology Clinic - our mission, values, and commitment to providing compassionate hearing healthcare since 2005.",
  openGraph: {
    title: "About Us | HearWell Audiology Clinic",
    description:
      "Since 2005, HearWell Audiology Clinic has been dedicated to helping our community hear better through expert, compassionate care.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
