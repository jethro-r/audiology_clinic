import { Mail, Phone, ShieldCheck } from "lucide-react";
import { PageHero, Section, CTASection } from "@/components/sections";
import AnimateInView from "@/components/AnimateInView";

// NOTE: Placeholder privacy statement generated from
// https://www.privacy.org.nz/responsibilities/privacy-statement-generator/
// Replace with the final copy once it's supplied.
const sections = [
  {
    title: "Information We Collect",
    body: "We collect personal information from you, including information about your:",
    items: ["Location", "Computer or network"],
  },
  {
    title: "How We Use Your Information",
    body: "We collect your personal information in order to:",
    items: ["Improve our website traffic"],
  },
  {
    title: "Your Rights",
    body: "You have the right to ask for a copy of any personal information we hold about you, and to ask for it to be corrected if you think it is wrong.",
    items: [],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        badge="Privacy Policy"
        title="Privacy Statement"
        description="How Veritas Hearing collects, uses, and protects your personal information."
      />

      <Section variant="white" containerClassName="max-w-3xl">
        <AnimateInView>
          <div className="flex items-center gap-3 text-primary mb-10">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm text-muted">Last updated: July 2026</p>
          </div>

          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-3">
                  {section.title}
                </h2>
                <p className="text-muted leading-relaxed mb-3">
                  {section.body}
                </p>
                {section.items.length > 0 && (
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-muted"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0 mt-2.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-3">
                Contacting Us About Your Information
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                If you&apos;d like to ask for a copy of your information, or to
                have it corrected, please contact us:
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:admin@veritashearing.co.nz"
                  className="flex items-center gap-3 text-primary hover:text-primary-light transition-colors"
                >
                  <Mail className="h-5 w-5 text-secondary flex-shrink-0" />
                  admin@veritashearing.co.nz
                </a>
                <a
                  href="tel:+642904510839"
                  className="flex items-center gap-3 text-primary hover:text-primary-light transition-colors"
                >
                  <Phone className="h-5 w-5 text-secondary flex-shrink-0" />
                  029 0451 0839
                </a>
              </div>
            </div>
          </div>
        </AnimateInView>
      </Section>

      <CTASection
        title="Questions about your privacy?"
        description="Get in touch and we'll be happy to help with any requests about your personal information."
        primaryButton={{ text: "Contact Us", href: "/contact" }}
        variant="cream"
      />
    </>
  );
}
