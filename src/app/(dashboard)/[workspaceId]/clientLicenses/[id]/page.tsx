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

  if (loading) return <div className="p-10 text-center animate-pulse">Loading License Details...</div>;
  if (!data) return <div className="p-10 text-center text-red-500 font-bold">License not found in Database.</div>;

  // Helper to format dates
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b pb-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight">License Overview</h1>
          <p className="text-xs text-gray-400 font-mono mt-1">ID: {data.id}</p>
        </div>
        <button 
          onClick={() => router.back()} 
          className="px-4 py-2 border rounded-lg text-sm font-bold hover:bg-gray-50 transition"
        >
          ← Back
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Client Card */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Registered Client</label>
          <p className="text-xl font-bold mt-2 text-gray-900">{data.client?.name || "Unknown Client"}</p>
          <p className="text-gray-500 text-sm">{data.client?.email || "No email associated"}</p>
          <div className="mt-4 pt-4 border-t border-gray-50">
             <label className="text-[10px] font-bold text-gray-400 uppercase">Workspace ID</label>
             <p className="text-sm font-mono text-gray-600">{data.workspaceId}</p>
          </div>
        </div>

        {/* Plan & Pricing Card */}
        <div className="bg-gray-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-4 right-4">
             <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${data.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {data.isActive ? 'Active' : 'Inactive'}
             </span>
          </div>
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Current Plan</label>
          <p className="text-2xl font-bold mt-2 text-blue-400">{data.plan?.name}</p>
          <div className="mt-4">
            {/* <p className="text-3xl font-mono font-bold">
              {data.plan?.currency} {data.plan?.price}
            </p> */}
            <p className="text-gray-400 text-xs mt-1">Billing Cycle: <span className="text-white uppercase">{data.plan?.billingCycle}</span></p>
          </div>
        </div>

        {/* Date Roadmap - Important Details */}
        <div className="md:col-span-2 bg-white border rounded-2xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
           <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Start Date</label>
              <p className="font-bold text-gray-800">{formatDate(data.startDate)}</p>
           </div>
           <div className="bg-blue-50 -m-2 p-2 rounded-xl border border-blue-100">
              <label className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block mb-1">Next Renewal</label>
              <p className="font-bold text-blue-900">{formatDate(data.renewalDate)}</p>
           </div>
           <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">LICENSE End</label>
              <p className="font-bold text-gray-800">{formatDate(data.endDate)}</p>
           </div>
        </div>

        {/* Notes Section */}
        <div className="md:col-span-2 bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-2xl">
          <div className="flex items-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <h3 className="font-bold text-amber-800 uppercase text-xs tracking-widest">Internal Administration Notes</h3>
          </div>
          <p className="text-amber-900 leading-relaxed whitespace-pre-wrap">
            {data.notes || "No additional administrative notes have been added to this license record."}
          </p>
        </div>

        {/* Metadata Footer */}
        <div className="md:col-span-2 text-center pt-4">
           <p className="text-[10px] text-gray-400 uppercase tracking-widest">Record Created: {new Date(data.assignedAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}