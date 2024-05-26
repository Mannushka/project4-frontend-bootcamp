import { FaStar } from "react-icons/fa";
import { Flex } from "@chakra-ui/react";

interface StarRatingDisplayProps {
  rating: number;
}
const StarRatingDisplay = ({ rating }: StarRatingDisplayProps): JSX.Element => {
  const stars = [...Array(5)].map((_, index) => {
    const newIndex = index + 0.5;
    const starColor = newIndex <= rating ? "#FFD700" : "gray";
    return (
      <div key={index}>
        <FaStar size={30} color={starColor} />
      </div>
    );
  });

  return <Flex>{stars}</Flex>;
};

export default StarRatingDisplay;
