import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../../constants";
import axios from "axios";
import ReviewCard from "./ReviewCard";
import { Box } from "@chakra-ui/react";
// import Spinner from "../../ui/Spinner";
import "./Reviews.css";
import PaginationComponent from "../../ui/pagination/PaginationComponent";

// interface AllReviewsProps {
//   reviewPage: number;
// }
const AllReviews = (): JSX.Element => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPagesNum, setTotalPagesNum] = useState<number>(0);
  const [totalReviewsNum, setTotalReviewsNum] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    const getReviews = async (): Promise<void> => {
      try {
        if (isNaN(page)) {
          throw new Error("Invalid  review page number");
        }

        const response = await axios.get(`${BACKEND_URL}/reviews?page=${page}`);
        setReviews(response.data.reviews);
        setTotalPagesNum(response.data.totalPages);
        setTotalReviewsNum(response.data.totalCount);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getReviews();
  }, [page]);

  console.log(reviews);
  const reviewsList = reviews.map((review) => (
    <Box key={review.id}>
      <ReviewCard review={review} displayResturantName={true} />
    </Box>
  ));
  return (
    <div className="centered-container">
      {/* {loading && <Spinner />} */}
      <Box className="all-reviews-container">
        {!loading && !!reviews.length && reviewsList}
      </Box>
      <PaginationComponent
        page={page}
        setPage={setPage}
        totalPagesNum={totalPagesNum}
        totalItemsNum={totalReviewsNum}
      />
    </div>
  );
};

export default AllReviews;
