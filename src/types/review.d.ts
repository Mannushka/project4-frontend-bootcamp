interface Review {
  id: number;
  user_id: number;
  restaurant_id: number;
  rating_value: number;
  text: text;
  createdAt: string;
  updatedAt: string;
  user: {
    first_name: string;
  };
}
