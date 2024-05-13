import React from "react";
import { FaStar } from "react-icons/fa";

interface StarRatingDisplayProps {
  rating: number;
}
const StarRatingDisplay = ({ rating }: StarRatingDisplayProps): JSX.Element => {
  const stars = [...Array(5)].map((_, index) => (
    <FaStar key={index} size={30} color={index < rating ? "yellow" : "gray"} />
  ));

  return <div>{stars}</div>;
};

export default StarRatingDisplay;
