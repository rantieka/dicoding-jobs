<?php

namespace Database\Seeders;

use App\Models\Vacancy;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class VacancySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Vacancy::truncate();

        $vacancies = [
            [
                'title' => 'Product Engineer',
                'position' => 'Product Engineer',
                'job_type' => 'Full-Time',
                'candidates_needed' => 1,
                'active_until' => Carbon::now()->addDays(30),
                'location' => 'Bandung',
                'is_remote' => true,
                'description' => "As a Product Engineer, you will be joining the Product & Engineering team in building impactful products for Dicoding users. With your programming skills, you will be responsible for creating great experiences for our users.\n\nWe are looking for an engineer, who not only knows how to program with good functionality, but also solves user problems. When building dicoding.com, we always try to:\n• Give maximum impact from the solutions we built.\n• Live a balanced life (it is important for engineers to sleep well).",
                'responsibilities' => "• Collaborate with designers and other stakeholders in analyzing problems and solutions to be built.\n• Develop and manage the dicoding.com platform.\n• Ensure all systems and components on dicoding.com run properly.\n• Write well-designed, easy-to-test, efficient, and clean code on both the front-end and back-end.",
                'requirements' => "When it comes to requirements, at Dicoding, we have no limitations on specific tools or technologies. We are open to any technology and tools that can meet the business needs and provide the best solutions for our users. With that in mind, here are the general requirements for a Product Engineer at Dicoding:\n• Proficiency in Git and Unix-based systems.\n• Good knowledge of web technologies.\n• Want to follow and learn the development culture in Dicoding: Test Driven Development.\n• Able to understand the requirements of a solution that will be built properly.\n• Having a growth mindset and high curiosity.",
                'min_salary' => 8000000,
                'max_salary' => 15000000,
                'show_salary' => true,
                'min_experience' => '1-3 tahun',
                'company_name' => 'Dicoding Indonesia',
                'company_sector' => 'Technology',
                'company_size' => '50-100 Karyawan',
                'created_at' => Carbon::now()->subDays(5),
                'updated_at' => Carbon::now()->subDays(5),
            ],
            [
                'title' => 'Android Developer',
                'position' => 'Android Developer',
                'job_type' => 'Full-Time',
                'candidates_needed' => 2,
                'active_until' => Carbon::now()->addDays(20),
                'location' => 'Bandung',
                'is_remote' => false,
                'description' => "Sebagai Android Developer di Dicoding, Anda akan bertanggung jawab untuk mengembangkan dan memelihara aplikasi native Android menggunakan Kotlin dan arsitektur modern (Jetpack Compose, MVVM/MVI, Clean Architecture).",
                'responsibilities' => "• Mengembangkan fitur aplikasi native Android berkualitas tinggi.\n• Berkolaborasi dengan tim UI/UX dan backend developer.\n• Melakukan unit testing dan code review secara rutin.\n• Mengoptimalkan performa aplikasi dan konsumsi memori.",
                'requirements' => "• Pengalaman dengan Kotlin dan Android SDK.\n• Memahami Coroutines, Flow, dan Jetpack Compose.\n• Menguasai prinsip OOP dan Clean Architecture.\n• Terbiasa bekerja dengan Git version control.",
                'min_salary' => 10000000,
                'max_salary' => 18000000,
                'show_salary' => true,
                'min_experience' => '4-5 tahun',
                'company_name' => 'Dicoding Indonesia',
                'company_sector' => 'Technology',
                'company_size' => '50-100 Karyawan',
                'created_at' => Carbon::now()->subDays(3),
                'updated_at' => Carbon::now()->subDays(3),
            ],
            [
                'title' => 'iOS Developer',
                'position' => 'iOS Developer',
                'job_type' => 'Full-Time',
                'candidates_needed' => 1,
                'active_until' => Carbon::now()->addDays(25),
                'location' => 'Bandung',
                'is_remote' => true,
                'description' => "Sebagai iOS Developer, Anda akan merancang dan mengimplementasikan aplikasi mobile iOS Dicoding dengan SwiftUI dan Swift modern untuk memberikan pengalaman belajar terbaik kepada para siswa.",
                'responsibilities' => "• Membangun antarmuka pengguna yang responsif menggunakan SwiftUI.\n• Mengintegrasikan RESTful API dengan performa tinggi.\n• Menjamin kualitas kode melalui pengujian unit dan UI testing.",
                'requirements' => "• Memiliki pengalaman dengan Swift dan iOS SDK.\n• Memahami Combine atau Swift Concurrency (async/await).\n• Mengerti best practice App Store guidelines.",
                'min_salary' => 9000000,
                'max_salary' => 16000000,
                'show_salary' => true,
                'min_experience' => '1-3 tahun',
                'company_name' => 'Dicoding Indonesia',
                'company_sector' => 'Technology',
                'company_size' => '50-100 Karyawan',
                'created_at' => Carbon::now()->subDays(2),
                'updated_at' => Carbon::now()->subDays(2),
            ],
            [
                'title' => 'Code Reviewer',
                'position' => 'Code Reviewer',
                'job_type' => 'Full-Time',
                'candidates_needed' => 5,
                'active_until' => Carbon::now()->addDays(40),
                'location' => 'Bandung',
                'is_remote' => true,
                'description' => "Sebagai Code Reviewer di Dicoding Academy, Anda akan memeriksa dan memberikan umpan balik konstruktif terhadap submission kode para siswa di berbagai learning path (Web, Android, Cloud, Machine Learning).",
                'responsibilities' => "• Melakukan review submission tugas akhir siswa sesuai kriteria kelulusan.\n• Memberikan saran perbaikan kode yang ramah, jelas, dan edukatif.\n• Menjaga standar kualitas kode yang diajarkan pada kurikulum Dicoding.",
                'requirements' => "• Lulusan Dicoding Academy atau memiliki pemahaman kuat tentang web/mobile development.\n• Memiliki ketelitian tinggi dan kemampuan komunikasi yang baik.\n• Semangat membantu sesama pembelajar coding di Indonesia.",
                'min_salary' => 5000000,
                'max_salary' => 8000000,
                'show_salary' => true,
                'min_experience' => 'Kurang dari 1 tahun',
                'company_name' => 'Dicoding Indonesia',
                'company_sector' => 'Technology',
                'company_size' => '50-100 Karyawan',
                'created_at' => Carbon::now()->subDays(1),
                'updated_at' => Carbon::now()->subDays(1),
            ],
        ];

        foreach ($vacancies as $item) {
            Vacancy::create($item);
        }
    }
}