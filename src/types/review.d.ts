interface Review {
  id: number;
  user_id: number;
  restaurant_id: number;
  review_photos: [];
  rating_value: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  user: {
    first_name: string;
  };
  restaurant: { name: string };
}
