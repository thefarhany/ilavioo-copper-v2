"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "sonner";
import { useAuthStore } from "@/store";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuthStore();
  const [hasChecked, setHasChecked] = useState(false);

  // Check auth on mount for protected pages
  useEffect(() => {
    if (pathname === "/admin/login") {
      setHasChecked(true);
      return;
    }
    const verify = async () => {
      await checkAuth();
      setHasChecked(true);
    };
    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Redirect to login only after auth check is complete
  useEffect(() => {
    if (hasChecked && pathname !== "/admin/login" && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [hasChecked, isAuthenticated, pathname, router]);

  // Login page: no sidebar, no topbar, centered layout
  if (pathname === "/admin/login") {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <Toaster position="bottom-right" richColors />
        {children}
      </div>
    );
  }

  // Loading state while checking auth (prevents premature redirect)
  if (!hasChecked) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#3E2723] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Authenticated: full admin layout with sidebar + topbar
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminTopbar />
        <main className="flex-1 p-6 overflow-auto bg-[#f8f9fa]">
          {children}
        </main>
        <Toaster position="bottom-right" richColors />
      </div>
    </div>
  );
}
