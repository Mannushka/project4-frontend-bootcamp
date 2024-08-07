import { Card, CardBody, Text, Box, Button } from "@chakra-ui/react";
import StarRatingDisplay from "../starRating/StarRatingDisplay";
import { formatDate } from "../../../utils/formatDate";
import { ImageGrid } from "../../ui/imageGallery/ImageGrid";
import { useUserInfo } from "../../../context/UserInfoContext";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./Reviews.css";
import DeleteReviewButton from "./DeleteReviewButton";
import { useAuth0 } from "@auth0/auth0-react";

interface ReviewCardProps {
  review: Review;
  displayResturantName: boolean;
  setIsReviewDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewCard = ({
  review,
  displayResturantName,
  setIsReviewDeleted,
}: ReviewCardProps): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showReadMoreButton, setShowReadMoreButton] = useState<boolean>(false);
  const { isAuthenticated } = useAuth0();
  const date = formatDate(review.createdAt);
  const images = review.review_photos;
  const userName = review.user.first_name;
  const restaurantName = review.restaurant.name;
  const { userId } = useUserInfo();

  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (ref.current) {
      setShowReadMoreButton(
        ref.current.scrollHeight !== ref.current.clientHeight
      );
    }
  }, []);

  const reviewCard = (
    <Card className="review-card">
      <CardBody>
        <Text>
          {userId === review.user_id
            ? "My review "
            : userName + " created a review "}
          {displayResturantName && (
            <>
              for{" "}
              <span className="restaurant-name-link">
                <Link to={`/restaurants/${review.restaurant_id}`}>
                  {restaurantName}
                </Link>
              </span>
            </>
          )}
        </Text>

        <Text> {date}</Text>
        <StarRatingDisplay rating={review.rating_value} />
        <Text
          className={
            isExpanded ? "review-text-expanded" : "review-text-not-expanded"
          }
          ref={ref}
          marginTop={4}
          paddingLeft={3}
          paddingRight={3}
        >
          {review.text}
        </Text>
        {showReadMoreButton && (
          <Box className="show-more-btn">
            <Button
              onClick={() => setIsExpanded((prev) => !prev)}
              variant="ghost"
            >
              {isExpanded ? "Show less" : "Show more..."}
            </Button>
          </Box>
        )}
        <ImageGrid images={images} />
        <Box>
          {isAuthenticated && userId === review.user_id && (
            <DeleteReviewButton
              reviewId={review.id}
              setIsReviewDeleted={setIsReviewDeleted}
            />
          )}
        </Box>
      </CardBody>
    </Card>
  );

  return <Box className="review-card">{reviewCard}</Box>;
};

export default ReviewCard;
