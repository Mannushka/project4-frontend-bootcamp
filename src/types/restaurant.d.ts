interface Restaurant {
  id: number;
  name: string;
  address: string;
  phone_number: string | null;
  email: string | null;
  website: string | null;
  // location_id: number;
  // food_category_id: number;
  price_category: number;
  img_url: string | null;
  business_hours: {
    [day: string]: string[];
  };
  createdAt: string;
  updatedAt: string;
  location: {
    location_name: string;
  };
  food_category: {
    category_name: string;
  };
}

type RestaurantId = number;
