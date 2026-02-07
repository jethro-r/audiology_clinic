"use client";

import { PageHero, Section } from "@/components/sections";

export default function HearingAidsPage() {
  return (
    <>
      <PageHero
        badge="Hearing Aids"
        title="Hearing Aids"
        description="Content coming soon."
      />

      <Section variant="white">
        <div className="max-w-3xl mx-auto text-center py-12">
          <p className="text-muted">More information about hearing aids coming soon.</p>
        </div>
      </Section>
    </>
  );
}
