"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

interface TeamMemberProps {
  name: string;
  title: string;
  credentials: string;
  bio: string;
  specializations: string[];
  imageUrl?: string;
  index?: number;
}

export default function TeamMember({
  name,
  title,
  credentials,
  bio,
  specializations,
  imageUrl,
  index = 0,
}: TeamMemberProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl border border-[var(--border)] overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Photo */}
      <div className="aspect-[4/3] bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary-light)]/10 relative">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
              <User className="w-12 h-12 text-[var(--primary)]" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[var(--foreground)]">
          {name}
        </h3>
        <p className="text-[var(--primary)] font-medium">{title}</p>
        <p className="text-sm text-[var(--muted)] mb-3">{credentials}</p>
        <p className="text-[var(--muted)] text-sm mb-4">{bio}</p>

        {/* Specializations */}
        <div className="flex flex-wrap gap-2">
          {specializations.map((spec) => (
            <span
              key={spec}
              className="text-xs bg-[var(--card)] text-[var(--muted)] px-2 py-1 rounded-full"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
