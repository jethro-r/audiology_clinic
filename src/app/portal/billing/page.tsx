'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CurrencyDollarIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  CalendarIcon,
  XMarkIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Payment {
  id: string;
  amount: number;
  method: string;
  reference: string | null;
  paidAt: string;
  notes: string | null;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  subtotal: number;
  tax: number;
  total: number;
  status: 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  notes: string | null;
  appointment?: {
    id: string;
    date: string;
    type: {
      name: string;
    };
  };
  items: InvoiceItem[];
  payments: Payment[];
}

export default function PatientBillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [filter, setFilter] = useState<'all' | 'unpaid' | 'paid'>('all');

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/portal/invoices');
      if (response.ok) {
        const data = await response.json();
        setInvoices(data);
      }
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NZ', {
      style: 'currency',
      currency: 'NZD'
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-NZ', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: Invoice['status']) => {
    const styles = {
      DRAFT: 'bg-gray-100 text-gray-800',
      SENT: 'bg-blue-100 text-blue-800',
      PAID: 'bg-green-100 text-green-800',
      OVERDUE: 'bg-red-100 text-red-800',
      CANCELLED: 'bg-gray-100 text-gray-500'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {status}
      </span>
    );
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      CASH: 'Cash',
      CARD: 'Card/EFTPOS',
      BANK_TRANSFER: 'Bank Transfer',
      ACC: 'ACC',
      INSURANCE: 'Insurance'
    };
    return labels[method] || method;
  };

  const filteredInvoices = invoices.filter(invoice => {
    if (filter === 'unpaid') return ['SENT', 'OVERDUE'].includes(invoice.status);
    if (filter === 'paid') return invoice.status === 'PAID';
    return true;
  });

  const totalOutstanding = invoices
    .filter(inv => ['SENT', 'OVERDUE'].includes(inv.status))
    .reduce((sum, inv) => {
      const paidAmount = inv.payments.reduce((p, payment) => p + payment.amount, 0);
      return sum + (inv.total - paidAmount);
    }, 0);

  const totalPaid = invoices
    .filter(inv => inv.status === 'PAID')
    .reduce((sum, inv) => sum + inv.total, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Invoices</h1>
        <p className="text-gray-600 mt-1">View and manage your billing history</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 bg-blue-100 rounded-lg">
              <DocumentTextIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Total Invoices</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{invoices.length}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Outstanding</h3>
            <p className="text-2xl font-bold text-yellow-600 mt-1">{formatCurrency(totalOutstanding)}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Total Paid</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">{formatCurrency(totalPaid)}</p>
          </div>
        </motion.div>
      </div>

      {/* Outstanding Alert */}
      {totalOutstanding > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start"
        >
          <ExclamationCircleIcon className="h-5 w-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-yellow-800">Payment Due</h3>
            <p className="text-sm text-yellow-700 mt-1">
              You have {formatCurrency(totalOutstanding)} in outstanding invoices. 
              Please arrange payment at your earliest convenience.
            </p>
            <div className="mt-3">
              <p className="text-sm text-yellow-700 font-medium">Payment options:</p>
              <ul className="text-sm text-yellow-700 mt-1 list-disc list-inside">
                <li>Pay in person at our clinic (EFTPOS, Cash, or Card)</li>
                <li>Bank transfer to: 03-0123-0456789-00 (Ref: Your invoice number)</li>
                <li>Contact us to arrange ACC or insurance claims</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'all', label: 'All Invoices' },
            { id: 'unpaid', label: 'Unpaid' },
            { id: 'paid', label: 'Paid' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                filter === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Invoices List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        {filteredInvoices.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredInvoices.map((invoice) => {
              const paidAmount = invoice.payments.reduce((sum, p) => sum + p.amount, 0);
              const remainingAmount = invoice.total - paidAmount;
              
              return (
                <div
                  key={invoice.id}
                  onClick={() => setSelectedInvoice(invoice)}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg ${
                        invoice.status === 'PAID' ? 'bg-green-100' :
                        invoice.status === 'OVERDUE' ? 'bg-red-100' :
                        'bg-blue-100'
                      }`}>
                        <CurrencyDollarIcon className={`h-5 w-5 ${
                          invoice.status === 'PAID' ? 'text-green-600' :
                          invoice.status === 'OVERDUE' ? 'text-red-600' :
                          'text-blue-600'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{invoice.invoiceNumber}</p>
                        {invoice.appointment && (
                          <p className="text-sm text-gray-500">
                            {invoice.appointment.type.name} - {formatDate(invoice.appointment.date)}
                          </p>
                        )}
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          Issued: {formatDate(invoice.issueDate)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-4">
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatCurrency(invoice.total)}</p>
                        {remainingAmount > 0 && invoice.status !== 'PAID' && (
                          <p className="text-sm text-yellow-600">
                            {formatCurrency(remainingAmount)} due
                          </p>
                        )}
                      </div>
                      {getStatusBadge(invoice.status)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center">
            <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No invoices found</h3>
            <p className="text-gray-500 mt-2">
              {filter === 'all' 
                ? "You don't have any invoices yet."
                : filter === 'unpaid'
                ? "You don't have any unpaid invoices."
                : "You don't have any paid invoices."}
            </p>
          </div>
        )}
      </motion.div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Invoice {selectedInvoice.invoiceNumber}
                  </h2>
                  <p className="text-gray-500 mt-1">
                    Issued on {formatDate(selectedInvoice.issueDate)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Status and Due Date */}
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedInvoice.status)}</div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Due Date</p>
                  <p className="font-medium text-gray-900">{formatDate(selectedInvoice.dueDate)}</p>
                </div>
              </div>

              {/* Appointment Info */}
              {selectedInvoice.appointment && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Appointment Details</h3>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <p className="font-medium text-gray-900">{selectedInvoice.appointment.type.name}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {formatDate(selectedInvoice.appointment.date)}
                    </p>
                  </div>
                </div>
              )}

              {/* Invoice Items */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Invoice Items</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Description</th>
                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Qty</th>
                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Price</th>
                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedInvoice.items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 text-right">{item.quantity}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 text-right">{formatCurrency(item.unitPrice)}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">{formatCurrency(item.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totals */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-900">{formatCurrency(selectedInvoice.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">GST (15%)</span>
                  <span className="text-gray-900">{formatCurrency(selectedInvoice.tax)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">{formatCurrency(selectedInvoice.total)}</span>
                </div>
              </div>

              {/* Payments */}
              {selectedInvoice.payments.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Payment History</h3>
                  <div className="space-y-2">
                    {selectedInvoice.payments.map((payment) => (
                      <div key={payment.id} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <div>
                          <p className="font-medium text-green-800">
                            {getPaymentMethodLabel(payment.method)}
                          </p>
                          <p className="text-sm text-green-600">
                            {formatDate(payment.paidAt)}
                            {payment.reference && ` • Ref: ${payment.reference}`}
                          </p>
                        </div>
                        <span className="font-semibold text-green-800">
                          {formatCurrency(payment.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Amount Due */}
                  {selectedInvoice.status !== 'PAID' && (
                    <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-yellow-800">Amount Due</span>
                        <span className="text-xl font-bold text-yellow-800">
                          {formatCurrency(
                            selectedInvoice.total - 
                            selectedInvoice.payments.reduce((sum, p) => sum + p.amount, 0)
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Notes */}
              {selectedInvoice.notes && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Notes</h3>
                  <p className="text-sm text-gray-600 p-4 bg-gray-50 rounded-lg">
                    {selectedInvoice.notes}
                  </p>
                </div>
              )}

              {/* Payment Instructions */}
              {selectedInvoice.status !== 'PAID' && selectedInvoice.status !== 'CANCELLED' && (
                <div className="p-4 bg-primary/5 rounded-lg">
                  <h3 className="font-medium text-primary mb-2">Payment Instructions</h3>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>Bank Transfer:</strong> 03-0123-0456789-00</p>
                    <p><strong>Reference:</strong> {selectedInvoice.invoiceNumber}</p>
                    <p className="mt-2">
                      Or pay in person at our clinic by EFTPOS, cash, or card.
                    </p>
                    <p className="mt-2 text-gray-500">
                      For ACC or insurance claims, please contact our clinic.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  // Generate a simple printable view
                  const printWindow = window.open('', '_blank');
                  if (printWindow) {
                    printWindow.document.write(`
                      <html>
                        <head>
                          <title>Invoice ${selectedInvoice.invoiceNumber}</title>
                          <style>
                            body { font-family: Arial, sans-serif; padding: 40px; }
                            h1 { color: #333; }
                            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                            th { background: #f5f5f5; }
                            .total { font-weight: bold; font-size: 1.2em; }
                          </style>
                        </head>
                        <body>
                          <h1>Veritas Hearing</h1>
                          <p>42a Hillcrest Road, Hillcrest, Hamilton 3216</p>
                          <p>Phone: 0800 555 051</p>
                          <hr />
                          <h2>Invoice ${selectedInvoice.invoiceNumber}</h2>
                          <p>Issue Date: ${formatDate(selectedInvoice.issueDate)}</p>
                          <p>Due Date: ${formatDate(selectedInvoice.dueDate)}</p>
                          <table>
                            <tr><th>Description</th><th>Qty</th><th>Price</th><th>Total</th></tr>
                            ${selectedInvoice.items.map(item => `
                              <tr>
                                <td>${item.description}</td>
                                <td>${item.quantity}</td>
                                <td>${formatCurrency(item.unitPrice)}</td>
                                <td>${formatCurrency(item.total)}</td>
                              </tr>
                            `).join('')}
                          </table>
                          <p>Subtotal: ${formatCurrency(selectedInvoice.subtotal)}</p>
                          <p>GST (15%): ${formatCurrency(selectedInvoice.tax)}</p>
                          <p class="total">Total: ${formatCurrency(selectedInvoice.total)}</p>
                          <hr />
                          <p><strong>Bank Transfer:</strong> 03-0123-0456789-00</p>
                          <p><strong>Reference:</strong> ${selectedInvoice.invoiceNumber}</p>
                        </body>
                      </html>
                    `);
                    printWindow.document.close();
                    printWindow.print();
                  }
                }}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                Print Invoice
              </button>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
