import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-8xl font-light text-[#A0522D] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          404
        </p>
        <h1 className="text-2xl font-semibold text-[#1c1917] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          Page Not Found
        </h1>
        <p className="text-[#78716c] mb-8 leading-relaxed">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#A0522D] hover:bg-[#3E2723] text-white rounded-full transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
