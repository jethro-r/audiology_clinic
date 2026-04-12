"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as LucideIcons from "lucide-react";
import useAdminPagination from "@/hooks/useAdminPagination";
import Pagination from "@/components/admin/Pagination";
import SearchBar from "@/components/admin/SearchBar";

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

export default function ServicesManager() {
  const router = useRouter();
  const {
    items: services,
    totalItems,
    totalPages,
    currentPage,
    setPage,
    search,
    setSearch,
    loading,
    refetch,
  } = useAdminPagination<Service>("/api/admin/services");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function showMessage(type: "success" | "error", text: string) {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
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
        refetch();
      } else {
        showMessage("error", "Failed to delete service");
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
          <h2 className="text-2xl font-semibold text-foreground">Services</h2>
          <p className="text-sm text-muted mt-1">{totalItems} service{totalItems !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={() => router.push("/admin/services/new")}
          className="bg-secondary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary-dark transition-colors flex items-center gap-2 shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Service
        </button>
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
        <SearchBar value={search} onChange={setSearch} placeholder="Search services..." />
      </div>

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
                        onClick={() => router.push(`/admin/services/${service.id}`)}
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

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
