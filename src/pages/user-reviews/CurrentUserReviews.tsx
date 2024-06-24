import { BACKEND_URL, USER } from "../../constants";
import axios from "axios";
import { useUserInfo } from "../../context/UserInfoContext";
import { useState, useEffect } from "react";
import { validateId } from "../../utils/validateId";
import ReviewCard from "../../components/review/restaurantReviews/ReviewCard";
import NavBar from "../../components/navbar/NavBar";
import { Box, Spinner, Text } from "@chakra-ui/react";
import "./CurrentUserReviews.css";
import useAuth from "../../hooks/useAuth";

const CurrentUserReviews = () => {
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isReviewDeleted, setIsReviewDeleted] = useState<boolean>(false);
  const { userId } = useUserInfo();
  const [token, setToken] = useState<string>("");
  const { checkUser } = useAuth();

  useEffect(() => {
    const handleCheckUser = async (): Promise<void> => {
      try {
        const accessToken = await checkUser();
        if (accessToken) setToken(accessToken);
      } catch (error) {
        console.error(error);
      }
    };
    handleCheckUser();
  }, [checkUser, userId]);

  useEffect(() => {
    setLoading(true);
    const getReviews = async (): Promise<void> => {
      try {
        validateId(userId, USER);
        const params: { userId: number } = {
          userId: userId,
        };

        if (token) {
          const response = await axios.get(
            `${BACKEND_URL}/reviews/my-reviews`,
            {
              params,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setMyReviews(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getReviews();
  }, [userId, isReviewDeleted, token]);

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
