"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const imageUrl = (product as any).thumbnail || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group"
    >
      <Link href={`/products/${product.slug}`} className="block">
        {/* Card Container dengan border dan shadow */}
        <div className="bg-white rounded-2xl border border-[#e7e5e4] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#A0522D]/10 hover:border-[#A0522D]/30 transition-all duration-500">
          {/* Image Container */}
          <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f5f4]">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/80 via-[#1c1917]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Arrow Icon - Muncul di tengah */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-500">
                <ArrowUpRight className="h-6 w-6 text-[#C5A059]" />
              </div>
            </div>

            {/* Customizable Badge */}
            {product.isCustomizable && (
              <div className="absolute bottom-4 left-4">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#C5A059] text-xs uppercase tracking-wider rounded-full shadow-md">
                  <Sparkles className="h-3 w-3" />
                  Custom
                </span>
              </div>
            )}

            {/* Featured Badge */}
            {product.isFeatured && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 bg-gradient-to-r from-[#A0522D] to-[#3E2723] text-white text-xs uppercase tracking-wider rounded-full shadow-md">
                  Featured
                </span>
              </div>
            )}
          </div>

          {/* Info - dengan padding */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-wider text-[#A0522D] font-medium">
                {product.category?.name}
              </span>
            </div>
            
            <h3 
              className="text-lg text-[#1c1917] group-hover:text-[#C5A059] transition-colors font-medium mb-2 line-clamp-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {product.name}
            </h3>
            
            <p className="text-sm text-[#78716c] line-clamp-1 mb-3">
              {product.material}
            </p>
            
            <div className="flex items-center justify-between pt-3 border-t border-[#e7e5e4]">
              <div className="flex items-baseline gap-1">
                <span className="text-lg text-[#C5A059] font-semibold">
                  {product.minPrice ? `$${(product.minPrice / 100).toFixed(2)}` : "Contact"}
                </span>
                <span className="text-xs text-[#a8a29e]">
                  /pc
                </span>
              </div>
              
              <div className="flex items-center gap-1.5 text-xs text-[#78716c]">
                <ShoppingBag className="h-3 w-3" />
                <span>MOQ: {product.moq || 50}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
