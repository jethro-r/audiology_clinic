"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ArrowRight, Star, Shield, Clock } from "lucide-react";
import Button from "@/components/Button";

const packages = [
  {
    name: "Essential Package",
    price: "From $3,995",
    subtitle: "per pair",
    description: "Ideal for first-time users or those with straightforward listening needs.",
    popular: false,
    features: [
      "Comprehensive hearing assessment with speech-in-noise (QuickSIN/ACT) baseline testing",
      "Wideband tympanometry for accurate middle ear assessment",
      "Professionally fitted hearing aids",
      "Real-ear verification",
      "Essential follow-up care: 2–3 follow-ups after the 28-day trial",
      "Comfort verification and device performance checks",
      "Minor issue troubleshooting",
      "Hearing Instrument Test (HIT) verification after maintenance",
      "Ear wax removal when clinically indicated",
      "Manufacturer warranty"
    ]
  },
  {
    name: "Standard Package",
    price: "From $5,495",
    subtitle: "per pair",
    description: "Designed for everyday listening confidence, especially in conversations.",
    popular: true,
    badge: "Most Popular",
    features: [
      "Everything in Essential Package, plus:",
      "Advanced hearing technology",
      "Extended diagnostics where clinically indicated",
      "Additional hearing checks and device verification",
      "12 months of follow-up care",
      "Scheduled follow-ups at 1, 3, 6, and 12 months with HIT verification",
      "Targeted speech-in-noise rechecks if problems are reported",
      "Minor program or comfort adjustments",
      "Annual Hearing Review ($200 for Standard clients)"
    ]
  },
  {
    name: "Premium Care Package",
    price: "From $9,995",
    subtitle: "per pair",
    description: "For those who want the highest performance available and long-term reassurance.",
    popular: false,
    features: [
      "Everything in Standard Package, plus:",
      "Flagship-level hearing technology",
      "Priority appointments",
      "Unlimited follow-ups throughout the life of the devices (6–7 years)",
      "Annual Hearing Reviews included for life",
      "Proactive Redux moisture management",
      "HIT verification and speech-in-noise testing (QuickSIN/ACT)",
      "Optimal real-world performance monitoring",
      "LACE AI auditory training"
    ]
  }
];

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-primary-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Hearing Aid Packages
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Clear options. Evidence-based care. Long-term support.
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              At Veritas Hearing, we don't sell hearing aids as standalone products. We provide hearing care packages designed around long-term listening outcomes — so you know exactly what's included from the beginning.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Differentiation */}
      <section className="py-12 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                <Shield className="h-8 w-8 text-primary" />
                <div className="text-left">
                  <p className="font-semibold text-foreground">Essential</p>
                  <p className="text-sm text-muted">2–3 follow-ups after trial</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                <Clock className="h-8 w-8 text-primary" />
                <div className="text-left">
                  <p className="font-semibold text-foreground">Standard</p>
                  <p className="text-sm text-muted">12 months scheduled care</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                <Star className="h-8 w-8 text-primary" />
                <div className="text-left">
                  <p className="font-semibold text-foreground">Premium</p>
                  <p className="text-sm text-muted">Lifetime proactive care</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center text-muted max-w-4xl mx-auto"
          >
            All tiers include speech-in-noise testing at the initial assessment. Essential clients get 2–3 follow-ups after the trial, Standard clients get 12 months of scheduled follow-ups, and Premium clients receive proactive, performance-verified SIN testing and maintenance for the life of the devices.
          </motion.p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-2xl border-2 overflow-hidden ${
                  pkg.popular 
                    ? "border-primary shadow-xl scale-105" 
                    : "border-border shadow-sm hover:shadow-lg"
                } transition-all duration-300`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-primary text-white text-center py-2 text-sm font-medium">
                    {pkg.badge}
                  </div>
                )}
                
                <div className={`p-8 ${pkg.popular ? "pt-12" : ""}`}>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-muted mb-6">
                    {pkg.description}
                  </p>
                  
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-foreground">
                      {pkg.price}
                    </span>
                    <span className="text-muted ml-2">
                      {pkg.subtitle}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className={`text-sm ${
                          feature.includes("Everything in") 
                            ? "font-medium text-foreground" 
                            : "text-muted"
                        }`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/contact">
                    <Button 
                      variant={pkg.popular ? "primary" : "outline"}
                      className="w-full"
                      size="lg"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Not Sure Which Package Is Right?
            </h2>
            <p className="text-lg text-muted mb-8 max-w-2xl mx-auto">
              Let's discuss your hearing needs and lifestyle to find the perfect package for you. 
              No pressure, just honest guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto">
                  Schedule Appointment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="tel:+64290451839">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Call 029 0451 0839
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}