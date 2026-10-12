"use client";

import { useParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import {
  Building2,
  MapPin,
  Users,
  ArrowLeft,
  Briefcase,
  UserCheck,
  Coins,
  Loader2,
} from "lucide-react";
import { fetchVacancy } from "@/lib/api";

function VacancyDetailContent() {
  const params = useParams();
  const vacancyId = params?.id as string;

  const {
    data: vacancy,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["vacancy", vacancyId],
    queryFn: () => fetchVacancy(vacancyId),
    enabled: Boolean(vacancyId),
  });

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#2D74FF] mb-3" />
        <p className="text-gray-500 text-sm">Memuat detail lowongan...</p>
      </div>
    );
  }

  if (isError || !vacancy) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Lowongan Tidak Ditemukan
        </h2>
        <p className="text-gray-500 mb-6">
          {(error as Error)?.message || "Lowongan yang Anda cari tidak tersedia."}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar Lowongan
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      {/* Breadcrumb / Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke lowongan</span>
      </Link>

      {/* Header Block */}
      <div className="flex flex-col sm:flex-row items-start gap-6 pb-8 border-b border-gray-100">
        {/* Logo Box */}
        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-sm relative">
          <Image
            src="/dicoding-logo.png"
            alt={vacancy.company_name || "Dicoding Indonesia"}
            fill
            className="object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex-1">
          <h1
            id="vacancy-detail-title"
            className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight"
          >
            {vacancy.title}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Sektor Bisnis: {vacancy.company_sector || "Technology"}
          </p>

          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-600 mt-3">
            <div className="flex items-center gap-1.5 font-medium">
              <Building2 className="w-4 h-4 text-gray-400" />
              <span className="underline decoration-gray-300 underline-offset-2">
                {vacancy.company_name || "Dicoding Indonesia"}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>{vacancy.location}</span>
              {vacancy.is_remote && (
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-medium">
                  Bisa Remote
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-gray-400" />
              <span>{vacancy.company_size || "50-100 Karyawan"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Job Type Pill Badge */}
      <div className="py-6">
        <span className="inline-block px-5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-[#2D74FF] border border-blue-200">
          {vacancy.job_type}
        </span>
      </div>

      {/* Main Details Body */}
      <div className="space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base">
        {/* Job Description */}
        {vacancy.description && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Job Description</h2>
            <div className="whitespace-pre-line text-gray-600 text-sm sm:text-base leading-relaxed">
              {vacancy.description}
            </div>
          </section>
        )}

        {/* Responsibilities */}
        {vacancy.responsibilities && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Responsibilities</h2>
            <div className="whitespace-pre-line text-gray-600 text-sm sm:text-base leading-relaxed">
              {vacancy.responsibilities}
            </div>
          </section>
        )}

        {/* Requirements */}
        {vacancy.requirements && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Requirements</h2>
            <div className="whitespace-pre-line text-gray-600 text-sm sm:text-base leading-relaxed">
              {vacancy.requirements}
            </div>
          </section>
        )}

        {/* Informasi Tambahan */}
        <section className="pt-4 border-t border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Informasi Tambahan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Pengalaman bekerja
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <Briefcase className="w-4 h-4 text-gray-400" />
                <span>{vacancy.min_experience}</span>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Kandidat yang dibutuhkan
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <UserCheck className="w-4 h-4 text-gray-400" />
                <span>{vacancy.candidates_needed} kandidat</span>
              </div>
            </div>

            {vacancy.show_salary && vacancy.formatted_salary && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Rentang Gaji per Bulan
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  <Coins className="w-4 h-4 text-emerald-500" />
                  <span>{vacancy.formatted_salary}</span>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function VacancyDetailPage() {
  return (
    <div className="min-h-screen bg-white py-8 sm:py-12">
      <Suspense
        fallback={
          <div className="min-h-[70vh] flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#2D74FF] mb-3" />
            <p className="text-gray-500 text-sm">Memuat lowongan...</p>
          </div>
        }
      >
        <VacancyDetailContent />
      </Suspense>
    </div>
  );
}