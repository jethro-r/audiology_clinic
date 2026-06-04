"use client";

import { useEffect, useRef } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { PageHero, Section } from "@/components/sections";
import AnimateInView from "@/components/AnimateInView";

export default function BookingPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleIFrameMessage = (e: MessageEvent) => {
      if (!iframeRef.current) return;
      if (typeof e.data !== "string") return;

      if (e.data.search("cliniko-bookings-resize") > -1) {
        const height = Number(e.data.split(":")[1]);
        iframeRef.current.style.height = height + "px";
      }

      if (e.data.search("cliniko-bookings-page") > -1) {
        iframeRef.current.scrollIntoView();

        if (e.data.search("cliniko-bookings-page:confirmed") > -1) {
          const dataLayer = (window as any).dataLayer || [];
          (window as any).dataLayer = dataLayer;
          dataLayer.push({ event: "clinikoBookingCompleted" });

          // Google Ads conversion — fires when NEXT_PUBLIC_ADS_CONV_LABEL is set
          const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
          const convLabel = process.env.NEXT_PUBLIC_ADS_CONV_LABEL;
          if (adsId && convLabel && typeof (window as any).gtag === "function") {
            (window as any).gtag("event", "conversion", {
              send_to: `${adsId}/${convLabel}`,
            });
          }
        }
      }
    };

    window.addEventListener("message", handleIFrameMessage);
    return () => window.removeEventListener("message", handleIFrameMessage);
  }, []);

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      content: "029 0451 0839",
      link: "tel:+642904510839",
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@veritashearing.co.nz",
      link: "mailto:info@veritashearing.co.nz",
    },
    {
      icon: Clock,
      title: "Hours",
      content: "Mon-Fri: 8:00 AM - 5:00 PM\nSat-Sun: Closed",
    },
  ];

  return (
    <>
      <PageHero
        badge="Book Assessment"
        title="Schedule Your Assessment"
        description="Select a convenient time for your appointment using our online booking system."
      />

      {/* Booking Widget + Sidebar */}
      <Section variant="white">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Booking Iframe */}
          <AnimateInView animation="fade-left" className="lg:col-span-2 bg-card rounded-2xl p-3 sm:p-4 border border-border shadow-sm flex flex-col min-h-[500px] sm:min-h-[800px]">
            <iframe
              ref={iframeRef}
              id="cliniko-43314311"
              src="https://veritas-hearing.au5.cliniko.com/bookings?embedded=true"
              frameBorder="0"
              scrolling="auto"
              width="100%"
              height="100%"
              style={{ pointerEvents: "auto", flex: 1, minHeight: "500px" }}
              className="w-full rounded-xl sm:min-h-[800px]"
            />
          </AnimateInView>

          {/* Sidebar */}
          <AnimateInView animation="fade-right" className="space-y-6">
            {/* Contact Info */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-4">
                Need Help?
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted">{item.title}</p>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-sm text-foreground hover:text-primary transition-colors whitespace-pre-line"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-sm text-foreground whitespace-pre-line">
                          {item.content}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Location
              </h3>
              <p className="text-sm text-foreground mb-1">
                37 Lake Road
              </p>
              <p className="text-sm text-muted mb-3">
                Frankton, Hamilton 3204
              </p>
              <a
                href="https://maps.google.com/?q=37+Lake+Road+Frankton+Hamilton+New+Zealand"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline inline-flex items-center gap-1"
              >
                Get directions →
              </a>
            </div>
          </AnimateInView>
        </div>
      </Section>
    </>
  );
}
