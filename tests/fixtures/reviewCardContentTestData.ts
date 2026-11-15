export const REVIEW_CARD_CONTENT_TEST_DATA = [
  {
    restaurant: "Chôm Chôm",
    author: "Mila",
    rating: 5,
    page: 1,
    isLong: false,
    photoCount: 3,
    textSnippet: "Great Vietnamese spot on Peel Street",
  },
  {
    restaurant: "Café de Coral",
    author: "Olivia",
    rating: 2,
    page: 1,
    isLong: true,
    photoCount: 1,
    textSnippet: "Café de Coral is fine if you want something fast",
    fullText:
      "Café de Coral is fine if you want something fast and cheap, but the quality has really dropped over the years. The rice was overcooked, the char siu was dry, and the vegetables tasted like they had been sitting under the heat lamp for a while. On the plus side, it is quick, the branches are everywhere, and you can get a full meal for very little money. Good for a rushed lunch, but I would not come here for dinner.",
  },
  {
    restaurant: "Hancham Korean BBQ",
    author: "Tom",
    rating: 5,
    page: 1,
    isLong: true,
    photoCount: 3,
    textSnippet: "This is our third visit",
    fullText:
      "This is our third visit and the quality is consistently excellent. The pork belly and marinated beef cooked beautifully on the grill, banchan refills came quickly, and the staff were attentive without hovering. Portions are generous for the price, and the ventilation is good, so you do not leave smelling like smoke. Booking ahead is essential on weekends. Easily one of the better Korean BBQ options in the city.",
  },
  {
    restaurant: "Nebraska Steak House",
    author: "Lana",
    rating: 1,
    page: 1,
    isLong: true,
    photoCount: 1,
    textSnippet: "Came here for a birthday dinner",
    fullText:
      "Came here for a birthday dinner and left disappointed. The steak arrived overcooked after a forty-minute wait, the fries were soggy, and when we mentioned it, the waiter shrugged and walked away. The room is dark and cramped, and at these prices there is no excuse for service this indifferent. The one saving grace was the wine list, but even that could not rescue the evening. Sadly, I cannot recommend it.",
  },
  {
    restaurant: "Maek Jeok",
    author: "Monica",
    rating: 3,
    page: 1,
    isLong: false,
    photoCount: 0,
    textSnippet: "Solid Korean barbecue on Lockhart Road",
  },
  {
    // NOTE: second ORO review lives on page 2 (Lana). If both pages ever
    // render at once, the hasText anchor must include the author too.
    restaurant: "ORO, Manhattan-Italian Restaurant",
    author: "Mila",
    rating: 4,
    page: 1,
    isLong: true,
    photoCount: 0,
    textSnippet: "ORO is a reliable choice for Italian",
    fullText:
      "ORO is a reliable choice for Italian in the neighborhood. The handmade pasta was al dente, the carbonara rich without being heavy, and the tiramisu actually tasted of coffee rather than just sugar. The room is cosy, though tables are close together and it gets loud when full. Service was warm and paced well. Slightly above mid-range prices, but the cooking justifies it. A good spot for date night or a small group.",
  },
  {
    restaurant: "Sushi Takumi",
    author: "Olivia",
    rating: 3,
    page: 1,
    isLong: false,
    photoCount: 0,
    textSnippet: "Good quality sushi at reasonable prices",
  },
  {
    restaurant: "Thai on High",
    author: "Tom",
    rating: 5,
    page: 1,
    isLong: true,
    photoCount: 0,
    textSnippet: "Thai on High has the best green curry",
    fullText:
      "Thai on High has the best green curry I have had outside Bangkok. The spice levels are genuinely adjustable, the basil tastes fresh, and the mango sticky rice is the real deal with coconut cream that is not too sweet. Portions are big, prices are modest, and the staff happily explained the menu. It is small, so go early or expect a queue. This place deserves every bit of its local following.",
  },
  {
    restaurant: "ORO, Manhattan-Italian Restaurant",
    author: "Lana",
    rating: 3,
    page: 1,
    isLong: false,
    photoCount: 2,
    textSnippet: "Pasta was well cooked",
  },

  {
    restaurant: "Tandoori Bites Bar + Kitchen",
    author: "Olivia",
    rating: 4,
    page: 2,
    isLong: true,
    photoCount: 4,
    textSnippet: "Ordered delivery from Tandoori Bites",
    fullText:
      "Ordered delivery from Tandoori Bites and everything arrived hot and well packed. The butter chicken was creamy with a proper kick, the garlic naan was soft and blistered, and the samosas stayed crisp in transit. Portion sizes are generous, two mains easily fed three of us. The restaurant itself is modest but clean, and staff were friendly on the phone. A solid neighborhood Indian option that also travels well.",
  },
  {
    restaurant: "El Taquero",
    author: "Monica",
    rating: 2,
    page: 2,
    isLong: true,
    photoCount: 0,
    textSnippet: "This place is brand new",
    fullText:
      "This place is brand new, but I have already noticed a line out the door a few times, so we arrived right at opening to beat the wait. The tacos are decent, the tortillas clearly homemade, but the fillings are underseasoned and the salsa selection is limited. Prices are fair and the room is cheerful, but they need time to find their footing. Worth trying again in a few months once the kitchen settles.",
  },
  {
    restaurant: "Ding Dim 1968",
    author: "Tom",
    rating: 4,
    page: 2,
    isLong: true,
    photoCount: 2,
    textSnippet: "One of the famous dim sum restaurants in Hong Kong",
    fullText:
      "One of the famous dim sum restaurants in Hong Kong. Located on busy Wyndham Street, it is popular with locals and tourists, so expect a wait at peak hours. The har gao and siu mai were fresh and generously sized, and the egg tart had a perfectly flaky crust. Prices are fair for the location, though service gets rushed when the dining room fills up. Would come back for a weekend yum cha with friends.",
  },
];

// Convenience views for tests — page-2 cards are not rendered until you
// paginate, so most test loops should iterate these, not the full array.
export const PAGE_ONE_REVIEWS = REVIEW_CARD_CONTENT_TEST_DATA.filter(
  (r) => r.page === 1,
);
export const PAGE_TWO_REVIEWS = REVIEW_CARD_CONTENT_TEST_DATA.filter(
  (r) => r.page === 2,
);
