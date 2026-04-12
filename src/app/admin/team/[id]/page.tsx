"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, X } from "lucide-react";
import AdminAuthWrapper from "../../../../components/admin/AdminAuthWrapper";
import AdminLayout from "../../../../components/admin/AdminLayout";
import RichTextEditor from "../../../../components/admin/RichTextEditor";

interface TeamMember {
  id: string;
  slug: string;
  name: string;
  title: string;
  credentials?: string | null;
  imageUrl?: string | null;
  bio: string;
  specialisations: string[];
  email?: string | null;
  phone?: string | null;
  sortOrder: number;
  active: boolean;
}

const emptyMember: Omit<TeamMember, "id"> = {
  slug: "",
  name: "",
  title: "",
  credentials: "",
  imageUrl: "",
  bio: "",
  specialisations: [],
  email: "",
  phone: "",
  sortOrder: 0,
  active: true,
};

export default function TeamEditPage() {
  return (
    <AdminAuthWrapper>
      <AdminLayout>
        <TeamEditForm />
      </AdminLayout>
    </AdminAuthWrapper>
  );
}

function TeamEditForm() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "new";

  const [loading, setLoading] = useState(!isNew);
  const [form, setForm] = useState<Omit<TeamMember, "id">>(emptyMember);
  const [specialisationsText, setSpecialisationsText] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/team?id=${id}`)
        .then((r) => r.json())
        .then((data: TeamMember) => {
          setForm({
            slug: data.slug,
            name: data.name,
            title: data.title,
            credentials: data.credentials || "",
            imageUrl: data.imageUrl || "",
            bio: data.bio,
            specialisations: data.specialisations,
            email: data.email || "",
            phone: data.phone || "",
            sortOrder: data.sortOrder,
            active: data.active,
          });
          setSpecialisationsText(data.specialisations.join("\n"));
          setLoading(false);
        })
        .catch(() => {
          setMessage({ type: "error", text: "Failed to load team member" });
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
    formData.append("type", "team");
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        setForm((f) => ({ ...f, imageUrl: data.url }));
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
      specialisations: specialisationsText.split("\n").map((s) => s.trim()).filter(Boolean),
      credentials: form.credentials || null,
      imageUrl: form.imageUrl || null,
      email: form.email || null,
      phone: form.phone || null,
    };
    try {
      const res = await fetch("/api/admin/team", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isNew ? data : { id, ...data }),
      });
      if (res.ok) {
        if (isNew) {
          const created = await res.json();
          showMessage("success", "Team member created");
          router.replace(`/admin/team/${created.id}`);
        } else {
          showMessage("success", "Team member saved");
        }
        setSaving(false);
      } else {
        showMessage("error", isNew ? "Failed to create team member" : "Failed to update team member");
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
      <div className="flex items-center gap-3 mb-5">
        <button
          type="button"
          onClick={() => router.push("/admin/team")}
          className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-card transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h2 className="text-xl font-semibold text-foreground flex-1">
          {isNew ? "New Team Member" : "Edit Team Member"}
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push("/admin/team")}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        <div className="lg:col-span-2 space-y-4">

          <div className="bg-card rounded-xl border border-border p-4 shadow-sm space-y-3">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest">Identity</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputCls}
                  required
                />
              </div>
              <div>
                <label className={labelCls}>Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="Auto-generated if empty"
                  className={`${inputCls} placeholder:text-muted-light`}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Title / Role</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={inputCls}
                  required
                />
              </div>
              <div>
                <label className={labelCls}>Credentials</label>
                <input
                  type="text"
                  value={form.credentials || ""}
                  onChange={(e) => setForm({ ...form, credentials: e.target.value })}
                  placeholder="e.g. MSc, MNZAS"
                  className={`${inputCls} placeholder:text-muted-light`}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Email</label>
                <input
                  type="email"
                  value={form.email || ""}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Phone</label>
                <input
                  type="text"
                  value={form.phone || ""}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputCls}
                />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-4 shadow-sm space-y-2">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest">Bio</p>
            <RichTextEditor
              value={form.bio}
              onChange={(html) => setForm({ ...form, bio: html })}
              placeholder="Write a bio for this team member..."
            />
          </div>

          <div className="bg-card rounded-xl border border-border p-4 shadow-sm space-y-2">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest">
              Specialisations <span className="normal-case font-normal">(one per line)</span>
            </p>
            <textarea
              value={specialisationsText}
              onChange={(e) => setSpecialisationsText(e.target.value)}
              rows={4}
              placeholder={"Hearing Assessments\nTinnitus Management\nPaediatric Audiology"}
              className={`${inputCls} placeholder:text-muted-light`}
            />
          </div>
        </div>

        <div className="space-y-4">

          <div className="bg-card rounded-xl border border-border p-4 shadow-sm space-y-3">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest">Photo</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={form.imageUrl || ""}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="https://..."
                className={`${inputCls} flex-1 placeholder:text-muted-light`}
              />
              <label className={`inline-flex items-center gap-1.5 px-3 py-2 bg-background border border-border rounded-lg text-sm font-medium cursor-pointer hover:bg-background/80 transition-colors shrink-0 ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}>
                {uploading ? (
                  <div className="animate-spin h-3.5 w-3.5 border-2 border-secondary border-t-transparent rounded-full" />
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                )}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
              </label>
            </div>
            {form.imageUrl && (
              <div className="relative inline-block">
                <img
                  src={form.imageUrl}
                  alt="Preview"
                  className="h-24 w-24 rounded-full object-cover border border-border"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <button
                  type="button"
                  onClick={() => setForm({ ...form, imageUrl: "" })}
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

          <div className="bg-card rounded-xl border border-border p-4 shadow-sm space-y-3">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest">Settings</p>
            <div>
              <label className={labelCls}>Sort Order</label>
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
                className={inputCls}
              />
            </div>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
                className="w-4 h-4 rounded border-border accent-primary"
              />
              <span className="text-sm text-foreground">Active (visible on site)</span>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}
