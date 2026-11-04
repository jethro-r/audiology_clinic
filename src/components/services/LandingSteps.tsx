import AnimateInView from "@/components/AnimateInView";
import { Section, SectionHeader } from "@/components/sections";
import type { LandingSteps as LandingStepsData } from "@/lib/serviceLanding";

/**
 * "How it works" section — numbered step cards on white, with an optional
 * gold-highlighted step (1-based index).
 */
export default function LandingSteps({ data }: { data: LandingStepsData }) {
  return (
    <Section variant="white">
      <SectionHeader
        label={data.eyebrow}
        title={data.heading}
        description={data.intro}
      />
      <ol className="list-none grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.steps.map((step, index) => {
          const highlighted = data.highlightStep === index + 1;
          return (
            <li key={index}>
              <AnimateInView delay={(index % 3) * 100} className="h-full">
                <div
                  className={`bg-white rounded-xl p-6 h-full flex flex-col ${
                    highlighted ? "border-2 border-secondary" : "border border-border"
                  }`}
                >
                  <span
                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold mb-4 ${
                      highlighted ? "bg-secondary text-white" : "bg-primary text-white"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted">{step.body}</p>
                </div>
              </AnimateInView>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
