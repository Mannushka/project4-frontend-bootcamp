import { FaStar } from "react-icons/fa";
import { Flex, Box } from "@chakra-ui/react";

interface StarRatingDisplayProps {
  rating: number;
}
const StarRatingDisplay = ({ rating }: StarRatingDisplayProps): JSX.Element => {
  const stars = [...Array(5)].map((_, index) => (
    <Box key={index}>
      <FaStar size={30} color={index < rating ? "#FFD700" : "gray"} />
    </Box>
  ));

  return <Flex>{stars}</Flex>;
};

export default StarRatingDisplay;
