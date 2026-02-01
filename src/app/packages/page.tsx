"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { PageHero, Section, SectionHeader, CTASection } from "@/components/sections";

const steps = [
  {
    number: "1",
    title: "Choose your care package",
    description: "Essential (one-off) or Premium (annual subscription)"
  },
  {
    number: "2",
    title: "Select your hearing aid technology",
    description: "Based on your lifestyle, hearing needs, and preferences"
  },
  {
    number: "3",
    title: "Receive expert support and optimisation",
    description: "According to the package you choose"
  }
];

const comparisonData = [
  {
    feature: "Hearing aid fitting & programming",
    essential: true,
    premium: true
  },
  {
    feature: "Real-ear measurement verification",
    essential: true,
    premium: true
  },
  {
    feature: "Speech-in-noise outcome tracking",
    essential: true,
    premium: true
  },
  {
    feature: "LACE AI auditory training",
    essential: "—",
    premium: "Included (auditory training to improve speech comprehension)"
  },
  {
    feature: "Routine fine-tuning & checks",
    essential: "2–3 visits, 3–6 months",
    premium: "6–8 visits over 12 months"
  },
  {
    feature: "Annual hearing review (includes device comprehensive service, ear wax removal & Redux moisture management)",
    essential: "Optional add-on",
    premium: "Included"
  },
  {
    feature: "Device comprehensive service",
    essential: "Optional add-on",
    premium: "Included in Annual Review"
  },
  {
    feature: "Ear wax removal",
    essential: "Optional add-on",
    premium: "Included in Annual Review"
  },
  {
    feature: "Redux moisture management",
    essential: "Optional add-on",
    premium: "Included in Annual Review"
  }
];

export default function PackagesPage() {
  return (
    <>
      <PageHero
        badge="Hearing Aid Packages"
        title="Clear options. Evidence-based care. Long-term support."
        description="At Veritas Hearing, we don't sell hearing aids as standalone products. Our hearing care packages are designed around long-term listening outcomes — so you know exactly what's included from the start."
      />

      <Section variant="white" containerClassName="max-w-5xl">
        <SectionHeader
          title="How it works"
        />
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-background rounded-2xl p-6 text-center"
            >
              <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section variant="cream" containerClassName="max-w-5xl">
        <SectionHeader
          title="Key highlights"
        />
        <div className="grid md:grid-cols-2 gap-6">
          {/* Essential Care */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 border border-border"
          >
            <h3 className="text-xl font-bold text-foreground mb-2">Essential Care</h3>
            <p className="text-secondary font-medium mb-4">One-off purchase</p>
            <p className="text-muted mb-6">
              Ideal for patients who want straightforward support and flexibility.
            </p>
            <div>
              <p className="text-sm font-medium text-foreground mb-3">Optional add-ons available:</p>
              <ul className="space-y-2 text-sm text-muted">
                <li>• Annual hearing review</li>
                <li>• Device comprehensive service</li>
                <li>• Ear wax removal</li>
                <li>• Redux moisture management</li>
              </ul>
            </div>
          </motion.div>

          {/* Premium Care */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 border-2 border-primary"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-foreground">Premium Care</h3>
              <span className="bg-secondary text-white text-xs px-3 py-1 rounded-full font-medium">Recommended</span>
            </div>
            <p className="text-secondary font-medium mb-4">Annual subscription</p>
            <p className="text-muted mb-6">
              Complete support with everything included — no extra add-ons required.
            </p>
            <div>
              <p className="text-sm font-medium text-foreground mb-3">Included:</p>
              <ul className="space-y-2 text-sm text-muted">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Routine fine-tuning</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Annual Hearing Review (device comprehensive service, ear wax removal, and Redux moisture management)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>LACE AI auditory training — improves speech comprehension in challenging listening environments</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </Section>

      <Section variant="white" containerClassName="max-w-5xl">
        <SectionHeader
          title="Compare packages"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="overflow-x-auto"
        >
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-4 px-4 font-semibold text-foreground">
                  Feature
                </th>
                <th className="text-center py-4 px-4 font-semibold text-foreground">
                  Essential Care
                  <span className="block text-sm font-normal text-muted">(one-off)</span>
                </th>
                <th className="text-center py-4 px-4 font-semibold text-primary">
                  Premium Care
                  <span className="block text-sm font-normal text-muted">(annual subscription)</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index} className="border-b border-border">
                  <td className="py-4 px-4 text-sm text-foreground">
                    {row.feature}
                  </td>
                  <td className="py-4 px-4 text-center text-sm">
                    {typeof row.essential === "boolean" ? (
                      row.essential ? (
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-muted mx-auto" />
                      )
                    ) : (
                      <span className={row.essential === "—" ? "text-muted" : "text-foreground"}>
                        {row.essential}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center text-sm">
                    {typeof row.premium === "boolean" ? (
                      row.premium ? (
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-muted mx-auto" />
                      )
                    ) : (
                      <span className="text-foreground">{row.premium}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </Section>

      <CTASection
        title="Not sure which package is right for you?"
        description="We can help you find the right option based on your lifestyle and hearing needs."
        primaryButton={{
          text: "Book Assessment",
          href: "/contact",
        }}
        variant="primary"
      />
    </>
  );
}
