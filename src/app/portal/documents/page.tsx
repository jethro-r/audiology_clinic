"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  Search,
  Filter,
  Calendar,
  Eye,
  File,
  FileImage,
  Loader2,
} from "lucide-react";
import Button from "@/components/Button";

type DocumentCategory = "all" | "test-results" | "prescriptions" | "invoices" | "forms";

interface Document {
  id: string;
  name: string;
  category: DocumentCategory;
  date: string;
  size: string;
  type: "pdf" | "image" | "document";
}

// Mock data - replace with API calls
const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Hearing Evaluation Results - Nov 2024",
    category: "test-results",
    date: "November 10, 2024",
    size: "245 KB",
    type: "pdf",
  },
  {
    id: "2",
    name: "Audiogram Report",
    category: "test-results",
    date: "November 10, 2024",
    size: "128 KB",
    type: "pdf",
  },
  {
    id: "3",
    name: "Hearing Aid Prescription",
    category: "prescriptions",
    date: "November 15, 2024",
    size: "89 KB",
    type: "pdf",
  },
  {
    id: "4",
    name: "Invoice #INV-2024-001",
    category: "invoices",
    date: "November 10, 2024",
    size: "56 KB",
    type: "pdf",
  },
  {
    id: "5",
    name: "Patient Intake Form",
    category: "forms",
    date: "October 1, 2024",
    size: "112 KB",
    type: "pdf",
  },
  {
    id: "6",
    name: "Insurance Authorization",
    category: "forms",
    date: "October 5, 2024",
    size: "78 KB",
    type: "pdf",
  },
  {
    id: "7",
    name: "Hearing Aid User Guide",
    category: "prescriptions",
    date: "November 20, 2024",
    size: "1.2 MB",
    type: "pdf",
  },
];

const categoryLabels: Record<DocumentCategory, string> = {
  all: "All Documents",
  "test-results": "Test Results",
  prescriptions: "Prescriptions",
  invoices: "Invoices",
  forms: "Forms",
};

const categoryColors: Record<Exclude<DocumentCategory, "all">, string> = {
  "test-results": "bg-blue-100 text-blue-700",
  prescriptions: "bg-green-100 text-green-700",
  invoices: "bg-purple-100 text-purple-700",
  forms: "bg-orange-100 text-orange-700",
};

const getFileIcon = (type: Document["type"]) => {
  switch (type) {
    case "pdf":
      return FileText;
    case "image":
      return FileImage;
    default:
      return File;
  }
};

export default function DocumentsPage() {
  const [filter, setFilter] = useState<DocumentCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [downloading, setDownloading] = useState<string | null>(null);

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesFilter = filter === "all" || doc.category === filter;
    const matchesSearch = doc.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDownload = async (docId: string) => {
    setDownloading(docId);
    // Simulate download delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setDownloading(null);
    // In production, this would trigger actual file download
    alert("Document download started!");
  };

  const handleView = (docId: string) => {
    // In production, this would open the document in a viewer
    alert("Opening document viewer...");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-[var(--foreground)]">
          My Documents
        </h1>
        <p className="text-[var(--muted)] mt-1">
          Access your medical records, test results, and other documents
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl border border-[var(--border)] p-4"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--muted)]" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter className="h-5 w-5 text-[var(--muted)] flex-shrink-0" />
            <div className="flex gap-1">
              {(Object.keys(categoryLabels) as DocumentCategory[]).map(
                (category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                      filter === category
                        ? "bg-[var(--primary)] text-white"
                        : "bg-[var(--card)] text-[var(--foreground)] hover:bg-gray-200"
                    }`}
                  >
                    {categoryLabels[category]}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Documents List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((doc) => {
            const FileIcon = getFileIcon(doc.type);
            return (
              <div
                key={doc.id}
                className="bg-white rounded-xl border border-[var(--border)] p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center">
                      <FileIcon className="h-6 w-6 text-[var(--primary)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--foreground)]">
                        {doc.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full ${
                            categoryColors[doc.category as Exclude<DocumentCategory, "all">]
                          }`}
                        >
                          {categoryLabels[doc.category]}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-[var(--muted)]">
                          <Calendar className="h-3.5 w-3.5" />
                          {doc.date}
                        </span>
                        <span className="text-sm text-[var(--muted)]">
                          {doc.size}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(doc.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(doc.id)}
                      disabled={downloading === doc.id}
                    >
                      {downloading === doc.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-xl border border-[var(--border)] p-8 text-center">
            <FileText className="h-12 w-12 text-[var(--muted)] mx-auto mb-4" />
            <h3 className="font-semibold text-[var(--foreground)] mb-2">
              No Documents Found
            </h3>
            <p className="text-[var(--muted)]">
              {filter === "all"
                ? "You don't have any documents yet."
                : `You don't have any ${categoryLabels[filter].toLowerCase()} documents.`}
            </p>
          </div>
        )}
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-blue-50 rounded-xl border border-blue-200 p-4"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-blue-900">
              Need a copy of your records?
            </h4>
            <p className="text-sm text-blue-700 mt-1">
              If you need additional documents or copies of records not shown here,
              please contact our office at (415) 555-1234 or send us a message
              through the patient portal.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
