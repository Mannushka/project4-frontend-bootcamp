import { FaStar } from "react-icons/fa";
import { Flex } from "@chakra-ui/react";

interface StarRatingDisplayProps {
  rating: number;
}
const StarRatingDisplay = ({ rating }: StarRatingDisplayProps): JSX.Element => {
  const stars = [...Array(5)].map((_, index) => {
    const newIndex = index + 0.5;
    const starColor = newIndex <= rating ? "#f8da5b" : " #929aab";
    return (
      <div key={index}>
        <FaStar size={30} color={starColor} />
      </div>
    );
  });

  return (
    <Flex role="img" aria-label={`Rating: ${rating} out of 5`}>
      {stars}
    </Flex>
  );
};

export default StarRatingDisplay;
