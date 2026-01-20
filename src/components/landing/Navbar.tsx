"use client";

import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Transform width from 100% to roughly 80% (max-w-5xl equivalent)
  // We apply a spring to the width to give it a smooth "ease-out" feel
  // decoupling it from the raw scroll speed
  // Transform width from 100% to roughly 80% (max-w-5xl equivalent)
  // Transform width from 100% to roughly 80% (max-w-5xl equivalent)
  const widthPercent = useTransform(scrollY, [0, 100], [100, 85]);
  const widthSpring = useSpring(widthPercent, { stiffness: 100, damping: 20 });
  const width = useMotionTemplate`${widthSpring}%`;

  const marginTop = useTransform(scrollY, [0, 100], [8, 16]);
  const borderRadius = useTransform(scrollY, [0, 100], [0, 24]);
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]
  );
  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const shadow = useTransform(scrollY, [0, 100], ["0 10px 15px -3px rgba(0, 0, 0, 0.05)", "0 25px 50px -12px rgba(0, 0, 0, 0.1)"]);

  // Update layout state for mobile menu or other conditional logic if needed
  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full pointer-events-none">
      <motion.nav
        style={{
          width,
          marginTop,
          borderRadius,
          backgroundColor,
          backdropFilter: backdropBlur,
          boxShadow: shadow,
          borderColor: `rgba(229, 231, 235, ${borderOpacity})` // gray-200 equivalent
        }}
        className="pointer-events-auto border border-gray-200/50 flex items-center justify-between px-6 py-2 transition-all duration-300 mx-auto"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600">
            <Image src="/devenv.jpg" alt="Linea" width={20} height={20} className="w-5 h-5" />
          </div>
          <span className="font-outfit font-bold text-xl text-gray-900">DevEnv Tech</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            Features
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            Testimonials
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            Pricing
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            Blog
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors hidden sm:block"
          >
            Sign in
          </Link>
          <Link
            href="/login"
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Get Started
          </Link>
        </div>
      </motion.nav>
    </div>
  );
}
