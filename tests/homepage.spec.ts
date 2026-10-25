import { test, expect } from "@playwright/test";
import {
  FIRST_IMAGE_ALT,
  SECOND_IMAGE_ALT,
  THIRD_IMAGE_ALT,
} from "../src/constants";

const nextSlides = [
  {
    alt: FIRST_IMAGE_ALT,
    nextClicks: 0,
  },
  { alt: SECOND_IMAGE_ALT, nextClicks: 1 },
  { alt: THIRD_IMAGE_ALT, nextClicks: 2 },
];
const previousSlides = [
  { alt: FIRST_IMAGE_ALT, previousClicks: 0 },
  { alt: THIRD_IMAGE_ALT, previousClicks: 1 },
  { alt: SECOND_IMAGE_ALT, previousClicks: 2 },
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

for (const { alt, nextClicks } of nextSlides) {
  test(`"${alt}" becomes visible after ${nextClicks} next button clicks`, async ({
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

for (const { alt, previousClicks } of previousSlides) {
  test(`"${alt}" becomes visible after ${previousClicks} previous button clicks`, async ({
    page,
  }) => {
    const imageCarousel = page.getByRole("region", { name: "Image Carousel" });
    const previousButton = imageCarousel.getByRole("button", {
      name: "Previous",
    });
    const currentSlide = imageCarousel.locator(".yarl__slide_current");
    for (let i = 0; i < previousClicks; i++) {
      await previousButton.click();
    }

    await expect(currentSlide.getByRole("img")).toHaveAccessibleName(alt);
  });
}
