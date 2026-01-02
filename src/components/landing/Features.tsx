"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Users,
  CreditCard,
  Zap,
  Globe,
  Download
} from "lucide-react";

const features = [
  {
    title: "Analytics Dashboard",
    description: "Real-time insights into your revenue, outstanding invoices, and client growth.",
    icon: LayoutDashboard,
    className: "col-span-1 md:col-span-2 lg:col-span-2 bg-blue-50",
    delay: 0.1,
  },
  {
    title: "Smart Invoicing",
    description: "Create beautiful, professional invoices in seconds with automated tax calculations.",
    icon: FileText,
    className: "col-span-1 bg-white border border-gray-100",
    delay: 0.2,
  },
  {
    title: "Client Management",
    description: "Keep track of all your client details, history, and payment preferences in one place.",
    icon: Users,
    className: "col-span-1 bg-white border border-gray-100",
    delay: 0.3,
  },
  {
    title: "Multi-Currency",
    description: "Bill clients in their local currency with automated exchange rate updates.",
    icon: Globe,
    className: "col-span-1 bg-white border border-gray-100",
    delay: 0.4,
  },
  {
    title: "Data Export",
    description: "Export your financial data to CSV, PDF, or directly to your accounting software.",
    icon: Download,
    className: "col-span-1 bg-white border border-gray-100",
    delay: 0.5,
  },
  {
    title: "Secure Payments",
    description: "Accept credit cards, bank transfers, and more with integrated payment gateways.",
    icon: CreditCard,
    className: "col-span-1 md:col-span-2 lg:col-span-2 bg-indigo-50",
    delay: 0.6,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Powerful Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-outfit">
            Everything you need to run your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(250px,auto)]">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.delay }}
              className={`relative overflow-hidden rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 ${feature.className}`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 mb-4">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 font-outfit mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="col-span-1 lg:col-span-4 rounded-3xl bg-gray-900 p-8 text-white relative overflow-hidden flex items-center justify-between"
          >
            <div className="z-10">
              <h3 className="text-2xl font-bold font-outfit mb-2">Ready to automate?</h3>
              <p className="text-gray-400">Set up recurring invoices and never chase payments again.</p>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-600/20 to-transparent"></div>
            <Zap className="h-12 w-12 text-blue-400 z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
