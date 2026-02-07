import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionProps {
  children: ReactNode;
  variant?: "white" | "cream" | "primary";
  className?: string;
  containerClassName?: string;
  id?: string;
}

/**
 * Standard section wrapper with consistent spacing.
 *
 * Variants:
 * - "white": bg-white (default, most common)
 * - "cream": bg-background (for alternating sections)
 * - "primary": bg-primary (for dark emphasis sections)
 *
 * Spacing: py-16 lg:py-24 (per design system)
 */
export default function Section({
  children,
  variant = "white",
  className = "",
  containerClassName = "",
  id,
}: SectionProps) {
  const bgColors: Record<string, string> = {
    white: "bg-white",
    cream: "bg-background",
    primary: "bg-primary",
  };

  return (
    <section
      className={`py-16 lg:py-24 ${bgColors[variant]} ${className}`}
      id={id}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}

/**
 * Section header with optional label, heading, and description
 */
export interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
  variant?: "dark" | "light";
}

export function SectionHeader({
  label,
  title,
  description,
  centered = true,
  className = "",
  variant = "light",
}: SectionHeaderProps) {
  const alignClass = centered ? "text-center" : "";
  const maxWidthClass = centered ? "max-w-3xl mx-auto" : "";

  // Light text for dark backgrounds (primary variant)
  const lightText = variant === "dark";
  const labelColor = lightText ? "text-secondary" : "text-primary";
  const titleColor = lightText ? "text-white" : "text-foreground";
  const descriptionColor = lightText ? "text-white/80" : "text-muted";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`mb-12 ${alignClass} ${maxWidthClass} ${className}`}
    >
      {label && (
        <span className={`${labelColor} font-medium inline-block mb-2`}>
          {label}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl font-bold ${titleColor} mb-4`}>
        {title}
      </h2>
      {description && <p className={`${descriptionColor} text-lg`}>{description}</p>}
    </motion.div>
  );
}
