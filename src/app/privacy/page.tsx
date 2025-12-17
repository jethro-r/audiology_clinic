"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
            className="inline-flex items-center text-sm text-[var(--muted)] hover:text-[var(--foreground)] mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">
            Privacy Policy
          </h1>
          <p className="text-[var(--muted)] mb-8">
            Last updated: December 2024
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                1. Introduction
              </h2>
              <p className="text-[var(--muted)] mb-4">
                Veritas Hearing (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to
                protecting your privacy and personal information. This policy
                explains how we collect, use, and safeguard your information in
                accordance with the Privacy Act 2020 (New Zealand) and the Health
                Information Privacy Code 2020.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                2. Information We Collect
              </h2>
              <p className="text-[var(--muted)] mb-4">
                We collect the following types of information:
              </p>
              <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">
                Personal Information
              </h3>
              <ul className="list-disc pl-6 text-[var(--muted)] mb-4 space-y-2">
                <li>Name, address, phone number, and email</li>
                <li>Date of birth</li>
                <li>Emergency contact details</li>
                <li>NHI number (where applicable)</li>
                <li>Insurance and ACC information</li>
              </ul>
              <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">
                Health Information
              </h3>
              <ul className="list-disc pl-6 text-[var(--muted)] mb-4 space-y-2">
                <li>Medical history related to hearing health</li>
                <li>Audiological test results and assessments</li>
                <li>Treatment plans and progress notes</li>
                <li>Hearing aid fitting records</li>
                <li>Referral information from other healthcare providers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-[var(--muted)] mb-4">
                We use your information to:
              </p>
              <ul className="list-disc pl-6 text-[var(--muted)] mb-4 space-y-2">
                <li>Provide audiological care and treatment</li>
                <li>Schedule and manage appointments</li>
                <li>Process payments and insurance claims</li>
                <li>Communicate with you about your care</li>
                <li>Send appointment reminders</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Improve our services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                4. Information Sharing
              </h2>
              <p className="text-[var(--muted)] mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-[var(--muted)] mb-4 space-y-2">
                <li>
                  Other healthcare providers involved in your care (with your
                  consent)
                </li>
                <li>ACC for claim processing</li>
                <li>Health insurers for claim processing</li>
                <li>Government agencies as required by law</li>
                <li>
                  Our service providers who help us operate (under strict
                  confidentiality agreements)
                </li>
              </ul>
              <p className="text-[var(--muted)] mb-4">
                We will never sell your personal information to third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                5. Data Security
              </h2>
              <p className="text-[var(--muted)] mb-4">
                We take appropriate measures to protect your information,
                including:
              </p>
              <ul className="list-disc pl-6 text-[var(--muted)] mb-4 space-y-2">
                <li>Secure electronic systems with encryption</li>
                <li>Password-protected access to records</li>
                <li>Physical security for paper records</li>
                <li>Staff training on privacy obligations</li>
                <li>Regular security reviews and updates</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                6. Your Rights
              </h2>
              <p className="text-[var(--muted)] mb-4">
                Under the Privacy Act 2020, you have the right to:
              </p>
              <ul className="list-disc pl-6 text-[var(--muted)] mb-4 space-y-2">
                <li>Access your personal and health information</li>
                <li>Request correction of inaccurate information</li>
                <li>
                  Know how your information is being used and who it is shared
                  with
                </li>
                <li>Make a complaint about our handling of your information</li>
              </ul>
              <p className="text-[var(--muted)] mb-4">
                To exercise these rights, please contact us using the details
                below.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                7. Retention of Information
              </h2>
              <p className="text-[var(--muted)] mb-4">
                We retain health information in accordance with legal requirements,
                typically for a minimum of 10 years after your last interaction
                with us, or longer if required by law or for ongoing care purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                8. Website and Cookies
              </h2>
              <p className="text-[var(--muted)] mb-4">
                Our website may use cookies to improve your experience. These are
                small files stored on your device that help us understand how you
                use our site. You can control cookie settings through your browser.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                9. Changes to This Policy
              </h2>
              <p className="text-[var(--muted)] mb-4">
                We may update this policy from time to time. Changes will be posted
                on our website with the updated date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                10. Contact Us
              </h2>
              <p className="text-[var(--muted)] mb-4">
                If you have questions about this policy or wish to exercise your
                privacy rights, please contact our Privacy Officer:
              </p>
              <ul className="text-[var(--muted)] space-y-2">
                <li>Email: privacy@veritashearing.co.nz</li>
                <li>Phone: 0800 555 051</li>
                <li>Address: 42a Hillcrest Road, Hillcrest, Hamilton 3216</li>
              </ul>
              <p className="text-[var(--muted)] mt-4">
                You may also contact the Office of the Privacy Commissioner if you
                have concerns about how we handle your information:{" "}
                <a
                  href="https://www.privacy.org.nz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary)] hover:underline"
                >
                  www.privacy.org.nz
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
