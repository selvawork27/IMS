'use client';

import React from "react";
import { useQuery } from "@tanstack/react-query";
import InvoiceViewer from "@/components/invoices/InvoiceViewer";

interface PageProps {
  params: Promise<{
    id: string;
    workspaceId: string;
  }>;
}

async function fetchInvoice(id: string) {
  const res = await fetch(`/api/invoices/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch invoice");
  }
  const json = await res.json();
  return json.data;
}

export default function Page({ params }: PageProps) {
  const { id, workspaceId } = React.use(params);

  const { 
    data: invoiceData, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ["invoice", id],
    queryFn: () => fetchInvoice(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 animate-pulse">Loading invoice...</p>
      </div>
    );
  }

  if (error || !invoiceData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">
          {error instanceof Error ? error.message : "Unable to load invoice"}
        </p>
      </div>
    );
  }

  return (
    <InvoiceViewer 
      initialData={invoiceData} 
      workspaceId={workspaceId} 
      fetchInvoiceFn={fetchInvoice}
    />
  );
}