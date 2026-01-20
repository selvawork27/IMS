"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import Scene from "./Scene";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2 }
    )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        buttonsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      );
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20 text-center">
      <Scene />

      <div className="z-10 mx-auto max-w-4xl" ref={containerRef}>
        <div className="mb-6 flex justify-center items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
            <Image src="/linea.svg" alt="Linea Logo" width={24} height={24} className="h-6 w-6" />
          </div>
          <span className="font-outfit text-2xl font-bold tracking-tight text-gray-900">DevEnv Tech</span>
        </div>

        <h1
          ref={titleRef}
          className="font-outfit text-5xl font-bold leading-tight tracking-tight text-gray-900 sm:text-7xl"
        >
          Invoice management <br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            reimagined for scale.
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="mx-auto mt-6 max-w-2xl text-lg text-gray-600"
        >
          Streamline your billing, track payments, and manage clients with an enterprise-grade platform designed for modern businesses.
        </p>

        <div
          ref={buttonsRef}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/login"
            className="rounded-full bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-blue-500/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Get Started
            <span aria-hidden="true" className="ml-2">→</span>
          </Link>
          <Link
            href="#features"
            className="rounded-full bg-gray-100 px-8 py-3.5 text-base font-semibold text-gray-900 ring-1 ring-inset ring-gray-200 transition-all hover:bg-gray-200 hover:ring-gray-300"
          >
            Explore Features
          </Link>
        </div>
      </div>
    </section>
  );
}
