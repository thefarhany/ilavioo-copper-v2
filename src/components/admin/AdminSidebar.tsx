"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  MessageSquare,
  Image,
  LogOut,
  Quote,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: FolderOpen, label: "Categories", href: "/admin/categories" },
  { icon: MessageSquare, label: "Inquiries", href: "/admin/inquiries" },
  { icon: Quote, label: "Testimonials", href: "/admin/testimonials" },
  { icon: Image, label: "Gallery", href: "/admin/gallery" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuthStore();

  return (
    <aside className="w-60 bg-white border-r border-[#e9ecef] flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-5 border-b border-[#e9ecef]">
        <Link href="/admin/dashboard">
          <span className="text-lg font-semibold text-[#212529]">
            Ilavioo<span className="text-[#C5A059]">Copper</span>
          </span>
        </Link>
        <p className="text-[11px] text-[#6c757d] mt-0.5">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Button
              key={item.href}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 h-10 px-3 text-sm font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-[#3E2723]/10 text-[#C5A059] hover:bg-[#3E2723]/15 hover:text-[#C5A059]"
                  : "text-[#6c757d] hover:bg-gray-100 hover:text-[#212529]"
              )}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-[#e9ecef]">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-10 px-3 text-sm text-[#6c757d] hover:text-red-600 hover:bg-red-50 rounded-lg"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}

