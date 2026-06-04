import Link from "next/link";
import {
  ArrowRight,
  LucideIcon,
  Ear,
  Headphones,
  Volume2,
  Shield,
  Wrench,
} from "lucide-react";
import AnimateInView from "@/components/AnimateInView";

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, LucideIcon> = {
  Ear,
  Headphones,
  Volume2,
  Shield,
  Wrench,
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  iconName?: string;
  href: string;
  index?: number;
}

export default function ServiceCard({
  title,
  description,
  icon,
  iconName,
  href,
  index = 0,
}: ServiceCardProps) {
  // Use provided icon or look up from iconName
  const Icon = icon || (iconName ? iconMap[iconName] : null) || Ear;

  return (
    <AnimateInView delay={index * 100}>
      <div className="group bg-white rounded-xl border border-border p-5 sm:p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
          <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary group-hover:text-white transition-colors duration-300" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
          {title}
        </h3>
        <p className="text-muted mb-4">{description}</p>
        <Link
          href={href}
          className="inline-flex items-center text-primary font-medium hover:gap-2 transition-all duration-200"
        >
          Learn More
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </AnimateInView>
  );
}
