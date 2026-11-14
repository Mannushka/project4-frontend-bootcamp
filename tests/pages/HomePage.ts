import { Locator, Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly imageCarousel: Locator;
  readonly carouselNextButton: Locator;
  readonly carouselPreviousButton: Locator;
  readonly carouselSlide: Locator;
  readonly carouselActiveSlide: Locator;
  readonly recentActivityHeading: Locator;
  readonly reviewCardsContainer: Locator;
  readonly reviewCards: Locator;
  reviewCardByRestaurant(restaurantName: string): Locator {
    return this.reviewCardsContainer.locator(".review-card", {
      hasText: restaurantName,
    });
  }
  imagesInReviewCard(card: Locator): Locator {
    return card.locator(".images-container").getByRole("img");
  }

  constructor(page: Page) {
    this.page = page;
    this.imageCarousel = page.getByRole("region", { name: "Image Carousel" });
    this.carouselNextButton = this.imageCarousel.getByRole("button", {
      name: "Next",
    });
    this.carouselPreviousButton = this.imageCarousel.getByRole("button", {
      name: "Previous",
    });
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
