import { Button, Flex } from "@chakra-ui/react";
import { BACKEND_URL, REVIEW, USER } from "../../../constants";
import axios from "axios";
import { validateId } from "../../../utils/validateId";
import { useUserInfo } from "../../../context/UserInfoContext";
import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";

interface DeleteReviewButtonProps {
  reviewId: number;
  setIsReviewDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}
const DeleteReviewButton = ({
  reviewId,
  setIsReviewDeleted,
}: DeleteReviewButtonProps) => {
  const { userId } = useUserInfo();
  const [token, setToken] = useState<string>("");
  const { checkUser } = useAuth();

  useEffect(() => {
    const handleCheckUser = async (): Promise<void> => {
      try {
        const accessToken = await checkUser();
        if (accessToken) setToken(accessToken);
      } catch (error) {
        console.error(error);
      }
    };
    handleCheckUser();
  }, [checkUser, userId]);

  const deleteReview = async (): Promise<void> => {
    try {
      validateId(reviewId, REVIEW);
      validateId(userId, USER);
      if (token) {
        const response = await axios.delete(
          `${BACKEND_URL}/reviews/${reviewId}`,
          {
            params: {
              userId: userId,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsReviewDeleted((prevState) => !prevState);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex justifyContent="flex-start" marginTop={2}>
      <Button variant="ghost" onClick={() => deleteReview()}>
        Delete review
      </Button>
    </Flex>
  );
};

export default DeleteReviewButton;
