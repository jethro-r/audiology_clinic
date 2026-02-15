"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface Settings {
  contactEmail: string;
}

export default function SettingsManager() {
  const [settings, setSettings] = useState<Settings>({
    contactEmail: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  // Load settings
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await fetch("/api/admin/settings");
      if (response.ok) {
        const data = await response.json();
        setSettings({
          contactEmail: data.contactEmail || "",
        });
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const validateSettings = (): boolean => {
    if (!settings.contactEmail.trim()) {
      setStatus("error");
      setStatusMessage("Contact email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(settings.contactEmail)) {
      setStatus("error");
      setStatusMessage("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateSettings()) return;

    setSaving(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ settings }),
      });

      if (response.ok) {
        setStatus("success");
        setStatusMessage("Settings saved successfully");
      } else {
        throw new Error("Failed to save settings");
      }
    } catch (error) {
      setStatus("error");
      setStatusMessage("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-foreground/50" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-foreground/60">
          Manage your site-wide configuration settings.
        </p>
      </div>

      {/* Status Message */}
      {status !== "idle" && (
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

      {/* Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Email */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Contact Information
          </h2>

          <div>
            <label
              htmlFor="contactEmail"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Contact Form Email Address
            </label>
            <input
              type="email"
              id="contactEmail"
              value={settings.contactEmail}
              onChange={(e) =>
                setSettings({ ...settings, contactEmail: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-border text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              placeholder="info@example.com"
            />
            <p className="mt-2 text-sm text-foreground/60">
              This email address will receive all contact form submissions.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
