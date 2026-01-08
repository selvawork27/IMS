'use client';

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { ClientForm } from "./ClientForm";

interface Invoice {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  status: string;
  total: number;
  currency: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  website?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  companyName?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
  _count: {
    invoices: number;
  };
  invoices: Invoice[];
}

export default function ClientViewer({
  client,
  workspaceId,
}: {
  client: Client;
  workspaceId: string;
}) {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);


  const updateClientMutation = useMutation({
    mutationFn: async (clientData: any) => {
      const response = await fetch(`/api/clients/${client.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update client');
      }
      return response.json();
    },
    onSuccess: (updatedResponse) => {
      toast.success('Client updated successfully');
      setShowForm(false);

      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['client', client.id] });

      queryClient.setQueryData(['client', client.id], updatedResponse.data);
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to update client');
    },
  });

  const handleEditClient = async (values: any) => {
    updateClientMutation.mutate(values);
  };

  if (showForm) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mt-2">Edit Client Profile</h2>
        </div>

        <ClientForm
          initialData={client}
          onCancel={() => setShowForm(false)}
          onSave={handleEditClient}
        />
      </div>
    );
  }


  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href={`/${workspaceId}/clients`}
            className="inline-flex items-center text-sm text-gray-500 hover:text-black transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Clients
          </Link>

          <h1 className="text-3xl font-bold mt-2">{client.name}</h1>
          <p className="text-gray-500">{client.email}</p>
        </div>

        <div className="flex items-center gap-4">
          <StatusBadge status={client.status} />
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            Edit Client
          </button>
        </div>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <InfoCard label="Company" value={client.companyName || "Personal"} />
        <InfoCard label="Phone" value={client.phone || "Not provided"} />
        <InfoCard label="Country" value={client.country || "Not set"} />
        <InfoCard label="Total Invoices" value={client._count?.invoices ?? 0} />
      </div>

      {/* Address Section */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-3">Billing Address</h3>
        <p className="text-gray-600 leading-relaxed">
          {client.address ? (
            <>
              {client.address}<br />
              {client.city}, {client.state} {client.zipCode}
            </>
          ) : (
            <span className="italic text-gray-400">No address recorded</span>
          )}
        </p>
      </div>

      <div className="rounded-2xl border bg-white overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50/50">
          <h3 className="font-semibold text-lg text-gray-900">Invoices</h3>
          <span className="px-3 py-1 bg-white border rounded-full text-xs font-medium text-gray-500">
            {client._count?.invoices} Total
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <Th>Invoice Number</Th>
                <Th>Issue Date</Th>
                <Th>Status</Th>
                <Th className="text-right">Total Amount</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {client.invoices?.length > 0 ? (
                client.invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                    <Td className="font-medium">
                      <Link
                        href={`/${workspaceId}/invoices/${inv.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {inv.invoiceNumber}
                      </Link>
                    </Td>
                    <Td>{new Date(inv.issueDate).toLocaleDateString()}</Td>
                    <Td>
                      <StatusBadge status={inv.status} />
                    </Td>
                    <Td className="text-right font-semibold">
                      {inv.currency} {inv.total.toLocaleString()}
                    </Td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-400">
                    No invoices found for this client.
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

function InfoCard({ label, value }: { label: string; value: any }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{label}</p>
      <p className="text-lg font-bold text-gray-900">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-100",
    INACTIVE: "bg-rose-50 text-rose-700 border-rose-100",
    PAID: "bg-green-50 text-green-700 border-green-100",
    DRAFT: "bg-amber-50 text-amber-700 border-amber-100",
    SENT: "bg-blue-50 text-blue-700 border-blue-100",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${colors[status] || "bg-gray-50 text-gray-600 border-gray-100"}`}>
      {status}
    </span>
  );
}

function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={`px-6 py-4 text-left font-semibold text-gray-600 uppercase tracking-tighter text-[11px] ${className}`}>
      {children}
    </th>
  );
}

function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-6 py-4 text-gray-700 ${className}`}>{children}</td>;
}