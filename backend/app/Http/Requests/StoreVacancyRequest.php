<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVacancyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "title" => ["required", "string", "max:255"],
            "position" => ["required", "string", "max:255"],
            "job_type" => ["required", "string", "in:Full-Time,Part-Time,Kontrak,Intern"],
            "candidates_needed" => ["required", "integer", "min:1"],
            "active_until" => ["required", "date"],
            "location" => ["required", "string", "max:255"],
            "is_remote" => ["nullable", "boolean"],
            "description" => ["required", "string"],
            "responsibilities" => ["nullable", "string"],
            "requirements" => ["nullable", "string"],
            "min_salary" => ["nullable", "numeric", "min:0"],
            "max_salary" => ["nullable", "numeric", "gte:min_salary"],
            "show_salary" => ["nullable", "boolean"],
            "min_experience" => ["required", "string", "in:Kurang dari 1 tahun,1-3 tahun,4-5 tahun,6-10 tahun,Lebih dari 10 tahun"],
            "company_name" => ["nullable", "string", "max:255"],
            "company_sector" => ["nullable", "string", "max:255"],
            "company_size" => ["nullable", "string", "max:255"],
            "company_logo" => ["nullable", "string"],
        ];
    }

    /**
     * Custom validation messages in Indonesian.
     */
    public function messages(): array
    {
        return [
            "title.required" => "Judul lowongan wajib diisi.",
            "position.required" => "Posisi lowongan wajib dipilih.",
            "job_type.required" => "Tipe pekerjaan wajib dipilih.",
            "candidates_needed.required" => "Jumlah kandidat yang dibutuhkan wajib diisi.",
            "candidates_needed.min" => "Jumlah kandidat minimal 1 orang.",
            "active_until.required" => "Batas aktif lowongan wajib diisi.",
            "location.required" => "Lokasi pekerjaan wajib dipilih.",
            "description.required" => "Deskripsi lowongan wajib diisi.",
            "min_experience.required" => "Minimum pengalaman bekerja wajib dipilih.",
            "max_salary.gte" => "Gaji maksimum harus lebih besar atau sama dengan gaji minimum.",
        ];
    }
}
