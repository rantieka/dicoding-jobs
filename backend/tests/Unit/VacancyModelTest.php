<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Vacancy;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;

class VacancyModelTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_correctly_casts_attributes(): void
    {
        $vacancy = new Vacancy([
            'title' => 'Software Engineer',
            'position' => 'Software Engineer',
            'job_type' => 'Full-Time',
            'candidates_needed' => '3',
            'active_until' => '2026-12-31',
            'location' => 'Bandung',
            'is_remote' => 1,
            'description' => 'Test description',
            'min_salary' => '8000000',
            'max_salary' => '12000000',
            'show_salary' => 1,
            'min_experience' => '1-3 tahun',
        ]);

        $this->assertIsInt($vacancy->candidates_needed);
        $this->assertEquals(3, $vacancy->candidates_needed);
        $this->assertTrue($vacancy->is_remote);
        $this->assertTrue($vacancy->show_salary);
        $this->assertInstanceOf(Carbon::class, $vacancy->active_until);
    }

    public function test_is_active_returns_true_for_future_date(): void
    {
        $vacancy = new Vacancy([
            'active_until' => Carbon::now()->addDays(5),
        ]);

        $this->assertTrue($vacancy->isActive());
    }

    public function test_is_active_returns_false_for_past_date(): void
    {
        $vacancy = new Vacancy([
            'active_until' => Carbon::now()->subDays(5),
        ]);

        $this->assertFalse($vacancy->isActive());
    }

    public function test_scope_search_filters_by_title_and_position(): void
    {
        Vacancy::factory()->create([
            'title' => 'Senior React Developer',
            'position' => 'Frontend Developer',
        ]);

        Vacancy::factory()->create([
            'title' => 'Laravel Backend Engineer',
            'position' => 'Backend Developer',
        ]);

        $results = Vacancy::search('React')->get();
        $this->assertCount(1, $results);
        $this->assertEquals('Senior React Developer', $results->first()->title);

        $resultsBackend = Vacancy::search('Backend')->get();
        $this->assertCount(1, $resultsBackend);
        $this->assertEquals('Laravel Backend Engineer', $resultsBackend->first()->title);
    }
}