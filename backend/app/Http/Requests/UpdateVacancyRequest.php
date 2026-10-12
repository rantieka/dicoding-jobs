<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVacancyRequest extends FormRequest
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
            "title" => ["sometimes", "required", "string", "max:255"],
            "position" => ["sometimes", "required", "string", "max:255"],
            "job_type" => ["sometimes", "required", "string", "in:Full-Time,Part-Time,Kontrak,Intern"],
            "candidates_needed" => ["sometimes", "required", "integer", "min:1"],
            "active_until" => ["sometimes", "required", "date"],
            "location" => ["sometimes", "required", "string", "max:255"],
            "is_remote" => ["nullable", "boolean"],
            "description" => ["sometimes", "required", "string"],
            "responsibilities" => ["nullable", "string"],
            "requirements" => ["nullable", "string"],
            "min_salary" => ["nullable", "numeric", "min:0"],
            "max_salary" => ["nullable", "numeric", "gte:min_salary"],
            "show_salary" => ["nullable", "boolean"],
            "min_experience" => ["sometimes", "required", "string", "in:Kurang dari 1 tahun,1-3 tahun,4-5 tahun,6-10 tahun,Lebih dari 10 tahun"],
            "company_name" => ["nullable", "string", "max:255"],
            "company_sector" => ["nullable", "string", "max:255"],
            "company_size" => ["nullable", "string", "max:255"],
            "company_logo" => ["nullable", "string"],
        ];
    }
}
