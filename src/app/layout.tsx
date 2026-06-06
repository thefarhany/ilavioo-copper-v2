import type { Metadata } from "next";
import { Inter, Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"]
});

const dmSans = DM_Sans({ 
  subsets: ["latin"], 
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: {
    template: "%s | Ilavioo Copper",
    default: "Ilavioo Copper | Premium Copper Craftsmanship",
  },
  description: "Discover exquisite handcrafted copper products. From traditional cookware to modern decorative pieces.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={cn(
        "antialiased",
        inter.variable,
        playfair.variable,
        dmSans.variable
      )}
    >
      <body className="min-h-screen bg-background font-sans">
        {children}
      </body>
    </html>
  );
}
