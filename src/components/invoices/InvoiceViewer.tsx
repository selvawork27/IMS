'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EditInvoiceModal } from "../modals/EditInvoiceModal";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// --- Types ---
interface Invoice {
  id: string;
  invoiceNumber: string;
  title?: string;
  total: number;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  currency: string;
  currencyId: string;
  status: 'DRAFT' | 'SENT' | 'VIEWED' | 'PAID' | 'OVERDUE' | 'CANCELLED' | 'REFUNDED';
  paymentStatus: string;
  issueDate: string;
  dueDate: string;
  notes?: string;
  client: {
    name: string;
    email: string;
    address?: string;
  };
  lineItems: Array<{
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
  }>;
}

interface InvoiceViewerProps {
  initialData: Invoice;
  workspaceId: string;
  fetchInvoiceFn: (id: string) => Promise<Invoice>;
}

export default function InvoiceViewer({ initialData, workspaceId, fetchInvoiceFn }: InvoiceViewerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();



  const { data: invoice, isLoading } = useQuery({
    queryKey: ['invoice', initialData.id],
    queryFn: () => fetchInvoiceFn(initialData.id),
    initialData: initialData, 
  });

  const handleSaved = () => {
    queryClient.invalidateQueries({ queryKey: ['invoice', initialData.id] });
    setIsEditing(false);
  };

  if (!invoice) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Link
            href={`/${workspaceId}/invoices`}
            className="inline-flex items-center text-sm text-gray-500 hover:text-black transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Invoices
          </Link>

          <h1 className="text-2xl font-bold mt-2">{invoice.invoiceNumber}</h1>
          <div className="mt-1">
            <StatusBadge status={invoice.status} />
          </div>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Edit Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard title="Billed To">
          <p className="font-medium text-gray-900">{invoice.client.name}</p>
          <p className="text-gray-600">{invoice.client.email}</p>
          <p className="text-gray-600 whitespace-pre-line">{invoice.client.address}</p>
        </InfoCard>

        <InfoCard title="Invoice Info">
          <Meta label="Issue Date" value={formatDate(invoice.issueDate)} />
          <Meta label="Due Date" value={formatDate(invoice.dueDate)} />
          <Meta label="Currency" value={invoice.currency} />
        </InfoCard>

        <InfoCard title="Payment Summary">
          <Meta label="Status" value={invoice.paymentStatus} />
          <Meta label="Total Amount" value={`${invoice.currency} ${invoice.total.toLocaleString()}`} bold />
        </InfoCard>
      </div>

      {/* Line Items Table */}
      <div className="border rounded-lg overflow-hidden bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left font-semibold text-gray-600">Description</th>
              <th className="p-4 text-right font-semibold text-gray-600">Qty</th>
              <th className="p-4 text-right font-semibold text-gray-600">Unit Price</th>
              <th className="p-4 text-right font-semibold text-gray-600">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {invoice.lineItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">{item.description}</td>
                <td className="p-4 text-right">{item.quantity}</td>
                <td className="p-4 text-right">{item.unitPrice.toLocaleString()}</td>
                <td className="p-4 text-right font-medium">
                   {item.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals Section */}
      <div className="flex justify-end">
        <div className="w-full max-w-sm space-y-3 bg-gray-50 p-4 rounded-lg">
          <TotalRow label="Subtotal" value={invoice.subtotal} currency={invoice.currency} />
          <TotalRow label="Tax" value={invoice.taxAmount} currency={invoice.currency} />
          <TotalRow label="Discount" value={invoice.discountAmount} currency={invoice.currency} isDiscount />
          <div className="border-t pt-3">
            <TotalRow label="Total" value={invoice.total} currency={invoice.currency} bold />
          </div>
        </div>
      </div>

      {/* Notes */}
      {invoice.notes && (
        <div className="border rounded-lg p-4 bg-white">
          <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Notes</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{invoice.notes}</p>
        </div>
      )}

      {/* Modal */}
      {isEditing && (
        <EditInvoiceModal
          open={isEditing}
          onOpenChange={setIsEditing}
          invoice={invoice}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}


function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PAID: "bg-green-100 text-green-700",
    DRAFT: "bg-gray-100 text-gray-700",
    OVERDUE: "bg-red-100 text-red-700",
    SENT: "bg-blue-100 text-blue-700",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || styles.DRAFT}`}>
      {status}
    </span>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border rounded-lg p-5 shadow-sm">
      <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">
        {title}
      </h3>
      <div className="space-y-1 text-sm">{children}</div>
    </div>
  );
}

function Meta({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between py-1">
      <span className="text-gray-500">{label}</span>
      <span className={bold ? "font-bold text-gray-900" : "text-gray-700"}>{value}</span>
    </div>
  );
}

function TotalRow({ label, value, currency, bold, isDiscount }: any) {
  return (
    <div className="flex justify-between text-sm">
      <span className={bold ? "font-bold text-gray-900" : "text-gray-600"}>{label}</span>
      <span className={bold ? "font-bold text-gray-900 text-lg" : "text-gray-900"}>
        {isDiscount ? '-' : ''}{currency} {value.toLocaleString()}
      </span>
    </div>
  );
}

function formatDate(date: string) {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}