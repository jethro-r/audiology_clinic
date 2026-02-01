"use client";

import { motion } from "framer-motion";
import Badge from "@/components/Badge";

interface PageHeroProps {
  badge: string;
  title: string;
  description?: string;
  className?: string;
}

/**
 * Standard page hero section for inner pages.
 * Uses bg-primary (forest green) with white text.
 *
 * Pattern: pt-12 pb-20 bg-primary
 * (pt-12 provides breathing room; sticky header doesn't block content on load)
 */
export default function PageHero({
  badge,
  title,
  description,
  className = "",
}: PageHeroProps) {
  return (
    <section className={`pt-12 pb-20 bg-primary ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <Badge variant="outline-primary" className="mb-4">
            {badge}
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-white/70">{description}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
