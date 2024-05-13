import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Textarea,
  Flex,
  Heading,
} from "@chakra-ui/react";

import { useState } from "react";
import StarRatingInput from "../starRating/StarRatingInput";
import axios from "axios";
import { BACKEND_URL } from "../../../constants";
import { useAuth0 } from "@auth0/auth0-react";

interface ReviewFormProps {
  restaurantId: number;
  showReviewForm: boolean;
  setShowReviewForm: React.Dispatch<React.SetStateAction<boolean>>;
}
const ReviewForm = ({
  restaurantId,
  showReviewForm,
  setShowReviewForm,
}: ReviewFormProps) => {
  const [reviewText, setReviewText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const { user } = useAuth0();
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setReviewText(e.target.value);
  console.log(reviewText);
  console.log(rating);
  console.log(restaurantId);

  const reviewForm = (
    <FormControl>
      {/* <FormControlLabel>Write something</FormLabel> */}
      <Textarea
        value={reviewText}
        onChange={handleInputChange}
        height="200px"
      />
    </FormControl>
  );
  const postReview = async (): Promise<void> => {
    try {
      if (!user?.email) {
        throw new Error("User email is required 🥺");
      }
      if (!restaurantId || isNaN(restaurantId)) {
        throw new Error("Restaurant ID is missing or invalid 🥺");
      }
      if (!rating) {
        throw new Error("Please rate the restaurant 🥹");
      }
      if (typeof rating !== "number" || rating < 1 || rating > 5) {
        throw new Error("Invalid rating value 🥺");
      }
      if (!reviewText) {
        throw new Error(
          "Please write something! Your feedback is valuable for us and other users 🫰"
        );
      }
      if (reviewText.length < 80) {
        throw new Error("Review  should be at least 80 characters long");
      }
      const response = await axios.post(`${BACKEND_URL}/reviews`, {
        email: user?.email,
        restaurant_id: restaurantId,
        rating_value: rating,
        text: reviewText,
      });

      setReviewText("");
      setRating(0);
      setShowReviewForm(!showReviewForm);
    } catch (error) {
      console.log(error);
    }
  };
  // const handleSubmitReview = async (): Promise<void> => {
  //   await postReview();
  // };
  const handleCancel = () => {
    setShowReviewForm((prevState) => !prevState);
  };
  return (
    <Flex direction="column" width="400px" margin="20px">
      <Heading>Your review</Heading>
      <StarRatingInput rating={rating} setRating={setRating} />
      {reviewForm}
      <Flex gap="10px">
        <Button width="25%" marginTop="10px" onClick={postReview}>
          Submit
        </Button>
        <Button width="25%" marginTop="10px" onClick={handleCancel}>
          Cancel
        </Button>
      </Flex>
    </Flex>
  );
};

export default ReviewForm;
