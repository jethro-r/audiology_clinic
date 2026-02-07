"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "./Button";
import Badge from "./Badge";

export default function Hero() {
  return (
    <section className="relative bg-white pt-8 pb-16 lg:pt-12 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="primary" className="mb-4">
              Independent Audiology in Hamilton
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              Premium Hearing Care, <br />
              <span className="text-primary">Thoughtfully Delivered</span>
            </h1>
            <p className="text-lg text-muted mb-8 max-w-xl">
              At Veritas Hearing, your care is built around long-term hearing health, not one-off transactions. We offer two structured care pathways, each designed to provide full, professional care at every visit — from precise diagnostics and verified fittings to ongoing review, fine-tuning, and support over time.
            </p>

            <p className="text-lg text-muted mb-8 max-w-xl">
              Whether your hearing aids were purchased here or elsewhere, your care is delivered with clarity, honesty, and clinical independence, supporting your hearing well beyond the initial fitting.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto">
                  Book Your Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] bg-primary/20 rounded-2xl overflow-hidden">
              {/* Placeholder for hero image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-primary/30 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                  </div>
                  <p className="text-muted text-sm">
                    Professional hearing care image
                  </p>
                </div>
              </div>
            </div>
           
          </motion.div>
        </div>
      </div>
    </section>
  );
}
