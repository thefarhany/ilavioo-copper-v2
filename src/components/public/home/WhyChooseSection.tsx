"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";

const features = [
  "Handcrafted by master artisans with 30+ years experience",
  "Premium quality copper and brass materials",
  "Export-ready packaging and documentation",
  "Custom design and OEM services available",
  "Competitive wholesale pricing for bulk orders",
];

export function WhyChooseSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-linear-to-br from-[#A0522D]/20 to-[#C5A059]/20 rounded-3xl transform -rotate-3" />
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-[#A0522D]/10">
              <Image
                src="https://res.cloudinary.com/dqcdwv7du/image/upload/v1779014827/about_er8yi0.jpg"
                alt="Craftsman at work"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-6 shadow-xl shadow-[#A0522D]/10 border border-[#e7e5e4]"
            >
              <div className="text-center">
                <p
                  className="text-4xl text-[#C5A059] mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  30+
                </p>
                <p className="text-sm text-[#78716c]">Years of Excellence</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-sm uppercase tracking-[0.2em] text-[#A0522D] mb-3 font-medium">
              Why Ilavio
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#1c1917] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Crafted with{" "}
              <span className="text-[#C5A059] italic">Passion</span>
            </h2>
            <p className="text-[#78716c] leading-relaxed mb-8">
              Every piece we create carries the legacy of traditional
              craftsmanship combined with modern precision. Our commitment to
              quality has made us a trusted partner for businesses worldwide.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-[#A0522D]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 text-[#A0522D]" />
                  </div>
                  <span className="text-[#1c1917]">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
