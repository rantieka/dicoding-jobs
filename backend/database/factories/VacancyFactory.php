<?php

namespace Database\Factories;

use App\Models\Vacancy;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vacancy>
 */
class VacancyFactory extends Factory
{
    protected $model = Vacancy::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $positions = [
            'Product Engineer',
            'Android Developer',
            'iOS Developer',
            'Frontend Developer',
            'Backend Developer',
            'Full Stack Developer',
            'Code Reviewer',
            'DevOps Engineer'
        ];

        $jobTypes = ['Full-Time', 'Part-Time', 'Kontrak', 'Intern'];
        $experiences = ['Kurang dari 1 tahun', '1-3 tahun', '4-5 tahun', '6-10 tahun', 'Lebih dari 10 tahun'];
        $locations = ['Bandung', 'Jakarta', 'Yogyakarta', 'Surabaya', 'Semarang'];

        $position = fake()->randomElement($positions);

        return [
            'title' => $position,
            'position' => $position,
            'job_type' => fake()->randomElement($jobTypes),
            'candidates_needed' => fake()->numberBetween(1, 5),
            'active_until' => fake()->dateTimeBetween('+10 days', '+60 days')->format('Y-m-d'),
            'location' => fake()->randomElement($locations),
            'is_remote' => fake()->boolean(60),
            'description' => fake()->paragraphs(3, true),
            'responsibilities' => "• Mengembangkan fitur aplikasi.\n• Melakukan testing dan deployment.\n• Berkolaborasi dengan tim lintas fungsi.",
            'requirements' => "• Menguasai bahasa pemrograman terkait.\n• Memiliki pengalaman relevan.\n• Mampu berkomunikasi dengan baik.",
            'min_salary' => fake()->numberBetween(5000000, 10000000),
            'max_salary' => fake()->numberBetween(12000000, 20000000),
            'show_salary' => fake()->boolean(70),
            'min_experience' => fake()->randomElement($experiences),
            'company_name' => 'Dicoding Indonesia',
            'company_sector' => 'Technology',
            'company_size' => '50-100 Karyawan',
            'company_logo' => null,
        ];
    }
}