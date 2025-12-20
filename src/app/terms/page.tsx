"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="pt-24 pb-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted hover:text-foreground mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-muted mb-8">
            Last updated: December 2024
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-muted mb-4">
                By accessing and using the Veritas Hearing website and services, you
                accept and agree to be bound by the terms and provisions of this
                agreement. If you do not agree to these terms, please do not use
                our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                2. Services
              </h2>
              <p className="text-muted mb-4">
                Veritas Hearing provides audiological services including but not
                limited to:
              </p>
              <ul className="list-disc pl-6 text-muted mb-4 space-y-2">
                <li>Hearing assessments and evaluations</li>
                <li>Hearing aid fitting and adjustment</li>
                <li>Tinnitus management</li>
                <li>Custom ear protection</li>
                <li>Balance assessments</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                3. Appointments and Cancellations
              </h2>
              <p className="text-muted mb-4">
                We require 24 hours notice for appointment cancellations. Failure
                to provide adequate notice may result in a cancellation fee. We
                reserve the right to cancel or reschedule appointments with
                reasonable notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                4. Payment Terms
              </h2>
              <p className="text-muted mb-4">
                Payment is due at the time of service unless alternative
                arrangements have been made. We accept cash, EFTPOS, credit cards,
                and bank transfers. ACC and health insurance claims are processed
                according to their respective guidelines.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                5. Patient Portal
              </h2>
              <p className="text-muted mb-4">
                By creating an account on our patient portal, you agree to:
              </p>
              <ul className="list-disc pl-6 text-muted mb-4 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your login credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Use the portal only for its intended purpose</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-muted mb-4">
                While we strive to provide the highest quality care, hearing aids
                and audiological interventions may not completely restore normal
                hearing. Results vary depending on individual circumstances. We are
                not liable for outcomes beyond our reasonable control.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                7. Intellectual Property
              </h2>
              <p className="text-muted mb-4">
                All content on this website, including text, graphics, logos, and
                images, is the property of Veritas Hearing and protected by
                copyright laws. You may not reproduce, distribute, or create
                derivative works without our express written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                8. Changes to Terms
              </h2>
              <p className="text-muted mb-4">
                We reserve the right to modify these terms at any time. Changes
                will be effective immediately upon posting to our website.
                Continued use of our services after changes constitutes acceptance
                of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                9. Contact Information
              </h2>
              <p className="text-muted mb-4">
                If you have any questions about these terms, please contact us:
              </p>
              <ul className="text-muted space-y-2">
                <li>Email: info@veritashearing.co.nz</li>
                <li>Phone: 029 0451 0839</li>
                <li>Address: 42a Hillcrest Road, Hillcrest, Hamilton 3216</li>
              </ul>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
