import React from "react";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../../constants";
import axios from "axios";
import ReviewCard from "./ReviewCard";
import { Heading, Flex } from "@chakra-ui/react";
import { useRestaurantInfo } from "../../../context/RestaurantInfoContext";

interface RestaurantReviewsProps {
  // restaurantId: number;
  newReview: boolean;
  setNewReview: React.Dispatch<React.SetStateAction<boolean>>;
}

const RestaurantReviews = ({
  // restaurantId,
  newReview,
  setNewReview,
}: RestaurantReviewsProps): JSX.Element => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { restaurantId } = useRestaurantInfo();

  useEffect(() => {
    setLoading(true);
    const getReviews = async (): Promise<void> => {
      try {
        if (!restaurantId || isNaN(restaurantId)) {
          throw new Error("Invalid restaurant ID");
        }
        // const params: { restaurantId: number } = {
        //   restaurantId: restaurantId,
        // };

        const response = await axios.get(
          `${BACKEND_URL}/reviews/restaurant/${restaurantId}`
        );
        setReviews(response.data);

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getReviews();
  }, [restaurantId, newReview]);

  const reviewsList = reviews.map((review) => (
    <div key={review.id}>
      <ReviewCard review={review} />
    </div>
  ));
  return (
    <Flex direction="column" margin="20px">
      <Heading as="h4" size="md">
        Reviews
      </Heading>
      {reviews.length ? reviewsList : <p>No reviews yet.</p>}
    </Flex>
  );
};

export default RestaurantReviews;
