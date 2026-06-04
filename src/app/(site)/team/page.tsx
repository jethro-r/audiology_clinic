import { getTeamMembersDirect } from "@/lib/data";
import { PageHero, Section, SectionHeader, CTASection } from "@/components/sections";
import TeamContent from "@/components/TeamContent";

export const revalidate = 3600;

export default async function TeamPage() {
  const members = await getTeamMembersDirect();

  return (
    <>
      <PageHero
        badge="Your Audiologist"
        title="Meet Your Audiologist"
        description="At Veritas Hearing, you'll always see the same person—me. I believe continuity of care leads to better outcomes and a more comfortable experience for you."
      />

      <Section variant="white">
        <TeamContent members={members} />
      </Section>

      <CTASection
        title="Why Independent Matters"
        description="As an independent audiologist, I have no sales targets or corporate quotas. My only goal is to help you hear better. I can recommend any brand or solution that's right for you—or tell you honestly if you don't need hearing aids at all."
        primaryButton={{
          text: "Book Assessment",
          href: "/booking",
        }}
        variant="cream"
      />
    </>
  );
}
