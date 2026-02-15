"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import * as LucideIcons from "lucide-react";

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
}

// Popular icons for audiology/healthcare services
const POPULAR_ICONS = [
  "Ear", "Headphones", "Volume2", "VolumeX", "Volume1", "Bell",
  "Mic", "Radio", "Speaker", "Phone", "Stethoscope", "Activity",
  "Heart", "Shield", "Settings", "Star", "Award", "CheckCircle",
  "Users", "UserCheck", "Clock", "Calendar", "MapPin", "AlertCircle",
  "Info", "HelpCircle", "Lightbulb", "Zap", "TrendingUp", "Target",
  "Sunrise", "Moon", "Baby", "Home", "Briefcase", "GraduationCap"
];

const emptyService: Omit<Service, "id"> = {
  slug: "",
  title: "",
  shortDescription: "",
  fullDescription: "",
  iconName: "Ear",
  image: "",
  features: [],
  sortOrder: 0,
  showOnHomepage: true,
  showInFooter: true,
  buttonText: "",
  idealFor: "",
  note: "",
};

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Service | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Omit<Service, "id">>(emptyService);
  const [featuresText, setFeaturesText] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [iconSearch, setIconSearch] = useState("");
  const iconPickerRef = useRef<HTMLDivElement>(null);

  const fetchServices = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/services");
      if (res.ok) {
        setServices(await res.json());
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // Close icon picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (iconPickerRef.current && !iconPickerRef.current.contains(event.target as Node)) {
        setShowIconPicker(false);
        setIconSearch("");
      }
    }

    if (showIconPicker) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showIconPicker]);

  function showMessage(type: "success" | "error", text: string) {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  }

  function startCreate() {
    setEditing(null);
    setForm(emptyService);
    setFeaturesText("");
    setCreating(true);
  }

  function startEdit(service: Service) {
    setCreating(false);
    setEditing(service);
    setForm({
      slug: service.slug,
      title: service.title,
      shortDescription: service.shortDescription,
      fullDescription: service.fullDescription,
      iconName: service.iconName,
      image: service.image || "",
      features: service.features,
      sortOrder: service.sortOrder,
      showOnHomepage: service.showOnHomepage,
      showInFooter: service.showInFooter,
      buttonText: service.buttonText || "",
      idealFor: service.idealFor || "",
      note: service.note || "",
    });
    setFeaturesText(service.features.join("\n"));
  }

  function cancelEdit() {
    setEditing(null);
    setCreating(false);
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
      if (editing) {
        const res = await fetch("/api/admin/services", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editing.id, ...data }),
        });
        if (res.ok) {
          showMessage("success", "Service updated");
          setEditing(null);
          fetchServices();
        } else {
          showMessage("error", "Failed to update service");
        }
      } else {
        const res = await fetch("/api/admin/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          showMessage("success", "Service created");
          setCreating(false);
          fetchServices();
        } else {
          showMessage("error", "Failed to create service");
        }
      }
    } catch {
      showMessage("error", "An error occurred");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(service: Service) {
    if (!confirm(`Delete "${service.title}"? This cannot be undone.`)) return;

    try {
      const res = await fetch("/api/admin/services", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: service.id }),
      });
      if (res.ok) {
        showMessage("success", "Service deleted");
        fetchServices();
      } else {
        showMessage("error", "Failed to delete service");
      }
    } catch {
      showMessage("error", "An error occurred");
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "services");

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setForm({ ...form, image: data.url });
        showMessage("success", "Image uploaded");
      } else {
        const error = await res.json();
        showMessage("error", error.error || "Failed to upload image");
      }
    } catch {
      showMessage("error", "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function selectIcon(iconName: string) {
    setForm({ ...form, iconName });
    setShowIconPicker(false);
    setIconSearch("");
  }

  const filteredIcons = iconSearch
    ? POPULAR_ICONS.filter(icon => 
        icon.toLowerCase().includes(iconSearch.toLowerCase())
      )
    : POPULAR_ICONS;

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="animate-spin h-8 w-8 border-4 border-secondary border-t-transparent rounded-full" />
      </div>
    );
  }

  const showForm = creating || editing;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Services</h2>
          <p className="text-sm text-muted mt-1">{services.length} service{services.length !== 1 ? "s" : ""}</p>
        </div>
        {!showForm && (
          <button
            onClick={startCreate}
            className="bg-secondary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary-dark transition-colors flex items-center gap-2 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Service
          </button>
        )}
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-6 px-4 py-3 rounded-lg text-sm font-medium ${
          message.type === "success" ? "bg-success/10 text-success" : "bg-error/10 text-error"
        }`}>
          {message.text}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-card rounded-xl border border-border p-4 sm:p-6 lg:p-8 mb-8 shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            {editing ? "Edit Service" : "New Service"}
          </h3>
          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="Auto-generated from title if empty"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground placeholder:text-muted-light"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Short Description</label>
              <textarea
                value={form.shortDescription}
                onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                rows={2}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Full Description</label>
              <textarea
                value={form.fullDescription}
                onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Icon</label>
                <div className="relative" ref={iconPickerRef}>
                  <button
                    type="button"
                    onClick={() => setShowIconPicker(!showIconPicker)}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground flex items-center justify-between hover:bg-background/80 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {form.iconName && (() => {
                        const IconComponent = (LucideIcons as any)[form.iconName];
                        return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
                      })()}
                      <span className="text-sm">{form.iconName || "Select Icon"}</span>
                    </div>
                    <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showIconPicker && (
                    <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-80 overflow-hidden">
                      <div className="p-3 border-b border-border sticky top-0 bg-card">
                        <input
                          type="text"
                          value={iconSearch}
                          onChange={(e) => setIconSearch(e.target.value)}
                          placeholder="Search icons..."
                          className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 text-sm"
                        />
                      </div>
                      <div className="grid grid-cols-4 gap-2 p-3 max-h-64 overflow-y-auto">
                        {filteredIcons.map((iconName) => {
                          const IconComponent = (LucideIcons as any)[iconName];
                          if (!IconComponent) return null;
                          return (
                            <button
                              key={iconName}
                              type="button"
                              onClick={() => selectIcon(iconName)}
                              className={`flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-background transition-colors ${
                                form.iconName === iconName ? "bg-secondary/10 ring-2 ring-secondary" : ""
                              }`}
                              title={iconName}
                            >
                              <IconComponent className="w-5 h-5" />
                              <span className="text-[10px] text-muted truncate w-full text-center">{iconName}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1.5">Service Image</label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={form.image || ""}
                      onChange={(e) => setForm({ ...form, image: e.target.value })}
                      placeholder="Image URL or upload below"
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground placeholder:text-muted-light"
                    />
                  </div>
                  <div className="relative">
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
                      className={`inline-flex items-center gap-2 px-4 py-2.5 bg-background border border-border rounded-lg text-sm font-medium cursor-pointer hover:bg-background/80 transition-colors ${
                        uploading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {uploading ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-2 border-secondary border-t-transparent rounded-full" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <span>Upload</span>
                        </>
                      )}
                    </label>
                  </div>
                </div>
                {form.image && (
                  <div className="mt-3 relative inline-block">
                    <img 
                      src={form.image} 
                      alt="Service preview" 
                      className="h-24 w-auto rounded-lg border border-border object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, image: "" })}
                      className="absolute -top-2 -right-2 bg-error text-white rounded-full p-1 hover:bg-error/80 transition-colors"
                      title="Remove image"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Sort Order</label>
                <input
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Features (one per line)</label>
              <textarea
                value={featuresText}
                onChange={(e) => setFeaturesText(e.target.value)}
                rows={4}
                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground placeholder:text-muted-light"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Button Text</label>
                <input
                  type="text"
                  value={form.buttonText || ""}
                  onChange={(e) => setForm({ ...form, buttonText: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Ideal For</label>
                <input
                  type="text"
                  value={form.idealFor || ""}
                  onChange={(e) => setForm({ ...form, idealFor: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Note</label>
              <textarea
                value={form.note || ""}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                rows={2}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground"
              />
            </div>

            <div className="flex items-center gap-6 py-1">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.showOnHomepage}
                  onChange={(e) => setForm({ ...form, showOnHomepage: e.target.checked })}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary accent-primary"
                />
                <span className="text-sm text-foreground">Show on Homepage</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.showInFooter}
                  onChange={(e) => setForm({ ...form, showInFooter: e.target.checked })}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary accent-primary"
                />
                <span className="text-sm text-foreground">Show in Footer</span>
              </label>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <button
                type="submit"
                disabled={saving}
                className="bg-secondary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary-dark transition-colors disabled:opacity-50 shadow-sm"
              >
                {saving ? "Saving..." : editing ? "Update Service" : "Create Service"}
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="px-6 py-2.5 rounded-lg text-sm font-medium text-muted hover:text-foreground hover:bg-background transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
        <table className="w-full min-w-125">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="text-left text-xs font-semibold text-muted uppercase tracking-wider px-5 py-3.5">Service</th>
              <th className="text-left text-xs font-semibold text-muted uppercase tracking-wider px-5 py-3.5 hidden md:table-cell">Icon</th>
              <th className="text-left text-xs font-semibold text-muted uppercase tracking-wider px-5 py-3.5 hidden lg:table-cell">Image</th>
              <th className="text-center text-xs font-semibold text-muted uppercase tracking-wider px-5 py-3.5 hidden sm:table-cell">Order</th>
              <th className="text-center text-xs font-semibold text-muted uppercase tracking-wider px-5 py-3.5 hidden sm:table-cell">Homepage</th>
              <th className="text-right text-xs font-semibold text-muted uppercase tracking-wider px-5 py-3.5">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {services.map((service) => {
              const IconComponent = (LucideIcons as any)[service.iconName];
              return (
                <tr key={service.id} className="hover:bg-background/60 transition-colors">
                  <td className="px-5 py-4">
                    <div className="text-sm font-medium text-foreground">{service.title}</div>
                    <div className="text-xs text-muted mt-0.5 truncate max-w-xs">{service.shortDescription}</div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      {IconComponent && <IconComponent className="w-4 h-4 text-secondary" />}
                      <span className="text-xs bg-primary/8 text-primary px-2.5 py-1 rounded-md font-medium">{service.iconName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    {service.image ? (
                      <img src={service.image} alt={service.title} className="h-10 w-16 object-cover rounded border border-border" />
                    ) : (
                      <span className="text-xs text-muted">No image</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-center text-sm text-muted hidden sm:table-cell">{service.sortOrder}</td>
                  <td className="px-5 py-4 text-center hidden sm:table-cell">
                    <span className={`inline-block w-2.5 h-2.5 rounded-full ${service.showOnHomepage ? "bg-success" : "bg-border"}`} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => startEdit(service)}
                        className="text-muted hover:text-secondary p-2 rounded-lg hover:bg-secondary/10 transition-colors"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(service)}
                        className="text-muted hover:text-error p-2 rounded-lg hover:bg-error/10 transition-colors"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {services.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-sm text-muted">
                  No services yet. Click &quot;Add Service&quot; to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
