import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("homepage has correct title", async ({ page }) => {
  await expect(page).toHaveTitle(/Food Harbour/);
});
