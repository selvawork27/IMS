"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    content: "Linea has completely transformed how I handle my freelancing finances. It's simple, beautiful, and just works.",
    author: "Sarah Jenning",
    role: "Freelance Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    content: "The automated reminders feature alone has saved me hours of follow-up emails every week. Highly recommended.",
    author: "Tom Cook",
    role: "Director of Product",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    content: "Finally, an invoicing tool that feels modern and prioritizes design without sacrificing functionality.",
    author: "Emily Selman",
    role: "VP, User Experience",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-outfit">
            Trusted by creators worldwide
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col justify-between bg-gray-50 p-8 rounded-3xl"
            >
              <blockquote className="text-gray-900 leading-relaxed mb-6">
                "{testimonial.content}"
              </blockquote>
              <div className="flex items-center gap-x-4">
                <img
                  className="h-12 w-12 rounded-full bg-gray-50"
                  src={testimonial.avatar}
                  alt={testimonial.author}
                />
                <div>
                  <div className="font-semibold text-gray-900 font-outfit">{testimonial.author}</div>
                  <div className="text-sm leading-6 text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
