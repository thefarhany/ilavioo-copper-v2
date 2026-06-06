import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  title: "Ilavioo Copper | Premium Copper Craftsmanship",
  description: "Discover exquisite handcrafted copper products. From traditional cookware to modern decorative pieces.",
};

export default function HomePage() {
  return <HomePageClient />;
}
