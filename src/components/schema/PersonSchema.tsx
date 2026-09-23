import JsonLd, { stripHtml } from "./JsonLd";
import { SITE_URL } from "@/lib/site";
import type { TeamMember } from "@/lib/data";

// One Person node per active team member, rendered on /team.
// Audiologists are not physicians (schema.org has no Audiologist type),
// so Person + jobTitle from the DB carries the actual role.
export default function PersonSchema({ members }: { members: TeamMember[] }) {
  return (
    <>
      {members.map((member) => (
        <JsonLd
          key={member.id}
          data={{
            "@context": "https://schema.org",
            "@type": "Person",
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
