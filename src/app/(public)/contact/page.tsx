import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Ilavioo Copper for inquiries, quotes, and custom orders. We ship worldwide.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
