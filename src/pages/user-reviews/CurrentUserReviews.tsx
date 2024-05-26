import { BACKEND_URL, USER } from "../../constants";
import axios from "axios";
import { useUserInfo } from "../../context/UserInfoContext";
import { useState, useEffect } from "react";
import { validateId } from "../../utils/validateId";
import ReviewCard from "../../components/review/restaurantReviews/ReviewCard";
import NavBar from "../../components/navbar/NavBar";
import { Box, Spinner, Text } from "@chakra-ui/react";
import "./CurrentUserReviews.css";
const CurrentUserReviews = () => {
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isReviewDeleted, setIsReviewDeleted] = useState<boolean>(false);
  const { userId } = useUserInfo();

  useEffect(() => {
    setLoading(true);
    const getReviews = async (): Promise<void> => {
      try {
        validateId(userId, USER);
        const params: { userId: number } = {
          userId: userId,
        };

        const response = await axios.get(`${BACKEND_URL}/reviews/my-reviews`, {
          params,
        });
        setMyReviews(response.data);
        console.log(response.data);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getReviews();
  }, [userId, isReviewDeleted]);
  console.log(isReviewDeleted);

  const myReviewsList = myReviews.map((review) => (
    <div key={review.id} className="my-review-card">
      <ReviewCard
        review={review}
        displayResturantName={true}
        setIsReviewDeleted={setIsReviewDeleted}
      />
    </div>
  ));

  return (
    <Box>
      <NavBar />
      <Box className="my-reviews-page-container">
        <Text className="page-header">My reviews</Text>
        <Box className="my-reviews-container">
          {!loading && !!myReviews.length && myReviewsList}
        </Box>
        {loading && <Spinner />}
      </Box>
    </Box>
  );
};

export default CurrentUserReviews;
