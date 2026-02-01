"use client";

import { motion } from "framer-motion";
import { CheckCircle, User } from "lucide-react";
import Badge from "./Badge";

interface TeamMemberProps {
  name: string;
  title: string;
  credentials: string;
  bio: string;
  specialisations: string[];
  imageUrl?: string;
  index?: number;
}

export default function TeamMember({
  name,
  title,
  credentials,
  bio,
  specialisations,
  imageUrl,
  index = 0,
}: TeamMemberProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Photo */}
      <div className="aspect-[4/3] bg-primary/10 relative">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-12 h-12 text-primary" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground">
          {name}
        </h3>
        <p className="text-primary font-medium">{title}</p>
        <p className="text-sm text-muted mb-3">{credentials}</p>
        <p className="text-muted text-sm mb-4">{bio}</p>

        {/* Specialisations */}
        <div className="flex flex-col gap-1">
          {specialisations.map((spec) => (
            <div
            key={spec}
            className="flex items-center gap-2 text-sm text-primary"
            >
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              <span>{spec}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
