"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { PageHero, Section } from "@/components/sections";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61587521037122", icon: Facebook },
  { name: "Instagram", href: "https://instagram.com/veritashearingnz", icon: Instagram },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/paul-hsu-68919a11b", icon: Linkedin },
  { name: "WhatsApp", href: "https://wa.me/642904510839", icon: WhatsAppIcon },
];

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    content: "029 0451 0839",
    link: "tel:+6480055551",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@veritashearing.co.nz",
    link: "mailto:info@veritashearing.co.nz",
  },
  {
    icon: MapPin,
    title: "Address",
    content: "37 Lake Road\nFrankton, Hamilton 3204\nNew Zealand",
  },
  {
    icon: Clock,
    title: "Hours",
    content: "Mon-Fri: 8:00 AM - 5:00 PM\nSat-Sun: Closed",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        badge="Contact Us"
        title="Get in Touch"
        description="Have questions or ready to schedule an appointment? We're here to help. Reach out using the form below or contact us directly."
      >
        <div className="flex justify-center gap-4 mt-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="text-white/80 hover:text-secondary transition-colors"
            >
              <link.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </PageHero>

      <Section variant="white">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Send Us a Message
            </h2>
            <ContactForm />
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Contact Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 p-4 bg-card rounded-lg"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {item.title}
                      </h3>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-muted hover:text-primary transition-colors whitespace-pre-line"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-muted whitespace-pre-line">
                          {item.content}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* Google Maps Embed */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">
                Find Us
              </h3>
              <div className="aspect-[4/3] sm:aspect-[16/9] rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps?q=37+Lake+Road+Frankton+Hamilton+3204+New+Zealand&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Veritas Hearing Location - 37 Lake Road, Frankton, Hamilton"
                  className="w-full h-full"
                />
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=37+Lake+Road+Frankton+Hamilton+3204+New+Zealand"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline mt-3 text-sm"
              >
                <MapPin className="h-4 w-4" />
                Open in Google Maps
              </a>
            </div>

            {/* Parking Instructions */}
            <div className="bg-card rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-3">
                Parking Instructions
              </h3>
              <ul className="space-y-2 text-muted">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Free parking available in the building&apos;s main lot
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Accessible parking spaces near the main entrance
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  We&apos;re located at 37 Lake Road, Frankton
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Elevator access available for upper floor visitors
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Emergency Notice */}
      <section className="py-8 bg-[var(--secondary)]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-foreground">
            For emergencies: If you are experiencing sudden
            hearing loss, severe ear pain, or dizziness, please seek immediate
            medical attention or call 111.
          </p>
        </div>
      </section>

    </>
  );
}
