import JsonLd from "./JsonLd";
import { SITE_URL } from "@/lib/site";

// Site-wide local-business markup. NAP + hours match the footer:
// 37 Lake Road, Frankton, Hamilton 3204 · 029 0451 0839 · Mon–Fri 8–5.
// LocalBusiness rather than MedicalBusiness: the practice is run by an
// audiologist (an allied health professional, not a physician) and
// schema.org has no Audiologist type — the generic keeps NAP + hours valid.
export default function LocalBusinessSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#organization`,
        name: "Veritas Hearing",
        slogan: "Hear better. Live fully",
        description:
          "Independent, clinician-led audiology practice in Frankton, Hamilton, providing clear, honest, and evidence-based hearing care.",
        url: SITE_URL,
        telephone: "+642904510839",
        email: "info@veritashearing.co.nz",
        address: {
          "@type": "PostalAddress",
          streetAddress: "37 Lake Road",
          addressLocality: "Frankton",
          addressRegion: "Hamilton",
          postalCode: "3204",
          addressCountry: "NZ",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "17:00",
          },
        ],
        sameAs: [
          "https://www.facebook.com/profile.php?id=61587521037122",
          "https://instagram.com/veritashearingnz",
          "https://www.linkedin.com/in/paul-hsu-68919a11b",
        ],
      }}
    />
  );
}
