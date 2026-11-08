"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, X } from "lucide-react";
import AdminAuthWrapper from "../../../../components/admin/AdminAuthWrapper";
import AdminLayout from "../../../../components/admin/AdminLayout";
import IconPicker from "@/components/admin/IconPicker";
import LandingPageEditor, { defaultPageContent } from "@/components/admin/LandingPageEditor";
import { slugify } from "@/lib/utils";
import type { ServicePageContent } from "@/lib/servicePage";

interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  image?: string | null;
  features: string[];
  sortOrder: number;
  showOnHomepage: boolean;
  showInFooter: boolean;
  buttonText?: string | null;
  idealFor?: string | null;
  note?: string | null;
  isLive: boolean;
  pageContent: ServicePageContent;
}

const emptyService: Omit<Service, "id"> = {
  slug: "", title: "", shortDescription: "", fullDescription: "",
  iconName: "Ear", image: "", features: [], sortOrder: 0,
  showOnHomepage: true, showInFooter: true, buttonText: "", idealFor: "", note: "",
  isLive: false, pageContent: defaultPageContent(),
};

export default function ServiceEditPage() {
  return (
    <AdminAuthWrapper>
      <AdminLayout>
        <ServiceEditForm />
      </AdminLayout>
    </AdminAuthWrapper>
  );
}

function ServiceEditForm() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "new";

  const [loading, setLoading] = useState(!isNew);
  const [form, setForm] = useState<Omit<Service, "id">>(emptyService);
  const [featuresText, setFeaturesText] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const slugManuallyEdited = useRef(false);

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/services?id=${id}`)
        .then(async (r) => {
          if (r.status === 401) throw new Error("Unauthorised — please log in again.");
          if (r.status === 404) throw new Error("Service not found.");
          if (!r.ok) throw new Error(`Unexpected error (${r.status})`);
          return r.json();
        })
        .then((data: Service) => {
          slugManuallyEdited.current = true; // existing services have a slug already
          setForm({
            slug: data.slug, title: data.title,
            shortDescription: data.shortDescription, fullDescription: data.fullDescription,
            iconName: data.iconName, image: data.image || "",
            features: data.features, sortOrder: data.sortOrder,
            showOnHomepage: data.showOnHomepage, showInFooter: data.showInFooter,
            buttonText: data.buttonText || "", idealFor: data.idealFor || "", note: data.note || "",
            isLive: data.isLive ?? false,
            pageContent: { ...defaultPageContent(), ...(data.pageContent || {}), hero: { ...defaultPageContent().hero, ...(data.pageContent?.hero || {}) } },
          });
          setFeaturesText(data.features.join("\n"));
          setLoading(false);
        })
        .catch((err: unknown) => {
          setMessage({ type: "error", text: err instanceof Error ? err.message : "Failed to load service" });
          setLoading(false);
        });
    }
  }, [id, isNew]);

  function showMessage(type: "success" | "error", text: string) {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "services");
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        setForm((f) => ({ ...f, image: data.url }));
        showMessage("success", "Image uploaded");
      } else {
        const err = await res.json();
        showMessage("error", err.error || "Failed to upload image");
      }
    } catch {
      showMessage("error", "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const data = {
      ...form,
      features: featuresText.split("\n").map((f) => f.trim()).filter(Boolean),
      image: form.image || null,
      buttonText: form.buttonText || null,
      idealFor: form.idealFor || null,
      note: form.note || null,
    };
    try {
      const res = await fetch("/api/admin/services", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isNew ? data : { id, ...data }),
      });
      if (res.ok) {
        if (isNew) {
          const created = await res.json();
          showMessage("success", "Service created");
          router.replace(`/admin/services/${created.id}`);
        } else {
          showMessage("success", "Service saved");
        }
        setSaving(false);
      } else {
        showMessage("error", isNew ? "Failed to create service" : "Failed to update service");
        setSaving(false);
      }
    } catch {
      showMessage("error", "An error occurred");
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="animate-spin h-8 w-8 border-4 border-secondary border-t-transparent rounded-full" />
      </div>
    );
  }

  const inputCls = "w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground text-sm";
  const labelCls = "block text-xs font-medium text-muted uppercase tracking-wide mb-1";

  return (
    <form onSubmit={handleSave}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <button
          type="button"
          onClick={() => router.push("/admin/services")}
          className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-card transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h2 className="text-xl font-semibold text-foreground flex-1 flex items-center gap-3">
          {isNew ? "New Service" : "Edit Service"}
          {!isNew && (
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                form.isLive ? "bg-success/10 text-success" : "bg-background border border-border text-muted"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${form.isLive ? "bg-success" : "bg-muted"}`} />
              {form.isLive ? "Live" : "Draft"}
            </span>
          )}
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push("/admin/services")}
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-muted hover:text-foreground hover:bg-card transition-colors flex items-center gap-1.5"
          >
            <X className="w-3.5 h-3.5" />
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="bg-secondary text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-secondary-dark transition-colors disabled:opacity-50 shadow-sm flex items-center gap-1.5"
          >
            {saving ? (
              <>
                <div className="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                {isNew ? "Create" : "Save"}
              </>
            )}
          </button>
        </div>
      </div>

      {message && (
        <div className={`mb-4 px-3 py-2 rounded-lg text-sm font-medium ${
          message.type === "success" ? "bg-success/10 text-success" : "bg-error/10 text-error"
        }`}>
          {message.text}
        </div>
      )}

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">

        {/* Left — main content (2/3) */}
        <div className="lg:col-span-2 space-y-4">

          {/* Identity */}
          <div className="bg-card rounded-xl border border-border p-4 shadow-sm space-y-3">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest">Identity</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setForm((f) => ({
                      ...f,
                      title,
                      slug: slugManuallyEdited.current ? f.slug : slugify(title),
                    }));
                  }}
                  className={inputCls}
                  required
                />
              </div>
              <div>
                <label className={labelCls}>Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => {
                    slugManuallyEdited.current = true;
                    setForm((f) => ({ ...f, slug: slugify(e.target.value) }));
                  }}
                  onBlur={(e) => {
                    setForm((f) => ({ ...f, slug: slugify(e.target.value) }));
                  }}
                  placeholder="Auto-generated from title"
                  className={`${inputCls} placeholder:text-muted-light font-mono text-sm`}
                />
              </div>
            </div>
            <div>
              <label className={labelCls}>
                Short Description
                <span className={`ml-2 font-normal normal-case ${
                  (form.shortDescription || "").length > 140 ? "text-error" : "text-muted-light"
                }`}>
                  {(form.shortDescription || "").length}/150
                </span>
              </label>
              <input
                type="text"
                value={form.shortDescription}
                onChange={(e) => {
                  if (e.target.value.length <= 150) setForm({ ...form, shortDescription: e.target.value });
                }}
                maxLength={150}
                className={inputCls}
                required
              />
              <p className="text-xs text-muted-light mt-1">
                Shown on the Services page listing and used as the page meta description fallback.
              </p>
            </div>
          </div>

          {/* Service page content (generic template) */}
          <LandingPageEditor
            value={form.pageContent}
            onChange={(pageContent) => setForm((f) => ({ ...f, pageContent }))}
          />
        </div>

        {/* Right — sidebar (1/3) */}
        <div className="space-y-4">

          {/* Appearance */}
          <div className="bg-card rounded-xl border border-border p-4 shadow-sm space-y-3">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest">Appearance</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <IconPicker
                  value={form.iconName}
                  onChange={(iconName) => setForm({ ...form, iconName })}
                />
              </div>
              <div>
                <label className={labelCls}>Sort Order</label>
                <input
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
                  className={inputCls}
                />
              </div>
            </div>

            {/* Image */}
            <div>
              <label className={labelCls}>Image</label>
              <p className="text-xs text-muted-light mb-1">
                Shown on the service&rsquo;s card on the Services page, and as the service page
                hero image (when the hero visual is set to &ldquo;Service image&rdquo;).
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.image || ""}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="URL or upload →"
                  className={`${inputCls} flex-1 placeholder:text-muted-light`}
                />
                <div className="relative shrink-0">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="service-image-upload"
                    disabled={uploading}
                  />
                  <label
                    htmlFor="service-image-upload"
                    className={`inline-flex items-center gap-1.5 px-3 py-2 bg-background border border-border rounded-lg text-sm font-medium cursor-pointer hover:bg-background/80 transition-colors ${
                      uploading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {uploading ? (
                      <div className="animate-spin h-3.5 w-3.5 border-2 border-secondary border-t-transparent rounded-full" />
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    )}
                  </label>
                </div>
              </div>
              {form.image && (
                <div className="mt-2 relative inline-block">
                  <img src={form.image} alt="Service preview" className="h-20 w-auto rounded-lg border border-border object-cover" />
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, image: "" })}
                    className="absolute -top-1.5 -right-1.5 bg-error text-white rounded-full p-0.5 hover:bg-error/80 transition-colors"
                    title="Remove image"
                  >
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Visibility */}
          <div className="bg-card rounded-xl border border-border p-4 shadow-sm space-y-2.5">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest">Visibility</p>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={form.showOnHomepage}
                onChange={(e) => setForm({ ...form, showOnHomepage: e.target.checked })}
                className="w-4 h-4 rounded border-border accent-primary"
              />
              <span className="text-sm text-foreground">Show on Homepage</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={form.showInFooter}
                onChange={(e) => setForm({ ...form, showInFooter: e.target.checked })}
                className="w-4 h-4 rounded border-border accent-primary"
              />
              <span className="text-sm text-foreground">Show in Footer</span>
            </label>
          </div>
        </div>
      </div>

      {/* Page status — Draft / Live */}
      <div className="mt-4 bg-card rounded-xl border border-border p-4 shadow-sm">
        <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-3">Page status</p>
        <div
          className="inline-flex rounded-lg border border-border overflow-hidden"
          role="radiogroup"
          aria-label="Page status"
        >
          <button
            type="button"
            role="radio"
            aria-checked={!form.isLive}
            onClick={() => setForm((f) => ({ ...f, isLive: false }))}
            className={`px-5 py-2 text-sm font-medium transition-colors ${
              !form.isLive
                ? "bg-foreground text-white"
                : "bg-card text-muted hover:text-foreground"
            }`}
          >
            Draft
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={form.isLive}
            onClick={() => setForm((f) => ({ ...f, isLive: true }))}
            className={`px-5 py-2 text-sm font-medium transition-colors border-l border-border ${
              form.isLive
                ? "bg-success text-white"
                : "bg-card text-muted hover:text-foreground"
            }`}
          >
            Live
          </button>
        </div>
        <p className="text-xs text-muted mt-3 max-w-2xl">
          <span className="text-foreground font-medium">Live</span> publishes this service&rsquo;s
          page at{" "}
          <span className="font-mono">/services/{form.slug || "your-slug"}</span> and links it from the
          Services page. <span className="text-foreground font-medium">Draft</span> keeps the page hidden
          while you work on it — the service still appears in the Services listing with its short
          description. A Live page always renders: until the hero is filled in it simply shows the
          service title and short description, and any sections you&rsquo;ve added. Remember to
          click Save after changing the status.
        </p>
      </div>
    </form>
  );
}
