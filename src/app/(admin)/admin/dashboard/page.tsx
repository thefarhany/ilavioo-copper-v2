"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, MessageSquare, Image, ArrowUpRight, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { inquiryApi, productApi, statsApi } from "@/lib/api";
import { toast } from "sonner";
import type { Inquiry, Product } from "@/types";

interface DashboardStats {
  products: number;
  inquiries: number;
  gallery: number;
  newInquiries: number;
}

interface RecentActivity {
  inquiries: Inquiry[];
  products: Product[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    products: 0,
    inquiries: 0,
    gallery: 0,
    newInquiries: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity>({
    inquiries: [],
    products: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        const [statsRes, productsRes, inquiriesRes] = await Promise.all([
          statsApi.getDashboardStats(),
          productApi.getAllProducts({ limit: 5 }),
          inquiryApi.getAllInquiries({ limit: 5 }),
        ]);

        if (statsRes.success) {
          setStats({
            products: statsRes.data.totalProducts || 0,
            inquiries: statsRes.data.totalInquiries || 0,
            gallery: statsRes.data.totalGalleryItems || 0,
            newInquiries: statsRes.data.newInquiries || 0,
          });
        }

        const inquiriesList = (inquiriesRes.data as any)?.inquiries || [];
        setRecentActivity({
          inquiries: inquiriesList.slice(0, 5),
          products: (productsRes.data as any)?.products?.slice(0, 5) || [],
        });
      } catch (error: any) {
        // Silent on 401 — layout will redirect to login
        if (error?.response?.status !== 401) {
          toast.error("Failed to load dashboard data");
          console.error(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const statCards = [
    { label: "Products", value: stats.products, icon: Package, href: "/admin/products" },
    { label: "Inquiries", value: stats.inquiries, icon: MessageSquare, href: "/admin/inquiries", badge: stats.newInquiries > 0 ? `${stats.newInquiries} new` : undefined },
    { label: "Gallery", value: stats.gallery, icon: Image, href: "/admin/gallery" },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "new": return "bg-[#52796f]/10 text-[#52796f] border-[#52796f]/20";
      case "contacted": return "bg-blue-50 text-blue-700 border-blue-200";
      case "closed": return "bg-gray-50 text-gray-600 border-gray-200";
      default: return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const relativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        <span className="text-xs text-gray-400">
          {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map((stat) => (
          <Link key={stat.label} href={stat.href} className="group flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:border-[#52796f]/30 hover:shadow-sm transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#52796f]/10 flex items-center justify-center shrink-0">
              <stat.icon className="w-5 h-5 text-[#52796f]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-2xl font-bold text-[#52796f] leading-tight">{isLoading ? "-" : stat.value}</p>
              <div className="flex items-center gap-2">
                <p className="text-xs uppercase tracking-wider text-gray-500">{stat.label}</p>
                {stat.badge && (
                  <Badge className="text-[10px] px-1.5 py-0 bg-[#52796f]/10 text-[#52796f] border-[#52796f]/20">{stat.badge}</Badge>
                )}
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#52796f] transition-colors shrink-0" />
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Link href="/admin/products/new" className="inline-flex items-center gap-2 px-4 py-2 bg-[#52796f] text-white text-sm font-medium rounded-full hover:bg-[#3d5c52] transition-colors">
          <Package className="w-4 h-4" />
          Add Product
        </Link>
        <Link href="/admin/categories" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-full border border-gray-200 hover:border-[#52796f]/30 hover:text-[#52796f] transition-all">
          <Image className="w-4 h-4" />
          Categories
        </Link>
        <Link href="/admin/testimonials/new" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-full border border-gray-200 hover:border-[#52796f]/30 hover:text-[#52796f] transition-all">
          <MessageSquare className="w-4 h-4" />
          Testimonial
        </Link>
        <Link href="/admin/gallery" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-full border border-gray-200 hover:border-[#52796f]/30 hover:text-[#52796f] transition-all">
          <Image className="w-4 h-4" />
          Gallery
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-gray-200 shadow-none bg-white rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-3 pt-5 px-5">
            <div><CardTitle className="text-sm font-semibold text-gray-900">Recent Inquiries</CardTitle></div>
            <Link href="/admin/inquiries" className="text-xs text-[#52796f] hover:underline font-medium">View all</Link>
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-0">
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="w-32 h-4 bg-gray-100 rounded animate-pulse" />
                      <div className="w-48 h-3 bg-gray-100 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentActivity.inquiries.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm font-medium text-gray-500">No inquiries yet</p>
                <p className="text-xs text-gray-400 mt-1">New inquiries will appear here</p>
              </div>
            ) : (
              <div className="space-y-1">
                {recentActivity.inquiries.map((inquiry) => (
                  <div key={inquiry.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#52796f]/10 flex items-center justify-center shrink-0 text-[#52796f] text-xs font-semibold">
                      {inquiry.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium text-gray-900 truncate">{inquiry.name}</p>
                        <Badge className={`text-[10px] px-1.5 py-0 border shrink-0 ${getStatusStyle(inquiry.status)}`}>{inquiry.status}</Badge>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{inquiry.email}</p>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{inquiry.message}</p>
                    </div>
                    <span className="text-[10px] text-gray-400 shrink-0 self-start pt-1">{relativeTime(inquiry.createdAt)}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-none bg-white rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-3 pt-5 px-5">
            <div><CardTitle className="text-sm font-semibold text-gray-900">Recent Products</CardTitle></div>
            <Link href="/admin/products" className="text-xs text-[#52796f] hover:underline font-medium">View all</Link>
          </CardHeader>
          <CardContent className="px-5 pb-5 pt-0">
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="w-32 h-4 bg-gray-100 rounded animate-pulse" />
                      <div className="w-24 h-3 bg-gray-100 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentActivity.products.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm font-medium text-gray-500">No products yet</p>
                <p className="text-xs text-gray-400 mt-1">Add your first product to get started</p>
                <Link href="/admin/products/new" className="inline-flex items-center gap-1 mt-3 text-xs text-[#52796f] hover:underline font-medium">Add Product<ArrowUpRight className="w-3 h-3" /></Link>
              </div>
            ) : (
              <div className="space-y-1">
                {recentActivity.products.map((product) => (
                  <div key={product.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 shrink-0 overflow-hidden">
                      {product.images && product.images.length > 0 ? (
                        <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <Package className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                        <Badge className={`text-[10px] px-1.5 py-0 border shrink-0 ${product.status === "active" ? "bg-[#52796f]/10 text-[#52796f] border-[#52796f]/20" : "bg-gray-50 text-gray-500 border-gray-200"}`}>{product.status}</Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{product.category?.name || "Uncategorized"}</p>
                    </div>
                    <Link href={`/products/${product.slug}`} target="_blank" className="text-gray-300 hover:text-[#52796f] transition-colors shrink-0">
                      <Eye className="h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

