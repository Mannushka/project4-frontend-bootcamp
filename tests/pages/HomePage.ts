import { Locator, Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly imageCarousel: Locator;
  readonly carouselSlide: Locator;
  readonly carouselActiveSlide: Locator;
  readonly recentActivityHeading: Locator;
  readonly reviewCardsContainer: Locator;
  readonly reviewCards: Locator;
  reviewCardByRestaurant(restaurantName: string, author: string): Locator {
    return this.reviewCardsContainer.locator(".review-card", {
      hasText: `${author} created a review for ${restaurantName}`,
    });
  }
  imagesInReviewCard(card: Locator): Locator {
    return card.locator(".images-container").getByRole("img");
  }
  carouselButton(buttonName: "Next" | "Previous"): Locator {
    return this.imageCarousel.getByRole("button", { name: buttonName });
  }

  reviewCardButton(
    card: Locator,
    buttonName: "Show more..." | "Show less",
  ): Locator {
    return card.getByRole("button", { name: buttonName });
  }

  constructor(page: Page) {
    this.page = page;
    this.imageCarousel = page.getByRole("region", { name: "Image Carousel" });

    this.carouselSlide = this.imageCarousel.locator(".yarl__slide_current");

    this.carouselActiveSlide = this.carouselSlide.getByRole("img");

    this.recentActivityHeading = page.getByRole("heading", {
      level: 2,
      name: "Recent activity",
      exact: true,
    });
    this.reviewCardsContainer = page.locator(".all-reviews-container");
    this.reviewCards = this.reviewCardsContainer.locator(".review-card");
  }

  async navigateToHomePage() {
    await this.page.goto("/");
  }
}
