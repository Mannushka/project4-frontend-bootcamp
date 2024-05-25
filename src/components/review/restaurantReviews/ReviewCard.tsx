import { Card, CardBody, Text, Box } from "@chakra-ui/react";
import StarRatingDisplay from "../starRating/StarRatingDisplay";
import { formatDate } from "../../../utils/formatDate";
import { ImageGrid } from "../../ui/imageGallery/ImageGrid";
import { useUserInfo } from "../../../context/UserInfoContext";

interface ReviewCardProps {
  review: Review;
  displayResturantName: boolean;
}

const ReviewCard = ({
  review,
  displayResturantName,
}: ReviewCardProps): JSX.Element => {
  const date = formatDate(review.createdAt);
  const images = review.review_photos;
  const userName = review.user.first_name;
  const restaurantName = review.restaurant.name;
  const { userId } = useUserInfo();

  const reviewCard = (
    <Card>
      <CardBody>
        <Text>
          {userId === review.user_id
            ? "My review "
            : userName + " created a review "}
          {displayResturantName && (
            <>
              for <b> {restaurantName} </b>
            </>
          )}
        </Text>
        <Text> {date}</Text>
        <StarRatingDisplay rating={review.rating_value} />
        <Text> {review.text}</Text>
        <ImageGrid images={images} />
      </CardBody>
    </Card>
  );

  console.log(review);
  return <Box marginBottom="15px">{reviewCard}</Box>;
};

export default ReviewCard;
