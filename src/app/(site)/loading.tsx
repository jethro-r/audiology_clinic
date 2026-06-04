export default function Loading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="pt-8 sm:pt-12 pb-14 sm:pb-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="h-6 w-24 bg-white/20 rounded-full mx-auto mb-4 animate-pulse" />
            <div className="h-10 w-3/4 bg-white/20 rounded mx-auto mb-6 animate-pulse" />
            <div className="h-5 w-1/2 bg-white/15 rounded mx-auto animate-pulse" />
          </div>
        </div>
      </section>

      {/* Content skeleton */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-48 bg-gray-100 rounded-xl animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
