export interface HearingAidFeatures {
  key: string;
  suitable: string;
  notSuitable?: string;
}

export interface HearingAidType {
  id: string;
  title: string;
  preview: string;
  description: string;
  features: HearingAidFeatures;
  images: string[];
}

export interface Brand {
  name: string;
  tagline: string;
  images: string[];
}

export const hearingAidTypes: HearingAidType[] = [
  {
    id: "ric",
    title: "Receiver in Canal (RICs)",
    preview:
      "RIC hearing aids are the most popular hearing aids and for good reason.",
    description:
      "RIC hearing aids are suitable for nearly all kinds of hearing losses. The hearing aid body houses the electronics and sits on the ear, The hearing aid receiver (speaker) connects to the body with a thin wire and sits in the ear. The ear piece that sits in the ear can be a silicone dome or a custom mould. This is sometimes needed for accurate sound amplification, extra retention or easier handling. People with age related hearing loss or noise related hearing loss, are particularly suited for this style of hearing aid.\n\nNotable recent innovations are the use of artificial intelligence in hearing aids. One example is deep neural network training on millions of sound samples, to learn how to reduce unwanted noise. Another example is environmental classification. Hearing aids perform environment classification analysis multiple times a second and sets microphone focus and hearing aid sound output accordingly. There are also motion sensors in the hearing aids to detect walking. In fact they are more accurate than wrist worn smart watches at measuring the number of steps walked. They come in disposable battery models and rechargeable battery models. The disposable battery model is easy to carry around, batteries are light and easy to purchase. The rechargeable models are robust and water resistant. RICs have great compatibility with smartphones, able to stream media and phone calls and some settings can be controlled via a dedicated app. There are also many accessories available to pair with the hearing aids to enhance the hearing aid capability, including  TV streamers (Auracast ready), wireless microphones",
    features: {
      key: "Rechargeable, Bluetooth connectivity, App control, Aritificial Intelligence, Motion Sensors, Water Resistance",
      suitable: "Most individuals",
    },
    images: [
      "/frontend/oticon-intent-ric.png",
      "/frontend/tempImagenyFd8X.jpg",
      "/frontend/Envision_microRIE_62S_sand_MRIE_sm.png",
    ],
  },
  {
    id: "bte",
    title: "Behind The Ear (BTE)",
    preview:
      "Behind-the-Ear (BTE) hearing aids are very similar to the RIC style.",
    description:
      "Behind-the-Ear (BTE) hearing aids are very similar to the RIC style.  BTE sits behind the ear and sends sound through a thin tube or a thicker, size 13 tubing (3.2mm diameter). This depends on the level of hearing loss.\n\nThey are suitable for people with active life style and work environments. The tubing (thin or thick) is easy to change should it become damaged. They can be more cost-effective to maintain as there are no electronics sitting inside the ear. It is easy to change the tubing when it becomes hardened with the sun or clogged with debris and wax. They have the same features as RIC hearing aids, including artificial intelligence use for noise reduction, environmental classification, fitness tracking. They also come in disposable battery models and rechargeable battery models.",
    features: {
      key: "Easy to maintain, Rechargeable, Bluetooth connectivity, App control, Artificial Intelligence, Motion Sensors, Water Resistance",
      suitable:
        "Most hearing losses, people who play sports, people with dexterity issues, people with wax build up.",
    },
    images: [
      "/frontend/oticon-verit-bte.jpg",
      "/frontend/RESOUND_NEXIA_BTE.jpg",
      "/frontend/bte-hearing-aid-product.png",
    ],
  },
  {
    id: "custom",
    title: "Custom Hearing Aids",
    preview:
      "Custom hearing aids are made for each individual's ears.",
    description:
      "Custom hearing aids are made for each individual’s ears. From largest to smallest in size, there are Full-Shell, Half-Shell, In the Canal (ITC), and Completely In Canal (CIC) styles. Custom hearing aids are suitable when you have other gear you need to wear and take off. For example, simultaneous use with glasses, helmets, ear muffs, mouth masks. The rule of thumb is: the smaller the hearing aid is, the less features it may pack into its shell. However, the core hearing aid technology of noise reduction and environment analysis will still be available. One advantage of smaller hearing aids is better localisation and protection from wind noise. Users need to regularly change the sound filter as ear wax can build up and block the sound.",
    features: {
      key: "Rechargeable (depending on size), Bluetooth connection (depending on size), natural sound localisation, protection from wind noise.",
      suitable:
        "People with dexterity issues (Full Shell and Half Shell styles), simultaneous wearable gear usage.",
      notSuitable: "Excessive ear wax production",
    },
    images: [
      "/frontend/custom-hearing-aid-product.png",
      "/frontend/PH_Packshot_Virto-I-R-06-Pair_063-0526-01.jpg",
      "/frontend/RS_RT_Custom_Line_Up.png",
    ],
  },
];

export const brands: Brand[] = [
  {
    name: "Oticon",
    tagline: "Life-changing technology",
    images: [
      "/frontend/Oticon-Zeal-Veritas-Hearing.webp",
      "/frontend/Oticon-zeal.webp",
    ],
  },
  {
    name: "Phonak",
    tagline: "Hearing technology for all",
    images: ["/frontend/phonak-logo.svg"],
  },
  {
    name: "Widex",
    tagline: "Sound that's natural and effortless",
    images: ["/frontend/widex-logo.svg"],
  },
  {
    name: "Beltone",
    tagline: "Hearing care that's personal",
    images: ["/frontend/beltone-logo.svg"],
  },
  {
    name: "Signia",
    tagline: "Hearing technology for everyday life",
    images: ["/frontend/signia-logo.svg"],
  },
];

export const comprehensiveCareItems: string[] = [
  "A comprehensive hearing assessment and discussion of your listening needs",
  "Careful selection of hearing aid style and technology appropriate for you",
  "Professional fitting using real-ear verification to ensure accurate amplification",
  "Fine-tuning based on your comfort, sound quality, and real-world listening",
  "Education on use, care, and expectations",
  "Follow-up appointments to adjust and optimise performance",
  "Ongoing support to maintain comfort, function, and hearing health",
];
