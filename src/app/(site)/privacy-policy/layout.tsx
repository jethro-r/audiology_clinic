import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Veritas Hearing collects, uses, and protects your personal information.",
  openGraph: {
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
