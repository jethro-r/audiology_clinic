"use client";

import { useState, useEffect, useCallback } from "react";
import {
  HelpCircle,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  X,
  Save,
} from "lucide-react";
import { type FAQ } from "@/lib/data";

const emptyFAQ: Omit<FAQ, "id" | "createdAt" | "updatedAt"> = {
  question: "",
  answer: "",
  sortOrder: 0,
  active: true,
};

export default function FAQManager() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Omit<FAQ, "id" | "createdAt" | "updatedAt">>(emptyFAQ);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showOnlyActive, setShowOnlyActive] = useState(false);

  const fetchFAQs = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/faqs");
      if (res.ok) {
        setFaqs(await res.json());
      }
    } catch (error) {
      console.error("Failed to fetch FAQs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFAQs();
  }, [fetchFAQs]);

  function showMessage(type: "success" | "error", text: string) {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  }

  function startCreate() {
    setEditing(null);
    setForm(emptyFAQ);
    setCreating(true);
  }

  function startEdit(faq: FAQ) {
    setCreating(false);
    setEditing(faq);
    setForm({
      question: faq.question,
      answer: faq.answer,
      sortOrder: faq.sortOrder,
      active: faq.active,
    });
  }

  function cancelEdit() {
    setEditing(null);
    setCreating(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      if (editing) {
        const res = await fetch("/api/admin/faqs", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editing.id, ...form }),
        });
        if (res.ok) {
          showMessage("success", "FAQ updated");
          setEditing(null);
          fetchFAQs();
        } else {
          showMessage("error", "Failed to update FAQ");
        }
      } else {
        const res = await fetch("/api/admin/faqs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          showMessage("success", "FAQ created");
          setCreating(false);
          fetchFAQs();
        } else {
          showMessage("error", "Failed to create FAQ");
        }
      }
    } catch {
      showMessage("error", "An error occurred");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(faq: FAQ) {
    if (!confirm(`Delete "${faq.question}"? This cannot be undone.`)) return;

    try {
      const res = await fetch("/api/admin/faqs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: faq.id }),
      });
      if (res.ok) {
        showMessage("success", "FAQ deleted");
        fetchFAQs();
      } else {
        showMessage("error", "Failed to delete FAQ");
      }
    } catch {
      showMessage("error", "An error occurred");
    }
  }

  async function handleToggleActive(faq: FAQ) {
    try {
      const res = await fetch("/api/admin/faqs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: faq.id, active: !faq.active }),
      });
      if (res.ok) {
        fetchFAQs();
      } else {
        showMessage("error", "Failed to update FAQ");
      }
    } catch {
      showMessage("error", "An error occurred");
    }
  }

  const showForm = creating || editing;
  const filteredFaqs = showOnlyActive ? faqs.filter((faq) => faq.active) : faqs;

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="animate-spin h-8 w-8 border-4 border-secondary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">FAQs</h2>
          <p className="text-sm text-muted mt-1">
            {filteredFaqs.length} FAQ{filteredFaqs.length !== 1 ? "s" : ""}
            {showOnlyActive && ` (${faqs.length - filteredFaqs.length} hidden)`}
          </p>
        </div>
        {!showForm && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowOnlyActive(!showOnlyActive)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                showOnlyActive
                  ? "bg-secondary text-white shadow-sm"
                  : "bg-card border border-border text-foreground hover:bg-background"
              }`}
            >
              <Eye className="w-4 h-4" />
              {showOnlyActive ? "Show All" : "Active Only"}
            </button>
            <button
              onClick={startCreate}
              className="bg-secondary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary-dark transition-colors flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Add FAQ
            </button>
          </div>
        )}
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mb-6 px-4 py-3 rounded-lg text-sm font-medium ${
            message.type === "success" ? "bg-success/10 text-success" : "bg-error/10 text-error"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-card rounded-xl border border-border p-4 sm:p-6 lg:p-8 mb-8 shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            {editing ? "Edit FAQ" : "New FAQ"}
          </h3>
          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Question</label>
              <input
                type="text"
                value={form.question}
                onChange={(e) => setForm({ ...form, question: e.target.value })}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground"
                placeholder="Enter the question"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Answer</label>
              <textarea
                value={form.answer}
                onChange={(e) => setForm({ ...form, answer: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground resize-none"
                placeholder="Enter the answer"
                required
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

              <div className="flex items-end pb-2.5">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) => setForm({ ...form, active: e.target.checked })}
                    className="w-5 h-5 rounded border-border text-secondary focus:ring-secondary/40"
                  />
                  <span className="text-sm font-medium text-foreground">Active (visible on website)</span>
                </label>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="bg-secondary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary-dark transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {saving ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {editing ? "Update FAQ" : "Create FAQ"}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-card border border-border text-foreground px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-background transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center">
            <HelpCircle className="w-16 h-16 text-muted mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No FAQs found</h3>
            <p className="text-sm text-muted mb-6">
              {showOnlyActive
                ? "There are no active FAQs. Toggle 'Active Only' to see all FAQs."
                : "Create your first FAQ to get started."}
            </p>
            {!showOnlyActive && (
              <button
                onClick={startCreate}
                className="bg-secondary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary-dark transition-colors flex items-center gap-2 mx-auto shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Create First FAQ
              </button>
            )}
          </div>
        ) : (
          filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className={`bg-card rounded-xl border ${
                !faq.active ? "border-border opacity-60" : "border-border"
              } shadow-sm transition-all hover:shadow-md`}
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  {/* Sort Order Badge */}
                  <div className="flex flex-col items-center gap-1 pt-1">
                    <div className="w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center text-sm font-semibold text-muted">
                      {faq.sortOrder}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h4>
                        <p className="text-sm text-muted whitespace-pre-wrap">{faq.answer}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleToggleActive(faq)}
                          className={`p-2 rounded-lg transition-colors ${
                            faq.active
                              ? "text-success hover:bg-success/10"
                              : "text-muted hover:bg-background"
                          }`}
                          title={faq.active ? "Hide from website" : "Show on website"}
                        >
                          {faq.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => startEdit(faq)}
                          className="p-2 text-foreground hover:bg-background rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(faq)}
                          className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
