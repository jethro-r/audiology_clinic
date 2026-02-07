"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react";
import { type Service } from "@/lib/data";

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Hearing Aids", href: "/hearing-aids" },
  { name: "Our Team", href: "/team" },
  { name: "Resources", href: "/resources" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch('/api/services?footer=true');
        if (res.ok) {
          const data = await res.json();
          setServices(data);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    }
    fetchServices();
  }, []);

  return (
    <footer className="bg-primary-dark text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Clinic Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/icon.png"
                alt="Veritas Hearing"
                className="h-10 w-auto"
              />
              <div>
                <span className="text-xl font-bold text-white">Veritas Hearing</span>
                <span className="block text-xs text-[var(--secondary)]">
                  Hear better. Live fully
                </span>
              </div>
            </div>
            <p className="text-sm mb-4">
              An independent, clinician-led audiology practice dedicated to providing clear, honest, and evidence-based hearing care.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61587521037122"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/veritashearingnz"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="text-sm hover:text-secondary transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  37 Lake Road
                  <br />
                  Frankton, Hamilton 3204
                  <br />
                  New Zealand
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-secondary flex-shrink-0" />
                <a
                  href="tel:+6480055551"
                  className="text-sm hover:text-secondary transition-colors"
                >
                  029 0451 0839
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-secondary flex-shrink-0" />
                <a
                  href="mailto:info@veritashearing.co.nz"
                  className="text-sm hover:text-secondary transition-colors break-all"
                >
                  info@veritashearing.co.nz
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  Mon-Fri: 8:00 AM - 5:00 PM
                  <br />
                  Sat-Sun: Closed
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-white/60 text-center sm:text-left">
            © {currentYear} Veritas Hearing. All rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
}
