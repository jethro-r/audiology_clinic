"use client";

import { PageHero, Section, SectionHeader } from "@/components/sections";
import { motion } from "framer-motion";
import { CheckCircle, Shield, Droplets, Brain, Award } from "lucide-react";
import Link from "next/link";
import Button from "@/components/Button";
import Image from "next/image";

export default function HearingAidsPage() {
  return (
    <>
      <PageHero
        badge="Hearing Aids"
        title="Hearing Aids"
        description="Professional hearing care with honest guidance and ongoing support"
        image="/images/hero image option e.jpg"
      />

      {/* Introduction */}
      <Section variant="cream">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
              Hearing aids at Veritas Hearing
            </h2>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <p className="text-xl text-primary leading-relaxed mb-6">
                Hearing aids are not just devices. They are part of how your brain reconnects with sound and meaning.
              </p>
              <p className="text-primary leading-relaxed">
                At Veritas Hearing, every recommendation is made with care, precision, and independence — ensuring your solution is appropriate for your hearing today and considered for the years ahead.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 bg-white rounded-2xl p-8 shadow-sm border border-border">
                <Image
                  src="/images/ph-packshot-audeo-i-r-p7-pair-without-receiver.png"
                  alt="Phonak Audéo hearing aids"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Are hearing aids right for you? */}
      <Section variant="white">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
              Are hearing aids right for you?
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-primary leading-relaxed mb-4">
                Hearing aids can help when hearing loss is affecting conversations, work, social situations, or daily listening effort. Many people notice they are feeling more tired, missing details, or avoiding situations they once enjoyed.
              </p>
              <p className="text-primary leading-relaxed mb-4">
                A hearing assessment is always the first step. Sometimes hearing aids are appropriate, and sometimes they are not. Our role is to guide you clearly and realistically, so you can make an informed decision that feels right for you.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-56 sm:h-80 lg:h-full rounded-2xl overflow-hidden"
          >
            <Image
              src="/images/iStock-2225701270.jpg"
              alt="Person considering hearing aids"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </Section>

      {/* Our approach */}
      <Section variant="primary" className="border-y border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-secondary mx-auto mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
              Our approach to hearing aids
            </h2>
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-6 sm:mb-8">
              Veritas Hearing is an independent clinic. This means recommendations are based on your hearing, your ears, and your lifestyle — not sales targets or brand preferences.
            </p>
            <p className="text-lg text-white/80 leading-relaxed mb-8">
              We work with leading hearing aid manufacturers and focus on fitting hearing aids properly, verifying their performance, and supporting you over time.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 inline-block">
              <p className="text-white text-base sm:text-lg font-semibold">
                Every client who proceeds with hearing aids receives the same professional standard of care, regardless of the technology chosen.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* What is included */}
      <Section variant="cream">
        <SectionHeader
          label="Comprehensive Care"
          title="What is included when you get hearing aids from Veritas Hearing"
          description="Your hearing aid care includes everything you need for success"
        />
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-sm border border-border"
          >
            <p className="text-primary text-lg leading-relaxed mb-8">
              When you decide to proceed with hearing aids, your care does not stop at the fitting appointment. Ongoing support is a core part of how Veritas Hearing operates.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "A comprehensive hearing assessment and discussion of your listening needs",
                "Careful selection of hearing aid style and technology appropriate for you",
                "Professional fitting using real‑ear verification to ensure accurate amplification",
                "Fine‑tuning based on your comfort, sound quality, and real‑world listening",
                "Education on use, care, and expectations",
                "Follow‑up appointments to adjust and optimise performance",
                "Ongoing support to maintain comfort, function, and hearing health",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                  <span className="text-primary">{item}</span>
                </li>
              ))}
            </ul>
            <div className="bg-[var(--secondary)]/10 border-l-4 border-[var(--secondary)] p-6 rounded-r-lg">
              <p className="text-primary font-semibold text-lg">
                There are no service tiers or add‑on packages. This level of care is standard for everyone.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Ongoing care and service */}
      <Section variant="white">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            label="Ongoing Care"
            title="Ongoing care and service"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="prose prose-slate max-w-none mb-8"
          >
            <p className="text-xl text-primary leading-relaxed mb-6">
              Hearing and hearing aid performance change over time. Exposure to moisture, dust, and daily use can affect how devices function. Ongoing care at Veritas Hearing ensures consistent review, precise adjustment, and long-term support.
            </p>
            <p className="text-primary leading-relaxed mb-6">
              Veritas Hearing provides ongoing care to help keep your hearing aids performing as they should, including:
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              { title: "Routine hearing tests and adjustments", desc: "Regular reviews to ensure optimal performance" },
              { title: "Electronic device checks", desc: "Regular device electronic check against manufacturer specifications" },
              { title: "Ear wax management", desc: "Professional ear wax management when required" },
              { title: "Redux moisture removal", desc: "Advanced moisture removal technology to protect your devices" },
              { title: "LACE AI auditory training", desc: "When indicated, to help improve speech understanding" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-cream rounded-xl p-6 border border-border"
              >
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg"
          >
            <p className="text-primary">
              Our aim is to ensure your hearing aids continue to deliver clear, comfortable sound — not just at the beginning, but long term.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Auditory training */}
      <Section variant="cream">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-border">
              <Brain className="w-12 h-12 text-[var(--secondary)] mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Auditory training and listening confidence
              </h2>
              <p className="text-primary leading-relaxed mb-4">
                Hearing well is not only about amplification. For many people, the brain also needs time and practice to adapt to new sounds and improved clarity.
              </p>
              <p className="text-primary leading-relaxed mb-6">
                Veritas Hearing offers <strong>LACE AI auditory training</strong> as part of hearing aid care when appropriate. LACE is an evidence-based listening training programme designed to help improve speech understanding, especially in challenging environments such as background noise or group conversations.
              </p>
              <h3 className="font-semibold text-foreground mb-3">Auditory training can be particularly helpful for:</h3>
              <ul className="space-y-2 mb-6">
                {[
                  "New hearing aid users adjusting to amplified sound",
                  "People who struggle with speech clarity despite appropriate hearing aid settings",
                  "Anyone wanting to build confidence in real-world listening situations",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                    <span className="text-primary text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-[var(--secondary)]/10 border border-[var(--secondary)]/20 rounded-lg p-4">
                <p className="text-primary text-sm leading-relaxed">
                  On average, auditory training with LACE has been shown to improve speech understanding in noise by around <strong>3 dB</strong>. While this number may sound small, a 3 dB improvement can represent a meaningful real-world change — comparable to gains often associated with significant increases in hearing aid technology levels.
                </p>
              </div>
              <p className="text-muted text-sm mt-4">
                Guidance on whether auditory training would benefit you is provided as part of your hearing aid care.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 flex items-center justify-center"
          >
            <div className="relative w-40 h-40 sm:w-64 sm:h-64">
              <Image
                src="/images/lace-ai-pro-logo.fbc9918a6dfb81eec9410b07597aef44.png"
                alt="LACE AI Auditory Training"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Moisture protection */}
      <Section variant="white">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative h-56 sm:h-80 lg:h-96 rounded-2xl overflow-hidden mb-6">
              <Image
                src="/images/ReduxPro_FeatureImages1.jpg"
                alt="Redux Professional moisture removal system"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Droplets className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Protecting your hearing aids from moisture
            </h2>
            <p className="text-primary leading-relaxed mb-4">
              Moisture is one of the most common causes of hearing aid problems, especially in New Zealand's climate.
            </p>
            <p className="text-primary leading-relaxed mb-6">
              Veritas Hearing uses <strong>Redux moisture removal technology</strong> to help safely extract moisture from hearing aids without heat or damage. This process can restore performance, improve sound quality, and reduce the risk of future faults.
            </p>
            <h3 className="font-semibold text-foreground mb-3">Redux may be recommended:</h3>
            <ul className="space-y-2 mb-6">
              {[
                "If hearing aids sound weaker or distorted",
                "After exposure to humidity, sweat, or moisture",
                "As part of routine long-term hearing aid care",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-primary text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg">
              <p className="text-primary text-sm">
                Keeping hearing aids dry and functioning well is an important part of maintaining consistent sound quality.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* A calm, transparent process */}
      <Section variant="primary" className="border-y border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Award className="w-12 h-12 sm:w-16 sm:h-16 text-secondary mx-auto mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
              A calm, transparent process
            </h2>
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-6 sm:mb-8">
              We understand that choosing hearing aids can feel overwhelming. Appointments at Veritas Hearing are unhurried, pressure‑free, and focused on clarity.
            </p>
            <p className="text-lg text-white/80 leading-relaxed mb-8">
              You will always have the opportunity to ask questions, discuss options, and understand the reasoning behind any recommendation.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 inline-block">
              <p className="text-white text-lg">
                Pricing is discussed privately after your assessment, once it is clear what is appropriate for your hearing.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section variant="white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
              Take the next step
            </h2>
            <p className="text-lg sm:text-xl text-primary leading-relaxed mb-6 sm:mb-8">
              If you are considering hearing aids, the best place to start is a comprehensive hearing assessment or a hearing aid discussion.
            </p>
            <p className="text-lg text-primary mb-8">
              To book an appointment or speak with us, please contact Veritas Hearing.
            </p>
            <Link href="/contact">
              <Button size="lg">
                Contact us
              </Button>
            </Link>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
