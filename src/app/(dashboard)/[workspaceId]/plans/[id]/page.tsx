import { getPlanById } from "@/lib/db";
import { notFound} from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Calendar, CreditCard, Users, Box, RefreshCcw } from "lucide-react";
import Link from 'next/link';
export default async function LicenseDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string,workspaceId:string }> 
}) {
  const { id,workspaceId } = await params;
  const license = await getPlanById(id);

  if (!license) {
    notFound();
  }

  const daysRemaining = Math.ceil(
    (new Date(license.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{license.name}</h1>
          </div>
          <p className="text-muted-foreground mt-2">Code: <code className="bg-slate-100 px-1 rounded">{license.code}</code></p>
          <p className="mt-1">{license.description}</p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold">
            {license.currency} {Number(license.price).toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground capitalize">{license.billingCycle.toLowerCase()} Billing</p>
        </div>
      </div>

      {/* 2. Key Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4 flex items-center gap-4 bg-slate-50">
          <Calendar className="text-blue-500" />
          <div>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Valid Until</p>
            <p className="font-medium">{new Date(license.endDate).toLocaleDateString()}</p>
            <p className="text-xs text-orange-600">{daysRemaining} days left</p>
          </div>
        </div>
        <div className="border rounded-lg p-4 flex items-center gap-4 bg-slate-50">
          <RefreshCcw className="text-purple-500" />
          <div>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Renewal</p>
            <p className="font-medium">{license.autoRenew ? "Automatic" : "Manual"}</p>
            {license.renewalPrice && (
              <p className="text-xs text-muted-foreground">Price: {license.currency} {Number(license.renewalPrice)}</p>
            )}
          </div>
        </div>
        <div className="border rounded-lg p-4 flex items-center gap-4 bg-slate-50">
          <CreditCard className="text-green-500" />
          <div>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Start Date</p>
            <p className="font-medium">{new Date(license.startDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {/* 3. Clients Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Users size={20} />
            <h2 className="text-xl font-semibold">Assigned Clients ({license.clients.length})</h2>
          </div>
          <div className="space-y-3">
            {license.clients.length === 0 ? (
              <p className="text-sm text-muted-foreground italic border rounded-lg p-4">No clients assigned.</p>
            ) : (
              license.clients.map((client: any) => (
                <Link 
                  key={client.id} 
                  href={`/${workspaceId}/clients/${client.id}`}
                  className="block border rounded-lg p-4 hover:shadow-sm transition hover:border-blue-500"
                >
                  <p className="font-medium">{client.name}</p>
                  <p className="text-sm text-muted-foreground">{client.email}</p>
                </Link>
              ))
            )}
          </div>
        </section>

        {/* 4. Products Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Box size={20} />
            <h2 className="text-xl font-semibold">Linked Products ({license.products.length})</h2>
          </div>
          <div className="space-y-3">
            {license.products.length === 0 ? (
              <p className="text-sm text-muted-foreground italic border rounded-lg p-4">No products linked.</p>
            ) : (
              license.products.map((product: any) => (
                <div key={product.id} className="border rounded-lg p-4 hover:shadow-sm transition">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}