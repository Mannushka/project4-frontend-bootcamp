import { Button, Flex } from "@chakra-ui/react";
import { BACKEND_URL, REVIEW, USER } from "../../../constants";
import axios from "axios";
import { validateId } from "../../../utils/validateId";
import { useUserInfo } from "../../../context/UserInfoContext";

interface DeleteReviewButtonProps {
  reviewId: number;
  setIsReviewDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}
const DeleteReviewButton = ({
  reviewId,
  setIsReviewDeleted,
}: DeleteReviewButtonProps) => {
  const { userId } = useUserInfo();
  const deleteReview = async (): Promise<void> => {
    try {
      validateId(reviewId, REVIEW);
      validateId(userId, USER);
      const response = await axios.delete(
        `${BACKEND_URL}/reviews/${reviewId}`,
        {
          params: {
            userId: userId,
          },
        }
      );
      console.log("success!");
      setIsReviewDeleted((prevState) => !prevState);
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
