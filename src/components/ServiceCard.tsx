"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  duration?: string;
  index?: number;
}

export default function ServiceCard({
  title,
  description,
  icon: Icon,
  href,
  duration,
  index = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-white rounded-xl border border-[var(--border)] p-6 hover:shadow-lg hover:border-[var(--primary)]/30 transition-all duration-300"
    >
      <div className="w-14 h-14 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[var(--primary)] transition-colors duration-300">
        <Icon className="h-7 w-7 text-[var(--primary)] group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
        {title}
      </h3>
      <p className="text-[var(--muted)] mb-4">{description}</p>
      {duration && (
        <p className="text-sm text-[var(--muted-light)] mb-4">
          Duration: {duration}
        </p>
      )}
      <Link
        href={href}
        className="inline-flex items-center text-[var(--primary)] font-medium hover:gap-2 transition-all duration-200"
      >
        Learn More
        <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </motion.div>
  );
}
