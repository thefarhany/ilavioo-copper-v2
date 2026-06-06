import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Ilavioo Copper's heritage, craftsmanship, and commitment to premium quality copper products.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
