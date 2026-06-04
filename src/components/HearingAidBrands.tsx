import Image from "next/image";
import { Brand } from "@/lib/hearingAidData";

export default function HearingAidBrands({ brands }: { brands: Brand[] }) {
  return (
    <div className="grid grid-cols-5 gap-4">
      {brands.map((brand) => (
        <div
          key={brand.name}
          className="bg-cream rounded-lg border border-border p-4 flex flex-col items-center justify-center"
        >
          <div className="relative w-full aspect-square">
            <Image
              src={brand.images[0]}
              alt={`${brand.name} logo`}
              fill
              quality={90}
              className="object-contain"
            />
          </div>
          <p className="mt-2 text-sm font-medium text-primary">{brand.name}</p>
        </div>
      ))}
    </div>
  );
}
