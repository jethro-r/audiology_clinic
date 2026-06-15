"use client";

import { useState, useEffect } from "react";
import { Send, Loader2, CheckCircle, AlertCircle, Info } from "lucide-react";
import Button from "./Button";
import { validateEmail, validatePhone } from "@/lib/utils";
import { serviceNames } from "@/lib/static-data";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

interface EmailConfig {
  fromEmail: string;
  toEmail: string;
  source: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [emailConfig, setEmailConfig] = useState<EmailConfig | null>(null);

  // Fetch email config in development mode
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      fetch("/api/contact/config")
        .then((res) => res.json())
        .then((data) => setEmailConfig(data))
        .catch(() => {});
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("loading");

    try {
      // Using internal API route for form submission
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("[ContactForm] Response:", { status: response.status, data });

      if (response.ok) {
        setStatus("success");
        // GA4: a submitted enquiry is a lead — mark `generate_lead` as a key
        // event in GA4 to count it as a (secondary) conversion.
        if (typeof window.gtag === "function") {
          window.gtag("event", "generate_lead");
        }
        // Show more detailed success info
        if (data.accepted && data.accepted.length > 0) {
          setStatusMessage(`Thank you! Your message was sent successfully. We'll be in touch soon.`);
        } else {
          setStatusMessage("Thank you! We'll be in touch soon.");
        }
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } else {
        throw new Error(data.details || data.error || "Failed to submit form");
      }
    } catch (error) {
      console.error("[ContactForm] Error:", error);
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "Something went wrong. Please try again or call us directly.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Development-only email config display */}
      {process.env.NODE_ENV === "development" && emailConfig && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-yellow-800 mb-1">Dev Mode - Email Config</p>
              <p className="text-yellow-700">
                <span className="font-medium">From:</span> {emailConfig.fromEmail}
              </p>
              <p className="text-yellow-700">
                <span className="font-medium">To:</span> {emailConfig.toEmail}
                <span className="text-yellow-500 ml-2">({emailConfig.source})</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Full Name <span className="text-[var(--error)]">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border text-base ${
            errors.name ? "border-[var(--error)]" : "border-border"
          } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors`}
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-[var(--error)]">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Email Address <span className="text-[var(--error)]">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border text-base ${
            errors.email ? "border-[var(--error)]" : "border-border"
          } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors`}
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-[var(--error)]">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border text-base ${
            errors.phone ? "border-[var(--error)]" : "border-border"
          } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors`}
          placeholder="021 123 4567"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-[var(--error)]">{errors.phone}</p>
        )}
      </div>

      {/* Service Interest */}
      <div>
        <label
          htmlFor="service"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Service of Interest
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-white text-base"
        >
          <option value="">Select a service (optional)</option>
          {serviceNames.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Message <span className="text-[var(--error)]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`w-full px-4 py-3 rounded-lg border text-base ${
            errors.message ? "border-[var(--error)]" : "border-border"
          } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none`}
          placeholder="How can we help you?"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-[var(--error)]">{errors.message}</p>
        )}
      </div>

      {/* Status Message */}
      {status !== "idle" && status !== "loading" && (
        <div
          className={`flex items-center gap-2 p-4 rounded-lg ${
            status === "success"
              ? "bg-[var(--success)]/10 text-[var(--success)]"
              : "bg-[var(--error)]/10 text-[var(--error)]"
          }`}
        >
          {status === "success" ? (
            <CheckCircle className="h-5 w-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
          )}
          <p className="text-sm">{statusMessage}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full"
        size="lg"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
