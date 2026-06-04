"use client";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface HearingAidLightboxProps {
  open: boolean;
  close: () => void;
  slides: { src: string }[];
  index: number;
}

export default function HearingAidLightbox({
  open,
  close,
  slides,
  index,
}: HearingAidLightboxProps) {
  return (
    <Lightbox
      open={open}
      close={close}
      slides={slides}
      index={index}
      plugins={[Zoom, ({ remove }) => { remove("no-scroll"); return null; }]}
      zoom={{
        maxZoomPixelRatio: 3,
        zoomInMultiplier: 2,
        doubleTapDelay: 300,
      }}
      carousel={{ finite: true }}
      styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.9)" } }}
    />
  );
}
