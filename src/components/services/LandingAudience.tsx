import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimateInView from "@/components/AnimateInView";
import { Section, SectionHeader } from "@/components/sections";
import { getLandingIcon } from "@/components/services/landingIcon";
import type { LandingAudience as LandingAudienceData } from "@/lib/servicePage";

/**
 * "Who it's for" section — green band with centred columns and round gold
 * icons, mirroring the site's "Our Promise" pattern.
 */
export default function LandingAudience({ data }: { data: LandingAudienceData }) {
  return (
    <Section variant="primary">
      <SectionHeader title={data.heading} variant="dark" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
        {data.columns.map((column, index) => {
          const Icon = getLandingIcon(column.icon);
          return (
            <AnimateInView key={index} delay={index * 100} className="text-center flex flex-col items-center h-full">
              <div className="w-16 h-16 rounded-full bg-white/10 text-secondary flex items-center justify-center mb-5">
                <Icon className="w-7 h-7" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{column.title}</h3>
              <p className="text-white/75 leading-relaxed mb-4">{column.body}</p>
              {column.linkText && column.linkHref && (
                <span className="mt-auto">
                  <Link
                    href={column.linkHref}
                    className="text-secondary font-medium inline-flex items-center gap-1.5 min-h-[44px] hover:text-secondary-dark transition-colors"
                  >
                    {column.linkText}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </span>
              )}
            </AnimateInView>
          );
        })}
      </div>
    </Section>
  );
}
