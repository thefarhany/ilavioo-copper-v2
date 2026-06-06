import type { Metadata } from "next";
import GalleryPageClient from "./GalleryPageClient";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore our gallery of copper products, craftsmanship videos, and behind-the-scenes content.",
};

export default function GalleryPage() {
  return <GalleryPageClient />;
}
