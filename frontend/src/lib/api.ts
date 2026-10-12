import { Vacancy, VacancyInput } from "@/types/vacancy";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export async function fetchVacancies(search?: string): Promise<Vacancy[]> {
  const url = new URL(`${API_BASE_URL}/vacancies`);
  if (search && search.trim() !== "") {
    url.searchParams.set("search", search.trim());
  }

  const res = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil daftar lowongan pekerjaan");
  }

  const json = await res.json();
  return json.data;
}

export async function fetchVacancy(id: number | string): Promise<Vacancy> {
  const res = await fetch(`${API_BASE_URL}/vacancies/${id}`, {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil detail lowongan pekerjaan");
  }

  const json = await res.json();
  return json.data;
}

export async function createVacancy(input: VacancyInput): Promise<Vacancy> {
  const res = await fetch(`${API_BASE_URL}/vacancies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(input),
  });

  const json = await res.json();

  if (!res.ok) {
    const errorMsg = json.message || Object.values(json.errors || {}).flat().join(", ") || "Gagal membuat lowongan";
    throw new Error(errorMsg);
  }

  return json.data;
}

export async function updateVacancy(id: number | string, input: Partial<VacancyInput>): Promise<Vacancy> {
  const res = await fetch(`${API_BASE_URL}/vacancies/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(input),
  });

  const json = await res.json();

  if (!res.ok) {
    const errorMsg = json.message || Object.values(json.errors || {}).flat().join(", ") || "Gagal memperbarui lowongan";
    throw new Error(errorMsg);
  }

  return json.data;
}

export async function deleteVacancy(id: number | string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/vacancies/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Gagal menghapus lowongan");
  }
}