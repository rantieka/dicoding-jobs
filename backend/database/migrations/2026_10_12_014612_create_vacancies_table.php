<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vacancies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('position');
            $table->string('job_type'); // Full-Time, Part-Time, Kontrak, Intern
            $table->unsignedInteger('candidates_needed')->default(1);
            $table->date('active_until');
            $table->string('location');
            $table->boolean('is_remote')->default(false);
            $table->longText('description');
            $table->text('responsibilities')->nullable();
            $table->text('requirements')->nullable();
            $table->unsignedBigInteger('min_salary')->nullable();
            $table->unsignedBigInteger('max_salary')->nullable();
            $table->boolean('show_salary')->default(false);
            $table->string('min_experience'); // Kurang dari 1 tahun, 1-3 tahun, 4-5 tahun, 6-10 tahun, Lebih dari 10 tahun
            $table->string('company_name')->default('Dicoding Indonesia');
            $table->string('company_sector')->default('Technology');
            $table->string('company_size')->default('50-100 Karyawan');
            $table->string('company_logo')->nullable();
            $table->timestamps();

            $table->index('title');
            $table->index('position');
            $table->index('job_type');
            $table->index('location');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vacancies');
    }
};
