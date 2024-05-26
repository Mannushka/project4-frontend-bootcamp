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
  Input,
  Box,
} from "@chakra-ui/react";

import { useState } from "react";
import StarRatingInput from "../starRating/StarRatingInput";
import axios from "axios";
import { BACKEND_URL, RESTAURANT, USER } from "../../../constants";
import { useAuth0 } from "@auth0/auth0-react";
import { storage } from "../../../firebaseSetup";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { useRestaurantInfo } from "../../../context/RestaurantInfoContext";
import { useUserInfo } from "../../../context/UserInfoContext";
import { validateId } from "../../../utils/validateId";

interface ReviewFormProps {
  // restaurantId: number;
  showReviewForm: boolean;
  setShowReviewForm: React.Dispatch<React.SetStateAction<boolean>>;
  newReview: boolean;
  setNewReview: React.Dispatch<React.SetStateAction<boolean>>;
}

const STORAGE_KEY = "/review-photos";
const ReviewForm = ({
  // restaurantId,
  showReviewForm,
  setShowReviewForm,
  newReview,
  setNewReview,
}: ReviewFormProps) => {
  const { restaurantId } = useRestaurantInfo();
  const [reviewText, setReviewText] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  // const [imgURLs, setImgURLs] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(0);
  const { user } = useAuth0();
  const { userId } = useUserInfo();

  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setReviewText(e.target.value);
  // console.log(reviewText);
  // console.log(rating);
  // console.log(restaurantId);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = event.target.files;
    const filesArray = selectedFiles ? Array.from(selectedFiles) : [];
    const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];
    const validFiles = filesArray.filter((file) =>
      allowedFormats.includes(file.type)
    );
    setFiles(validFiles);
    // console.log(files);
    // console.log(validFiles);
  };

  const uploadPhotosToStorage = async (): Promise<string[]> => {
    const maxNumOfPhotos = 5;
    if (files.length > maxNumOfPhotos) {
      throw new Error("Sorry but you can only upload 5 pictures max. 🥺");
    }

    const fullStorageRef = storageRef(storage, STORAGE_KEY);

    try {
      const uploadPromises = files.map((file) => {
        const childRef = storageRef(fullStorageRef, file.name);
        return uploadBytes(childRef, file);
      });

      await Promise.all(uploadPromises);

      const updatedURLs = await Promise.all(
        files.map((file) => {
          const childRef = storageRef(fullStorageRef, file.name);
          return getDownloadURL(childRef);
        })
      );

      console.log("Files uploaded successfully:", updatedURLs);
      return updatedURLs;
    } catch (error) {
      console.error("Error uploading files:", error);
      throw error;
    }
  };
  const reviewForm = (
    <FormControl>
      {/* <FormControlLabel>Write something</FormLabel> */}
      <Textarea
        value={reviewText}
        onChange={handleTextInputChange}
        height="200px"
      />

      <Box marginTop={3}>
        <input
          type="file"
          multiple
          accept=".jpg, .jpeg, .png"
          onChange={handleFileInputChange}
        ></input>
      </Box>
    </FormControl>
  );

  const postReview = async (imgURLs: string[]): Promise<void> => {
    try {
      // if (!user?.email) {
      //   throw new Error("User email is required 🥺");
      // }

      // if (!restaurantId || isNaN(restaurantId)) {
      //   throw new Error("Restaurant ID is missing or invalid 🥺");
      // }
      validateId(restaurantId, RESTAURANT);
      validateId(userId, USER);
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
        // email: user?.email,
        userId: userId,
        restaurantId: restaurantId,
        rating_value: rating,
        text: reviewText,
        photoURLs: imgURLs,
      });
      setNewReview((prevState) => !prevState);
      setReviewText("");
      setRating(0);
      setShowReviewForm(!showReviewForm);
      // setImgURLs([]);
      console.log("Review posted");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      const newImgURLs = await uploadPhotosToStorage();
      // setImgURLs(newImgURLs);
      postReview(newImgURLs);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    setShowReviewForm((prevState) => !prevState);
  };

  return (
    <Flex direction="column" width="400px" margin="20px">
      <Heading size="lg" textAlign="center" marginTop={4}>
        Your review
      </Heading>
      <StarRatingInput rating={rating} setRating={setRating} />
      <Box> {reviewForm}</Box>
      <Flex gap="10px">
        <Button width="25%" marginTop="10px" onClick={handleSubmit}>
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
