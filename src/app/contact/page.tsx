"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { PageHero, Section } from "@/components/sections";

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
    content: "42a Hillcrest Road\nHillcrest, Hamilton 3216\nNew Zealand",
  },
  {
    icon: Clock,
    title: "Hours",
    content: "Mon-Fri: 8:00 AM - 5:00 PM\nSat: 9:00 AM - 1:00 PM\nSun: Closed",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        badge="Contact Us"
        title="Get in Touch"
        description="Have questions or ready to schedule an appointment? We're here to help. Reach out using the form below or contact us directly."
      />

      <Section variant="white">
        <div className="grid lg:grid-cols-2 gap-12">
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
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
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

            {/* Map Placeholder */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">
                Find Us
              </h3>
              <div className="aspect-[16/9] bg-card rounded-xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-primary/10">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-primary/50 mx-auto mb-2" />
                    <p className="text-muted text-sm">
                      Google Maps would be embedded here
                    </p>
                    <p className="text-muted text-xs mt-1">
                      42a Hillcrest Road, Hillcrest, Hamilton
                    </p>
                  </div>
                </div>
              </div>
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
                  We&apos;re located at 42a Hillcrest Road
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
