"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, X } from "lucide-react";
import AdminAuthWrapper from "../../../../components/admin/AdminAuthWrapper";
import AdminLayout from "../../../../components/admin/AdminLayout";
import RichTextEditor from "../../../../components/admin/RichTextEditor";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
  active: boolean;
}

const emptyFAQ = { question: "", answer: "", sortOrder: 0, active: true };

export default function FAQEditPage() {
  return (
    <AdminAuthWrapper>
      <AdminLayout>
        <FAQEditForm />
      </AdminLayout>
    </AdminAuthWrapper>
  );
}

function FAQEditForm() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "new";

  const [loading, setLoading] = useState(!isNew);
  const [form, setForm] = useState(emptyFAQ);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/faqs?id=${id}`)
        .then((r) => r.json())
        .then((data: FAQ) => {
          setForm({ question: data.question, answer: data.answer, sortOrder: data.sortOrder, active: data.active });
          setLoading(false);
        })
        .catch(() => {
          setMessage({ type: "error", text: "Failed to load FAQ" });
          setLoading(false);
        });
    }
  }, [id, isNew]);

  function showMessage(type: "success" | "error", text: string) {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/faqs", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isNew ? form : { id, ...form }),
      });
      if (res.ok) {
        if (isNew) {
          const created = await res.json();
          showMessage("success", "FAQ created");
          router.replace(`/admin/faqs/${created.id}`);
        } else {
          showMessage("success", "FAQ saved");
        }
        setSaving(false);
      } else {
        showMessage("error", isNew ? "Failed to create FAQ" : "Failed to update FAQ");
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
          onClick={() => router.push("/admin/faqs")}
          className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-card transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h2 className="text-xl font-semibold text-foreground flex-1">
          {isNew ? "New FAQ" : "Edit FAQ"}
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push("/admin/faqs")}
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

          <div className="bg-card rounded-xl border border-border p-4 shadow-sm space-y-2">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest">Question</p>
            <input
              type="text"
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              placeholder="Enter the question"
              className={inputCls}
              required
            />
          </div>

          <div className="bg-card rounded-xl border border-border p-4 shadow-sm space-y-2">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest">Answer</p>
            <RichTextEditor
              value={form.answer}
              onChange={(html) => setForm({ ...form, answer: html })}
              placeholder="Write a clear, helpful answer..."
            />
          </div>
        </div>

        <div className="space-y-4">
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
              <span className="text-sm text-foreground">Active (visible on website)</span>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}
