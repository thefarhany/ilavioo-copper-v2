"use client";

import { motion } from "framer-motion";
import { Package, Search, ArrowRight } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  searchQuery?: string;
}

export function EmptyState({ searchQuery }: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-24 text-center"
    >
      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#f5f5f4] border border-[#e7e5e4] flex items-center justify-center">
        <Search className="h-8 w-8 text-[#A0522D]" />
      </div>
      
      <h3 
        className="text-2xl text-[#1c1917] mb-3"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        No products found
      </h3>
      
      <p className="text-[#78716c] max-w-md mx-auto mb-8"
      >
        {searchQuery
          ? `We couldn't find any products matching "${searchQuery}". Try a different search term or browse our categories.`
          : "Try adjusting your filters or browse all categories to find what you're looking for."}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#A0522D] hover:bg-[#3E2723] text-white rounded-full font-medium transition-colors"
        >
          Browse All Products
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 border border-[#A0522D] text-[#C5A059] hover:bg-[#A0522D] hover:text-white rounded-full font-medium transition-colors"
        >
          Request Custom Item
        </Link>
      </div>
    </motion.div>
  );
}
