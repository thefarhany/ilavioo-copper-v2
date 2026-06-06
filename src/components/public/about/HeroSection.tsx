"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Target, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://res.cloudinary.com/dqcdwv7du/image/upload/v1779014825/hero_mrmvib.jpg"
          alt="Copper craftsmanship"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#1c1917]/90 via-[#1c1917]/70 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-28 flex items-center min-h-[70vh]">
        <div className="max-w-2xl">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-white/70 mb-6"
          >
            <span>Home</span>
            <span>/</span>
            <span className="text-white">About</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 mb-6 rounded-2xl bg-linear-to-br from-[#84a98c] to-[#52796f] flex items-center justify-center"
          >
            <Target className="w-8 h-8 text-white" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm uppercase tracking-[0.3em] text-[#84a98c] mb-4 font-medium"
          >
            About Us
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl leading-tight text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Crafting Excellence
            <span className="block text-[#84a98c] italic">Since 1990</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-lg text-white/80 leading-relaxed max-w-xl"
          >
            From a small family workshop to an international exporter, our
            journey spans three decades of dedication to quality craftsmanship.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#84a98c] hover:bg-[#52796f] text-white rounded-full font-medium transition-colors"
            >
              View Our Products
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 hover:border-white text-white rounded-full font-medium transition-colors"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
