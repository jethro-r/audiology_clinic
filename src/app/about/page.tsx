"use client";

import { motion } from "framer-motion";
import {
  Award,
  Heart,
  Clock,
  Shield,
  CheckCircle,
} from "lucide-react";
import { PageHero, Section, SectionHeader } from "@/components/sections";

const values = [
  {
    title: "Integrity",
    description:
      "Honest, evidence-based recommendations with your long-term hearing in mind.",
    icon: Heart,
  },
  {
    title: "Clarity",
    description:
      "Clear explanations, transparent processes, and measurable outcomes.",
    icon: Shield,
  },
  {
    title: "Clinical Excellence",
    description:
      "Thorough assessment, objective verification, and best-practice care.",
    icon: Award,
  },
  {
    title: "Long-Term Commitment",
    description:
      "Ongoing support that protects and improves hearing over time.",
    icon: Clock,
  },
];

const certifications = [
  {
    title: "Member – New Zealand Audiological Society (NZAS)",
    description: "Committed to ongoing professional development and best-practice clinical guidelines.",
  },
  {
    title: "ACC Approved Provider",
    description: "Recognised to provide ACC-supported hearing services.",
  },
  {
    title: "Veteran Affairs Approved Provider",
    description: "Approved to provide hearing services for eligible veterans.",
  },
];

const whyChooseUs = [
  {
    title: "Independent, Client-Focused Care",
    description: "Personalised hearing services without corporate sales pressures.",
  },
  {
    title: "Direct Access to Your Audiologist",
    description: "Speak with the clinician who knows your hearing best.",
  },
  {
    title: "Unhurried, Thorough Consultations",
    description: "Every assessment is detailed and focused on real-world outcomes.",
  },
  {
    title: "Evidence-Based Recommendations",
    description: "All advice and solutions are grounded in clinical research and measurable results.",
  },
  {
    title: "Tailored Hearing Solutions",
    description: "A comprehensive range of devices and support services to suit your individual needs.",
  },
  {
    title: "Ongoing Care & Support",
    description: "From follow-ups to LACE training, Redux care, and professional ear wax removal, we ensure your hearing is protected long-term.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="About Us"
        title="Your Partners in Hearing Health"
        description="Based in Hamilton, Veritas Hearing is dedicated to helping our community hear better and live fuller lives through compassionate, expert care."
      />

      <Section variant="white" containerClassName="max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-2xl mb-6">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">Our Mission</h2>
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto">
            To provide honest, evidence-based hearing care that prioritises long-term outcomes, clear communication, and measurable results.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl text-center border-2 border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                <value.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                {value.title}
              </h3>
              <p className="text-muted text-sm">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section variant="cream">
        <SectionHeader
          title="Certifications & Accreditation"
          description="Professional credentials ensuring the highest standard of care."
        />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm text-center border border-border"
            >
              <div className="w-10 h-10 mx-auto mb-3 bg-primary/10 rounded-lg flex items-center justify-center">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-primary mb-2 text-sm">
                {cert.title}
              </h3>
              <p className="text-muted text-sm">
                {cert.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section variant="white">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="aspect-[4/3] bg-primary rounded-2xl flex items-center justify-center"
          >
            <div className="text-center p-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                <Award className="w-10 h-10 text-secondary" />
              </div>
              <p className="text-white font-medium">
                Trusted Care
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8">
              Why Choose Veritas Hearing?
            </h2>
            <ul className="space-y-4 sm:space-y-5">
              {whyChooseUs.map((item, index) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-primary">
                      {item.title}
                    </span>
                    <p className="text-sm text-muted mt-1">
                      {item.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
