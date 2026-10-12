"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Search, Loader2 } from "lucide-react";
import { fetchVacancies } from "@/lib/api";
import JobCard from "@/components/JobCard";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: vacancies,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["vacancies", searchTerm],
    queryFn: () => fetchVacancies(searchTerm),
  });

  const isSearching = searchTerm.trim().length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="bg-[#18181B] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-[#3B82F6] font-semibold text-sm tracking-wide mb-3">
            Dicoding Jobs
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight max-w-3xl">
            Temukan lowongan yang cocok untuk kamu{" "}
            <span className="inline-flex align-middle ml-2.5 h-8 sm:h-10 md:h-11 w-auto relative">
              <Image
                src="/hero-pill.png"
                alt="Dicoding Professional"
                width={203}
                height={61}
                className="h-8 sm:h-10 md:h-11 w-auto object-contain rounded-full shadow-sm"
                priority
              />
            </span>
          </h1>
        </div>
      </section>

      {/* Main Content: Search and Job Listings */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        {/* Search Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2
            id="job-list-heading"
            className="text-2xl sm:text-[26px] font-bold text-gray-900 tracking-tight"
          >
            {isSearching ? "Hasil Pencarian" : "Daftar Pekerjaan Terbaru"}
          </h2>

          {/* Search Box */}
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              id="job-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pekerjaan apa yang sedang kamu cari?"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D74FF] focus:border-transparent transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin text-[#2D74FF] mb-3" />
            <p className="text-sm">Memuat lowongan pekerjaan...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center text-red-700">
            <p className="font-medium">Terjadi kesalahan saat memuat data lowongan.</p>
            <p className="text-xs text-red-500 mt-1">{(error as Error)?.message}</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && vacancies && vacancies.length === 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
            <p className="text-lg font-semibold text-gray-700">
              Tidak ada lowongan yang ditemukan
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Coba kata kunci pencarian yang lain atau reset filter.
            </p>
            {isSearching && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 px-4 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition"
              >
                Reset Pencarian
              </button>
            )}
          </div>
        )}

        {/* Vacancies List */}
        {!isLoading && !isError && vacancies && vacancies.length > 0 && (
          <div className="flex flex-col space-y-4" id="vacancies-container">
            {vacancies.map((vacancy) => (
              <JobCard key={vacancy.id} vacancy={vacancy} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}