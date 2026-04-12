"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, X } from "lucide-react";
import AdminAuthWrapper from "../../../../components/admin/AdminAuthWrapper";
import AdminLayout from "../../../../components/admin/AdminLayout";
import RichTextEditor from "../../../../components/admin/RichTextEditor";
import { slugify } from "@/lib/utils";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string | null;
  categories: string[];
  author?: string | null;
  imageUrl?: string | null;
  published: boolean;
  publishedAt?: string | null;
  sortOrder: number;
}

const categories = [
  "Hearing Health", "Hearing Aids", "Tinnitus", "Prevention",
  "Technology", "Research", "Lifestyle", "News",
];

const emptyArticle: Omit<Article, "id"> = {
  slug: "", title: "", excerpt: "", content: "",
  categories: ["Hearing Health"], author: "Veritas Hearing", imageUrl: "",
  published: false, publishedAt: null, sortOrder: 0,
};

export default function ArticleEditPage() {
  return (
    <AdminAuthWrapper>
      <AdminLayout>
        <ArticleEditForm />
      </AdminLayout>
    </AdminAuthWrapper>
  );
}

function ArticleEditForm() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "new";

  const [loading, setLoading] = useState(!isNew);
  const [form, setForm] = useState<Omit<Article, "id">>(emptyArticle);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [newCategory, setNewCategory] = useState("");
  const slugManuallyEdited = useRef(false);

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/articles?id=${id}`)
        .then(async (r) => {
          if (r.status === 401) throw new Error("Unauthorised — please log in again.");
          if (r.status === 404) throw new Error("Article not found.");
          if (!r.ok) throw new Error(`Unexpected error (${r.status})`);
          return r.json();
        })
        .then((data: Article) => {
          slugManuallyEdited.current = true; // existing articles have a slug already
          setForm({
            slug: data.slug,
            title: data.title,
            excerpt: data.excerpt,
            content: data.content || "",
            categories: data.categories || [],
            author: data.author || "Veritas Hearing",
            imageUrl: data.imageUrl || "",
            published: data.published,
            publishedAt: data.publishedAt,
            sortOrder: data.sortOrder,
          });
          setLoading(false);
        })
        .catch((err: unknown) => {
          setMessage({ type: "error", text: err instanceof Error ? err.message : "Failed to load article" });
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
    const data = {
      ...form,
      content: form.content || null,
      author: form.author || null,
      imageUrl: form.imageUrl || null,
    };
    try {
      const res = await fetch("/api/admin/articles", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isNew ? data : { id, ...data }),
      });
      if (res.ok) {
        if (isNew) {
          const created = await res.json();
          showMessage("success", "Article created");
          router.replace(`/admin/articles/${created.id}`);
        } else {
          showMessage("success", "Article saved");
        }
        setSaving(false);
      } else {
        showMessage("error", isNew ? "Failed to create article" : "Failed to update article");
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
          onClick={() => router.push("/admin/articles")}
          className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-card transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h2 className="text-xl font-semibold text-foreground flex-1">
          {isNew ? "New Article" : "Edit Article"}
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push("/admin/articles")}
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
                    // Final clean on blur in case user left trailing hyphens
                    setForm((f) => ({ ...f, slug: slugify(e.target.value) }));
                  }}
                  placeholder="Auto-generated from title"
                  className={`${inputCls} placeholder:text-muted-light font-mono text-sm`}
                />
              </div>
            </div>
            <div>
              <label className={labelCls}>
                Excerpt
                <span className={`ml-2 font-normal normal-case ${(form.excerpt || "").length > 180 ? "text-error" : "text-muted-light"}`}>
                  {(form.excerpt || "").length}/200
                </span>
              </label>
              <textarea
                value={form.excerpt}
                onChange={(e) => { if (e.target.value.length <= 200) setForm({ ...form, excerpt: e.target.value }); }}
                rows={2}
                maxLength={200}
                placeholder="Brief summary shown in listings"
                className={`${inputCls} placeholder:text-muted-light`}
                required
              />
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-4 shadow-sm space-y-2">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest">Content</p>
            <RichTextEditor
              value={form.content || ""}
              onChange={(html) => setForm({ ...form, content: html })}
              placeholder="Write the full article content..."
              uploadType="articles"
            />
          </div>
        </div>

        <div className="space-y-4">

          <div className="bg-card rounded-xl border border-border p-4 shadow-sm space-y-3">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest">Image</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={form.imageUrl || ""}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="https://..."
                className={`${inputCls} flex-1 placeholder:text-muted-light`}
              />
              <div className="relative shrink-0">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                  className="hidden"
                  id="article-image-upload"
                  disabled={uploading}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploading(true);
                    try {
                      const fd = new FormData();
                      fd.append("file", file);
                      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
                      if (res.ok) {
                        const { url } = await res.json();
                        setForm((f) => ({ ...f, imageUrl: url }));
                        showMessage("success", "Image uploaded");
                      } else {
                        const err = await res.json();
                        showMessage("error", err.error || "Upload failed");
                      }
                    } catch {
                      showMessage("error", "Upload failed");
                    } finally {
                      setUploading(false);
                      e.target.value = "";
                    }
                  }}
                />
                <label
                  htmlFor="article-image-upload"
                  className={`inline-flex items-center gap-1.5 px-3 py-2 bg-background border border-border rounded-lg text-sm font-medium cursor-pointer hover:bg-background/80 transition-colors ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
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
            {form.imageUrl && (
              <div className="relative inline-block">
                <img
                  src={form.imageUrl}
                  alt="Preview"
                  className="h-20 w-auto rounded-lg object-cover border border-border"
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
            <p className="text-xs font-semibold text-muted uppercase tracking-widest">Meta</p>
            <div>
              <label className={labelCls}>Categories</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {categories.map((cat) => {
                  const selected = form.categories.includes(cat);
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          categories: selected
                            ? form.categories.filter((c) => c !== cat)
                            : [...form.categories, cat],
                        })
                      }
                      className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-colors ${
                        selected
                          ? "bg-secondary text-white border-secondary"
                          : "bg-background text-muted border-border hover:border-secondary hover:text-secondary"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
                {form.categories.filter((c) => !categories.includes(c)).map((cat) => (
                  <span key={cat} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border font-medium bg-secondary text-white border-secondary">
                    {cat}
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, categories: form.categories.filter((c) => c !== cat) })}
                      className="hover:opacity-70 transition-opacity leading-none"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const val = newCategory.trim();
                      if (val && !form.categories.includes(val)) {
                        setForm({ ...form, categories: [...form.categories, val] });
                      }
                      setNewCategory("");
                    }
                  }}
                  placeholder="Custom category…"
                  className={`${inputCls} placeholder:text-muted-light`}
                />
                <button
                  type="button"
                  onClick={() => {
                    const val = newCategory.trim();
                    if (val && !form.categories.includes(val)) {
                      setForm({ ...form, categories: [...form.categories, val] });
                    }
                    setNewCategory("");
                  }}
                  className="px-3 py-2 bg-secondary text-white text-xs font-medium rounded-lg hover:bg-secondary/80 transition-colors shrink-0"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Author</label>
                <input
                  type="text"
                  value={form.author || ""}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className={inputCls}
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
          </div>

          <div className="bg-card rounded-xl border border-border p-4 shadow-sm space-y-2.5">
            <p className="text-xs font-semibold text-muted uppercase tracking-widest">Visibility</p>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="w-4 h-4 rounded border-border accent-primary"
              />
              <span className="text-sm text-foreground">Published</span>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}
