"use client";

import React, { useEffect, useState } from 'react';
import { Database, Share2, GraduationCap, ChevronRight, Activity, AlertCircle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  icon_type: string;
  tag: string;
  color: string;
}

const ICON_MAP = {
  database: Database,
  share: Share2,
  education: GraduationCap,
  activity: Activity,
} as const;

const IconRenderer = ({ type, className }: { type: string; className: string }) => {
  const Icon = ICON_MAP[type as keyof typeof ICON_MAP] || Activity;
  return <Icon className={className} />;
};

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/product');
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const data = await response.json();
        if (data.success && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (!mounted) return null;
  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-tighter">
          <Activity size={14} />
          Ecosystem
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Products
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div 
              key={product.id} 
              className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 relative overflow-hidden flex flex-col"
            >
            
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {product.name}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                {product.description}
              </p>

              <button className="flex items-center justify-between w-full px-4 py-3 bg-slate-50 text-slate-700 rounded-xl text-sm font-bold group-hover:bg-blue-600 group-hover:text-white transition-all">
                View
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <Database className="w-12 h-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-900">No products available</h3>
            <p className="text-slate-500">Contact your administrator to add imaging solutions.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[1, 2, 3].map((i) => (
      <div key={i} className="h-64 bg-slate-100 rounded-2xl animate-pulse border border-slate-200" />
    ))}
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[300px] bg-red-50 rounded-3xl border border-red-100 text-red-600 p-8 text-center">
    <AlertCircle size={40} className="mb-4 opacity-50" />
    <h3 className="font-bold text-lg">Unable to load products</h3>
    <p className="text-sm opacity-80 max-w-xs">{message}</p>
    <button 
      onClick={() => window.location.reload()}
      className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-colors"
    >
      Try Again
    </button>
  </div>
);