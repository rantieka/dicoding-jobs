"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Briefcase,
  Plus,
  Upload,
  Clock,
  Pencil,
  Trash2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { fetchVacancies, deleteVacancy } from "@/lib/api";

export default function DashboardPage() {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const {
    data: vacancies,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["vacancies"],
    queryFn: () => fetchVacancies(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteVacancy(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vacancies"] });
      setDeleteId(null);
    },
    onError: () => {
      setDeleteId(null);
    },
  });

  const handleDeleteClick = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus lowongan ini?")) {
      setDeleteId(id);
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Left Sidebar */}
          <aside className="w-full md:w-56 shrink-0 md:sticky md:top-24">
            <nav className="space-y-1">
              <button
                type="button"
                className="w-full bg-[#F4F4F5] text-[#18181B] font-medium rounded-lg px-4 py-2.5 flex items-center gap-3 text-sm transition text-left"
              >
                <Briefcase className="w-4 h-4 text-gray-800 shrink-0" />
                <span>Lowongan Saya</span>
              </button>
            </nav>
          </aside>

          {/* Right Main Content */}
          <main className="flex-1 w-full min-w-0">
            {/* Header Row */}
            <div className="flex items-center justify-between mb-6 pb-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Lowongan Saya
              </h1>

              <Link
                href="/vacancies/create"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-[#2D3E50] text-white text-sm font-semibold hover:bg-gray-800 transition disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                <span>Buat lowongan</span>
              </Link>
            </div>

            {/* Loading */}
            {isLoading && (
              <div className="py-20 flex flex-col items-center justify-center text-gray-400">
                <Loader2 className="w-8 h-8 animate-spin text-[#3B82F6] mb-3" />
                <p className="text-sm">Memuat lowongan saya...</p>
              </div>
            )}

            {/* Error */}
            {isError && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6 text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                <div>
                  <p className="font-semibold">Gagal memuat lowongan</p>
                  <p className="text-xs text-red-600">{(error as Error)?.message}</p>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !isError && vacancies && vacancies.length === 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-gray-800">
                  Belum ada lowongan pekerjaan
                </h3>
                <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
                  Mulai buat lowongan baru agar talenta terbaik dapat melihat dan melamar.
                </p>
                <Link
                  href="/vacancies/create"
                  className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-xs font-semibold rounded-lg hover:bg-gray-800 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Buat Lowongan Sekarang</span>
                </Link>
              </div>
            )}

            {/* Vacancy Cards List */}
            {!isLoading && !isError && vacancies && vacancies.length > 0 && (
              <div className="space-y-4">
                {vacancies.map((vacancy) => (
                  <div
                    key={vacancy.id}
                    className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-all shadow-xs flex items-start gap-4 sm:gap-5"
                  >
                    {/* Job Logo Tile from Figma */}
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 relative">
                      <Image
                        src="/tile-9.png"
                        alt={vacancy.title}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                        {vacancy.title}
                      </h2>

                      {/* Dates Row */}
                      <div className="flex flex-wrap items-center gap-5 sm:gap-6 text-xs text-gray-500 mt-1.5">
                        <div className="flex items-center gap-1.5">
                          <Upload className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span>
                            Dibuat: {vacancy.formatted_created_at || "15 Desember 2023"}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span>
                            Aktif hingga: {vacancy.formatted_active_until || "30 Desember 2023"}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons Row */}
                      <div className="flex items-center gap-2.5 mt-3.5">
                        <Link
                          href={`/vacancies/${vacancy.id}/edit`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
                        >
                          <Pencil className="w-3.5 h-3.5 text-gray-600 shrink-0" />
                          <span>Edit</span>
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDeleteClick(vacancy.id)}
                          disabled={deleteMutation.isPending && deleteId === vacancy.id}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FED3D8] hover:bg-[#FDBBC2] border border-transparent text-xs font-medium text-[#C21D46] transition cursor-pointer disabled:opacity-50"
                        >
                          {deleteMutation.isPending && deleteId === vacancy.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C21D46] shrink-0" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5 text-[#C21D46] shrink-0" />
                          )}
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}