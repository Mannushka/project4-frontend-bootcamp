import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/homepage";
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

test.describe("homepage rendering", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
  });

  test("homepage has correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Food Harbour/);
  });
  test("imageCarousel is rendered correctly", async () => {
    await expect(homePage.imageCarousel).toBeVisible();
  });

  for (const { button, clicks, expectedAlt } of carouselSlideNavigationCases) {
    test(`"${expectedAlt}" becomes visible after ${clicks} ${button} button clicks`, async () => {
      for (let i = 0; i < clicks; i++) {
        const navButton =
          button === "Next"
            ? homePage.carouselNextButton
            : homePage.carouselPreviousButton;
        await navButton.click();
      }

      await expect(homePage.carouselActiveSlide).toHaveAccessibleName(
        expectedAlt,
      );
    });
  }
});
