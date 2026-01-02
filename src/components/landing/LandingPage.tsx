"use client";

import Hero from "./Hero";
import Features from "./Features";
import ProductPreview from "./ProductPreview";
import Footer from "./Footer";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import { useEffect } from "react";
import Navbar from "./Navbar";

export default function LandingPage() {
  useEffect(() => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href) {
          document.querySelector(href)?.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col font-sans">
      <Navbar />
      <Hero />
      <ProductPreview />
      <HowItWorks />
      <Features />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
