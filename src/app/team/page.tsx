"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TeamMember from "@/components/TeamMember";
import Button from "@/components/Button";

const teamMembers = [
  {
    name: "Your Audiologist",
    title: "Founder & Audiologist",
    credentials: "",
    bio: "I founded Veritas Hearing to provide the kind of hearing care I believe everyone deserves—honest, thorough, and pressure-free. With a passion for helping people hear better, I take the time to understand each client's unique needs and lifestyle before making any recommendations.",
    specializations: ["Hearing Assessments", "Hearing Aid Fitting", "Tinnitus Support"],
  },
];

export default function TeamPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[var(--card)] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block bg-[var(--primary)]/10 text-[var(--primary)] px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              About Me
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-[var(--foreground)] mb-6">
              Meet Your Audiologist
            </h1>
            <p className="text-lg text-[var(--muted)]">
              At Veritas Hearing, you'll always see the same person—me. I believe
              continuity of care leads to better outcomes and a more comfortable
              experience for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember key={member.name} {...member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-16 bg-[var(--card)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">
              Why Independent Matters
            </h2>
            <p className="text-[var(--muted)] mb-8 max-w-2xl mx-auto">
              As an independent audiologist, I have no sales targets or corporate
              quotas. My only goal is to help you hear better. I can recommend
              any brand or solution that's right for you—or tell you honestly
              if you don't need hearing aids at all.
            </p>
            <Link href="/contact">
              <Button>
                Book a Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">
              Ready to Meet Us?
            </h2>
            <p className="text-[var(--muted)] mb-8 max-w-2xl mx-auto">
              Schedule an appointment and experience the difference that
              personalized, expert hearing care can make in your life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">Schedule Appointment</Button>
              </Link>
              <Link href="tel:+15551234567">
                <Button variant="outline" size="lg">
                  Call (555) 123-4567
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
