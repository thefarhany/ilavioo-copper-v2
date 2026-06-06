"use client";

import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  viewMode?: "grid" | "masonry";
}

export function ProductGrid({ products, viewMode = "grid" }: ProductGridProps) {
  if (viewMode === "masonry") {
    // Masonry layout with different heights
    return (
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`break-inside-avoid ${
              index % 5 === 0 ? "aspect-[3/4]" : 
              index % 5 === 1 ? "aspect-square" : 
              index % 5 === 2 ? "aspect-[4/5]" : 
              index % 5 === 3 ? "aspect-[3/5]" : 
              "aspect-square"
            }`}
          >
            <ProductCard product={product} index={index} />
          </motion.div>
        ))}
      </div>
    );
  }

  // Standard grid layout
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
