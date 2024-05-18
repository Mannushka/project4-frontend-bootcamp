import StarRatingDisplay from "../review/starRating/StarRatingDisplay";
import { Flex, Box } from "@chakra-ui/react";

interface RestaurantRatingProps {
  ratingArray: number[];
}

const RestaurantRating = ({
  ratingArray,
}: RestaurantRatingProps): JSX.Element => {
  const ratingSum = ratingArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const numOfReviews = ratingArray.length;
  const averageRating = ratingSum / numOfReviews;
  const starRating = <StarRatingDisplay rating={averageRating} />;
  return (
    <div>
      <Flex alignItems="center" gap={3}>
        <Box> {starRating}</Box>
        <Box> {numOfReviews > 0 && averageRating.toFixed(1)}</Box>
        <Box>
          ({numOfReviews} {numOfReviews === 1 ? " review" : " reviews"})
        </Box>
      </Flex>
    </div>
  );
};

export default RestaurantRating;
