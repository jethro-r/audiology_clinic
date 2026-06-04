"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { CheckCircle, Trash2, X, Upload, Search, ImagePlus, Copy, ExternalLink } from "lucide-react";

interface MediaItem {
  url: string;
  filename: string;
  size: number;
  uploadedAt: string;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NZ", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function MediaManager() {
  const [images, setImages] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [selected, setSelected] = useState<MediaItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/media");
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  function showMessage(type: "success" | "error", text: string) {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  }

  async function handleUpload(files: FileList | null) {
    if (!files?.length) return;

    setUploading(true);
    let uploaded = 0;
    let failed = 0;

    for (const file of Array.from(files)) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "media");

        const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
        if (res.ok) {
          uploaded++;
        } else {
          failed++;
        }
      } catch {
        failed++;
      }
    }

    setUploading(false);
    if (uploaded > 0) {
      showMessage("success", `Uploaded ${uploaded} file${uploaded > 1 ? "s" : ""}${failed > 0 ? `, ${failed} failed` : ""}`);
      fetchMedia();
    } else {
      showMessage("error", "Upload failed");
    }
  }

  async function handleDelete(url: string, e?: React.MouseEvent) {
    e?.stopPropagation();
    if (!confirm("Delete this image?")) return;

    try {
      const res = await fetch("/api/admin/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (res.ok) {
        showMessage("success", "Image deleted");
        setImages((prev) => prev.filter((img) => img.url !== url));
        if (selected?.url === url) setSelected(null);
      } else {
        showMessage("error", "Failed to delete");
      }
    } catch {
      showMessage("error", "Failed to delete");
    }
  }

  async function copyUrl(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      showMessage("success", "URL copied to clipboard");
    } catch {
      showMessage("error", "Failed to copy");
    }
  }

  const filtered = search
    ? images.filter((img) => img.filename.toLowerCase().includes(search.toLowerCase()))
    : images;

  return (
    <div className="flex flex-col h-full">
      {/* Toast message */}
      {message && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium animate-in slide-in-from-top-2 ${
            message.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {message.type === "success" && <CheckCircle className="h-4 w-4" />}
          {message.text}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Media Library</h1>
          <p className="text-sm text-muted mt-1">
            {loading ? "Loading..." : `${images.length} image${images.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 shadow-sm"
        >
          {uploading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Upload
            </>
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
      </div>

      {/* Search + filter bar */}
      {images.length > 0 && (
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            placeholder="Search images..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xs pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm bg-white text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
          />
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <svg className="animate-spin mx-auto h-8 w-8 text-primary" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="mt-3 text-sm text-muted">Loading images...</p>
          </div>
        </div>
      ) : images.length === 0 ? (
        /* Empty state */
        <div className="flex-1 flex items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card/50">
          <div className="text-center py-16 px-8">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <ImagePlus className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No images yet</h3>
            <p className="text-sm text-muted mb-6 max-w-sm">
              Click the button below to upload your first image.
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
            >
              <Upload className="h-4 w-4" />
              Upload Images
            </button>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex-1 flex items-center justify-center py-20">
          <p className="text-muted">No images match &ldquo;{search}&rdquo;</p>
        </div>
      ) : (
        /* Image grid */
        <div className="flex-1 p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {filtered.map((img) => (
              <button
                key={img.url}
                type="button"
                onClick={() => setSelected(img)}
                className={`group relative bg-card rounded-xl border overflow-hidden text-left transition-all ${
                  selected?.url === img.url
                    ? "border-primary ring-2 ring-primary/30 shadow-md"
                    : "border-border hover:border-primary/40 hover:shadow-md"
                }`}
              >
                <div className="relative aspect-square bg-background">
                  <Image
                    src={img.url}
                    alt={img.filename}
                    fill
                    quality={90}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  />
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-medium text-foreground truncate" title={img.filename}>
                    {img.filename}
                  </p>
                  <p className="text-[11px] text-muted mt-0.5">{formatSize(img.size)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Detail panel (slide-over) */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30" onClick={() => setSelected(null)} />

          {/* Panel */}
          <div className="relative w-full max-w-md bg-white shadow-xl flex flex-col animate-in slide-in-from-right duration-200">
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Image Details</h2>
              <button
                onClick={() => setSelected(null)}
                className="p-2 rounded-lg hover:bg-background text-muted hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Preview */}
            <div className="px-6 py-4">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-background border border-border">
                <Image src={selected.url} alt={selected.filename} fill quality={90} className="object-contain" />
              </div>
            </div>

            {/* Details */}
            <div className="px-6 py-4 space-y-4 flex-1 overflow-y-auto">
              <div>
                <label className="text-xs font-medium text-muted uppercase tracking-wide">Filename</label>
                <p className="text-sm text-foreground mt-1 break-all">{selected.filename}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted uppercase tracking-wide">Size</label>
                  <p className="text-sm text-foreground mt-1">{formatSize(selected.size)}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted uppercase tracking-wide">Uploaded</label>
                  <p className="text-sm text-foreground mt-1">{formatDate(selected.uploadedAt)}</p>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted uppercase tracking-wide">URL</label>
                <div className="flex items-center gap-2 mt-1">
                  <code className="flex-1 text-xs bg-background px-3 py-2 rounded-lg border border-border text-foreground truncate">
                    {selected.url}
                  </code>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 border-t border-border space-y-2">
              <button
                onClick={() => copyUrl(selected.url)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <Copy className="h-4 w-4" />
                Copy URL
              </button>
              <div className="flex gap-2">
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-card border border-border text-foreground rounded-xl text-sm font-medium hover:bg-background transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open
                </a>
                <button
                  onClick={(e) => handleDelete(selected.url, e)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
