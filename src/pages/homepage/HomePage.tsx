import ImageCarousel from "../../components/ui/imageGallery/ImageCarousel";
import "./HomePage.css";
import { Stack, Box, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../constants";
import AllReviews from "../../components/review/restaurantReviews/AllReviews";

const HomePage = (): JSX.Element => {
  const [reviewPage, setReviewPage] = useState<number>(1);
  const homepafeSlides = [
    {
      src: "https://firebasestorage.googleapis.com/v0/b/food-harbour.appspot.com/o/homepage-images%2Fchef.JPEG?alt=media&token=46229385-c095-44f6-8794-01a4645052c7",
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/food-harbour.appspot.com/o/homepage-images%2Fparadise-dynasty.JPEG?alt=media&token=3b2597d4-be44-4ba4-ada0-2a2e6e68d7a1",
    },
  ];
  return (
    <Stack className="home-page-container">
      <Box>
        <ImageCarousel slides={homepafeSlides} />
      </Box>
      <Box className="recent-activities">
        <Heading> Recent activities</Heading>
      </Box>
      <Box>
        <AllReviews reviewPage={reviewPage} />
      </Box>
    </Stack>
  );
};

export default HomePage;
