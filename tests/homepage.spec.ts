import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/homepage";
import {
  FIRST_IMAGE_ALT,
  SECOND_IMAGE_ALT,
  THIRD_IMAGE_ALT,
} from "../src/constants";
import { PAGE_ONE_REVIEWS } from "./fixtures/reviewCardContentTestData";

const carouselSlideNavigationCases = [
  { button: "Next", clicks: 0, expectedAlt: FIRST_IMAGE_ALT },
  { button: "Next", clicks: 1, expectedAlt: SECOND_IMAGE_ALT },
  { button: "Next", clicks: 2, expectedAlt: THIRD_IMAGE_ALT },
  { button: "Previous", clicks: 0, expectedAlt: FIRST_IMAGE_ALT },
  { button: "Previous", clicks: 1, expectedAlt: THIRD_IMAGE_ALT },
  { button: "Previous", clicks: 2, expectedAlt: SECOND_IMAGE_ALT },
] as const;
const reviews = PAGE_ONE_REVIEWS;
const longReviews = reviews.filter((review) => review.isLong);
const shortReviews = reviews.filter((review) => !review.isLong);

test.describe("homepage rendering", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
  });

  test("homepage has correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Food Harbour/);
  });
  test("imageCarousel is visible on homepage", async () => {
    await expect(homePage.imageCarousel).toBeVisible();
  });

  for (const { button, clicks, expectedAlt } of carouselSlideNavigationCases) {
    test(`"${expectedAlt}" becomes visible after ${clicks} ${button} button clicks`, async () => {
      const navButton = homePage.carouselButton(button);
      for (let i = 0; i < clicks; i++) {
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

    for (const review of reviews) {
      const reviewCard = homePage.reviewCardByRestaurant(
        review.restaurant,
        review.author,
      );

      await expect(reviewCard).toContainText(
        `${review.author} created a review for ${review.restaurant}`,
      );

      await expect(reviewCard).toContainText(review.textSnippet);
      await expect(homePage.imagesInReviewCard(reviewCard)).toHaveCount(
        review.photoCount,
      );
    }
  });

  test("clicking 'Show more' expands the review card and changes the button text to 'Show less' and vice versa", async () => {
    for (const review of longReviews) {
      const reviewCard = homePage.reviewCardByRestaurant(
        review.restaurant,
        review.author,
      );
      await homePage.reviewCardButton(reviewCard, "Show more...").click();
      await expect(
        homePage.reviewCardButton(reviewCard, "Show less"),
      ).toBeVisible();
      await expect(
        homePage.reviewText(reviewCard, review.textSnippet),
      ).toHaveClass(/review-text-expanded/);

      await homePage.reviewCardButton(reviewCard, "Show less").click();
      await expect(
        homePage.reviewCardButton(reviewCard, "Show more..."),
      ).toBeVisible();
      await expect(
        homePage.reviewText(reviewCard, review.textSnippet),
      ).toHaveClass(/review-text-not-expanded/);
    }
  });

  // short reviews do not have "Show more..." button, so we can test that the "Show more..." button is not visible for short reviews
  test("short reviews do not have 'Show more...' button", async () => {
    for (const review of shortReviews) {
      const reviewCard = homePage.reviewCardByRestaurant(
        review.restaurant,
        review.author,
      );
      await expect(
        homePage.reviewCardButton(reviewCard, "Show more..."),
      ).toHaveCount(0);
    }
  });
});
