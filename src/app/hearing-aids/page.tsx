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

      {/* Types of Hearing Aids */}
      <Section variant="white">
        <SectionHeader
          label="Hearing Aid Styles"
          title="Explore Hearing Aids"
          description="Hearing aids come in different styles and technology levels, here are the different types and whom they will be suitable for."
        />
        <div className="max-w-6xl mx-auto space-y-16">
          {/* RIC */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start"
          >
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-4">Receiver in Canal (RICs)</h3>
              <p className="text-foreground mb-6">
                RIC hearing aids are the most popular hearing aids. They balance advanced technology with a very discreet look. Their feature is the most complete and they are equipped with the latest technology. The hearing aid body sits behind the ear and houses the processing chip, microphone, battery and amplifier. The speaker (receiver) sits inside the ear coupled with a silicone dome, it is connected to the hearing aid body by a thin wire.
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-primary mb-2">Key features:</p>
                  <p className="text-foreground">Rechargeable, Bluetooth connectivity, App control</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-primary mb-2">Suitable for:</p>
                  <p className="text-foreground">mild to severe hearing loss, high frequency hearing loss, tech savvy</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-primary mb-2">Not suitable for:</p>
                  <p className="text-foreground">dexterity issues, simultaneous use with facial protective gear (ear muffs and safety glasses)</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-cream">
                <Image
                  src="/images/hearing-aid-ic-lifestyle.jpg"
                  alt="RIC hearing aid"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-cream">
                <Image
                  src="/images/hearing-aid-ric.png"
                  alt="RIC hearing aid close-up"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* BTE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start"
          >
            <div className="order-2 lg:order-1 space-y-4">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-cream">
                <Image
                  src="/images/hearing-aid-bte.png"
                  alt="BTE hearing aid"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-cream">
                <Image
                  src="/images/hearing-aid-bte-closeup.jpg"
                  alt="BTE hearing aid close-up"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-semibold text-primary mb-4">Behind The Ear (BTE)</h3>
              <p className="text-foreground mb-6">
                Behind-the-Ear (BTE) hearing aids are the "heavy-duty" counterparts to the RIC style. They are larger than RIC style hearing aids. In a BTE model, all the electronic components—including the speaker—are housed in a sturdy case that sits behind the ear, with sound being funnelled through a clear plastic tube into a silicone dome or custom-fitted earmould.
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-primary mb-2">Key features:</p>
                  <p className="text-foreground">Robust, ease of insertion</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-primary mb-2">Suitable for:</p>
                  <p className="text-foreground">moderate to profound hearing loss, dexterity issues, wax build up</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Custom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start"
          >
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-4">Custom hearing aids</h3>
              <p className="text-foreground mb-6">
                These are hearing aids that are custom made to fit your ears. Their size varies based on the level of customisation. There are Full-Shell, Half-Shell, In the Canal (ITC), and Completely In Canal (CIC) styles. The smaller the hearing aid is, the less features it may accommodate and the shorter the battery life.
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-primary mb-2">Key Features:</p>
                  <p className="text-foreground">Rechargeable (depending on size), bluetooth connection (depending on size), natural sound localisation.</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-primary mb-2">Suitable for:</p>
                  <p className="text-foreground">Dexterity issues (Full Shell and Half Shell styles), frequent ear muff usage, maximum discretion (ITC and CIC styles)</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-primary mb-2">Not Suitable for:</p>
                  <p className="text-foreground">Excessive ear wax</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-cream">
                <Image
                  src="/images/hearing-aid-custom-iic.jpeg"
                  alt="Custom hearing aid"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-cream">
                <Image
                  src="/images/hearing-aid-custom-itc.jpg"
                  alt="Custom hearing aid product shot"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Ongoing Care and Service */}
      <Section variant="cream">
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
