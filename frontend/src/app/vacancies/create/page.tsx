"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Bold,
  Italic,
  Underline,
  Link2,
  Image as ImageIcon,
  Code,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { createVacancy } from "@/lib/api";
import { VacancyInput } from "@/types/vacancy";

const DEFAULT_DESCRIPTION = `Deskripsi Pekerjaan
Sebagai [Posisi Lowongan], Anda akan berpartisipasi dalam proses pembangunan aplikasi yang sedang dibangun dalam perusahaan [Nama Perusahaan]. Anda juga diharapkan mampu bekerja dalam tim.

Tanggung Jawab
• Membuat atau memodifikasi program yang sudah ada.
• Bertanggung jawab dalam mengelola program.`;

export default function CreateVacancyPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Form State
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("");
  const [jobType, setJobType] = useState("Full-Time");
  const [candidatesNeeded, setCandidatesNeeded] = useState(1);
  const [activeUntil, setActiveUntil] = useState("");
  const [location, setLocation] = useState("Bandung");
  const [isRemote, setIsRemote] = useState(false);
  const [description, setDescription] = useState(DEFAULT_DESCRIPTION);
  const [minSalary, setMinSalary] = useState<number | "">("");
  const [maxSalary, setMaxSalary] = useState<number | "">("");
  const [showSalary, setShowSalary] = useState(false);
  const [minExperience, setMinExperience] = useState("1-3 tahun");
  const [formError, setFormError] = useState<string | null>(null);

  // Mutation
  const createMutation = useMutation({
    mutationFn: (data: VacancyInput) => createVacancy(data),
    onSuccess: (newVacancy) => {
      queryClient.invalidateQueries({ queryKey: ["vacancies"] });
      router.push(`/vacancies/${newVacancy.id}`);
    },
    onError: (err: Error) => {
      setFormError(err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Basic frontend validations
    if (!title.trim()) {
      setFormError("Judul lowongan wajib diisi.");
      return;
    }
    if (!position.trim()) {
      setFormError("Posisi lowongan wajib dipilih.");
      return;
    }
    if (!activeUntil) {
      setFormError("Batas aktif lowongan wajib diisi.");
      return;
    }
    if (!description.trim()) {
      setFormError("Deskripsi lowongan wajib diisi.");
      return;
    }

    const payload: VacancyInput = {
      title: title.trim(),
      position: position.trim(),
      job_type: jobType,
      candidates_needed: Number(candidatesNeeded) || 1,
      active_until: activeUntil,
      location: location,
      is_remote: isRemote,
      description: description.trim(),
      min_salary: minSalary !== "" ? Number(minSalary) : null,
      max_salary: maxSalary !== "" ? Number(maxSalary) : null,
      show_salary: showSalary,
      min_experience: minExperience,
      company_name: "Dicoding Indonesia",
      company_sector: "Technology",
      company_size: "50-100 Karyawan",
    };

    createMutation.mutate(payload);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="bg-[#18181B] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight flex flex-wrap items-center gap-3">
            <span>Buat lowongan pekerjaan</span>
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
          <p className="text-gray-400 text-sm sm:text-base mt-4 leading-relaxed max-w-2xl">
            Dicoding Jobs menghubungkan industri dengan talenta yang tepat. Mencari
            tim baru tidak harus melelahkan dan boros biaya.
          </p>
        </div>
      </section>

      {/* Main Form */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {formError && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* 1. Judul Lowongan */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-800 mb-1.5"
            >
              Judul lowongan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul lowongan"
              required
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D74FF] focus:border-transparent"
            />
            <p className="text-xs text-gray-400 mt-1">
              Contoh: Android Native Developer
            </p>
          </div>

          {/* 2. Posisi */}
          <div>
            <label
              htmlFor="position"
              className="block text-sm font-semibold text-gray-800 mb-1.5"
            >
              Posisi <span className="text-red-500">*</span>
            </label>
            <select
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#2D74FF] focus:border-transparent"
            >
              <option value="">Pilih posisi yang dicari</option>
              <option value="Product Engineer">Product Engineer</option>
              <option value="Android Developer">Android Developer</option>
              <option value="iOS Developer">iOS Developer</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Code Reviewer">Code Reviewer</option>
              <option value="DevOps Engineer">DevOps Engineer</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="Quality Assurance Engineer">
                Quality Assurance Engineer
              </option>
            </select>
          </div>

          {/* 3. Tipe Pekerjaan */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Tipe pekerjaan <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {["Full-Time", "Part-Time", "Kontrak", "Intern"].map((type) => (
                <label key={type} className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="radio"
                    name="job_type"
                    value={type}
                    checked={jobType === type}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-4 h-4 text-[#2D74FF] border-gray-300 focus:ring-[#2D74FF]"
                  />
                  <span className="text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 4. Kandidat yang dibutuhkan */}
          <div>
            <label
              htmlFor="candidates"
              className="block text-sm font-semibold text-gray-800 mb-1.5"
            >
              Kandidat yang dibutuhkan <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="candidates"
              min="1"
              value={candidatesNeeded}
              onChange={(e) => setCandidatesNeeded(Number(e.target.value))}
              placeholder="Masukkan jumlah kandidat yang dibutuhkan"
              required
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D74FF] focus:border-transparent"
            />
          </div>

          {/* 5. Aktif Hingga */}
          <div>
            <label
              htmlFor="active_until"
              className="block text-sm font-semibold text-gray-800 mb-1.5"
            >
              Aktif hingga <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="active_until"
              value={activeUntil}
              onChange={(e) => setActiveUntil(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D74FF] focus:border-transparent"
            />
          </div>

          {/* 6. Lokasi */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-semibold text-gray-800 mb-1.5"
            >
              Lokasi <span className="text-red-500">*</span>
            </label>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#2D74FF] focus:border-transparent"
            >
              <option value="Bandung">Bandung</option>
              <option value="Jakarta">Jakarta</option>
              <option value="Yogyakarta">Yogyakarta</option>
              <option value="Surabaya">Surabaya</option>
              <option value="Semarang">Semarang</option>
              <option value="Bali">Bali</option>
              <option value="Seluruh Indonesia">Seluruh Indonesia</option>
            </select>
            <label className="mt-2.5 flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                id="is_remote"
                checked={isRemote}
                onChange={(e) => setIsRemote(e.target.checked)}
                className="w-4 h-4 rounded text-[#2D74FF] border-gray-300 focus:ring-[#2D74FF]"
              />
              <span className="text-xs text-gray-600">Bisa remote</span>
            </label>
          </div>

          {/* 7. Deskripsi */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-800 mb-1.5"
            >
              Deskripsi <span className="text-red-500">*</span>
            </label>
            <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#2D74FF] focus-within:border-transparent">
              {/* Rich editor toolbar mock */}
              <div className="bg-gray-50 border-b border-gray-200 px-3 py-2 flex items-center gap-4 text-gray-600 text-sm">
                <button
                  type="button"
                  title="Bold"
                  className="hover:text-gray-900 p-1"
                  onClick={() => setDescription((prev) => prev + "\n**Teks Tebal**")}
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Italic"
                  className="hover:text-gray-900 p-1"
                  onClick={() => setDescription((prev) => prev + "\n*Teks Miring*")}
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Underline"
                  className="hover:text-gray-900 p-1"
                >
                  <Underline className="w-3.5 h-3.5" />
                </button>
                <div className="w-px h-4 bg-gray-300" />
                <button
                  type="button"
                  title="Link"
                  className="hover:text-gray-900 p-1"
                >
                  <Link2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Image"
                  className="hover:text-gray-900 p-1"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Code"
                  className="hover:text-gray-900 p-1"
                >
                  <Code className="w-3.5 h-3.5" />
                </button>
              </div>

              <textarea
                id="description"
                rows={9}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full p-3.5 text-sm text-gray-900 focus:outline-none resize-y"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Anda bisa mengubah template yang telah disediakan di atas.
            </p>
          </div>

          {/* 8. Rentang Gaji per Bulan */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              Rentang gaji per bulan <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center w-full sm:w-1/2 border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#2D74FF]">
                <span className="bg-gray-50 text-gray-500 px-3 py-2.5 text-xs font-medium border-r border-gray-200">
                  Rp
                </span>
                <input
                  type="number"
                  placeholder="Minimum"
                  value={minSalary}
                  onChange={(e) =>
                    setMinSalary(e.target.value ? Number(e.target.value) : "")
                  }
                  className="w-full px-3 py-2 text-sm text-gray-900 focus:outline-none"
                />
              </div>

              <span className="text-gray-400 font-bold">-</span>

              <div className="flex items-center w-full sm:w-1/2 border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#2D74FF]">
                <span className="bg-gray-50 text-gray-500 px-3 py-2.5 text-xs font-medium border-r border-gray-200">
                  Rp
                </span>
                <input
                  type="number"
                  placeholder="Maksimum (opsional)"
                  value={maxSalary}
                  onChange={(e) =>
                    setMaxSalary(e.target.value ? Number(e.target.value) : "")
                  }
                  className="w-full px-3 py-2 text-sm text-gray-900 focus:outline-none"
                />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              Anda tidak perlu mengisi kolom &quot;Maksimum&quot; jika yang dimasukkan adalah
              gaji pokok.
            </p>

            {/* Toggle Tampilkan Gaji */}
            <div className="mt-3.5 flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setShowSalary(!showSalary)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${showSalary ? "bg-[#2D74FF]" : "bg-gray-200"
                  }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${showSalary ? "translate-x-5" : "translate-x-0"
                    }`}
                />
              </button>
              <span className="text-sm text-gray-700 font-medium">
                Tampilkan gaji
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Gaji akan ditampilkan di lowongan pekerjaan dan dapat dilihat oleh
              kandidat.
            </p>
          </div>

          {/* 9. Minimum Pengalaman Bekerja */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Minimum pengalaman bekerja <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {[
                "Kurang dari 1 tahun",
                "1-3 tahun",
                "4-5 tahun",
                "6-10 tahun",
                "Lebih dari 10 tahun",
              ].map((exp) => (
                <label key={exp} className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="radio"
                    name="min_experience"
                    value={exp}
                    checked={minExperience === exp}
                    onChange={(e) => setMinExperience(e.target.value)}
                    className="w-4 h-4 text-[#2D74FF] border-gray-300 focus:ring-[#2D74FF]"
                  />
                  <span className="text-sm text-gray-700">{exp}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 10. Action Buttons */}
          <div className="pt-4 flex items-center gap-3">
            <button
              type="submit"
              id="submit-vacancy-btn"
              disabled={createMutation.isPending}
              className="inline-flex items-center justify-center px-6 py-2.5 bg-[#2D3E50] text-white text-sm font-semibold hover:bg-gray-800 transition disabled:opacity-50"
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Buat lowongan"
              )}
            </button>

            <Link
              href="/"
              className="px-6 py-2.5 bg-gray-100 border border-[#E4E4E7] text-gray-700 text-sm font-medium hover:bg-gray-200 transition"
            >
              Batal
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}