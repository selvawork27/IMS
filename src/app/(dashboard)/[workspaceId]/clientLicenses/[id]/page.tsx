'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function LicenseDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLicense = async () => {
      try {
        const res = await fetch(`/api/clientLicenses/${id}`);
        const result = await res.json();
        console.log("License Data:", result);
        if (result.success) {
          setData(result.data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) getLicense();
  }, [id]);

  // Helper to format dates
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) return <div className="p-10 text-center animate-pulse font-medium text-gray-500">Loading License Details...</div>;
  if (!data) return <div className="p-10 text-center text-red-500 font-bold">License not found in Database.</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between border-b pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-gray-900">License Overview</h1>
          <p className="text-xs text-gray-400 font-mono mt-1">UID: {data.id}</p>
        </div>
        <button 
          onClick={() => router.back()} 
          className="px-5 py-2 border-2 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all active:scale-95"
        >
          ← Back to List
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* --- CLIENT CARD --- */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Registered Client</label>
          <p className="text-xl font-bold mt-2 text-gray-900">{data.client?.name || "Unknown Client"}</p>
          <p className="text-gray-500 text-sm mb-4">{data.client?.email || "No email associated"}</p>
          <div className="pt-4 border-t border-gray-100">
             <label className="text-[10px] font-bold text-gray-400 uppercase">Workspace Reference</label>
             <p className="text-xs font-mono text-gray-500 truncate">{data.workspaceId}</p>
          </div>
        </div>

        {/* --- PLAN & PRICING CARD --- */}
        <div className="bg-gray-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden md:col-span-2">
          <div className="absolute top-4 right-4">
             <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${data.isActive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                {data.isActive ? 'Active' : 'Inactive'}
             </span>
          </div>
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Subscription Plan</label>
          <p className="text-3xl font-black mt-2 text-blue-400 tracking-tight">{data.plan?.name}</p>
          <p className="text-gray-400 text-sm mt-1 max-w-md">{data.plan?.description}</p>
          
          <div className="mt-6 flex items-end gap-4">
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase block">Plan Price</label>
              <p className="text-2xl font-mono font-bold">{data.plan?.currency} {parseFloat(data.plan?.price).toLocaleString('en-IN')}</p>
            </div>
            <div className="pb-1">
              <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-300 uppercase font-bold tracking-tighter">
                Per {data.plan?.billingCycle || 'Year'}
              </span>
            </div>
          </div>
        </div>

        {/* --- DATE TIMELINE --- */}
        <div className="md:col-span-3 bg-white border rounded-2xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="flex flex-col">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Activation Date</label>
              <p className="text-lg font-bold text-gray-800">{formatDate(data.startDate)}</p>
           </div>
           <div className="flex flex-col bg-blue-50 -m-2 p-4 rounded-xl border border-blue-100">
              <label className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">Next Renewal Date</label>
              <p className="text-lg font-bold text-blue-900">{formatDate(data.renewalDate)}</p>
           </div>
           <div className="flex flex-col">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Contract End Date</label>
              <p className="text-lg font-bold text-gray-800">{formatDate(data.endDate)}</p>
           </div>
        </div>

        {/* --- INVOICE TABLE SECTION --- */}
        <div className="md:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black uppercase tracking-tight text-gray-800">Invoice History</h2>
            <span className="text-xs font-bold bg-gray-100 px-3 py-1 rounded-full text-gray-500">
              {data.invoices?.length || 0} Total Invoices
            </span>
          </div>
          
          <div className="overflow-hidden border border-gray-200 rounded-2xl bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Invoice Number</th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Issue Date</th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Payment</th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.invoices && data.invoices.length > 0 ? (
                  data.invoices.map((inv: any) => (
                    <tr key={inv.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-mono font-bold text-blue-600 group-hover:underline cursor-pointer">
                          {inv.invoiceNumber}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formatDate(inv.issueDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-black text-gray-900">
                        {inv.currency} {parseFloat(inv.total).toLocaleString('en-IN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase ${
                          inv.paymentStatus === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {inv.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-500">
                        <span className="capitalize border px-2 py-0.5 rounded-full bg-gray-50">
                          {inv.status.toLowerCase()}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-400 italic">
                      No invoices found for this license record.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- NOTES SECTION --- */}
        <div className="md:col-span-3 bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-2xl">
          <div className="flex items-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <h3 className="font-bold text-amber-800 uppercase text-xs tracking-widest">Notes</h3>
          </div>
          <p className="text-amber-900/80 text-sm leading-relaxed whitespace-pre-wrap font-medium">
            {data.notes || "No additional administrative notes have been added to this license record."}
          </p>
        </div>

        {/* --- METADATA FOOTER --- */}
        <div className="md:col-span-3 text-center pt-8 border-t border-gray-100">
           <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
             Record Created: {new Date(data.assignedAt || data.startDate).toLocaleString()}
           </p> 
        </div>
      </div>
    </div>
  );
}