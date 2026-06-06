"use client";

import { Toaster } from "sonner";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9]">
      <Navbar />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
