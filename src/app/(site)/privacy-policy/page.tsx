import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { PageHero, Section, CTASection } from "@/components/sections";
import AnimateInView from "@/components/AnimateInView";

// NOTE: Content supplied by Paul (Veritas_Hearing_Privacy_Policy.docx,
// 30 Sep 2026). Adapted for the website only where noted:
// - info@veritashearing.co.nz used throughout (replaces the old admin@).
// - The website/analytics section states the consent-gated implementation
//   (GA4 + Meta Pixel load only after accepting the cookie banner).
// - The Meta Pixel bullet was reworded: the source claimed the pixel "is not
//   used on our booking page", but /booking fires a content-free Lead
//   conversion event (booking/page.tsx). Wording now matches the code —
//   decided with the user over deleting the conversion event.
// - Pre-publish checklist section from the source doc removed.
interface ShareRow {
  who: string;
  why: string;
}

type Block =
  | { type: "para"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; rows: ShareRow[] };

interface PolicySection {
  title: string;
  blocks: Block[];
}

const sections: PolicySection[] = [
  {
    title: "About this policy",
    blocks: [
      {
        type: "para",
        text: "We keep your personal and health information private and use it only to look after your hearing. This policy explains what we collect, why we collect it, who we share it with, and how you can see or correct it.",
      },
      {
        type: "para",
        text: "Veritas Hearing is an independent audiology practice at 37 Lake Road, Frankton, Hamilton 3204. We follow the Privacy Act 2020 and the Health Information Privacy Code 2020, which sets stricter rules for health information such as your hearing test results.",
      },
      {
        type: "para",
        text: "This policy covers our clinic, our website (veritashearing.co.nz), and how we talk with you by phone, email, WhatsApp and social media.",
      },
      {
        type: "para",
        text: "Our Privacy Officer is Paul Hsu. You can reach them at info@veritashearing.co.nz or 029 0451 0839.",
      },
    ],
  },
  {
    title: "What information we collect",
    blocks: [
      { type: "para", text: "We only collect what we need to care for you well." },
      {
        type: "list",
        items: [
          "Contact details: your name, date of birth, address, phone number and email.",
          "Health information: your hearing and medical history, symptoms such as tinnitus or dizziness, medications relevant to your ears, test results (including audiograms), images of your ear canals, ear impressions, hearing aid settings and usage data, clinical notes, and letters to or from other health providers.",
          "Funding and payment details: your NHI number, ACC claim numbers, eligibility for government hearing aid funding, insurance details, and records of what you've paid. We don't store your full card number.",
          "Support people: the name and contact details of a family or whānau member you bring or ask us to talk with.",
          "Messages: emails, WhatsApp and social media messages, and notes of phone calls with us.",
          "Website information: see Our website, cookies and analytics below.",
        ],
      },
      {
        type: "para",
        text: "You can choose not to give us some information. If you do, we'll explain how it affects what we can do. For example, we can't safely fit hearing aids without a current hearing assessment.",
      },
    ],
  },
  {
    title: "How we collect it",
    blocks: [
      {
        type: "para",
        text: "Most of what we hold comes straight from you: at your appointments, when you book online, and when you call, email or message us.",
      },
      {
        type: "para",
        text: "Sometimes we receive information about you from someone else:",
      },
      {
        type: "list",
        items: [
          "your GP or a specialist who refers you to us",
          "ACC, if your hearing care is part of a claim",
          "another hearing provider, when you ask them to transfer your records",
          "a family member who books or calls on your behalf",
          "a hearing aid manufacturer's app or cloud service, if you use remote fine-tuning or share usage data with us",
        ],
      },
      {
        type: "para",
        text: "When we get information about you from someone else, we'll let you know as soon as reasonably practicable, usually at your first appointment. We'll tell you what we received, who it came from, and how you can see or correct it. We won't do this if you already know, or if an exception in the Privacy Act applies.",
      },
    ],
  },
  {
    title: "How we use your information",
    blocks: [
      { type: "para", text: "We use your information to:" },
      {
        type: "list",
        items: [
          "assess your hearing, recommend options, and fit, fine-tune and review hearing aids and hearing protection",
          "write your assessment report, and, with your agreement, keep your GP or referrer informed",
          "apply for funding or process claims with ACC, government funders or your insurer",
          "send appointment confirmations and reminders",
          "order, repair and manage warranties on your devices",
          "invoice you and keep financial records",
          "meet our legal and professional obligations",
          "improve our service, using information that no longer identifies you",
        ],
      },
      {
        type: "para",
        text: "We'll only send you newsletters or offers if you've said yes, and you can unsubscribe at any time. We never sell your information, and we never use your health information for advertising.",
      },
    ],
  },
  {
    title: "Who we share it with",
    blocks: [
      {
        type: "para",
        text: "We only share your information when it's needed for your care, you've agreed, or the law allows or requires it. We share the least we can.",
      },
      {
        type: "table",
        rows: [
          {
            who: "Your GP, ENT specialist or other health providers",
            why: "Referrals and reports about your care",
          },
          {
            who: "ACC",
            why: "To manage an ACC claim for your hearing",
          },
          {
            who: "Enable New Zealand and government funders",
            why: "To apply for hearing aid subsidies or funding you're eligible for",
          },
          {
            who: "Your insurer",
            why: "Only when you ask us to",
          },
          {
            who: "Hearing aid manufacturers and earmould labs",
            why: "To order, program, repair and warranty your devices",
          },
          {
            who: "Our service providers",
            why: "Cliniko (patient records, online booking and appointment reminders), Xero (accounting and invoicing), Google (email), Verifone (EFTPOS card payments), and Vercel (website hosting). They store or process information for us and can't use it for their own purposes",
          },
          {
            who: "Family or whānau",
            why: "Only with your permission",
          },
          {
            who: "Others where the law allows",
            why: "For example, to prevent a serious threat to someone's health or safety, or when legally required",
          },
        ],
      },
      {
        type: "para",
        text: "We won't share your health information with anyone else without your consent, unless the Health Information Privacy Code allows it.",
      },
    ],
  },
  {
    title: "Our website, cookies and analytics",
    blocks: [
      {
        type: "para",
        text: "Our website collects a small amount of technical information to work properly and to help us understand how people use it.",
      },
      {
        type: "para",
        text: "If you decline the cookie banner, none of the third-party tools below load at all.",
      },
      {
        type: "list",
        items: [
          "Browsing information: your IP address, browser and device type, the pages you visit, and how you found us. With your consent, we use Google Analytics to see this in summary form. It doesn't tell us who you are.",
          "First-party analytics: we also use cookieless, first-party analytics (Vercel) for aggregate page statistics. It cannot track you across other websites.",
          "Online booking: bookings are made through Cliniko, which runs inside our booking page. What you enter there goes into your patient record. Cliniko may use cookies to make booking work.",
          "Advertising cookies: with your consent, we use the Meta Pixel to measure how our Facebook and Instagram ads perform and to show our ads to people who have visited our site. It never receives health information or anything you enter into our forms — on the booking page it does nothing except count a completed booking. You can manage how Meta uses this in your Facebook or Instagram ad settings.",
          "Links to other sites: our links to Facebook, Instagram, LinkedIn, WhatsApp and Google Maps take you to services with their own privacy policies.",
          "You can block or delete cookies in your browser settings. The site will still work, although online booking may not.",
        ],
      },
    ],
  },
  {
    title: "How we store and protect it",
    blocks: [
      {
        type: "para",
        text: "Your records are stored electronically in Cliniko, a secure practice management system built for health providers. Cliniko stores our data on servers in Australia, which has privacy protections comparable to New Zealand's.",
      },
      {
        type: "para",
        text: "To keep your information safe, we:",
      },
      {
        type: "list",
        items: [
          "protect our systems with strong passwords and two-factor sign-in",
          "limit access to the people who need it to care for you",
          "keep any paper records locked away and shred them securely when no longer needed",
          "require our service providers to keep your information confidential and secure",
        ],
      },
      {
        type: "para",
        text: "If a privacy breach happens that is likely to cause you serious harm, we'll tell you and the Privacy Commissioner as soon as practicable.",
      },
    ],
  },
  {
    title: "How long we keep it",
    blocks: [
      {
        type: "para",
        text: "By law, we keep health records for at least 10 years from the day after we last provided care to you. This is required by the Health (Retention of Health Information) Regulations 1996.",
      },
      {
        type: "para",
        text: "We keep enquiries from people who don't become clients for 6 months, then delete them. Financial records are kept for 7 years, as tax law requires. When we no longer need information, we delete or destroy it securely.",
      },
    ],
  },
  {
    title: "Seeing and correcting your information",
    blocks: [
      {
        type: "para",
        text: "You can ask for a copy of any information we hold about you, including your hearing test results and clinical notes. You can also ask us to correct anything you think is wrong.",
      },
      {
        type: "para",
        text: "To make a request, email info@veritashearing.co.nz or call 029 0451 0839. We'll check your identity first, then respond as soon as we can and within 20 working days. There's usually no charge.",
      },
      {
        type: "para",
        text: "If we don't agree that something needs correcting, we'll explain why. You can then ask us to add a note to your record showing the correction you asked for.",
      },
    ],
  },
  {
    title: "Concerns and complaints",
    blocks: [
      {
        type: "para",
        text: "If you're worried about how we've handled your information, please talk to us first. We'll listen, look into it, and get back to you.",
      },
      {
        type: "para",
        text: "If you're not satisfied with our response, you can contact the Office of the Privacy Commissioner at privacy.org.nz or 0800 803 909. For concerns about the care you received, you can also contact the Health and Disability Commissioner at hdc.org.nz or 0800 11 22 33.",
      },
    ],
  },
  {
    title: "Changes to this policy",
    blocks: [
      {
        type: "para",
        text: "We may update this policy as our services or the law change. The latest version will always be on this page, with the date it was last updated.",
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        badge="Privacy Policy"
        title="Privacy Statement"
        description="How Veritas Hearing collects, uses, and protects your personal information."
      />

      <Section variant="white" containerClassName="max-w-3xl">
        <AnimateInView>
          <div className="flex items-center gap-3 text-primary mb-10">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm text-muted">Last updated: 30 September 2026</p>
          </div>

          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-3">
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.blocks.map((block, i) => {
                    if (block.type === "para") {
                      return (
                        <p
                          key={i}
                          className="text-muted leading-relaxed"
                        >
                          {block.text}
                        </p>
                      );
                    }
                    if (block.type === "list") {
                      return (
                        <ul key={i} className="space-y-2">
                          {block.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-3 text-muted"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0 mt-2.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <div
                        key={i}
                        className="overflow-x-auto rounded-xl border border-border"
                      >
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-primary/5 text-left">
                              <th className="px-4 py-3 font-semibold text-primary">
                                Who
                              </th>
                              <th className="px-4 py-3 font-semibold text-primary">
                                Why
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {block.rows.map((row) => (
                              <tr
                                key={row.who}
                                className="border-t border-border align-top"
                              >
                                <td className="px-4 py-3 text-muted">
                                  {row.who}
                                </td>
                                <td className="px-4 py-3 text-muted">
                                  {row.why}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-3">
                Contacting Us About Your Information
              </h2>
              <p className="text-muted leading-relaxed mb-1">
                Privacy Officer: Paul Hsu
              </p>
              <p className="text-muted leading-relaxed mb-4">
                If you&apos;d like to ask for a copy of your information, or to
                have it corrected, please contact us:
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:info@veritashearing.co.nz"
                  className="flex items-center gap-3 text-primary hover:text-primary-light transition-colors"
                >
                  <Mail className="h-5 w-5 text-secondary flex-shrink-0" />
                  info@veritashearing.co.nz
                </a>
                <a
                  href="tel:+642904510839"
                  className="flex items-center gap-3 text-primary hover:text-primary-light transition-colors"
                >
                  <Phone className="h-5 w-5 text-secondary flex-shrink-0" />
                  029 0451 0839
                </a>
                <span className="flex items-center gap-3 text-muted">
                  <MapPin className="h-5 w-5 text-secondary flex-shrink-0" />
                  37 Lake Road, Frankton, Hamilton 3204
                </span>
              </div>
            </div>
          </div>
        </AnimateInView>
      </Section>

      <CTASection
        title="Questions about your privacy?"
        description="Get in touch and we'll be happy to help with any requests about your personal information."
        primaryButton={{ text: "Contact Us", href: "/contact" }}
        variant="cream"
      />
    </>
  );
}
