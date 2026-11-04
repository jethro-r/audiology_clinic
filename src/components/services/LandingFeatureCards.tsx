import AnimateInView from "@/components/AnimateInView";
import { Section, SectionHeader } from "@/components/sections";
import { getLandingIcon } from "@/components/services/landingIcon";
import type { LandingFeatureCards as LandingFeatureCardsData } from "@/lib/serviceLanding";

/**
 * "Why we check" style section — bordered white cards with icon tiles on a
 * cream band, mirroring the site's card pattern.
 */
export default function LandingFeatureCards({ data }: { data: LandingFeatureCardsData }) {
  return (
    <Section variant="cream">
      <SectionHeader
        label={data.eyebrow}
        title={data.heading}
        description={data.intro}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.cards.map((card, index) => {
          const Icon = getLandingIcon(card.icon);
          return (
            <AnimateInView key={index} delay={index * 100}>
              <article className="bg-white border border-border rounded-xl p-6 h-full flex flex-col">
                <div className="w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{card.title}</h3>
                <p className="text-muted">{card.body}</p>
              </article>
            </AnimateInView>
          );
        })}
      </div>
    </Section>
  );
}
