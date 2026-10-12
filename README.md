# Dicoding Jobs - Vacancy Management System

A modern job vacancy platform for **Dicoding Jobs**, built as a full-stack technical assessment solution connecting recruiters with top tech talent in Indonesia. This project consists of a robust **Laravel RESTful API** backend, an interactive **Next.js & TanStack Query** frontend, precision **Figma-aligned styling**, and comprehensive automated test suites (**Unit, Integration, and End-to-End**).

---

## 📌 Features

### 1. User Stories & Capabilities
- 💼 **Recruiter**:
  - **Recruiter Dashboard (`/dashboard`)**: Dedicated management dashboard displaying published vacancies with creation and expiry dates, quick edit navigation, and deletion actions.
  - **Create Vacancy (`/vacancies/create` & `POST /api/vacancies`)**: Comprehensive form matching Figma designs, including Title, Position, Job Type (Full-Time, Part-Time, Contract, Intern), Candidates Needed, Expiry Date, Location, Remote option, Description template, Salary Range (Min-Max) with a Show Salary toggle, and Minimum Experience.
  - **Edit Vacancy (`/vacancies/[id]/edit` & `PUT /api/vacancies/{id}`)**: Update existing vacancy details with pre-populated form fields and instant cache invalidation.
  - **Delete Vacancy (`DELETE /api/vacancies/{id}`)**: Remove vacancies with confirmation prompts and automated state updates.
- 🔍 **Job Seeker**:
  - **Browse Vacancies (`/` & `GET /api/vacancies`)**: Browse the latest tech job openings in real-time.
  - **Live Search**: Instant keyword filtering by job title with immediate UI feedback and query clear shortcuts.
  - **Vacancy Details (`/vacancies/[id]` & `GET /api/vacancies/{id}`)**: View full job descriptions, responsibilities, requirements, salary badges, and company details.

### 2. Design & Styling (Figma Accuracy)
- **Navigation & Brand Identity**: Header with official "9 Jobs" logo and active route indicators.
- **Hero Jumbotrons**: Sleek `#18181B` dark banner featuring a capsule avatar and `#3B82F6` accent typography.
- **Consistent Job Cards**: Reusable cards showcasing company branding, employment type, location, experience levels, and aligned publish dates.
- **Recruiter Dashboard UI**: Custom sidebar navigation with "Lowongan Saya" menu, action buttons, and dark slate tile branding.
- **Responsive & Accessible**: Mobile-friendly responsive layouts with semantic HTML and smooth state transitions.

---

## 📁 Directory Structure

```
dicoding-jobs/
├── backend/                          # Laravel RESTful API
│   ├── app/
│   │   ├── Http/Controllers/
│   │   │   └── VacancyController.php # Full CRUD & Search Controller
│   │   ├── Http/Requests/
│   │   │   ├── StoreVacancyRequest.php
│   │   │   └── UpdateVacancyRequest.php
│   │   ├── Http/Resources/
│   │   │   └── VacancyResource.php   # JSON API Resource Transformer
│   │   └── Models/
│   │       └── Vacancy.php           # Eloquent Model with Scopes & Casting
│   ├── database/
│   │   ├── factories/
│   │   │   └── VacancyFactory.php    # Test & Seeding Factory
│   │   ├── migrations/
│   │   │   └── 2026_10_12_014612_create_vacancies_table.php
│   │   └── seeders/
│   │       └── VacancySeeder.php     # Initial Demo Data matching Figma
│   ├── routes/
│   │   └── api.php                   # API Routes definition
│   ├── tests/
│   │   ├── Feature/
│   │   │   └── VacancyApiTest.php    # API Integration Tests
│   │   └── Unit/
│   │       └── VacancyModelTest.php  # Unit Tests
│   └── phpunit.xml
├── frontend/                         # Next.js Application
│   ├── e2e/
│   │   └── vacancies.spec.ts         # Playwright End-to-End Tests
│   ├── public/
│   │   ├── dicoding-logo.png
│   │   ├── dicoding-wordmark.png
│   │   ├── hero-pill.png
│   │   ├── logo-jobs.png
│   │   └── tile-9.png
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx            # Global Layout with Navbar & Footer
│   │   │   ├── page.tsx              # Home / Job Search View
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx          # Recruiter Dashboard
│   │   │   └── vacancies/
│   │   │       ├── [id]/
│   │   │       │   ├── page.tsx      # Vacancy Detail View
│   │   │       │   └── edit/
│   │   │       │       └── page.tsx  # Edit Vacancy Form
│   │   │       └── create/
│   │   │           └── page.tsx      # Create Vacancy Form
│   │   ├── components/
│   │   │   ├── Footer.tsx
│   │   │   ├── JobCard.tsx           # Reusable Job Card Component
│   │   │   ├── Navbar.tsx            # Header Navigation
│   │   │   └── Providers.tsx         # TanStack Query Client Provider
│   │   ├── lib/
│   │   │   └── api.ts                # API Client Services
│   │   └── types/
│   │       └── vacancy.ts            # TypeScript Types & Interfaces
│   └── playwright.config.ts
└── README.md
```

---

## ⚙️ Setup Instructions

### Prerequisites
- **PHP** >= 8.2 (with `pdo_mysql`, `mbstring`, and `openssl` extensions enabled)
- **Composer** >= 2.x
- **Node.js** >= 18.x & **npm**
- **MySQL** (recommended via **Laragon** or XAMPP)

---

### Step 1: Database Setup (MySQL)
1. Start MySQL (e.g., in **Laragon**, click **Start All** on port `3306`).
2. Create the application and testing databases:
   ```sql
   CREATE DATABASE IF NOT EXISTS `dicoding_jobs` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE DATABASE IF NOT EXISTS `dicoding_jobs_test` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

---

### Step 2: Backend Setup (Laravel)
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Copy the environment configuration file if not already present:
   ```bash
   copy .env.example .env
   ```
3. Ensure the database credentials in `.env` are configured properly:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=dicoding_jobs
   DB_USERNAME=root
   DB_PASSWORD=
   ```
4. Run migrations and database seeders to populate initial vacancies:
   ```bash
   php artisan migrate:fresh --seed
   ```
5. Start the backend development server:
   ```bash
   php artisan serve --host=127.0.0.1 --port=8000
   ```
   The backend API will be available at: `http://127.0.0.1:8000`

---

### Step 3: Frontend Setup (Next.js)
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to: [http://localhost:3000](http://localhost:3000).

---

## 🧪 Running Automated Tests

### 1. Backend Tests (Unit & Integration)
Navigate to the `backend` directory and run:
```bash
php artisan test
```
**Test coverage includes:**
- **Unit Tests (`tests/Unit/VacancyModelTest.php`)**:
  - Attribute casting verification (integers, booleans, dates).
  - Helper logic: `isActive()` deadline validation.
  - Query scope: `scopeSearch()` title and position filtering.
- **Integration Tests (`tests/Feature/VacancyApiTest.php`)**:
  - `GET /api/vacancies` (Retrieve list & JSON API structure validation).
  - `GET /api/vacancies?search=Android` (Real-time keyword search).
  - `POST /api/vacancies` (Validation rules & database persistence).
  - `GET /api/vacancies/{id}` (Detail view & 404 handling).
  - `PUT /api/vacancies/{id}` (Update vacancy records).
  - `DELETE /api/vacancies/{id}` (Record removal).

---

### 2. Frontend End-to-End Tests (Playwright)
Ensure both the backend server (`http://127.0.0.1:8000`) and the frontend server (`http://localhost:3000`) are running.

From the `frontend` directory, run:
```bash
npm run test:e2e
```
Or to run tests interactively in the Playwright UI:
```bash
npx playwright test --ui
```
**Automated E2E Scenarios:**
1. **User opens the vacancies list page**: Verifies banner visibility, navigation links, and initial vacancy cards.
2. **User searches a job by title**: Enters search keywords, verifies heading update to "Hasil Pencarian", and checks filtered results.
3. **User views vacancy details**: Clicks a vacancy card, navigates to the detail page, and checks all displayed job information.
4. **Recruiter creates a new vacancy**: Fills in the creation form, submits the data, verifies API persistence, and redirects to the newly created vacancy.

---
