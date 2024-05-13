import React from "react";
import {
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import StarRatingInput from "../starRating/StarRatingInput";
interface ReviewFormProps {
  restaurantId: number;
}
const ReviewForm = ({ restaurantId }: ReviewFormProps) => {
  const [reviewText, setReviewText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setReviewText(e.target.value);
  console.log(reviewText);
  console.log(rating);
  console.log(restaurantId);

  const reviewForm = (
    <FormControl>
      {/* <FormLabel>Write something</FormLabel> */}
      <Input
        type="text"
        value={reviewText}
        onChange={handleInputChange}
        height="200px"
      />
    </FormControl>
  );
  return (
    <Flex direction="column" width="400px" margin="20px">
      <Heading>Your review</Heading>
      <StarRatingInput rating={rating} setRating={setRating} />
      {reviewForm}
    </Flex>
  );
};

export default ReviewForm;
