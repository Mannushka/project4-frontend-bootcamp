import { useState, useEffect } from "react";
import { BACKEND_URL, RESTAURANT } from "../../../constants";
import axios from "axios";
import ReviewCard from "./ReviewCard";
import { Heading, Flex } from "@chakra-ui/react";
import { useRestaurantInfo } from "../../../context/RestaurantInfoContext";
import { validateId } from "../../../utils/validateId";

interface RestaurantReviewsProps {
  newReview: boolean;
}

const RestaurantReviews = ({
  newReview,
}: RestaurantReviewsProps): JSX.Element => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { restaurantId } = useRestaurantInfo();
  const [isReviewDeleted, setIsReviewDeleted] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const getReviews = async (): Promise<void> => {
      try {
        validateId(restaurantId, RESTAURANT);
        const response = await axios.get(
          `${BACKEND_URL}/reviews/restaurant/${restaurantId}`
        );
        setReviews(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    if (restaurantId) {
      getReviews();
    }
  }, [restaurantId, newReview, isReviewDeleted]);

  const reviewsList = reviews.map((review) => (
    <div key={review.id}>
      <ReviewCard
        review={review}
        displayResturantName={false}
        setIsReviewDeleted={setIsReviewDeleted}
      />
    </div>
  ));
  return (
    <Flex direction="column" margin="20px">
      <Heading textAlign="center" marginBottom={10}>
        {reviews.length ? " Reviews" : "No reviews yet"}
      </Heading>
      {reviewsList}
    </Flex>
  );
};

export default RestaurantReviews;
