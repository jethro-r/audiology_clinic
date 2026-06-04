import { HearingAidType } from "@/lib/hearingAidData";

export default function HearingAidTypeCards({
  types,
}: {
  types: HearingAidType[];
}) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {types.map((type) => (
        <a
          key={type.id}
          href={`#${type.id}`}
          className="bg-white rounded-lg border border-border p-4 hover:shadow-md hover:border-primary/30 transition-colors duration-200 text-center"
        >
          <h3 className="text-base font-semibold text-primary mb-1">
            {type.title}
          </h3>
          <p className="text-sm text-muted">{type.preview}</p>
        </a>
      ))}
    </div>
  );
}
