"use client";

import Link from "next/link";
import { Phone, Mail, Clock } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-[#3E2723] text-white py-2 px-4 text-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-4">
        <div className="flex items-center gap-6">
          <Link
            href="https://wa.me/6281213696772"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#A0522D] transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>+62 8121-3696-772</span>
          </Link>
          <Link
            href="mailto:marketing@ilavioo.com"
            className="hidden sm:flex items-center gap-2 hover:text-[#A0522D] transition-colors"
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
  );
}
