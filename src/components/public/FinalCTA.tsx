"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageSquare, Sparkles } from "lucide-react";
import { InquiryModal } from "./InquiryModal";

interface FinalCTAProps {
  variant?: "default" | "products";
}

export function FinalCTA({ variant = "default" }: FinalCTAProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const Icon = variant === "products" ? MessageSquare : ArrowUpRight;

  return (
    <section className="py-24 bg-[#F5F0E8] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#A0522D]/10 to-transparent blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <motion.div
            whileHover={{ rotate: 15 }}
            className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#A0522D] to-[#3E2723] flex items-center justify-center shadow-lg shadow-[#A0522D]/25"
          >
            <Sparkles className="h-8 w-8 text-white" />
          </motion.div>

          <p className="text-sm uppercase tracking-[0.2em] text-[#A0522D] font-medium">
            Get Started
          </p>

          <h2 
            className="text-3xl md:text-4xl text-[#1c1917]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready to Import Premium Products?
          </h2>

          <p className="text-[#78716c] leading-relaxed max-w-xl mx-auto"
          >
            Contact us for wholesale pricing and custom manufacturing options. We specialize in B2B export to markets worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#A0522D] text-white text-sm uppercase tracking-wider rounded-full hover:bg-[#3E2723] transition-colors shadow-lg shadow-[#A0522D]/25"
            >
              Request Quote
              <Icon className="h-4 w-4" />
            </motion.button>
            <Link 
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#A0522D] text-[#C5A059] text-sm uppercase tracking-wider rounded-full hover:bg-[#A0522D] hover:text-white transition-colors"
            >
              Browse Catalog
            </Link>
          </div>
        </motion.div>
      </div>

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
