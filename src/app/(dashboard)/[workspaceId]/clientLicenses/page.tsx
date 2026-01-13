'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

// --- Loading Component for Table ---
const TableSkeleton = () => (
  <div className="animate-pulse">
    {[...Array(5)].map((_, i) => (
      <tr key={i} className="border-b">
        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-full"></div></td>
        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-full"></div></td>
        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-full"></div></td>
        <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
      </tr>
    ))}
  </div>
);

const ClientLicensesPage = () => {
  const [licensesList, setLicensesList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTableData = async () => {
    setLoading(true); // Start loading
    try {
      const res = await fetch("/api/clientLicenses");
      const data = await res.json();
      console.log(data.Clientlicenses); 
      if (data.success) {
        setLicensesList(data.Clientlicenses);
      }
    } catch (error) {
      console.error("Failed to fetch list", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Client Licenses</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          {showForm ? "View List" : "Register New License"}
        </button>
      </div>

      {showForm ? (
        <RegistrationForm 
          onSuccess={() => {
            setShowForm(false);
            fetchTableData(); 
          }} 
        />
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client License ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <TableSkeleton />
              ) : licensesList.length > 0 ? (
                licensesList.map((item: any) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{<Link href={`clientLicenses/${item.id}`}>{item.id}</Link>}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.clientId} ({item.client.name})</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.planId} ({item.plan.name})</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {item.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500">No licenses found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const RegistrationForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [clients, setClients] = useState([]);
  const [workspaces, setWorkspaces] = useState([]);
  const [plans, setPlans] = useState([]);
  const [formData, setFormData] = useState({ clientId: '', workspaceId: '', planId: '', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [c, w, l] = await Promise.all([
          fetch('/api/clients').then(res => res.json()),
          fetch('/api/workspaces').then(res => res.json()),
          fetch('/api/plans').then(res => res.json())
        ]);
        setClients(c.data?.clients || []); 
        setWorkspaces(w.data || []);
        setPlans(l.plans || []);
      } catch (err) {
        console.error("Dropdown fetch error", err);
      }
    };
    fetchDropdowns();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/clientLicenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        onSuccess();
      } else {
        const err = await res.json();
        alert(err.error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg bg-gray-50 p-6 rounded-lg border space-y-4">
      {/* ... (select inputs remain same) */}
      <div>
        <label className="block text-sm font-medium mb-1">Select Client</label>
        <select className="w-full border p-2 rounded bg-white" required value={formData.clientId} onChange={e => setFormData({...formData, clientId: e.target.value})}>
          <option value="">Select...</option>
          {clients.map((item: any) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Select Workspace</label>
        <select className="w-full border p-2 rounded bg-white" required value={formData.workspaceId} onChange={e => setFormData({...formData, workspaceId: e.target.value})}>
          <option value="">Select...</option>
          {workspaces.map((item: any) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Select Plan</label>
        <select className="w-full border p-2 rounded bg-white" required value={formData.planId} onChange={e => setFormData({...formData, planId: e.target.value})}>
          <option value="">Select...</option>
          {plans.map((item: any) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-green-600 text-white py-2 rounded font-bold uppercase tracking-wider flex justify-center items-center disabled:bg-green-400"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : "Submit"}
      </button>
    </form>
  );
};

export default ClientLicensesPage;