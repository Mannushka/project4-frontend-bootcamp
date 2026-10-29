import { Locator, Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly imageCarousel: Locator;
  readonly carouselNextButton: Locator;
  readonly carouselPreviousButton: Locator;
  readonly carouselSlide: Locator;
  readonly carouselActiveSlide: Locator;

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
  }

  async navigateToHomePage() {
    await this.page.goto("/");
  }
}
