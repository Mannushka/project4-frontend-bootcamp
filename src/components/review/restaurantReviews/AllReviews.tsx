import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../../constants";
import axios from "axios";
import ReviewCard from "./ReviewCard";
import { Box } from "@chakra-ui/react";

interface AllReviewsProps {
  reviewPage: number;
}
const AllReviews = ({ reviewPage }: AllReviewsProps): JSX.Element => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const getReviews = async (): Promise<void> => {
      try {
        if (isNaN(reviewPage)) {
          throw new Error("Invalid  review page number");
        }

        const response = await axios.get(
          `${BACKEND_URL}/reviews?page=${reviewPage}`
        );
        setReviews(response.data.reviews);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getReviews();
  }, [reviewPage]);

  // const reviewsList = reviews.map((review) => (
  //   <div key={review.id}>
  //     <ReviewCard review={review} />
  //   </div>
  // ));
  console.log(reviews);
  const reviewsList = reviews.map((review) => (
    <Box key={review.id}>
      <ReviewCard review={review} />
    </Box>
  ));
  return <div> {reviewsList} </div>;
};

export default AllReviews;
