import React from "react";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../../constants";
import axios from "axios";

interface RestaurantReviewsProps {
  restaurantId: number;
}

const RestaurantReviews = ({
  restaurantId,
}: RestaurantReviewsProps): JSX.Element => {
  const [reviews, setReviews] = useState<Review>({} as Review);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const getReviews = async (): Promise<void> => {
      try {
        if (!restaurantId || isNaN(restaurantId)) {
          throw new Error("Invalid restaurant ID");
        }
        const params: { restaurant_id: number } = {
          restaurant_id: restaurantId,
        };

        const response = await axios.get(`${BACKEND_URL}/reviews`, { params });
        setReviews(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getReviews();
  }, [restaurantId]);
  return <div>RestaurantReviews</div>;
};

export default RestaurantReviews;
