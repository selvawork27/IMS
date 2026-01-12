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

  if (loading) return <div className="p-10 text-center">Loading License...</div>;
  if (!data) return <div className="p-10 text-center text-red-500">License not found in DB.</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8 border-b pb-4">
        <h1 className="text-2xl font-black uppercase tracking-tight">License Overview</h1>
        <button onClick={() => router.back()} className="text-sm font-bold text-blue-600">Back</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Client Card */}
        <div className="bg-white border rounded-2xl p-6">
          <label className="text-[10px] font-bold text-gray-400 uppercase">Registered Client</label>
          <p className="text-xl font-bold mt-2">{data.client?.name}</p>
          <p className="text-gray-500">{data.client?.email}</p>
        </div>

        {/* License Card */}
        <div className="bg-gray-900 text-white rounded-2xl p-6">
          <label className="text-[10px] font-bold text-gray-500 uppercase">License Plan</label>
          <p className="text-xl font-bold mt-2 text-blue-400">{data.license?.name}</p>
          <p className="text-2xl font-mono mt-2">{data.license?.currency} {data.license?.price}</p>
        </div>

        {/* Notes Section */}
        <div className="md:col-span-2 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-2xl">
          <h3 className="font-bold text-yellow-800 mb-2">Internal Notes</h3>
          <p className="text-yellow-700 italic">{data.notes || "No notes attached to this record."}</p>
        </div>
      </div>
    </div>
  );
}