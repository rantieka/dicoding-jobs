import { test, expect } from "@playwright/test";

test.describe("Dicoding Jobs E2E Assessment", () => {
  test("User opens the vacancies list page", async ({ page }) => {
    await page.goto("/");

    // Verify main brand and headline
    await expect(page.locator("text=Dicoding Jobs")).toBeVisible();
    await expect(
      page.locator("text=Temukan lowongan yang cocok untuk kamu")
    ).toBeVisible();

    // Verify header title
    await expect(page.locator("#job-list-heading")).toHaveText(
      "Daftar Pekerjaan Terbaru"
    );

    // Verify that job cards are rendered
    const jobCards = page.locator('[id^="job-card-"]');
    await expect(jobCards.first()).toBeVisible({ timeout: 10000 });
    const count = await jobCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("User searches a job by title", async ({ page }) => {
    await page.goto("/");

    // Wait for job cards to load
    await page.waitForSelector('[id^="job-card-"]');

    const searchInput = page.locator("#job-search-input");
    await expect(searchInput).toBeVisible();

    // Search for "Android"
    await searchInput.fill("Android");

    // The heading switches to "Hasil Pencarian"
    await expect(page.locator("#job-list-heading")).toHaveText("Hasil Pencarian");

    // Verify that only the Android Developer vacancy is shown
    await expect(page.locator("text=Android Developer")).toBeVisible();
    await expect(page.locator("text=iOS Developer")).not.toBeVisible();

    // Clear search
    await searchInput.fill("");
    await expect(page.locator("#job-list-heading")).toHaveText(
      "Daftar Pekerjaan Terbaru"
    );
  });

  test("User views vacancy details", async ({ page }) => {
    await page.goto("/");

    // Wait for cards and click on a vacancy card
    const firstJobCard = page.locator('[id^="job-card-"]').first();
    await firstJobCard.waitFor();
    await firstJobCard.click();

    // Should navigate to /vacancies/[id]
    await expect(page).toHaveURL(/\/vacancies\/\d+/);

    // Check detail elements
    await expect(page.locator("#vacancy-detail-title")).toBeVisible();
    await expect(page.locator("text=Sektor Bisnis: Technology")).toBeVisible();
    await expect(page.locator("text=Dicoding Indonesia").first()).toBeVisible();
    await expect(page.locator("text=Job Description")).toBeVisible();
    await expect(page.locator("text=Informasi Tambahan")).toBeVisible();
    await expect(page.locator("text=Pengalaman bekerja")).toBeVisible();
    await expect(page.locator("text=Kandidat yang dibutuhkan")).toBeVisible();
  });

  test("Recruiter creates a new vacancy", async ({ page }) => {
    await page.goto("/vacancies/create");

    // Check create page heading
    await expect(page.locator("text=Buat lowongan pekerjaan")).toBeVisible();

    // Fill form
    await page.fill("#title", "Staff Machine Learning Engineer");
    await page.selectOption("#position", "Full Stack Developer");
    await page.check('input[value="Full-Time"]');
    await page.fill("#candidates", "2");
    await page.fill("#active_until", "2026-12-31");
    await page.selectOption("#location", "Bandung");
    await page.check("#is_remote");
    await page.fill(
      "#description",
      "Mengembangkan model machine learning skala besar untuk platform Dicoding."
    );
    await page.check('input[value="4-5 tahun"]');

    // Submit form
    await page.click("#submit-vacancy-btn");

    // Verify redirection to vacancy detail page
    await expect(page).toHaveURL(/\/vacancies\/\d+/, { timeout: 10000 });
    await expect(
      page.locator("text=Staff Machine Learning Engineer")
    ).toBeVisible();
  });
});