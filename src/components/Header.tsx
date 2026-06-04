"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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

// Approximate widths in pixels for calculations
const ITEM_WIDTH = 85; // Average width per nav item
const BUTTON_WIDTH = 140; // "Book Assessment" button
const LOGO_WIDTH = 180; // Logo + text
const GAP_SPACE = 32; // Gaps between items
const MIN_CONTAINER_WIDTH = 320; // Minimum breakpoint (mobile)

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleCount, setVisibleCount] = useState(navigation.length);
  const [containerWidth, setContainerWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  // Calculate how many nav items fit in available space
  useEffect(() => {
    const calculateVisibleItems = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      setContainerWidth(containerWidth);

      // Get actual widths of logo and button if available
      const logoWidth = logoRef.current?.offsetWidth || LOGO_WIDTH;
      const buttonWidth = buttonRef.current?.offsetWidth || BUTTON_WIDTH;

      // Calculate available space for nav items
      const reservedSpace = logoWidth + buttonWidth + GAP_SPACE * 3;
      const availableSpace = containerWidth - reservedSpace;

      // Calculate how many items fit
      const itemsThatFit = Math.max(0, Math.floor(availableSpace / ITEM_WIDTH));
      setVisibleCount(Math.min(itemsThatFit, navigation.length));
    };

    // Initial calculation
    calculateVisibleItems();

    // Set up ResizeObserver to watch container size changes
    const resizeObserver = new ResizeObserver(calculateVisibleItems);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Also recalculate on window resize as a fallback
    window.addEventListener("resize", calculateVisibleItems);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateVisibleItems);
    };
  }, []);

  const hasOverflow = visibleCount < navigation.length;
  const visibleItems = navigation.slice(0, visibleCount);
  const overflowItems = navigation.slice(visibleCount);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
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
        <div ref={containerRef} className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link ref={logoRef} href="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Image
              src="/frontend/icon.png"
              alt="Veritas Hearing"
              width={40}
              height={40}
              className="h-8 sm:h-10 w-auto flex-shrink-0"
              priority
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

          {/* Desktop navigation - adaptively shown items */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {visibleItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors font-medium whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button - always visible on desktop/tablet */}
          <div className="hidden md:flex items-center gap-3">
            <Link ref={buttonRef} href="/booking">
              <Button>Book Assessment</Button>
            </Link>
          </div>

          {/* Hamburger button - shown only when there are overflow items */}
          {(hasOverflow || containerWidth < MIN_CONTAINER_WIDTH) && (
            <button
              type="button"
              className="md:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          )}

          {/* Hamburger button for overflow items on desktop/tablet */}
          {hasOverflow && containerWidth >= MIN_CONTAINER_WIDTH && (
            <button
              type="button"
              className="hidden md:flex p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          )}
        </div>

        {/* Mobile/overflow navigation */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-3 border-t border-border">
            <div className="flex flex-col">
              {/* Show overflow items on desktop, all items on mobile */}
              {(containerWidth < MIN_CONTAINER_WIDTH ? navigation : overflowItems).map((item) => (
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
