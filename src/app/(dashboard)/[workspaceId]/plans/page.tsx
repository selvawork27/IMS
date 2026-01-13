"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Calendar, 
  ChevronRight, 
  CreditCard, 
  Info, 
  Layers, 
  Plus, 
  Search 
} from "lucide-react"

interface License {
  id: string
  name: string
  description: string | null
  price: string
  billingCycle:string
  status: string
  currency: string
  endDate: string
}

const LicensePage = () => {
  const [plans, setPlans] = useState<License[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch("/api/plans")
        if (!res.ok) throw new Error("Failed to fetch licenses")
        const data = await res.json()
      console.log(data);
        if (data.success && Array.isArray(data.plans)) {
          setPlans(data.plans)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchPlans()
  }, [])

  const filteredLicenses = plans.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Plans</h1>
        </div>
      </div>
      {/* License Grid */}
      {filteredLicenses.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-3xl bg-gray-50/50">
          <div className="inline-flex p-4 bg-white rounded-full shadow-sm mb-4">
            <Layers className="text-gray-400" size={32} />
          </div>
          <h3 className="text-lg font-medium">No licenses found</h3>
          <p className="text-gray-500">Try adjusting your search or add a new license.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLicenses.map((license) => (
            <div
              key={license.id}
              className="group relative bg-white border rounded-2xl p-5 hover:shadow-xl hover:border-black/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* <div className="flex justify-between items-start mb-4">
                  <button 
                    onClick={() => router.push(`licenses/${license.id}`)}
                    className="text-gray-400 hover:text-black transition"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div> */}
                <h2 className="text-xl font-bold capitalize mb-1 group-hover:text-blue-600 transition-colors">
                  {license.name}
                </h2>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">
                  {license.description || "No description provided."}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CreditCard size={14} className="text-gray-400" />
                    <span>{license.currency} {Number(license.price).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={14} className="text-gray-400" />
                    <span>Expires: {license.billingCycle}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => router.push(`plans/${license.id}`)}
                className="w-full py-2.5 bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-xl font-medium hover:bg-black hover:text-white hover:border-black transition-all duration-200"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LicensePage