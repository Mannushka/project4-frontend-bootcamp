import { Card, CardBody, Text, Box, Button } from "@chakra-ui/react";
import StarRatingDisplay from "../starRating/StarRatingDisplay";
import { formatDate } from "../../../utils/formatDate";
import { ImageGrid } from "../../ui/imageGallery/ImageGrid";
import { useUserInfo } from "../../../context/UserInfoContext";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

interface ReviewCardProps {
  review: Review;
  displayResturantName: boolean;
}

const textStyle = {
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical" as string,
  overflow: "hidden",
  display: "-webkit-box",
};

const ReviewCard = ({
  review,
  displayResturantName,
}: ReviewCardProps): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showReadMoreButton, setShowReadMoreButton] = useState<boolean>(false);
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
    <Card>
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
      </CardBody>
    </Card>
  );

  console.log(review);
  return <Box marginBottom="15px">{reviewCard}</Box>;
};

export default ReviewCard;
