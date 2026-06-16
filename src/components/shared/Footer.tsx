"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUp, MapPin, Phone, Mail } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const footerLinks = {
  products: [
    { name: "Cookware", href: "/products" },
    { name: "Home Decor", href: "/products" },
    { name: "Bathroom", href: "/products" },
    { name: "Industrial", href: "/products" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Story", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ],
  support: [
    { name: "FAQ", href: "#" },
    { name: "Shipping", href: "#" },
    { name: "Returns", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: FaFacebook, href: "#", label: "Facebook" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#1c1917] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Image
                src="/logo.png"
                alt="Ilavioo Logo"
                width={40}
                height={40}
                className="rounded-full w-auto h-auto"
              />
              <span
                className="text-xl font-semibold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Ilavioo
              </span>
            </div>
            <p className="text-[#a8a29e] text-sm leading-relaxed mb-6">
              Handcrafted copper & brass products exported to 50+ countries
              since 1990. Heritage quality meets modern precision.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#A0522D] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-[#A0522D] mb-6 font-medium">
              Products
            </h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#a8a29e] hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-[#A0522D] mb-6 font-medium">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#a8a29e] hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-[#A0522D] mb-6 font-medium">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#A0522D] shrink-0 mt-0.5" />
                <span className="text-[#a8a29e] text-sm">
                  Tumang, Boyolali, Central Java, Indonesia
                </span>
              </li>
              <li>
                <Link
                  href="https://wa.me/6281213696772"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#A0522D] shrink-0" />
                  <span className="text-[#a8a29e] text-sm">
                    +62 8121-3696-772
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:marketing@ilavioo.com"
                  className="flex items-center gap-3 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#A0522D] shrink-0" />
                  <span className="text-[#a8a29e] text-sm">
                    marketing@ilavioo.com
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#a8a29e] text-sm">
            © {new Date().getFullYear()} Ilavioo Copper. All rights reserved.
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-[#A0522D] flex items-center justify-center hover:bg-[#3E2723] transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
