"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { fetchVacancy, updateVacancy } from "@/lib/api";
import { VacancyInput } from "@/types/vacancy";

function EditVacancyContent() {
  const params = useParams();
  const vacancyId = params?.id as string;
  const router = useRouter();
  const queryClient = useQueryClient();

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

  // Form State
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("");
  const [jobType, setJobType] = useState("Full-Time");
  const [candidatesNeeded, setCandidatesNeeded] = useState(1);
  const [activeUntil, setActiveUntil] = useState("");
  const [location, setLocation] = useState("Bandung");
  const [isRemote, setIsRemote] = useState(false);
  const [description, setDescription] = useState("");
  const [minSalary, setMinSalary] = useState<number | "">("");
  const [maxSalary, setMaxSalary] = useState<number | "">("");
  const [showSalary, setShowSalary] = useState(false);
  const [minExperience, setMinExperience] = useState("1-3 tahun");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (vacancy) {
      setTitle(vacancy.title || "");
      setPosition(vacancy.position || "");
      setJobType(vacancy.job_type || "Full-Time");
      setCandidatesNeeded(vacancy.candidates_needed || 1);
      setActiveUntil(vacancy.active_until ? vacancy.active_until.split("T")[0] : "");
      setLocation(vacancy.location || "Bandung");
      setIsRemote(Boolean(vacancy.is_remote));
      setDescription(vacancy.description || "");
      setMinSalary(vacancy.min_salary ?? "");
      setMaxSalary(vacancy.max_salary ?? "");
      setShowSalary(Boolean(vacancy.show_salary));
      setMinExperience(vacancy.min_experience || "1-3 tahun");
    }
  }, [vacancy]);

  const updateMutation = useMutation({
    mutationFn: (data: Partial<VacancyInput>) => updateVacancy(vacancyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vacancies"] });
      queryClient.invalidateQueries({ queryKey: ["vacancy", vacancyId] });
      router.push("/dashboard");
    },
    onError: (err: Error) => {
      setFormError(err.message || "Gagal memperbarui lowongan");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title || !position || !activeUntil || !description) {
      setFormError("Mohon isi semua field yang wajib diisi.");
      return;
    }

    const payload: Partial<VacancyInput> = {
      title,
      position,
      job_type: jobType,
      candidates_needed: Number(candidatesNeeded),
      active_until: activeUntil,
      location,
      is_remote: isRemote,
      description,
      min_experience: minExperience,
      show_salary: showSalary,
    };

    if (showSalary && minSalary !== "") {
      payload.min_salary = Number(minSalary);
    }
    if (showSalary && maxSalary !== "") {
      payload.max_salary = Number(maxSalary);
    }

    updateMutation.mutate(payload);
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#3B82F6] mb-3" />
        <p className="text-gray-500 text-sm">Memuat data lowongan...</p>
      </div>
    );
  }

  if (isError || !vacancy) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Lowongan Tidak Ditemukan
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {(error as Error)?.message || "Data lowongan yang ingin diedit tidak tersedia."}
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Dashboard</span>
        </Link>

        <div className="border-b border-gray-100 pb-5 mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Edit Lowongan Pekerjaan
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Perbarui rincian lowongan {vacancy.title}
          </p>
        </div>

        {formError && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-800 mb-1.5">
              Judul lowongan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            />
          </div>

          <div>
            <label htmlFor="position" className="block text-sm font-semibold text-gray-800 mb-1.5">
              Posisi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Tipe pekerjaan <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-4">
              {["Full-Time", "Part-Time", "Kontrak", "Intern"].map((type) => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="job_type"
                    value={type}
                    checked={jobType === type}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-4 h-4 text-[#3B82F6]"
                  />
                  <span className="text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="candidates" className="block text-sm font-semibold text-gray-800 mb-1.5">
                Kandidat yang dibutuhkan <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="candidates"
                min="1"
                value={candidatesNeeded}
                onChange={(e) => setCandidatesNeeded(Number(e.target.value))}
                required
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              />
            </div>

            <div>
              <label htmlFor="active_until" className="block text-sm font-semibold text-gray-800 mb-1.5">
                Aktif hingga <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="active_until"
                value={activeUntil}
                onChange={(e) => setActiveUntil(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-gray-800 mb-1.5">
              Lokasi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            />
            <label className="mt-2 flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                id="is_remote"
                checked={isRemote}
                onChange={(e) => setIsRemote(e.target.checked)}
                className="w-4 h-4 rounded text-[#3B82F6]"
              />
              <span className="text-xs text-gray-600">Bisa remote</span>
            </label>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-800 mb-1.5">
              Deskripsi <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              rows={8}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Minimum pengalaman bekerja <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-4">
              {[
                "Kurang dari 1 tahun",
                "1-3 tahun",
                "4-5 tahun",
                "6-10 tahun",
                "Lebih dari 10 tahun",
              ].map((exp) => (
                <label key={exp} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="min_experience"
                    value={exp}
                    checked={minExperience === exp}
                    onChange={(e) => setMinExperience(e.target.value)}
                    className="w-4 h-4 text-[#3B82F6]"
                  />
                  <span className="text-sm text-gray-700">{exp}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4 flex items-center gap-3">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#2D3E50] text-white text-sm font-semibold hover:bg-gray-800 transition disabled:opacity-50"
            >
              {updateMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Simpan Perubahan
                </>
              )}
            </button>

            <Link
              href="/dashboard"
              className="px-6 py-2.5 bg-gray-100 text-gray-700 border border-[#E4E4E7] text-sm font-medium hover:bg-gray-200 transition"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function EditVacancyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#3B82F6] mb-3" />
          <p className="text-gray-500 text-sm">Memuat...</p>
        </div>
      }
    >
      <EditVacancyContent />
    </Suspense>
  );
}