import Image from "next/image";
import { CheckCircle } from "lucide-react";

export default function HearingAidCare({
  items,
}: {
  items: string[];
}) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <ul className="space-y-4">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-secondary shrink-0 mt-0.5" />
              <span className="text-foreground text-lg">{item}</span>
            </li>
          ))}
        </ul>
        <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden">
          <Image
            src="/frontend/hearing-aids-1.webp"
            alt="Hearing aids professional fitting"
            fill
            quality={90}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
