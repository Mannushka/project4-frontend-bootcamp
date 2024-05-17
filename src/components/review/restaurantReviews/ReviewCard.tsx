import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Box,
} from "@chakra-ui/react";
import StarRatingDisplay from "../starRating/StarRatingDisplay";
import { formatDate } from "../../../utils/formatDate";
import { ImageGrid } from "../../ui/imageGallery/ImageGrid";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps): JSX.Element => {
  const date = formatDate(review.createdAt);
  const images = review.review_photos;
  const userName = review.user.first_name;
  const reviewCard = (
    <Card width="50%">
      <CardBody>
        <Text>
          {userName} wrote on {date}:
        </Text>
        <StarRatingDisplay rating={review.rating_value} />
        <Text> {review.text}</Text>
        <ImageGrid images={images} />
      </CardBody>
    </Card>
  );
  return <Box marginBottom="15px">{reviewCard}</Box>;
};

export default ReviewCard;
