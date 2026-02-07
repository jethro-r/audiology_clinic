"use client";

import { motion } from "framer-motion";
import { PageHero, Section } from "@/components/sections";

// TODO: Replace with your actual booking embed URL
const BOOKING_EMBED_URL = "https://bookings.your-bookingsystem.com/widget";

export default function BookingPage() {
  return (
    <>
      <PageHero
        badge="Book Now"
        title="Schedule Your Appointment"
        description="Select a convenient time for your appointment using our online booking system."
      />

      <Section variant="white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Booking Embed */}
          <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border">
            <div className="aspect-[16/10] w-full">
              <iframe
                src={BOOKING_EMBED_URL}
                className="w-full h-full border-0"
                title="Book an appointment"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Fallback Info */}
          <div className="mt-8 text-center">
            <p className="text-muted mb-4">
              Trouble with the booking system? We're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+642904510839"
                className="text-primary font-semibold hover:underline"
              >
                Call us: 029 0451 0839
              </a>
              <a
                href="mailto:info@veritashearing.co.nz"
                className="text-primary font-semibold hover:underline"
              >
                Email us
              </a>
            </div>
          </div>
        </motion.div>
      </Section>
    </>
  );
}
