import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import AnimateInView from "@/components/AnimateInView";
import { getLandingIcon } from "@/components/services/landingIcon";

interface ServiceCardProps {
  title: string;
  description: string;
  /** Explicit icon component wins; otherwise the Lucide name is resolved */
  icon?: LucideIcon;
  iconName?: string;
  /** Where the default "Learn More" link points (omit when using footer) */
  href?: string;
  index?: number;
  /** Anchor id (e.g. the service slug) — adds scroll margin for #hash links */
  id?: string;
  /** Custom footer replacing the default link (pinned to the card bottom) */
  footer?: ReactNode;
}

export default function ServiceCard({
  title,
  description,
  icon,
  iconName,
  href,
  index = 0,
  id,
  footer,
}: ServiceCardProps) {
  // Dynamic Lucide lookup by CMS-stored name (stateless leaf — a fresh
  // reference per render is harmless, no state to lose).
  const Icon = icon || getLandingIcon(iconName || "Ear");

  return (
    <AnimateInView delay={index * 100} className="h-full">
      <div
        id={id}
        className={`group bg-white rounded-xl border border-border p-5 sm:p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300 ${
          id ? "scroll-mt-24" : ""
        } ${footer ? "h-full flex flex-col" : ""}`}
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
          {/* eslint-disable-next-line react-hooks/static-components -- dynamic Lucide lookup, stateless leaf */}
          <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary group-hover:text-white transition-colors duration-300" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
          {title}
        </h3>
        <p className="text-muted mb-4">{description}</p>
        {footer ? (
          <div className="mt-auto pt-2 flex flex-wrap items-center gap-x-6 gap-y-2">
            {footer}
          </div>
        ) : href ? (
          <Link
            href={href}
            className="inline-flex items-center text-primary font-medium hover:gap-2 transition-all duration-200"
          >
            Learn More
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </AnimateInView>
  );
}
