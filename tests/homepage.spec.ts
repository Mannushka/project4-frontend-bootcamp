import { test, expect } from "@playwright/test";
import {
  FIRST_IMAGE_ALT,
  SECOND_IMAGE_ALT,
  THIRD_IMAGE_ALT,
} from "../src/constants";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("homepage has correct title", async ({ page }) => {
  await expect(page).toHaveTitle(/Food Harbour/);
});

test("imageCarousel is rendered correctly", async ({ page }) => {
  const imageCarousel = page.getByRole("region", { name: "Image Carousel" });
  await expect(imageCarousel).toBeVisible();
});

test("first image in carousel is visible", async ({ page }) => {
  const image = page.getByRole("img", { name: FIRST_IMAGE_ALT });
  await expect(image).toBeVisible();
});
