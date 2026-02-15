"use client";

import { PageHero, Section, SectionHeader, CTASection } from "@/components/sections";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

export default function HearingAidsPage() {
  return (
    <>
      <PageHero
        badge="Hearing Aids"
        title="Hearing Aids at Veritas Hearing"
        description="Hearing aids are not just devices. They are part of how your brain reconnects with sound and meaning."
      />

      {/* Introduction */}
      <Section variant="white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-lg text-primary leading-relaxed">
            At Veritas Hearing, every recommendation is made with care, precision, and independence — ensuring your solution is appropriate for your hearing today and considered for the years ahead.
          </p>
        </motion.div>
      </Section>

      {/* What is included */}
      <Section variant="cream">
        <SectionHeader
          label="Comprehensive Care"
          title="What is included when you get hearing aids from Veritas Hearing"
        />
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[
                "A comprehensive hearing assessment and discussion of your listening needs",
                "Careful selection of hearing aid style and technology appropriate for you",
                "Professional fitting using real‑ear verification to ensure accurate amplification",
                "Fine‑tuning based on your comfort, sound quality, and real‑world listening",
                "Education on use, care, and expectations",
                "Follow‑up appointments to adjust and optimise performance",
                "Ongoing support to maintain comfort, function, and hearing health",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-secondary shrink-0 mt-0.5" />
                  <span className="text-foreground text-lg">{item}</span>
                </li>
              ))}
            </motion.ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative w-full aspect-4/3 rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/hearing-aids-1.png"
                alt="Hearing aids professional fitting"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Ongoing Care and Service */}
      <Section variant="white">
        <SectionHeader
          label="Ongoing Care"
          title="Ongoing care and service"
          description="Hearing and hearing aid performance change over time. Exposure to moisture, dust, and daily use can affect how devices function. Ongoing care at Veritas Hearing ensures consistent review, precise adjustment, and long-term support."
        />
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-foreground mb-6">
                Veritas Hearing provides ongoing care to help keep your hearing aids performing as they should, including:
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Routine hearing tests and adjustments",
                  "Regular device electronic check against manufacturer specifications",
                  "Ear wax management",
                  "Redux moisture removal",
                  "LACE AI auditory training (when indicated)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted">
                Our aim is to ensure your hearing aids continue to deliver clear, comfortable sound — not just at the beginning, but long term.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative w-full aspect-4/3 rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/hearing-aids-2.png"
                alt="Ongoing hearing care service"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <CTASection
        title="If you are considering hearing aids, the best place to start is a comprehensive hearing assessment or a hearing aid discussion."
        description="To book an appointment or speak with us, please contact Veritas Hearing."
        primaryButton={{ text: "Contact us", href: "/contact" }}
        variant="primary"
      />
    </>
  );
}
