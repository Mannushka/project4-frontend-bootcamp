import { BACKEND_URL, USER } from "../../constants";
import axios from "axios";
import { useUserInfo } from "../../context/UserInfoContext";
import { useState, useEffect } from "react";
import { validateId } from "../../utils/validateId";
import ReviewCard from "../../components/review/restaurantReviews/ReviewCard";
import NavBar from "../../components/navbar/NavBar";
const CurrentUserReviews = () => {
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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
  }, [userId]);

  const myReviewsList = myReviews.map((review) => (
    <div key={review.id}>
      <ReviewCard review={review} displayResturantName={true} />
    </div>
  ));

  return (
    <div>
      <NavBar />
      {myReviewsList}
    </div>
  );
};

export default CurrentUserReviews;
