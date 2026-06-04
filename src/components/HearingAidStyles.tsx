"use client";

import { useState } from "react";
import Image from "next/image";
import { HearingAidType } from "@/lib/hearingAidData";
import HearingAidLightbox from "./HearingAidLightbox";

export default function HearingAidStyles({
  types,
}: {
  types: HearingAidType[];
}) {
  const [lightboxSlides, setLightboxSlides] = useState<{ src: string }[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  function openLightbox(images: string[], index: number) {
    setLightboxSlides(images.map((src) => ({ src })));
    setLightboxIndex(index);
    setLightboxOpen(true);
  }

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-8">
        {types.map((type, i) => (
          <div
            key={type.id}
            id={type.id}
            className="bg-white rounded-2xl border border-border p-6 lg:p-8 shadow-sm"
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Images column */}
              <div className={i % 2 === 1 ? "order-2 lg:order-1" : ""}>
                {type.images.length > 0 && (
                  <div className="space-y-3">
                    {/* Main image */}
                    <button
                      type="button"
                      onClick={() => openLightbox(type.images, 0)}
                      className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-cream border border-border cursor-pointer group"
                    >
                      <Image
                        src={type.images[0]}
                        alt={`${type.title} hearing aid`}
                        fill
                        quality={90}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </button>
                    {/* Smaller images side by side */}
                    {type.images.length > 1 && (
                      <div className="grid grid-cols-2 gap-3">
                        {type.images.slice(1).map((img, j) => (
                          <button
                            key={j}
                            type="button"
                            onClick={() => openLightbox(type.images, j + 1)}
                            className="relative w-full aspect-video rounded-xl overflow-hidden bg-cream border border-border cursor-pointer group"
                          >
                            <Image
                              src={img}
                              alt={`${type.title} hearing aid`}
                              fill
                              quality={90}
                              sizes="(max-width: 1024px) 50vw, 25vw"
                              className="object-contain"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* Content column */}
              <div className={i % 2 === 1 ? "order-1 lg:order-2" : ""}>
                <h3 className="text-2xl font-semibold text-primary mb-4">
                  {type.title}
                </h3>
                {type.description.split("\n\n").map((paragraph, j) => (
                  <p key={j} className="text-foreground mb-4">
                    {paragraph}
                  </p>
                ))}
                <div className="space-y-4">
                  {type.features.key && (
                    <div>
                      <p className="text-sm font-medium text-primary mb-2">
                        Key features:
                      </p>
                      <p className="text-foreground">{type.features.key}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-primary mb-2">
                      Suitable for:
                    </p>
                    <p className="text-foreground">{type.features.suitable}</p>
                  </div>
                  {type.features.notSuitable && (
                    <div>
                      <p className="text-sm font-medium text-primary mb-2">
                        Not suitable for:
                      </p>
                      <p className="text-foreground">
                        {type.features.notSuitable}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <HearingAidLightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={lightboxIndex}
      />
    </>
  );
}
