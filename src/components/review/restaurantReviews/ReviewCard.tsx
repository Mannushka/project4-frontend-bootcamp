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

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps): JSX.Element => {
  const date = formatDate(review.createdAt);
  const reviewCard = (
    <Card width="50%">
      <CardBody>
        <Text>
          {review.user.first_name} wrote on {date}:
        </Text>

        <Text> {review.text}</Text>
        <StarRatingDisplay rating={review.rating_value} />
      </CardBody>
    </Card>
  );
  return <Box marginBottom="15px">{reviewCard}</Box>;
};

export default ReviewCard;
