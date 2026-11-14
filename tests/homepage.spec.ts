import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/homepage";
import {
  FIRST_IMAGE_ALT,
  SECOND_IMAGE_ALT,
  THIRD_IMAGE_ALT,
} from "../src/constants";
import { REVIEW_CARD_CONTENT_TEST_DATA } from "./fixtures/reviewCardContentTestData";

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
            ? homePage.carouselButton("Next")
            : homePage.carouselButton("Previous");
        await navButton.click();
      }

      await expect(homePage.carouselActiveSlide).toHaveAccessibleName(
        expectedAlt,
      );
    });
  }

  test("recent activities heading is rendered correctly", async () => {
    await expect(homePage.recentActivityHeading).toBeVisible();
  });

  // need to test if all the review cards are rendered correctly, there 9 review cards on one page, so 9 is the maximum number of review cards that can be rendered on one page, so we can test if the number of review cards is less than or equal to 9

  test("recent activities review cards are rendered correctly", async () => {
    await expect(homePage.reviewCards).toHaveCount(9);

    const reviews = REVIEW_CARD_CONTENT_TEST_DATA; //later we can fetch the review data from the backend, but for now we can use the test data from the fixture file
    for (let i = 0; i < reviews.length; i++) {
      const reviewCard = homePage.reviewCardByRestaurant(reviews[i].restaurant);
      await expect(reviewCard).toContainText(
        `${reviews[i].author} created a review for ${reviews[i].restaurant}`,
      );

      await expect(reviewCard).toContainText(reviews[i].textSnippet);
      await expect(homePage.imagesInReviewCard(reviewCard)).toHaveCount(
        reviews[i].photoCount,
      );
    }
  });

  test("", async () => {});
});
