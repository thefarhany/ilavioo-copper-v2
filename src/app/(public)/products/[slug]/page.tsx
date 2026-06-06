import type { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

async function fetchProductBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (product) {
    return {
      title: product.name,
      description: product.description?.slice(0, 160) || "Premium copper product from Ilavioo Copper.",
    };
  }

  return {
    title: "Product Not Found",
    description: "The requested product could not be found.",
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  await params; // consume the promise
  return <ProductDetailClient />;
}
