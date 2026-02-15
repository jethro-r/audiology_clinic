"use client";

import { useState, useEffect, useCallback } from "react";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string | null;
  category: string;
  author?: string | null;
  imageUrl?: string | null;
  published: boolean;
  publishedAt?: string | null;
  sortOrder: number;
}

const emptyArticle: Omit<Article, "id"> = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  category: "Hearing Health",
  author: "",
  imageUrl: "",
  published: false,
  publishedAt: null,
  sortOrder: 0,
};

const categories = [
  "Hearing Health",
  "Hearing Aids",
  "Tinnitus",
  "Prevention",
  "Technology",
  "Research",
  "Lifestyle",
  "News",
];

export default function ArticlesManager() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Article | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Omit<Article, "id">>(emptyArticle);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchArticles = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/articles");
      if (res.ok) {
        setArticles(await res.json());
      }
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  function showMessage(type: "success" | "error", text: string) {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  }

  function startCreate() {
    setEditing(null);
    setForm(emptyArticle);
    setCreating(true);
  }

  function startEdit(article: Article) {
    setCreating(false);
    setEditing(article);
    setForm({
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      content: article.content || "",
      category: article.category,
      author: article.author || "",
      imageUrl: article.imageUrl || "",
      published: article.published,
      publishedAt: article.publishedAt,
      sortOrder: article.sortOrder,
    });
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
      content: form.content || null,
      author: form.author || null,
      imageUrl: form.imageUrl || null,
    };

    try {
      if (editing) {
        const res = await fetch("/api/admin/articles", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editing.id, ...data }),
        });
        if (res.ok) {
          showMessage("success", "Article updated");
          setEditing(null);
          fetchArticles();
        } else {
          showMessage("error", "Failed to update article");
        }
      } else {
        const res = await fetch("/api/admin/articles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          showMessage("success", "Article created");
          setCreating(false);
          fetchArticles();
        } else {
          showMessage("error", "Failed to create article");
        }
      }
    } catch {
      showMessage("error", "An error occurred");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(article: Article) {
    if (!confirm(`Delete "${article.title}"? This cannot be undone.`)) return;

    try {
      const res = await fetch("/api/admin/articles", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: article.id }),
      });
      if (res.ok) {
        showMessage("success", "Article deleted");
        fetchArticles();
      } else {
        showMessage("error", "Failed to delete article");
      }
    } catch {
      showMessage("error", "An error occurred");
    }
  }

  async function togglePublish(article: Article) {
    try {
      const res = await fetch("/api/admin/articles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: article.id,
          published: !article.published,
          publishedAt: !article.published ? new Date().toISOString() : article.publishedAt,
        }),
      });
      if (res.ok) {
        showMessage("success", article.published ? "Article unpublished" : "Article published");
        fetchArticles();
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
          <h2 className="text-2xl font-semibold text-foreground">Articles</h2>
          <p className="text-sm text-muted mt-1">
            {articles.length} article{articles.length !== 1 ? "s" : ""} &middot; {articles.filter((a) => a.published).length} published
          </p>
        </div>
        {!showForm && (
          <button
            onClick={startCreate}
            className="bg-secondary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary-dark transition-colors flex items-center gap-2 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Article
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
            {editing ? "Edit Article" : "New Article"}
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
              <label className="block text-sm font-medium text-foreground mb-1.5">Image</label>
              <div className="space-y-3">
                {/* Upload button */}
                <div className="flex items-center gap-3">
                  <label className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                    uploading
                      ? "bg-background text-muted cursor-not-allowed"
                      : "bg-secondary/10 text-secondary hover:bg-secondary/20"
                  }`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {uploading ? "Uploading..." : "Upload Image"}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                      className="hidden"
                      disabled={uploading}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setUploading(true);
                        try {
                          const formData = new FormData();
                          formData.append("file", file);
                          const res = await fetch("/api/admin/upload", {
                            method: "POST",
                            body: formData,
                          });
                          if (res.ok) {
                            const { url } = await res.json();
                            setForm({ ...form, imageUrl: url });
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
                  </label>
                  <span className="text-xs text-muted-light">JPEG, PNG, WebP, GIF, AVIF &middot; Max 5MB</span>
                </div>

                {/* Or enter URL manually */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-light uppercase tracking-wider font-medium">or</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <input
                  type="text"
                  value={form.imageUrl || ""}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="Enter image URL manually"
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground placeholder:text-muted-light"
                />

                {/* Preview */}
                {form.imageUrl && (
                  <div className="relative inline-block">
                    <img
                      src={form.imageUrl}
                      alt="Preview"
                      className="h-32 w-auto rounded-lg object-cover border border-border"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, imageUrl: "" })}
                      className="absolute -top-2 -right-2 bg-card border border-border rounded-full p-1 shadow-sm hover:bg-error/10 hover:border-error/30 transition-colors"
                      title="Remove image"
                    >
                      <svg className="w-3.5 h-3.5 text-muted hover:text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                rows={2}
                placeholder="Brief summary of the article"
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground placeholder:text-muted-light"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Content</label>
              <textarea
                value={form.content || ""}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={12}
                placeholder="Full article content. Supports plain text."
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground font-mono text-sm placeholder:text-muted-light"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Author</label>
                <input
                  type="text"
                  value={form.author || ""}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground"
                />
              </div>
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

            <div className="py-1">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary accent-primary"
                />
                <span className="text-sm text-foreground">Published</span>
              </label>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <button
                type="submit"
                disabled={saving}
                className="bg-secondary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary-dark transition-colors disabled:opacity-50 shadow-sm"
              >
                {saving ? "Saving..." : editing ? "Update Article" : "Create Article"}
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
              <th className="text-left text-xs font-semibold text-muted uppercase tracking-wider px-5 py-3.5">Article</th>
              <th className="text-left text-xs font-semibold text-muted uppercase tracking-wider px-5 py-3.5 hidden md:table-cell">Category</th>
              <th className="text-center text-xs font-semibold text-muted uppercase tracking-wider px-5 py-3.5 hidden sm:table-cell">Status</th>
              <th className="text-right text-xs font-semibold text-muted uppercase tracking-wider px-5 py-3.5">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-background/60 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    {article.imageUrl && (
                      <img
                        src={article.imageUrl}
                        alt=""
                        className="w-10 h-10 rounded-md object-cover shrink-0 border border-border"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    )}
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">{article.title}</div>
                      <div className="text-xs text-muted mt-0.5 truncate max-w-xs">{article.excerpt}</div>
                      {article.author && (
                        <div className="text-xs text-muted-light mt-0.5">by {article.author}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 hidden md:table-cell">
                  <span className="text-xs bg-primary/8 text-primary px-2.5 py-1 rounded-md font-medium">{article.category}</span>
                </td>
                <td className="px-5 py-4 text-center hidden sm:table-cell">
                  <button
                    onClick={() => togglePublish(article)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                      article.published
                        ? "bg-success/10 text-success hover:bg-success/20"
                        : "bg-background text-muted hover:bg-border/50"
                    }`}
                  >
                    {article.published ? "Published" : "Draft"}
                  </button>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => startEdit(article)}
                      className="text-muted hover:text-secondary p-2 rounded-lg hover:bg-secondary/10 transition-colors"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(article)}
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
            {articles.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-12 text-center text-sm text-muted">
                  No articles yet. Click &quot;Add Article&quot; to create one.
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
