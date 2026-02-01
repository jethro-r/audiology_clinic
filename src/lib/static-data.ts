// Static data for the marketing website
// This replaces the database-driven content

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  iconName: string;
  features: string[];
  sortOrder: number;
  showOnHomepage: boolean;
  showInFooter: boolean;
  buttonText?: string;
  idealFor?: string;
  note?: string;
  featureTooltips?: Record<string, string>;
}

export const services: Service[] = [
  {
    id: "hearing-assessments",
    slug: "hearing-assessments",
    title: "Comprehensive Hearing Assessment",
    shortDescription:
      "A thorough, unhurried assessment to understand your hearing and how it affects daily life — with clear answers and no pressure.",
    fullDescription:
      "A thorough, unhurried assessment to understand your hearing and how it affects daily life — with clear answers and no pressure.",
    duration: "45–60 minutes",
    iconName: "Ear",
    features: [
      "Diagnostic hearing testing",
      "Speech-in-noise assessment",
      "Advanced middle ear assessment",
      "Clear explanation of results",
    ],
    sortOrder: 1,
    showOnHomepage: true,
    showInFooter: true,
    buttonText: "Book Assessment",
    idealFor: "You've noticed changes, struggle in noise, or want a professional baseline check.",
    note: "No obligation to proceed with treatment",
  },
  {
    id: "hearing-aid-solutions",
    slug: "hearing-aid-solutions",
    title: "Hearing Aid Solutions & Packages",
    shortDescription:
      "At Veritas Hearing, we separate care from technology. Choose the level of support that suits your needs, from Essential to Premium Care.",
    fullDescription:
      "At Veritas Hearing, we separate care from technology. You choose the level of support that suits your needs, from Essential to Premium Care. Hearing aid technology is selected independently based on your hearing, lifestyle, and preferences, so every recommendation is personalised and evidence-based.",
    duration: "60-90 minutes",
    iconName: "Headphones",
    features: [
      "Personalisation & selection",
      "Fitting & verification",
      "Ongoing support & follow-up",
      "Long-term hearing health",
    ],
    buttonText: "Explore More",
    sortOrder: 2,
    showOnHomepage: true,
    showInFooter: true,
  },
  {
    id: "ongoing-care",
    slug: "ongoing-care",
    title: "Hearing Review",
    shortDescription:
      "Comprehensive checks to ensure your hearing and hearing aids are performing at their best.",
    fullDescription:
      "Comprehensive checks to ensure your hearing and hearing aids are performing at their best.",
    duration: "30–45 minutes",
    iconName: "Volume2",
    features: [
      "Ear wax removal",
      "Hearing assessment to check for changes",
      "Device comprehensive service",
      "Device performance check and verification",
      "Hearing aid fine-tuning",
      "Aided speech-in-noise testing",
      "New clients welcome",
    ],
    sortOrder: 3,
    showOnHomepage: true,
    showInFooter: true,
    buttonText: "Book a Hearing Review",
    featureTooltips: {
      "Device comprehensive service": "parts renewal, cleaning, and moisture removal",
    },
  },
  {
    id: "earwax-removal",
    slug: "earwax-removal",
    title: "Wax Removal",
    shortDescription:
      "Safe, professional ear wax removal to restore comfort and optimise hearing aid performance.",
    fullDescription:
      "Safe, professional ear wax removal to restore comfort and optimise hearing aid performance.",
    duration: "20–30 minutes",
    iconName: "Wrench",
    features: [
      "Microsuction removal of ear wax",
      "Live view of procedure",
      "Post-removal hearing screening",
      "Video of procedure available to take home",
    ],
    sortOrder: 4,
    showOnHomepage: true,
    showInFooter: true,
    buttonText: "Book Wax Removal",
  },
];

// Get services with optional filters
export function getServices(options: { homepage?: boolean; footer?: boolean } = {}): Service[] {
  let filtered = services;

  if (options.homepage) {
    filtered = filtered.filter((s) => s.showOnHomepage);
  }
  if (options.footer) {
    filtered = filtered.filter((s) => s.showInFooter);
  }

  return filtered.sort((a, b) => a.sortOrder - b.sortOrder);
}

// Get a single service by slug
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

// Service names for contact form dropdown
export const serviceNames = [
  "Comprehensive Hearing Assessment",
  "Hearing Aid Solutions & Packages",
  "Ongoing Hearing Care",
  "Ear Wax Removal",
  "Other",
];
