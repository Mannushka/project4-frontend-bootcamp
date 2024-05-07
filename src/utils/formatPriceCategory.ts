export function formatPriceCategory(priceCategory: number): string {
  if (priceCategory < 1) {
    return "";
  }

  return "$".repeat(priceCategory);
}
