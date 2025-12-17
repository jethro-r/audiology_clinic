"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AccessibilityPage() {
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
            Accessibility Statement
          </h1>
          <p className="text-[var(--muted)] mb-8">
            Last updated: December 2024
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                Our Commitment
              </h2>
              <p className="text-[var(--muted)] mb-4">
                Veritas Hearing is committed to ensuring digital accessibility for
                people with disabilities. We are continually improving the user
                experience for everyone and applying the relevant accessibility
                standards.
              </p>
              <p className="text-[var(--muted)] mb-4">
                As a hearing healthcare provider, we understand the importance of
                accessible services. We strive to make our website and clinic
                accessible to all visitors, regardless of ability.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                Accessibility Features
              </h2>
              <p className="text-[var(--muted)] mb-4">
                Our website includes the following accessibility features:
              </p>
              <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">
                Navigation and Structure
              </h3>
              <ul className="list-disc pl-6 text-[var(--muted)] mb-4 space-y-2">
                <li>Clear and consistent navigation throughout the site</li>
                <li>Descriptive page titles and headings</li>
                <li>Skip to main content links</li>
                <li>Logical reading order</li>
                <li>Keyboard-accessible menus and forms</li>
              </ul>

              <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">
                Visual Design
              </h3>
              <ul className="list-disc pl-6 text-[var(--muted)] mb-4 space-y-2">
                <li>High contrast text and backgrounds</li>
                <li>Resizable text without loss of functionality</li>
                <li>No content that flashes more than three times per second</li>
                <li>Alternative text for images</li>
                <li>Clear focus indicators for interactive elements</li>
              </ul>

              <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">
                Forms and Interactive Elements
              </h3>
              <ul className="list-disc pl-6 text-[var(--muted)] mb-4 space-y-2">
                <li>Clear labels for all form fields</li>
                <li>Error messages that explain what went wrong</li>
                <li>Keyboard-accessible buttons and controls</li>
                <li>Adequate time to complete forms</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                Clinic Accessibility
              </h2>
              <p className="text-[var(--muted)] mb-4">
                Our physical clinic is designed with accessibility in mind:
              </p>
              <ul className="list-disc pl-6 text-[var(--muted)] mb-4 space-y-2">
                <li>Ground floor access with no steps</li>
                <li>Wide doorways suitable for wheelchairs and mobility aids</li>
                <li>Accessible parking nearby</li>
                <li>Clear signage with high contrast</li>
                <li>Hearing loop system available</li>
                <li>Staff trained in accessibility awareness</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                Communication Accessibility
              </h2>
              <p className="text-[var(--muted)] mb-4">
                We offer multiple ways to communicate with us:
              </p>
              <ul className="list-disc pl-6 text-[var(--muted)] mb-4 space-y-2">
                <li>Online appointment booking through our patient portal</li>
                <li>Email communication</li>
                <li>Text message appointment reminders</li>
                <li>Written communication available upon request</li>
                <li>
                  Support for New Zealand Sign Language interpreters (please
                  notify us in advance)
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                Standards Compliance
              </h2>
              <p className="text-[var(--muted)] mb-4">
                We aim to conform to the Web Content Accessibility Guidelines
                (WCAG) 2.1 at Level AA. These guidelines explain how to make web
                content more accessible for people with disabilities.
              </p>
              <p className="text-[var(--muted)] mb-4">
                Conformance with these guidelines helps make the web more
                user-friendly for everyone.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                Known Limitations
              </h2>
              <p className="text-[var(--muted)] mb-4">
                While we strive for full accessibility, some areas may have
                limitations:
              </p>
              <ul className="list-disc pl-6 text-[var(--muted)] mb-4 space-y-2">
                <li>
                  Some older PDF documents may not be fully accessible. Please
                  contact us for alternative formats.
                </li>
                <li>
                  Third-party content or embedded services may not meet our
                  accessibility standards.
                </li>
              </ul>
              <p className="text-[var(--muted)] mb-4">
                We are actively working to address these limitations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                Feedback and Assistance
              </h2>
              <p className="text-[var(--muted)] mb-4">
                We welcome your feedback on the accessibility of our website and
                services. If you encounter accessibility barriers or need
                assistance, please contact us:
              </p>
              <ul className="text-[var(--muted)] space-y-2 mb-4">
                <li>
                  <strong>Email:</strong> accessibility@veritashearing.co.nz
                </li>
                <li>
                  <strong>Phone:</strong> 0800 555 051
                </li>
                <li>
                  <strong>Address:</strong> 42a Hillcrest Road, Hillcrest, Hamilton
                  3216
                </li>
              </ul>
              <p className="text-[var(--muted)] mb-4">
                We try to respond to accessibility feedback within 2 business days.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                Continuous Improvement
              </h2>
              <p className="text-[var(--muted)] mb-4">
                Accessibility is an ongoing effort. We regularly review our website
                and services to identify and address accessibility issues. We are
                committed to:
              </p>
              <ul className="list-disc pl-6 text-[var(--muted)] mb-4 space-y-2">
                <li>Regular accessibility audits</li>
                <li>User testing with people with disabilities</li>
                <li>Staff training on accessibility best practices</li>
                <li>Prompt response to accessibility concerns</li>
              </ul>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
