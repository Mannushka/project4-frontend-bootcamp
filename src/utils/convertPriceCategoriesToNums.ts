export function convertPriceCategoriesToNums(
  priceCategoryArray: string[]
): number[] {
  return priceCategoryArray.map((priceCategory) => priceCategory.length);
}
