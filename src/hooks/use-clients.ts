import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export function useClients(workspaceId?: string) {
  const { data: session } = useSession();
  return useQuery({
    queryKey: ["clients", session?.user?.id, workspaceId],
    queryFn: async () => {
      if (!session?.user?.id || !workspaceId) return [];
      const res = await fetch(`/api/clients?workspaceId=${workspaceId}`);
      if (!res.ok) throw new Error("Failed to fetch clients");
      const data = await res.json();
      // Support both { clients: [...] } and { data: { clients: [...] } }
      if (Array.isArray(data.clients)) return data.clients;
      if (data.data && Array.isArray(data.data.clients)) return data.data.clients;
      return [];
    },
    enabled: !!session?.user?.id && !!workspaceId,
  });
}
