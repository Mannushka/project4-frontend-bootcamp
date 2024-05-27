import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../../constants";
import axios from "axios";
import ReviewCard from "./ReviewCard";
import { Heading, Flex } from "@chakra-ui/react";
import { useRestaurantInfo } from "../../../context/RestaurantInfoContext";

interface RestaurantReviewsProps {
  // restaurantId: number;
  newReview: boolean;
  // setNewReview: React.Dispatch<React.SetStateAction<boolean>>;
}

const RestaurantReviews = ({
  // restaurantId,
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
