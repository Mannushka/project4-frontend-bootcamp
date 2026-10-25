import ImageCarousel from "../../components/ui/imageGallery/ImageCarousel";
import "./HomePage.css";
import { Stack, Box, Heading } from "@chakra-ui/react";
import AllReviews from "../../components/review/restaurantReviews/AllReviews";
import {
  FIRST_IMAGE_ALT,
  SECOND_IMAGE_ALT,
  THIRD_IMAGE_ALT,
} from "../../constants";

const HomePage = (): JSX.Element => {
  const homepafeSlides = [
    {
      src: "https://firebasestorage.googleapis.com/v0/b/food-harbour.appspot.com/o/homepage-images%2Fparadise-dynasty3.JPEG?alt=media&token=5d7d71f9-60a3-4669-a11d-4e4cf5084516",
      alt: FIRST_IMAGE_ALT,
    },

    {
      src: "https://firebasestorage.googleapis.com/v0/b/food-harbour.appspot.com/o/homepage-images%2Fsummer-palace3.PNG?alt=media&token=88363b9e-1a43-489d-b4ae-1799911d5265",
      alt: SECOND_IMAGE_ALT,
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/food-harbour.appspot.com/o/homepage-images%2Flau-haa-hotpot3.JPEG?alt=media&token=efcba244-4b45-4c99-a630-b976f25201bd",
      alt: THIRD_IMAGE_ALT,
    },
  ];
  return (
    <Stack className="home-page-container">
      <Box role="region" aria-label="Image Carousel" className="image-carousel">
        <ImageCarousel slides={homepafeSlides} />
      </Box>
      <Box className="recent-activities">
        <Heading> Recent activity</Heading>
      </Box>
      <Box>
        <AllReviews />
      </Box>
    </Stack>
  );
};

export default HomePage;
