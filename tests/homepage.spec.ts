import { test, expect } from "@playwright/test";
import {
  FIRST_IMAGE_ALT,
  SECOND_IMAGE_ALT,
  THIRD_IMAGE_ALT,
} from "../src/constants";

const slides = [
  {
    alt: FIRST_IMAGE_ALT,
    nextClicks: 0,
  },
  { alt: SECOND_IMAGE_ALT, nextClicks: 1 },
  { alt: THIRD_IMAGE_ALT, nextClicks: 2 },
];

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

for (const { alt, nextClicks } of slides) {
  test(`"${alt}" becomes visible after ${nextClicks} clicks`, async ({
    page,
  }) => {
    const imageCarousel = page.getByRole("region", { name: "Image Carousel" });
    const nextButton = imageCarousel.getByRole("button", { name: "Next" });
    const currentImage = imageCarousel.locator(".yarl__slide_current");
    for (let i = 0; i < nextClicks; i++) {
      await nextButton.click();
    }
    await expect(currentImage.getByRole("img")).toHaveAccessibleName(alt);
  });
}
