"use client";

import React, { useEffect, useState } from 'react';
import { Database, Share2, GraduationCap, ChevronRight, Activity, AlertCircle } from 'lucide-react';

// 1. Keep interfaces in a separate types file if they grow
interface Product {
  id: string;
  name: string;
  description: string;
  icon_type: string; // Changed to string to handle DB mapping
  tag: string;
  color: string;
}

// Helper to map DB strings to Lucide Icons
const IconRenderer = ({ type, className }: { type: string, className: string }) => {
  switch (type) {
    case 'database': return <Database className={className} />;
    case 'share': return <Share2 className={className} />;
    case 'education': return <GraduationCap className={className} />;
    default: return <Activity className={className} />;
  }
};

const ProductS = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/product'); 
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-[#f8fafc] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-4 border border-blue-100 uppercase tracking-widest">
            <Activity size={14} />
            SimpliRad Ecosystem
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Diverse Medical Imaging Solutions
          </h1>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:border-blue-200 transition-all duration-500 relative overflow-hidden">
              <div className="flex flex-col h-full">
                <div className={`w-14 h-14 rounded-2xl ${product.color} text-white flex items-center justify-center shadow-lg mb-6 group-hover:rotate-6 transition-transform`}>
                  <IconRenderer type={product.icon_type} className="w-6 h-6" />
                </div>
                
                <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2">{product.tag}</span>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition-colors">{product.name}</h3>
                <p className="text-slate-600 leading-relaxed mb-8 flex-grow">{product.description}</p>

                <button className="flex items-center justify-between w-full px-6 py-4 bg-slate-50 text-slate-900 rounded-2xl font-bold group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  Explore Solution
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Sub-components for cleaner code
const LoadingSkeleton = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
    <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
    <p className="text-gray-500 font-medium">Loading Solutions...</p>
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] text-red-500">
    <AlertCircle size={48} className="mb-4" />
    <p className="font-bold">Error loading products</p>
    <p className="text-sm">{message}</p>
  </div>
);

export default ProductS;