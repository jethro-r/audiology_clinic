import Image from "next/image";
import { CheckCircle, User } from "lucide-react";
import Badge from "./Badge";
import AnimateInView from "@/components/AnimateInView";

interface TeamMemberProps {
  name: string;
  title: string;
  credentials?: string | null;
  bio: string;
  specialisations: string[];
  imageUrl?: string | null;
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
    <AnimateInView delay={index * 100}>
      <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Photo */}
        <div className="aspect-[4/3] bg-primary/10 relative">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
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
        <div className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground">
            {name}
          </h3>
          <p className="text-primary font-medium">{title}</p>
          {credentials && <p className="text-sm text-muted mb-3">{credentials}</p>}
          <div
            className="rich-text text-muted text-sm mb-4"
            dangerouslySetInnerHTML={{ __html: bio }}
          />

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
      </div>
    </AnimateInView>
  );
}
