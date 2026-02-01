"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TeamMember from "@/components/TeamMember";
import Button from "@/components/Button";
import { PageHero, Section, SectionHeader, CTASection } from "@/components/sections";

const teamMembers = [
  {
    name: "Paul Hsu",
    title: "Founder & Audiologist",
    credentials: "MNZAS | ACC Approved | Veteran Affairs Approved",
    bio: "At Veritas Hearing, I provide evidence-based, patient-focused hearing care tailored to your needs. From comprehensive hearing assessments to hearing aid fittings and long-term support, my goal is to help you achieve measurable improvements in everyday listening and communication. I combine advanced diagnostic tools, real-life outcome measures, premium hearing technologies, and personalised care plans to ensure every patient receives clear guidance and ongoing support.",
    specialisations: [
      "Comprehensive Hearing Assessments",
      "Hearing Aid Fitting & Optimisation",
      "Auditory Training (LACE AI)",
      "Long-term Hearing Care",
    ],
  },
];

export default function TeamPage() {
  return (
    <>
      <PageHero
        badge="About Me"
        title="Meet Your Audiologist"
        description="At Veritas Hearing, you'll always see the same person—me. I believe continuity of care leads to better outcomes and a more comfortable experience for you."
      />

      <Section variant="white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {teamMembers.map((member, index) => (
            <TeamMember key={member.name} {...member} index={index} />
          ))}
        </motion.div>
      </Section>

      <Section variant="cream" containerClassName="max-w-4xl">
        <SectionHeader
          title="Why Independent Matters"
          description="As an independent audiologist, I have no sales targets or corporate quotas. My only goal is to help you hear better. I can recommend any brand or solution that's right for you—or tell you honestly if you don't need hearing aids at all."
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/contact">
            <Button>
              Book Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </Section>
    </>
  );
}
