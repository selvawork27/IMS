'use client';

import React from "react";
import { useQuery } from "@tanstack/react-query";
import ClientViewer from "@/components/clients/ClientViewer";

interface PageProps {
  params: Promise<{
    id: string;
    workspaceId: string;
  }>;
}

async function fetchClient(id: string) {
  const res = await fetch(`/api/clients/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch client data");
  }
  const json = await res.json();
  return json.data;
}

export default function Page({ params }: PageProps) {
  const { id, workspaceId } = React.use(params);
  const { 
    data: client, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ["client", id],
    queryFn: () => fetchClient(id),
    enabled: !!id,
  });
  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-gray-400">Loading client profile...</div>
      </div>
    );
  }
  if (error || !client) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 font-medium">
          {error instanceof Error ? error.message : "Client not found"}
        </p>
      </div>
    );
  }
  return <ClientViewer client={client} workspaceId={workspaceId} />;
}