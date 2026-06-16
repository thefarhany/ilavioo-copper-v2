"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0">
        <Image
          src="https://res.cloudinary.com/dqcdwv7du/image/upload/v1779014825/hero_mrmvib.jpg"
          alt="Copper"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#fafaf9] via-[#fafaf9]/90 to-[#fafaf9]/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-2 mb-6"
            >
              <Leaf className="w-4 h-4 text-[#A0522D]" />
              <span className="text-[#C5A059] text-sm uppercase tracking-[0.25em] font-medium">
                Since 1990
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="text-[#1c1917]">Premium</span>
              <span className="block text-[#C5A059] italic">Copper</span>
              <span className="text-[#1c1917]">Craftsmanship</span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-24 h-0.5 bg-linear-to-r from-[#A0522D] to-[#C5A059] mb-8 origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg text-[#78716c] leading-relaxed mb-10 max-w-lg"
            >
              Exporting handcrafted copper & brass products to discerning
              clients across 50+ countries. Heritage quality meets modern
              precision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                asChild
                className="bg-[#A0522D] hover:bg-[#3E2723] text-white px-8 py-6 text-sm uppercase tracking-wider font-medium rounded-full transition-all duration-300 shadow-lg shadow-[#A0522D]/25 hover:shadow-xl hover:shadow-[#3E2723]/30"
              >
                <Link href="/products">
                  Explore Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-2 border-[#A0522D] text-[#C5A059] hover:bg-[#A0522D] hover:text-white px-8 py-6 text-sm uppercase tracking-wider rounded-full transition-all duration-300"
              >
                <Link href="/contact">Request Quote</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-linear-to-br from-[#A0522D]/20 to-[#C5A059]/20 rounded-3xl transform rotate-6" />
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl shadow-[#A0522D]/10 border border-white/50">
                <div className="aspect-4/3 rounded-2xl overflow-hidden mb-6">
                  <Image
                    src="https://res.cloudinary.com/dqcdwv7du/image/upload/v1779014825/hero-2_jhpkij.jpg"
                    alt="Copper product"
                    width={600}
                    height={450}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#A0522D] uppercase tracking-wider mb-1">
                      Featured
                    </p>
                    <p className="text-lg font-medium text-[#1c1917]">
                      Artisan Collection
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#A0522D]/10 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-[#C5A059]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          className="w-6 h-10 border-2 border-[#A0522D] rounded-full flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div className="w-1.5 h-1.5 bg-[#A0522D] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
