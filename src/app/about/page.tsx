"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Award,
  Heart,
  Users,
  Clock,
  Shield,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Button from "@/components/Button";

const values = [
  {
    title: "Honesty First",
    description:
      "No sales targets, no commissions. Just honest advice about what you actually need for your hearing health.",
    icon: Heart,
  },
  {
    title: "Clinical Excellence",
    description:
      "Evidence-based practice using the latest diagnostic protocols and peer-reviewed research.",
    icon: Award,
  },
  {
    title: "Your Time Matters",
    description:
      "Unhurried appointments that give you space to ask questions and fully understand your options.",
    icon: Users,
  },
  {
    title: "Ongoing Support",
    description:
      "Your hearing journey doesn't end at fitting. I'm here for adjustments, questions, and long-term care.",
    icon: Clock,
  },
];

const certifications = [
  "New Zealand Audiological Society Member",
  "ACC Registered Provider",
  "Qualified Audiologist",
  "Committed to Continuing Professional Development",
];

const whyChooseUs = [
  "Independent practice - no corporate sales targets",
  "Direct access to your audiologist",
  "Thorough, unhurried consultations",
  "Evidence-based recommendations",
  "Wide range of hearing aid options",
  "ACC registered provider",
  "Flexible appointment times",
  "Ongoing aftercare and support",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-card to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Your Partners in Hearing Health
            </h1>
            <p className="text-lg text-muted">
              Based in Hamilton, Veritas Hearing is dedicated to
              helping our community hear better and live fuller lives through
              compassionate, expert care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted">
                <p>
                  Veritas Hearing is a newly established independent audiology practice
                  in Hillcrest, Hamilton. I started this clinic because I believe
                  hearing care should be different—focused on you, not sales targets.
                </p>
                <p>
                  After working in the industry, I saw too many people pushed toward
                  expensive solutions they didn't need, or rushed through appointments
                  without truly understanding their options. Veritas Hearing was founded
                  on a simple principle: honest, evidence-based care without the pressure.
                </p>
                <p>
                  As a small, independent practice, I can offer something larger clinics
                  often can't—time. Time to listen, time to explain, and time to find
                  the right solution for your individual needs and budget.
                </p>
              </div>
            </motion.div>

            {/* Image placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] bg-gradient-to-br from-primary/10 to-[var(--primary-light)]/10 rounded-2xl"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="w-12 h-12 text-primary" />
                  </div>
                  <p className="text-muted text-sm">
                    Our clinic and team
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-xl text-white/90 leading-relaxed">
              &quot;To improve lives through better hearing by providing
              compassionate, comprehensive audiological care using the latest
              technology and evidence-based practices.&quot;
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              These core values guide everything we do at Veritas Hearing.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Certifications & Accreditations
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Our audiologists maintain the highest professional standards and
              credentials.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white px-6 py-3 rounded-full border border-border shadow-sm"
              >
                <span className="font-medium text-foreground">
                  {cert}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] bg-gradient-to-br from-primary/10 to-[var(--primary-light)]/10 rounded-2xl"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <Award className="w-12 h-12 text-primary" />
                  </div>
                  <p className="text-muted text-sm">
                    Award-winning care
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Why Choose Veritas Hearing?
              </h2>
              <ul className="space-y-3 mb-8">
                {whyChooseUs.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-[var(--success)] flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <Link href="/contact">
                <Button>
                  Schedule Your Visit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
