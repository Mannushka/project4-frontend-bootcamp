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
} from "@chakra-ui/react";

import { useState } from "react";
import StarRatingInput from "../starRating/StarRatingInput";
import axios from "axios";
import { BACKEND_URL } from "../../../constants";
import { useAuth0 } from "@auth0/auth0-react";
import { storage } from "../../../firebaseSetup";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

interface ReviewFormProps {
  restaurantId: number;
  showReviewForm: boolean;
  setShowReviewForm: React.Dispatch<React.SetStateAction<boolean>>;
  newReview: boolean;
  setNewReview: React.Dispatch<React.SetStateAction<boolean>>;
}

const STORAGE_KEY = "/review-photos";
const ReviewForm = ({
  restaurantId,
  showReviewForm,
  setShowReviewForm,
  newReview,
  setNewReview,
}: ReviewFormProps) => {
  const [reviewText, setReviewText] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [imgURLs, setImgURLs] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(0);
  const { user } = useAuth0();

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
    console.log(files);
    console.log(validFiles);
  };

  // const handleFilesUpload = async () => {
  //   const maxNumOfPhotos = 5;
  //   if (files.length > maxNumOfPhotos) {
  //     throw new Error("Sorry but you can only upload 5 pictures max. 🥺");
  //   }

  //   const fullStorageRef = storageRef(storage, STORAGE_KEY);
  //   try {
  //     const updatedURLs = [];
  //     for (const file of files) {
  //       const childRef = storageRef(fullStorageRef, file.name);
  //       await uploadBytes(childRef, file);
  //       const downloadURL = await getDownloadURL(childRef);
  //       console.log("File uploaded successfully:", downloadURL);
  //       updatedURLs.push(downloadURL);
  //     }
  //     setImgURLs(updatedURLs);
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //   }
  // };
  const uploadPhotosToStorage = async (): Promise<void> => {
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
      setImgURLs(updatedURLs);
    } catch (error) {
      console.error("Error uploading files:", error);
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

      <input
        type="file"
        multiple
        accept=".jpg, .jpeg, .png"
        onChange={handleFileInputChange}
      ></input>
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
      console.log(imgURLs);
      const response = await axios.post(`${BACKEND_URL}/reviews`, {
        email: user?.email,
        restaurant_id: restaurantId,
        rating_value: rating,
        text: reviewText,
        photoURLs: imgURLs,
      });
      setNewReview((prevState) => !prevState);
      setReviewText("");
      setRating(0);
      setShowReviewForm(!showReviewForm);
      setImgURLs([]);
      console.log("Review posted");
    } catch (error) {
      console.log(error);
    }
  };
  // const handleSubmitReview = async (): Promise<void> => {
  //   await postReview();

  // };
  const handleSubmit = async (): Promise<void> => {
    try {
      await uploadPhotosToStorage(); // Upload pictures to Firebase Storage
      await postReview(); // Make POST request to backend
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    setShowReviewForm((prevState) => !prevState);
  };

  console.log(files.length);
  console.log(files);
  console.log(imgURLs);
  return (
    <Flex direction="column" width="400px" margin="20px">
      <Heading>Your review</Heading>
      <StarRatingInput rating={rating} setRating={setRating} />
      {reviewForm}
      <Button onClick={uploadPhotosToStorage}>
        Upload pictures to storage
      </Button>
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
