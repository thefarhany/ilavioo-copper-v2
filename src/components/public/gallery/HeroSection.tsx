"use client";

import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import Link from "next/link";

interface GalleryHeroProps {
  imageCount: number;
  videoCount: number;
}

export function HeroSection({ imageCount, videoCount }: GalleryHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#3E2723]">
      {/* Subtle warm gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3E2723] via-[#5f8579] to-[#A0522D]" />

      {/* Soft radial glow accents */}
      <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-[#A0522D]/20 blur-[120px]" />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-[#3E2723]/30 blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#A0522D]/10 blur-[150px]" />

      {/* Floating soft orbs - very subtle */}
      <motion.div
        className="absolute top-20 right-[12%] w-3 h-3 rounded-full bg-white/30"
        animate={{ y: [0, -12, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-24 left-[8%] w-2 h-2 rounded-full bg-white/20"
        animate={{ y: [0, -8, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-1/3 right-[6%] w-2 h-2 rounded-full bg-white/25"
        animate={{ y: [0, -10, 0], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center max-w-3xl mx-auto">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/10 flex items-center justify-center"
          >
            <Camera className="w-8 h-8 text-white" />
          </motion.div>

          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-sm text-white/60 mb-4"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/40">/</span>
            <span className="text-white">Gallery</span>
          </motion.nav>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xs uppercase tracking-[0.25em] text-white/70 mb-3 font-medium"
          >
            Our Portfolio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl text-white leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Craftsmanship in
            <span className="block italic mt-1">Every Detail</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-5 text-base md:text-lg text-white/75 leading-relaxed max-w-2xl mx-auto"
          >
            Explore our collection of handcrafted copper and brass creations,
            showcasing decades of artisanal excellence and timeless design.
          </motion.p>
        </div>
      </div>

      {/* Soft bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#fafaf9]" />
    </section>
  );
}

