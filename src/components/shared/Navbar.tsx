"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X, ArrowRight, Mail, Clock } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        {/* TopBar — instantly hidden on scroll (no transition to avoid center glitches) */}
        <div
          className={`bg-[#52796f] text-white py-2 px-4 text-sm ${
            scrolled ? "hidden" : "block"
          }`}
        >
          <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <Link
                href="https://wa.me/6281213696772"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#84a98c] transition-colors"
              >
                <FaWhatsapp className="h-3.5 w-3.5" />
                <span>+62 8121-3696-772</span>
              </Link>
              <Link
                href="mailto:marketing@ilavioo.com"
                className="hidden sm:flex items-center gap-2 hover:text-[#84a98c] transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>marketing@ilavioo.com</span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              <span>Mon - Fri: 08:00 - 17:00</span>
            </div>
          </div>
        </div>

        {/* Main Navbar — always visible, vertically centered */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image
                src="/logo.png"
                alt="Ilavioo Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span
                className="text-xl font-semibold text-[#1c1917]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Ilavioo
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative text-sm font-medium text-[#1c1917] transition-colors group py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#84a98c] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            <div className="hidden lg:block">
              <Button
                asChild
                className="bg-[#84a98c] hover:bg-[#52796f] text-white rounded-full px-6 shadow-lg shadow-[#84a98c]/25 transition-all duration-300"
              >
                <Link
                  href="/catalog.pdf"
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  Download Catalog
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-[#1c1917]" />
              ) : (
                <Menu className="w-6 h-6 text-[#1c1917]" />
              )}
            </button>
          </div>
        </div>

        <div
          className={`lg:hidden bg-white border-t overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-100 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col px-6 py-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-lg text-[#1c1917] py-2 border-b border-[#e7e5e4]"
              >
                {link.name}
              </Link>
            ))}
            <Button
              asChild
              className="mt-4 bg-[#84a98c] hover:bg-[#52796f] text-white rounded-full"
            >
              <Link
                href="/catalog.pdf"
                target="_blank"
              >
                Download Catalog
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Static spacer — matches exact header height */}
      <div className={scrolled ? "h-20" : "h-30"} />
    </>
  );
}
