import React from "react";
import { FaStar } from "react-icons/fa";
import { Flex } from "@chakra-ui/react";
interface StarRatingFormProps {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}

const StarRatingInput = ({
  rating,
  setRating,
}: StarRatingFormProps): JSX.Element => {
  const stars = [...Array(5)].map((star, index) => {
    const currentRate = index + 1;
    const handleClick = (currentRate: number) => {
      if (rating === currentRate) {
        setRating(rating - 1);
      } else {
        setRating(currentRate);
      }
    };
    return (
      <>
        <label key={index}>
          <input
            type="radio"
            name="rate"
            value={currentRate}
            style={{ visibility: "hidden" }}
            onClick={() => handleClick(currentRate)}
          />
          <FaStar
            size={30}
            color={currentRate <= rating ? "#FFD700" : "gray"}
          />
        </label>
      </>
    );
  });
  return <Flex marginBottom="20px">{stars}</Flex>;
};

export default StarRatingInput;
