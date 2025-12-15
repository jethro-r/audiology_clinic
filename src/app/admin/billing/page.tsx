"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  FileText,
  Clock,
  Search,
  Plus,
  X,
  Loader2,
  Eye,
  CheckCircle2,
  Receipt,
  Banknote,
} from "lucide-react";
import Button from "@/components/Button";

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
}

interface InvoiceItem {
  id?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Payment {
  id: string;
  amount: number;
  paymentMethod: string;
  reference: string | null;
  notes: string | null;
  paidAt: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  patientId: string;
  patient: Patient;
  subtotal: number;
  tax: number;
  total: number;
  paidAmount: number;
  status: "DRAFT" | "PENDING" | "PAID" | "PARTIAL" | "OVERDUE" | "CANCELLED";
  dueDate: string;
  notes: string | null;
  createdAt: string;
  items: InvoiceItem[];
  payments: Payment[];
}

const statusConfig = {
  DRAFT: { label: "Draft", color: "bg-gray-100 text-gray-600" },
  PENDING: { label: "Pending", color: "bg-yellow-100 text-yellow-700" },
  PAID: { label: "Paid", color: "bg-green-100 text-green-700" },
  PARTIAL: { label: "Partial", color: "bg-blue-100 text-blue-700" },
  OVERDUE: { label: "Overdue", color: "bg-red-100 text-red-700" },
  CANCELLED: { label: "Cancelled", color: "bg-gray-100 text-gray-500" },
};

const paymentMethods = [
  { value: "CASH", label: "Cash" },
  { value: "EFTPOS", label: "EFTPOS" },
  { value: "CREDIT_CARD", label: "Credit Card" },
  { value: "BANK_TRANSFER", label: "Bank Transfer" },
  { value: "ACC", label: "ACC" },
  { value: "SOUTHERN_CROSS", label: "Southern Cross" },
  { value: "OTHER_INSURANCE", label: "Other Insurance" },
];

export default function AdminBillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    { description: "", quantity: 1, unitPrice: 0, total: 0 },
  ]);
  const [invoiceNotes, setInvoiceNotes] = useState("");
  const [invoiceDueDate, setInvoiceDueDate] = useState("");

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("EFTPOS");
  const [paymentReference, setPaymentReference] = useState("");
  const [paymentNotes, setPaymentNotes] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);

  const fetchInvoices = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/invoices");
      if (response.ok) {
        const data = await response.json();
        setInvoices(data);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPatients = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/patients");
      if (response.ok) {
        const data = await response.json();
        setPatients(data);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  }, []);

  useEffect(() => {
    fetchInvoices();
    fetchPatients();
  }, [fetchInvoices, fetchPatients]);

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      searchQuery === "" ||
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${invoice.patient.firstName} ${invoice.patient.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalRevenue: invoices.filter((i) => i.status === "PAID").reduce((sum, i) => sum + Number(i.total), 0),
    pendingAmount: invoices.filter((i) => ["PENDING", "PARTIAL", "OVERDUE"].includes(i.status)).reduce((sum, i) => sum + Number(i.total) - i.paidAmount, 0),
    invoiceCount: invoices.length,
    paidCount: invoices.filter((i) => i.status === "PAID").length,
  };

  const addInvoiceItem = () => {
    setInvoiceItems([...invoiceItems, { description: "", quantity: 1, unitPrice: 0, total: 0 }]);
  };

  const updateInvoiceItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...invoiceItems];
    if (field === 'description') {
      newItems[index].description = value as string;
    } else if (field === 'quantity') {
      newItems[index].quantity = value as number;
      newItems[index].total = newItems[index].quantity * newItems[index].unitPrice;
    } else if (field === 'unitPrice') {
      newItems[index].unitPrice = value as number;
      newItems[index].total = newItems[index].quantity * newItems[index].unitPrice;
    } else if (field === 'total') {
      newItems[index].total = value as number;
    }
    setInvoiceItems(newItems);
  };

  const removeInvoiceItem = (index: number) => {
    setInvoiceItems(invoiceItems.filter((_, i) => i !== index));
  };

  const subtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.15;
  const total = subtotal + tax;

  const handleCreateInvoice = async () => {
    if (!selectedPatientId || invoiceItems.length === 0) return;
    setCreateLoading(true);
    try {
      const response = await fetch("/api/admin/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: selectedPatientId,
          items: invoiceItems.filter((item) => item.description && item.unitPrice > 0),
          dueDate: invoiceDueDate || undefined,
          notes: invoiceNotes || undefined,
        }),
      });
      if (response.ok) {
        await fetchInvoices();
        setShowCreateModal(false);
        resetCreateForm();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to create invoice");
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
      alert("An error occurred");
    } finally {
      setCreateLoading(false);
    }
  };

  const resetCreateForm = () => {
    setSelectedPatientId("");
    setInvoiceItems([{ description: "", quantity: 1, unitPrice: 0, total: 0 }]);
    setInvoiceNotes("");
    setInvoiceDueDate("");
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowViewModal(true);
  };

  const handleRecordPayment = async () => {
    if (!selectedInvoice || !paymentAmount || !paymentMethod) return;
    setPaymentLoading(true);
    try {
      const response = await fetch(`/api/admin/invoices/${selectedInvoice.id}/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(paymentAmount),
          paymentMethod,
          reference: paymentReference || undefined,
          notes: paymentNotes || undefined,
        }),
      });
      if (response.ok) {
        await fetchInvoices();
        setShowPaymentModal(false);
        setShowViewModal(false);
        resetPaymentForm();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to record payment");
      }
    } catch (error) {
      console.error("Error recording payment:", error);
      alert("An error occurred");
    } finally {
      setPaymentLoading(false);
    }
  };

  const resetPaymentForm = () => {
    setPaymentAmount("");
    setPaymentMethod("EFTPOS");
    setPaymentReference("");
    setPaymentNotes("");
  };

  const formatCurrency = (amount: number) => new Intl.NumberFormat("en-NZ", { style: "currency", currency: "NZD" }).format(amount);
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString("en-NZ", { year: "numeric", month: "short", day: "numeric" });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-[var(--foreground)]">Billing & Payments</h1>
          <p className="text-[var(--muted)] mt-1">Manage invoices, payments, and financial reports</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-[var(--border)] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--muted)]">Total Revenue</p>
              <p className="text-2xl font-bold text-[var(--foreground)] mt-1">{formatCurrency(stats.totalRevenue)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[var(--border)] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--muted)]">Pending Amount</p>
              <p className="text-2xl font-bold text-[var(--foreground)] mt-1">{formatCurrency(stats.pendingAmount)}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[var(--border)] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--muted)]">Total Invoices</p>
              <p className="text-2xl font-bold text-[var(--foreground)] mt-1">{stats.invoiceCount}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[var(--border)] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--muted)]">Paid Invoices</p>
              <p className="text-2xl font-bold text-[var(--foreground)] mt-1">{stats.paidCount}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[var(--muted)]" />
          <input type="text" placeholder="Search invoices..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-3 rounded-xl border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white">
          <option value="ALL">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="PAID">Paid</option>
          <option value="PARTIAL">Partial</option>
          <option value="OVERDUE">Overdue</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="bg-white rounded-xl border border-[var(--border)] overflow-hidden">
        {filteredInvoices.length === 0 ? (
          <div className="p-8 text-center">
            <Receipt className="h-12 w-12 text-[var(--muted)] mx-auto mb-4" />
            <p className="text-[var(--muted)]">No invoices found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--card)] border-b border-[var(--border)]">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-[var(--muted)]">Invoice</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-[var(--muted)]">Patient</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-[var(--muted)]">Amount</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-[var(--muted)]">Status</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-[var(--muted)]">Due Date</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-[var(--muted)]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-[var(--card)]">
                    <td className="px-4 py-4">
                      <p className="font-medium text-[var(--foreground)]">{invoice.invoiceNumber}</p>
                      <p className="text-sm text-[var(--muted)]">{formatDate(invoice.createdAt)}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-medium text-[var(--foreground)]">{invoice.patient.firstName} {invoice.patient.lastName}</p>
                      <p className="text-sm text-[var(--muted)]">{invoice.patient.email}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-medium text-[var(--foreground)]">{formatCurrency(Number(invoice.total))}</p>
                      {invoice.paidAmount > 0 && invoice.status !== "PAID" && <p className="text-sm text-green-600">Paid: {formatCurrency(invoice.paidAmount)}</p>}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${statusConfig[invoice.status].color}`}>{statusConfig[invoice.status].label}</span>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-[var(--foreground)]">{formatDate(invoice.dueDate)}</p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleViewInvoice(invoice)} className="p-2 hover:bg-[var(--card)] rounded-lg transition-colors" title="View invoice">
                          <Eye className="h-4 w-4 text-[var(--muted)]" />
                        </button>
                        {invoice.status !== "PAID" && invoice.status !== "CANCELLED" && (
                          <button onClick={() => { setSelectedInvoice(invoice); setPaymentAmount((Number(invoice.total) - invoice.paidAmount).toFixed(2)); setShowPaymentModal(true); }} className="p-2 hover:bg-green-50 rounded-lg transition-colors" title="Record payment">
                            <Banknote className="h-4 w-4 text-green-600" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Create Invoice Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowCreateModal(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-[var(--border)] p-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-[var(--foreground)]">Create Invoice</h2>
                <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-[var(--card)] rounded-lg"><X className="h-5 w-5 text-[var(--muted)]" /></button>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Patient *</label>
                  <select value={selectedPatientId} onChange={(e) => setSelectedPatientId(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white">
                    <option value="">Select a patient</option>
                    {patients.map((patient) => (<option key={patient.id} value={patient.id}>{patient.firstName} {patient.lastName} - {patient.email}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Items *</label>
                  <div className="space-y-2">
                    {invoiceItems.map((item, index) => (
                      <div key={index} className="flex gap-2 items-start">
                        <input type="text" placeholder="Description" value={item.description} onChange={(e) => updateInvoiceItem(index, "description", e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
                        <input type="number" placeholder="Qty" min="1" value={item.quantity} onChange={(e) => updateInvoiceItem(index, "quantity", parseInt(e.target.value) || 1)} className="w-20 px-3 py-2 rounded-lg border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
                        <input type="number" placeholder="Price" min="0" step="0.01" value={item.unitPrice || ""} onChange={(e) => updateInvoiceItem(index, "unitPrice", parseFloat(e.target.value) || 0)} className="w-28 px-3 py-2 rounded-lg border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
                        <span className="py-2 w-24 text-right font-medium">{formatCurrency(item.total)}</span>
                        {invoiceItems.length > 1 && <button onClick={() => removeInvoiceItem(index)} className="p-2 hover:bg-red-50 rounded-lg"><X className="h-4 w-4 text-red-500" /></button>}
                      </div>
                    ))}
                  </div>
                  <button onClick={addInvoiceItem} className="mt-2 text-sm text-[var(--primary)] hover:underline">+ Add item</button>
                </div>
                <div className="border-t border-[var(--border)] pt-4 space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-[var(--muted)]">Subtotal:</span><span>{formatCurrency(subtotal)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-[var(--muted)]">GST (15%):</span><span>{formatCurrency(tax)}</span></div>
                  <div className="flex justify-between font-bold"><span>Total:</span><span>{formatCurrency(total)}</span></div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Due Date</label>
                  <input type="date" value={invoiceDueDate} onChange={(e) => setInvoiceDueDate(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Notes</label>
                  <textarea value={invoiceNotes} onChange={(e) => setInvoiceNotes(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowCreateModal(false)} className="flex-1">Cancel</Button>
                  <Button onClick={handleCreateInvoice} disabled={createLoading || !selectedPatientId || !invoiceItems.some((i) => i.description && i.unitPrice > 0)} className="flex-1">
                    {createLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Creating...</> : "Create Invoice"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Invoice Modal */}
      <AnimatePresence>
        {showViewModal && selectedInvoice && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowViewModal(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-[var(--border)] p-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[var(--foreground)]">{selectedInvoice.invoiceNumber}</h2>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${statusConfig[selectedInvoice.status].color}`}>{statusConfig[selectedInvoice.status].label}</span>
                </div>
                <button onClick={() => setShowViewModal(false)} className="p-2 hover:bg-[var(--card)] rounded-lg"><X className="h-5 w-5 text-[var(--muted)]" /></button>
              </div>
              <div className="p-4 space-y-4">
                <div><p className="text-sm text-[var(--muted)]">Patient</p><p className="font-medium">{selectedInvoice.patient.firstName} {selectedInvoice.patient.lastName}</p><p className="text-sm text-[var(--muted)]">{selectedInvoice.patient.email}</p></div>
                <div><p className="text-sm font-medium text-[var(--muted)] mb-2">Items</p><div className="space-y-2">{selectedInvoice.items.map((item, index) => (<div key={index} className="flex justify-between text-sm"><span>{item.description} × {item.quantity}</span><span>{formatCurrency(Number(item.total))}</span></div>))}</div></div>
                <div className="border-t border-[var(--border)] pt-4 space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-[var(--muted)]">Subtotal:</span><span>{formatCurrency(Number(selectedInvoice.subtotal))}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-[var(--muted)]">GST (15%):</span><span>{formatCurrency(Number(selectedInvoice.tax))}</span></div>
                  <div className="flex justify-between font-bold"><span>Total:</span><span>{formatCurrency(Number(selectedInvoice.total))}</span></div>
                  {selectedInvoice.paidAmount > 0 && (<><div className="flex justify-between text-sm text-green-600"><span>Paid:</span><span>{formatCurrency(selectedInvoice.paidAmount)}</span></div><div className="flex justify-between font-bold"><span>Balance Due:</span><span>{formatCurrency(Number(selectedInvoice.total) - selectedInvoice.paidAmount)}</span></div></>)}
                </div>
                {selectedInvoice.payments.length > 0 && (<div><p className="text-sm font-medium text-[var(--muted)] mb-2">Payments</p><div className="space-y-2">{selectedInvoice.payments.map((payment) => (<div key={payment.id} className="flex justify-between text-sm bg-green-50 p-2 rounded-lg"><div><p className="font-medium">{paymentMethods.find((m) => m.value === payment.paymentMethod)?.label || payment.paymentMethod}</p><p className="text-xs text-[var(--muted)]">{formatDate(payment.paidAt)}</p></div><span className="font-medium text-green-600">{formatCurrency(Number(payment.amount))}</span></div>))}</div></div>)}
                {selectedInvoice.status !== "PAID" && selectedInvoice.status !== "CANCELLED" && (<div className="pt-4"><Button onClick={() => { setPaymentAmount((Number(selectedInvoice.total) - selectedInvoice.paidAmount).toFixed(2)); setShowPaymentModal(true); }} className="w-full"><Banknote className="h-4 w-4 mr-2" />Record Payment</Button></div>)}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Record Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && selectedInvoice && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowPaymentModal(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-xl w-full max-w-md">
              <div className="border-b border-[var(--border)] p-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-[var(--foreground)]">Record Payment</h2>
                <button onClick={() => setShowPaymentModal(false)} className="p-2 hover:bg-[var(--card)] rounded-lg"><X className="h-5 w-5 text-[var(--muted)]" /></button>
              </div>
              <div className="p-4 space-y-4">
                <div className="bg-[var(--card)] p-3 rounded-lg"><p className="text-sm text-[var(--muted)]">Invoice</p><p className="font-medium">{selectedInvoice.invoiceNumber}</p><p className="text-sm">Balance: {formatCurrency(Number(selectedInvoice.total) - selectedInvoice.paidAmount)}</p></div>
                <div><label className="block text-sm font-medium text-[var(--foreground)] mb-1">Amount *</label><input type="number" step="0.01" min="0.01" max={Number(selectedInvoice.total) - selectedInvoice.paidAmount} value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" /></div>
                <div><label className="block text-sm font-medium text-[var(--foreground)] mb-1">Payment Method *</label><select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white">{paymentMethods.map((method) => (<option key={method.value} value={method.value}>{method.label}</option>))}</select></div>
                <div><label className="block text-sm font-medium text-[var(--foreground)] mb-1">Reference</label><input type="text" value={paymentReference} onChange={(e) => setPaymentReference(e.target.value)} placeholder="Transaction ID, receipt number, etc." className="w-full px-3 py-2 rounded-lg border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" /></div>
                <div><label className="block text-sm font-medium text-[var(--foreground)] mb-1">Notes</label><textarea value={paymentNotes} onChange={(e) => setPaymentNotes(e.target.value)} rows={2} className="w-full px-3 py-2 rounded-lg border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" /></div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowPaymentModal(false)} className="flex-1">Cancel</Button>
                  <Button onClick={handleRecordPayment} disabled={paymentLoading || !paymentAmount || !paymentMethod} className="flex-1">{paymentLoading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Recording...</> : "Record Payment"}</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
