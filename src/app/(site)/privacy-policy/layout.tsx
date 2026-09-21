import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy-policy" },
  title: "Privacy Policy",
  description:
    "How Veritas Hearing collects, uses, and protects your personal information.",
  openGraph: {
    url: "/privacy-policy",
    title: "Privacy Policy",
    description:
      "How Veritas Hearing collects, uses, and protects your personal information.",
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
