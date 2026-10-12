<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class VacancyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // Indonesian months helper
        $indonesianMonths = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
        ];

        $formatIndonesianDate = function (?Carbon $date) use ($indonesianMonths) {
            if (!$date) return null;
            $day = $date->day;
            $month = $indonesianMonths[$date->month] ?? $date->format('F');
            $year = $date->year;
            return "{$day} {$month} {$year}";
        };

        $formattedSalary = null;
        if ($this->show_salary && $this->min_salary) {
            $formattedMin = 'Rp ' . number_format($this->min_salary, 0, ',', '.');
            if ($this->max_salary && $this->max_salary > $this->min_salary) {
                $formattedMax = 'Rp ' . number_format($this->max_salary, 0, ',', '.');
                $formattedSalary = "{$formattedMin} - {$formattedMax}";
            } else {
                $formattedSalary = $formattedMin;
            }
        }

        return [
            'id' => $this->id,
            'title' => $this->title,
            'position' => $this->position,
            'job_type' => $this->job_type,
            'candidates_needed' => $this->candidates_needed,
            'active_until' => $this->active_until ? $this->active_until->format('Y-m-d') : null,
            'formatted_active_until' => $formatIndonesianDate($this->active_until ? Carbon::parse($this->active_until) : null),
            'formatted_created_at' => $formatIndonesianDate($this->created_at ? Carbon::parse($this->created_at) : null),
            'location' => $this->location,
            'is_remote' => (bool) $this->is_remote,
            'description' => $this->description,
            'responsibilities' => $this->responsibilities,
            'requirements' => $this->requirements,
            'min_salary' => $this->min_salary,
            'max_salary' => $this->max_salary,
            'show_salary' => (bool) $this->show_salary,
            'formatted_salary' => $formattedSalary,
            'min_experience' => $this->min_experience,
            'company_name' => $this->company_name ?? 'Dicoding Indonesia',
            'company_sector' => $this->company_sector ?? 'Technology',
            'company_size' => $this->company_size ?? '50-100 Karyawan',
            'company_logo' => $this->company_logo,
            'is_active' => $this->isActive(),
            'created_at' => $this->created_at ? $this->created_at->toISOString() : null,
            'updated_at' => $this->updated_at ? $this->updated_at->toISOString() : null,
        ];
    }
}
