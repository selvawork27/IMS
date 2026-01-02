"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function ProductPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={containerRef} className="py-20 bg-white perspective-1000">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-outfit">
            Designed for clarity.
          </h2>
        </div>

        <motion.div
          style={{
            rotateX: rotateX,
            scale: scale,
            opacity: opacity,
            transformPerspective: 1000,
          }}
          className="rounded-xl border border-gray-200 bg-gray-50/50 py-2 px-6 shadow-2xl backdrop-blur-sm"
        >
          {/* Placeholder for actual dashboard screenshot */}
          <div className="aspect-[16/9] w-full rounded-lg bg-gradient-to-tr from-gray-100 to-gray-200 flex items-center justify-center border border-dashed border-gray-300">
            <p className="text-gray-400 font-medium">Dashboard Preview</p>
            <Image src="/product.png" alt="Product Preview" className="w-full h-full object-contain" fill />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
