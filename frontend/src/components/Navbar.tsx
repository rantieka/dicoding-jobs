"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

function NavLinks() {
  const pathname = usePathname();
  const isDashboardActive = pathname ? pathname.startsWith("/dashboard") || pathname === "/vacancies/create" || pathname.includes("/edit") : false;
  const isLowonganActive = !isDashboardActive && (pathname === "/" || (pathname ? pathname.startsWith("/vacancies") : false));

  return (
    <nav className="flex items-center space-x-8">
      <Link
        href="/"
        className={`relative py-5 text-sm font-medium transition-colors ${
          isLowonganActive
            ? "text-gray-900 font-semibold"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        Lowongan Kerja
        {isLowonganActive && (
          <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gray-900 rounded-full" />
        )}
      </Link>

      <Link
        href="/dashboard"
        className={`relative py-5 text-sm font-medium transition-colors ${
          isDashboardActive
            ? "text-gray-900 font-semibold"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        Dashboard
        {isDashboardActive && (
          <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gray-900 rounded-full" />
        )}
      </Link>
    </nav>
  );
}

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-10">
          <Link href="/" className="flex items-center group py-2">
            <Image
              src="/logo-jobs.png"
              alt="Dicoding Jobs"
              width={81}
              height={32}
              priority
              className="h-8 w-auto object-contain group-hover:opacity-90 transition"
            />
          </Link>

          <Suspense fallback={<nav className="flex items-center space-x-8" />}>
            <NavLinks />
          </Suspense>
        </div>
      </div>
    </header>
  );
}