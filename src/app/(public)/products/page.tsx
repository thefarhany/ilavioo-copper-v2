import type { Metadata } from "next";
import ProductsPageClient from "./ProductsPageClient";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our premium copper and brass products. Export-quality craftsmanship from Indonesia.",
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}
