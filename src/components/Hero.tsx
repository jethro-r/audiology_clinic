"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "./Button";

export default function Hero() {
  return (
    <section className="relative bg-primary pt-8 pb-16 lg:pt-12 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
              Independent hearing care, <br />
              <span className="text-secondary">delivered with integrity</span>
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-xl">
              Veritas Hearing is a locally owned clinic providing high-standard, independent audiology care. We offer precise diagnostics, access to leading hearing technologies, and ongoing support — with transparent, ethical pricing and recommendations made solely in your best interest.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/booking">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Book Your Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="/images/image.png"
                alt="Veritas Hearing professional care"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
