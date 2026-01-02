"use client";

import { motion } from "framer-motion";
import { UserPlus, Settings, Wallet } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Connect",
    description: "Sign up and configure your workspace settings in minutes.",
    icon: UserPlus,
  },
  {
    id: 2,
    title: "Customize",
    description: "Create professional invoice templates that match your brand.",
    icon: Settings,
  },
  {
    id: 3,
    title: "Get Paid",
    description: "Send invoices and track payments in real-time.",
    icon: Wallet,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Process</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-outfit">
            How Linea works
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative bg-white md:bg-transparent p-6 rounded-2xl md:p-0 flex flex-col items-center text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white border border-gray-100 shadow-xl mb-6 relative z-10">
                  <step.icon className="h-8 w-8 text-blue-600" />
                  <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold ring-4 ring-white md:ring-gray-50">
                    {step.id}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-outfit mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
