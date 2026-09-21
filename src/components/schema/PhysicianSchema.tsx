import JsonLd, { stripHtml } from "./JsonLd";
import { SITE_URL } from "@/lib/site";
import type { TeamMember } from "@/lib/data";

// One Physician node per active team member, rendered on /team.
export default function PhysicianSchema({ members }: { members: TeamMember[] }) {
  return (
    <>
      {members.map((member) => (
        <JsonLd
          key={member.id}
          data={{
            "@context": "https://schema.org",
            "@type": "Physician",
            name: member.name,
            jobTitle: member.title,
            description: stripHtml(member.bio),
            url: `${SITE_URL}/team`,
            ...(member.imageUrl ? { image: member.imageUrl } : {}),
            worksFor: { "@id": `${SITE_URL}/#organization` },
          }}
        />
      ))}
    </>
  );
}
