<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Vacancy;
use Illuminate\Foundation\Testing\RefreshDatabase;

class VacancyApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_all_vacancies(): void
    {
        Vacancy::factory()->count(3)->create();

        $response = $this->getJson('/api/vacancies');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'title',
                        'position',
                        'job_type',
                        'location',
                        'min_experience',
                        'formatted_created_at',
                        'formatted_active_until',
                    ]
                ]
            ]);

        $this->assertCount(3, $response->json('data'));
    }

    public function test_can_search_vacancies_by_title(): void
    {
        Vacancy::factory()->create([
            'title' => 'Android Developer',
            'position' => 'Android Developer'
        ]);

        Vacancy::factory()->create([
            'title' => 'Product Engineer',
            'position' => 'Product Engineer'
        ]);

        $response = $this->getJson('/api/vacancies?search=Android');

        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertCount(1, $data);
        $this->assertEquals('Android Developer', $data[0]['title']);
    }

    public function test_can_create_new_vacancy_with_valid_data(): void
    {
        $payload = [
            'title' => 'Senior Full Stack Engineer',
            'position' => 'Full Stack Developer',
            'job_type' => 'Full-Time',
            'candidates_needed' => 2,
            'active_until' => '2026-12-31',
            'location' => 'Bandung',
            'is_remote' => true,
            'description' => 'Membangun aplikasi web kelas dunia di Dicoding.',
            'responsibilities' => '• Mengembangkan frontend dan backend.',
            'requirements' => '• Pengalaman Next.js dan Laravel.',
            'min_salary' => 12000000,
            'max_salary' => 20000000,
            'show_salary' => true,
            'min_experience' => '4-5 tahun',
        ];

        $response = $this->postJson('/api/vacancies', $payload);

        $response->assertStatus(201)
            ->assertJsonPath('data.title', 'Senior Full Stack Engineer')
            ->assertJsonPath('data.location', 'Bandung');

        $this->assertDatabaseHas('vacancies', [
            'title' => 'Senior Full Stack Engineer',
            'position' => 'Full Stack Developer',
            'location' => 'Bandung'
        ]);
    }

    public function test_create_vacancy_validation_fails_when_fields_missing(): void
    {
        $response = $this->postJson('/api/vacancies', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['title', 'position', 'job_type', 'candidates_needed', 'active_until', 'location', 'description', 'min_experience']);
    }

    public function test_can_get_vacancy_details(): void
    {
        $vacancy = Vacancy::factory()->create([
            'title' => 'DevOps Specialist',
            'position' => 'DevOps Engineer',
            'company_name' => 'Dicoding Indonesia'
        ]);

        $response = $this->getJson("/api/vacancies/{$vacancy->id}");

        $response->assertStatus(200)
            ->assertJsonPath('data.id', $vacancy->id)
            ->assertJsonPath('data.title', 'DevOps Specialist')
            ->assertJsonPath('data.company_name', 'Dicoding Indonesia');
    }

    public function test_get_non_existent_vacancy_returns_404(): void
    {
        $response = $this->getJson('/api/vacancies/99999');

        $response->assertStatus(404);
    }

    public function test_can_update_existing_vacancy(): void
    {
        $vacancy = Vacancy::factory()->create([
            'title' => 'Junior QA Engineer',
        ]);

        $response = $this->putJson("/api/vacancies/{$vacancy->id}", [
            'title' => 'Mid-level QA Engineer',
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.title', 'Mid-level QA Engineer');

        $this->assertDatabaseHas('vacancies', [
            'id' => $vacancy->id,
            'title' => 'Mid-level QA Engineer'
        ]);
    }

    public function test_can_delete_vacancy(): void
    {
        $vacancy = Vacancy::factory()->create();

        $response = $this->deleteJson("/api/vacancies/{$vacancy->id}");

        $response->assertStatus(200)
            ->assertJsonPath('message', 'Lowongan berhasil dihapus.');

        $this->assertDatabaseMissing('vacancies', [
            'id' => $vacancy->id
        ]);
    }
}