interface Restaurant {
  id: number;
  name: string;
  address: string;
  phone_number?: string;
  email?: string;
  website?: string;
  // location_id: number;
  // food_category_id: number;
  price_category: number;
  img_url?: string;
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

  reviews: {
    rating_value: number;
  }[];

  [key: string]: string | number | object;
}

interface BusinessHours {
  [day: string]: string[];
}
