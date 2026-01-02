import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export function useCompanyProfile() {
  const { data: session } = useSession();
  return useQuery({
    queryKey: ["company-profile", session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      const res = await fetch(`/api/user/settings`);
      if (!res.ok) throw new Error("Failed to fetch company profile");
      const data = await res.json();
      return data?.data?.company || null;
    },
    enabled: !!session?.user?.id,
  });
}
