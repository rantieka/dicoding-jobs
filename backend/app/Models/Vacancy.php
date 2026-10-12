<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Vacancy extends Model
{
    use HasFactory;

    protected $fillable = [
        "title",
        "position",
        "job_type",
        "candidates_needed",
        "active_until",
        "location",
        "is_remote",
        "description",
        "responsibilities",
        "requirements",
        "min_salary",
        "max_salary",
        "show_salary",
        "min_experience",
        "company_name",
        "company_sector",
        "company_size",
        "company_logo",
    ];

    protected $casts = [
        "active_until" => "date",
        "is_remote" => "boolean",
        "show_salary" => "boolean",
        "candidates_needed" => "integer",
        "min_salary" => "integer",
        "max_salary" => "integer",
    ];

    /**
     * Scope to search vacancies by title, position, or keyword.
     */
    public function scopeSearch(Builder $query, ?string $term): Builder
    {
        if (blank($term)) {
            return $query;
        }

        return $query->where(function (Builder $q) use ($term) {
            $q->where("title", "like", "%{$term}%")
              ->orWhere("position", "like", "%{$term}%")
              ->orWhere("location", "like", "%{$term}%");
        });
    }

    /**
     * Check if vacancy is still active.
     */
    public function isActive(): bool
    {
        return $this->active_until ? $this->active_until->isFuture() || $this->active_until->isToday() : true;
    }
}
