"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TeamMember from "@/components/TeamMember";
import Button from "@/components/Button";
import { PageHero, Section, SectionHeader, CTASection } from "@/components/sections";
import { type TeamMember as TeamMemberType } from "@/lib/data";

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMemberType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const res = await fetch('/api/team');
        if (res.ok) {
          const data = await res.json();
          setTeamMembers(data);
        }
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTeamMembers();
  }, []);
  return (
    <>
      <PageHero
        badge="About Me"
        title="Meet Your Audiologist"
        description="At Veritas Hearing, you'll always see the same person—me. I believe continuity of care leads to better outcomes and a more comfortable experience for you."
      />

      <Section variant="white">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {teamMembers.map((member, index) => (
            <TeamMember key={member.name} {...member} index={index} />
          ))}
        </motion.div>
        )}
      </Section>

      <Section variant="cream" containerClassName="max-w-4xl">
        <SectionHeader
          title="Why Independent Matters"
          description="As an independent audiologist, I have no sales targets or corporate quotas. My only goal is to help you hear better. I can recommend any brand or solution that's right for you—or tell you honestly if you don't need hearing aids at all."
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/booking">
            <Button>
              Book Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </Section>
    </>
  );
}
