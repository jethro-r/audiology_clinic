import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TeamMember from "@/components/TeamMember";
import Button from "@/components/Button";
import { Section, SectionHeader } from "@/components/sections";
import AnimateInView from "@/components/AnimateInView";
import { type TeamMember as TeamMemberType } from "@/lib/data";

export default function TeamContent({ members }: { members: TeamMemberType[] }) {
  return (
    <>
      {/* Primary audiologist - centered */}
      {members.length > 0 && (
        <AnimateInView className="flex justify-center mb-12">
          <div className="w-full max-w-md">
            <TeamMember {...members[0]} index={0} />
          </div>
        </AnimateInView>
      )}
      {/* Additional team members */}
      {members.length > 1 && (
        <AnimateInView delay={200} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.slice(1).map((member, index) => (
            <TeamMember key={member.name} {...member} index={index + 1} />
          ))}
        </AnimateInView>
      )}
    </>
  );
}
