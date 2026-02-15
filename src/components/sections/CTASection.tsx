"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/Button";

interface CTASectionProps {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  variant?: "primary" | "cream" | "white";
}

/**
 * Standard CTA section for page bottoms.
 *
 * Variants:
 * - "primary": Dark green background (default, most common)
 * - "cream": Light cream background
 * - "white": White background with card
 *
 * Spacing: py-16 lg:py-24 (per design system)
 */
export default function CTASection({
  title,
  description,
  primaryButton,
  secondaryButton,
  variant = "primary",
}: CTASectionProps) {
  const bgColors: Record<string, string> = {
    primary: "bg-primary",
    cream: "bg-background",
    white: "bg-white",
  };

  const textColors: Record<string, string> = {
    primary: "text-white",
    cream: "text-foreground",
    white: "text-foreground",
  };

  const descriptionColors: Record<string, string> = {
    primary: "text-white/70",
    cream: "text-muted",
    white: "text-muted",
  };

  return (
    <section className={`py-16 lg:py-24 ${bgColors[variant]}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${textColors[variant]}`}>
            {title}
          </h2>
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${descriptionColors[variant]}`}>
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={primaryButton.href}>
              <Button
                variant={variant === "primary" ? "secondary" : "primary"}
                size="lg"
                className="w-full sm:w-auto"
              >
                {primaryButton.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            {secondaryButton && (
              <Link href={secondaryButton.href}>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {secondaryButton.text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
