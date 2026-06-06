"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/products": "Products",
  "/admin/products/new": "New Product",
  "/admin/categories": "Categories",
  "/admin/inquiries": "Inquiries",
  "/admin/testimonials": "Testimonials",
  "/admin/testimonials/new": "New Testimonial",
  "/admin/gallery": "Gallery",
};

export function AdminTopbar() {
  const pathname = usePathname();

  const title = Object.entries(pageTitles).find(([path]) => pathname === path || pathname.startsWith(path + "/"))?.[1] ?? "Admin";

  return (
    <header className="bg-white border-b border-[#e9ecef] px-6 py-3 flex items-center justify-between">
      <h1 className="text-base font-semibold text-[#212529]">
        {title}
      </h1>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="h-8 text-xs text-[#6c757d] hover:text-[#52796f]" asChild>
          <Link href="/" target="_blank" className="flex items-center gap-1.5">
            <ExternalLink className="h-3.5 w-3.5" />
            View Website
          </Link>
        </Button>

        <div className="flex items-center gap-2 pl-3 border-l border-[#e9ecef]">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="bg-[#52796f]/10 text-[#52796f]">
              <User className="h-3.5 w-3.5" />
            </AvatarFallback>
          </Avatar>
          <span className="text-xs font-medium text-[#212529]">Admin</span>
        </div>
      </div>
    </header>
  );
}

