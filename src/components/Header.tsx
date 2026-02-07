"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import Button from "./Button";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Hearing Aids", href: "/hearing-aids" },
  { name: "Team", href: "/team" },
  { name: "Resources", href: "/resources" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md"
          : "bg-white"
      }`}
    >
      {/* Main navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
            <img
              src="/images/icon.png"
              alt="Veritas Hearing"
              className="h-8 sm:h-10 w-auto flex-shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-base sm:text-xl font-bold text-foreground truncate">
                Veritas Hearing
              </span>
              <span className="text-[10px] sm:text-xs text-[var(--secondary)] -mt-1 hidden xs:block">
                Hear better. Live fully
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/booking">
              <Button>Book Assessment</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-3 border-t border-border">
            <div className="flex flex-col">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary hover:bg-primary/5 transition-colors font-medium py-3 px-2 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-border pt-4 mt-2 flex flex-col gap-3">
                <a
                  href="tel:+642904510839"
                  className="flex items-center justify-center gap-2 py-3 text-primary font-medium"
                >
                  <Phone className="h-4 w-4" />
                  029 0451 0839
                </a>
                <Link href="/booking" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">Book Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
