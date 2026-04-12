"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { type FAQ } from "@/lib/data";
import useAdminPagination from "@/hooks/useAdminPagination";
import Pagination from "@/components/admin/Pagination";
import SearchBar from "@/components/admin/SearchBar";


export default function FAQManager() {
  const router = useRouter();
  const [showOnlyActive, setShowOnlyActive] = useState(false);

  const extraParams = useMemo(
    () => (showOnlyActive ? { active: "true" } : undefined),
    [showOnlyActive]
  );

  const {
    items: faqs,
    totalItems,
    totalPages,
    currentPage,
    setPage,
    search,
    setSearch,
    loading,
    refetch,
  } = useAdminPagination<FAQ>("/api/admin/faqs", { extraParams });
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function showMessage(type: "success" | "error", text: string) {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
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
        refetch();
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
        refetch();
      } else {
        showMessage("error", "Failed to update FAQ");
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

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">FAQs</h2>
          <p className="text-sm text-muted mt-1">
            {totalItems} FAQ{totalItems !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowOnlyActive(!showOnlyActive)}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              showOnlyActive
                ? "bg-secondary text-white shadow-sm"
                : "bg-card border border-border text-foreground hover:bg-background"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {showOnlyActive ? "Show All" : "Active Only"}
          </button>
          <button
            onClick={() => router.push("/admin/faqs/new")}
            className="bg-secondary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary-dark transition-colors flex items-center gap-2 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add FAQ
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-6 px-4 py-3 rounded-lg text-sm font-medium ${
          message.type === "success" ? "bg-success/10 text-success" : "bg-error/10 text-error"
        }`}>
          {message.text}
        </div>
      )}

      {/* Search */}
      <div className="mb-6">
        <SearchBar value={search} onChange={setSearch} placeholder="Search FAQs..." />
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-125">
            <thead className="bg-background border-b border-border">
              <tr>
                <th className="text-left text-xs font-semibold text-muted uppercase tracking-wider px-5 py-3.5">Question</th>
                <th className="text-center text-xs font-semibold text-muted uppercase tracking-wider px-5 py-3.5 hidden sm:table-cell">Order</th>
                <th className="text-center text-xs font-semibold text-muted uppercase tracking-wider px-5 py-3.5 hidden sm:table-cell">Active</th>
                <th className="text-right text-xs font-semibold text-muted uppercase tracking-wider px-5 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {faqs.map((faq) => (
                <tr key={faq.id} className="hover:bg-background/60 transition-colors">
                  <td className="px-5 py-4">
                    <div className="text-sm font-medium text-foreground">{faq.question}</div>
                  </td>
                  <td className="px-5 py-4 text-center text-sm text-muted hidden sm:table-cell">{faq.sortOrder}</td>
                  <td className="px-5 py-4 text-center hidden sm:table-cell">
                    <button
                      onClick={() => handleToggleActive(faq)}
                      title={faq.active ? "Hide from website" : "Show on website"}
                      className="inline-flex"
                    >
                      <span className={`inline-block w-2.5 h-2.5 rounded-full ${faq.active ? "bg-success" : "bg-border"}`} />
                    </button>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => router.push(`/admin/faqs/${faq.id}`)}
                        className="text-muted hover:text-secondary p-2 rounded-lg hover:bg-secondary/10 transition-colors"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(faq)}
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
              {faqs.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-sm text-muted">
                    No FAQs yet. Click &quot;Add FAQ&quot; to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
