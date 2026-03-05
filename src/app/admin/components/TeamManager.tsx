"use client";

import { useState, useEffect, useCallback } from "react";

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

export default function TeamManager() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Omit<TeamMember, "id">>(emptyMember);
  const [specialisationsText, setSpecialisationsText] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchMembers = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/team");
      if (res.ok) {
        setMembers(await res.json());
      }
    } catch (error) {
      console.error("Failed to fetch team members:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  function showMessage(type: "success" | "error", text: string) {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  }

  function startCreate() {
    setEditing(null);
    setForm(emptyMember);
    setSpecialisationsText("");
    setCreating(true);
  }

  function startEdit(member: TeamMember) {
    setCreating(false);
    setEditing(member);
    setForm({
      slug: member.slug,
      name: member.name,
      title: member.title,
      credentials: member.credentials || "",
      imageUrl: member.imageUrl || "",
      bio: member.bio,
      specialisations: member.specialisations,
      email: member.email || "",
      phone: member.phone || "",
      sortOrder: member.sortOrder,
      active: member.active,
    });
    setSpecialisationsText(member.specialisations.join("\n"));
  }

  function cancelEdit() {
    setEditing(null);
    setCreating(false);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "team");

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setForm({ ...form, imageUrl: data.url });
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
      if (editing) {
        const res = await fetch("/api/admin/team", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editing.id, ...data }),
        });
        if (res.ok) {
          showMessage("success", "Team member updated");
          setEditing(null);
          fetchMembers();
        } else {
          showMessage("error", "Failed to update team member");
        }
      } else {
        const res = await fetch("/api/admin/team", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          showMessage("success", "Team member created");
          setCreating(false);
          fetchMembers();
        } else {
          showMessage("error", "Failed to create team member");
        }
      }
    } catch {
      showMessage("error", "An error occurred");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(member: TeamMember) {
    if (!confirm(`Delete "${member.name}"? This cannot be undone.`)) return;

    try {
      const res = await fetch("/api/admin/team", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: member.id }),
      });
      if (res.ok) {
        showMessage("success", "Team member deleted");
        fetchMembers();
      } else {
        showMessage("error", "Failed to delete team member");
      }
    } catch {
      showMessage("error", "An error occurred");
    }
  }

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
          <h2 className="text-2xl font-semibold text-foreground">Team Members</h2>
          <p className="text-sm text-muted mt-1">{members.length} member{members.length !== 1 ? "s" : ""}</p>
        </div>
        {!showForm && (
          <button
            onClick={startCreate}
            className="bg-secondary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary-dark transition-colors flex items-center gap-2 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Member
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
            {editing ? "Edit Team Member" : "New Team Member"}
          </h3>
          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                  placeholder="Auto-generated from name if empty"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground placeholder:text-muted-light"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Title/Role</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Credentials</label>
                <input
                  type="text"
                  value={form.credentials || ""}
                  onChange={(e) => setForm({ ...form, credentials: e.target.value })}
                  placeholder="e.g. MSc, MNZAS"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground placeholder:text-muted-light"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Bio</label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={form.imageUrl || ""}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    className="flex-1 px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground"
                  />
                  <label className="px-3 py-2.5 bg-secondary/10 text-secondary rounded-lg cursor-pointer hover:bg-secondary/20 transition-colors text-sm font-medium whitespace-nowrap flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {uploading ? "Uploading..." : "Upload"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email || ""}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
                <input
                  type="text"
                  value={form.phone || ""}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Specialisations (one per line)</label>
              <textarea
                value={specialisationsText}
                onChange={(e) => setSpecialisationsText(e.target.value)}
                rows={3}
                placeholder="Hearing Assessments&#10;Tinnitus Management&#10;Paediatric Audiology"
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground placeholder:text-muted-light"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Sort Order</label>
                <input
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2.5 pb-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) => setForm({ ...form, active: e.target.checked })}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary accent-primary"
                  />
                  <span className="text-sm text-foreground">Active (visible on site)</span>
                </label>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <button
                type="submit"
                disabled={saving}
                className="bg-secondary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary-dark transition-colors disabled:opacity-50 shadow-sm"
              >
                {saving ? "Saving..." : editing ? "Update Member" : "Create Member"}
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
        <table className="w-full min-w-[500px]">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="text-left text-xs font-semibold text-muted uppercase tracking-wider px-5 py-3.5">Member</th>
              <th className="text-left text-xs font-semibold text-muted uppercase tracking-wider px-5 py-3.5 hidden md:table-cell">Role</th>
              <th className="text-center text-xs font-semibold text-muted uppercase tracking-wider px-5 py-3.5 hidden sm:table-cell">Order</th>
              <th className="text-center text-xs font-semibold text-muted uppercase tracking-wider px-5 py-3.5 hidden sm:table-cell">Active</th>
              <th className="text-right text-xs font-semibold text-muted uppercase tracking-wider px-5 py-3.5">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-background/60 transition-colors">
                <td className="px-5 py-4">
                  <div className="text-sm font-medium text-foreground">{member.name}</div>
                  {member.credentials && (
                    <div className="text-xs text-muted mt-0.5">{member.credentials}</div>
                  )}
                </td>
                <td className="px-5 py-4 hidden md:table-cell">
                  <span className="text-sm text-muted">{member.title}</span>
                </td>
                <td className="px-5 py-4 text-center text-sm text-muted hidden sm:table-cell">{member.sortOrder}</td>
                <td className="px-5 py-4 text-center hidden sm:table-cell">
                  <span className={`inline-block w-2.5 h-2.5 rounded-full ${member.active ? "bg-success" : "bg-border"}`} />
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => startEdit(member)}
                      className="text-muted hover:text-secondary p-2 rounded-lg hover:bg-secondary/10 transition-colors"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(member)}
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
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-sm text-muted">
                  No team members yet. Click &quot;Add Member&quot; to create one.
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
