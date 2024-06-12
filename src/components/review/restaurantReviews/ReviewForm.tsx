import {
  Button,
  FormControl,
  Textarea,
  Flex,
  Heading,
  Box,
} from "@chakra-ui/react";

import { useState } from "react";
import StarRatingInput from "../starRating/StarRatingInput";
import axios from "axios";
import { BACKEND_URL, RESTAURANT, USER } from "../../../constants";
import { storage } from "../../../firebaseSetup";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { useRestaurantInfo } from "../../../context/RestaurantInfoContext";
import { useUserInfo } from "../../../context/UserInfoContext";
import { validateId } from "../../../utils/validateId";
import { CircularProgress } from "@chakra-ui/react";

interface ReviewFormProps {
  showReviewForm: boolean;
  setShowReviewForm: React.Dispatch<React.SetStateAction<boolean>>;
  newReview: boolean;
  setNewReview: React.Dispatch<React.SetStateAction<boolean>>;
}

const STORAGE_KEY = "/review-photos";
const ReviewForm = ({
  showReviewForm,
  setShowReviewForm,
  setNewReview,
}: ReviewFormProps) => {
  const { restaurantId } = useRestaurantInfo();
  const [reviewText, setReviewText] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [rating, setRating] = useState<number>(0);

  const { userId } = useUserInfo();

  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setReviewText(e.target.value);

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
  };

  const uploadPhotosToStorage = async (): Promise<string[]> => {
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

      return updatedURLs;
    } catch (error) {
      console.error("Error uploading files:", error);
      throw error;
    }
  };
  const reviewForm = (
    <FormControl>
      <Textarea
        value={reviewText}
        onChange={handleTextInputChange}
        height="200px"
        disabled={loading}
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      setLoading(true);
      const newImgURLs = await uploadPhotosToStorage();
      await postReview(newImgURLs);
      setLoading(false);
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
      <Box position="relative">
        {loading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            backgroundColor="rgba(255, 255, 255, 0.8)"
            zIndex="9999"
          >
            <CircularProgress
              isIndeterminate
              color="#ff9a3c"
              thickness="12px"
            />
          </Box>
        )}
        <Box>{reviewForm}</Box>
      </Box>
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
