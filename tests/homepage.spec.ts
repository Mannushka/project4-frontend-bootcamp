import { test, expect } from "@playwright/test";
import {
  FIRST_IMAGE_ALT,
  SECOND_IMAGE_ALT,
  THIRD_IMAGE_ALT,
} from "../src/constants";

const carouselSlideNavigationCases = [
  { button: "Next", clicks: 0, expectedAlt: FIRST_IMAGE_ALT },
  { button: "Next", clicks: 1, expectedAlt: SECOND_IMAGE_ALT },
  { button: "Next", clicks: 2, expectedAlt: THIRD_IMAGE_ALT },
  { button: "Previous", clicks: 0, expectedAlt: FIRST_IMAGE_ALT },
  { button: "Previous", clicks: 1, expectedAlt: THIRD_IMAGE_ALT },
  { button: "Previous", clicks: 2, expectedAlt: SECOND_IMAGE_ALT },
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

for (const { button, clicks, expectedAlt } of carouselSlideNavigationCases) {
  test(`"${expectedAlt}" becomes visible after ${clicks} ${button} button clicks`, async ({
    page,
  }) => {
    const imageCarousel = page.getByRole("region", { name: "Image Carousel" });
    const navigationButton = imageCarousel.getByRole("button", {
      name: button,
    });
    const currentImage = imageCarousel.locator(".yarl__slide_current");
    for (let i = 0; i < clicks; i++) {
      await navigationButton.click();
    }

    await expect(currentImage.getByRole("img")).toHaveAccessibleName(
      expectedAlt,
    );
  });
}
