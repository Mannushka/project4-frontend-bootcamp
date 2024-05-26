import axios from "axios";
import { BACKEND_URL } from "../../constants";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantCard from "../../components/restaurant/RestaurantCard";
import "./Restaurant.css";
import { Flex, Box, Image, Button, Stack } from "@chakra-ui/react";
import Spinner from "../../components/ui/Spinner";
import RestaurantReviews from "../../components/review/restaurantReviews/RestaurantReviews";
import ReviewForm from "../../components/review/restaurantReviews/ReviewForm";
import NavBar from "../../components/navbar/NavBar";
import GoogleMap from "../../components/map/GoogleMap";
import { useRestaurantInfo } from "../../context/RestaurantInfoContext";
import BussinessHoursCard from "../../components/restaurant/BussinessHoursCard";
import ImageCarousel from "../../components/ui/imageGallery/ImageCarousel";
import LocationCard from "../../components/restaurant/LocationCard";
import SaveButton from "../../components/restaurants-listings/SaveButton";

const RestaurantInfo = () => {
  const [restaurant, setRestaurant] = useState<Restaurant>({} as Restaurant);
  const [loading, setLoading] = useState<boolean>(false);
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [newReview, setNewReview] = useState<boolean>(false);
  const { restaurantId } = useParams();
  const { updateRestaurantId } = useRestaurantInfo();

  useEffect(() => {
    setLoading(true);
    const getRestaurantInfo = async (): Promise<void> => {
      if (restaurantId) {
        try {
          const response = await axios.get(
            `${BACKEND_URL}/restaurants/${restaurantId}`
          );
          setRestaurant(response.data);
          updateRestaurantId(response.data.id);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getRestaurantInfo();
  }, [updateRestaurantId, restaurantId]);

  // const displayRestaurantInfo = (): JSX.Element[] => {
  //   const infoElements = [];
  //   for (const key in restaurant) {
  //     infoElements.push(<p key={key}>{`${key}: ${restaurant[key]}`}</p>);
  //   }
  //   return infoElements;
  // };

  const handleLeaveReview = () => {
    setShowReviewForm((prevState) => !prevState);
  };

  console.log(restaurant);
  return (
    <div>
      <NavBar />
      <div>{loading && <Spinner />}</div>
      <div className="restaurant-container">
        <div className="restaurant-name">{restaurant.name}</div>
        <Flex flexWrap="wrap-reverse" className="image-details-wrapper">
          <Stack>
            <Box className="restaurant-image-container">
              <Image
                src={`${restaurant.img_url}`}
                alt="image"
                className="restaurant-image"
              />
            </Box>
            <Flex className="restaurant-info-flex-container">
              <Box className="restaurant-info-bottom-container">
                <BussinessHoursCard restaurant={restaurant} />
              </Box>
              {/* <GoogleMap address={restaurant.address} /> */}
              <Box className="restaurant-info-bottom-container">
                <LocationCard address={restaurant.address} />
              </Box>
            </Flex>
          </Stack>
          <Stack>
            <RestaurantCard restaurant={restaurant} />
            <Box className="single-restaurant-page-button">
              <SaveButton
                restaurantId={Number(restaurantId)}
                buttonVariant="outline"
              />
            </Box>
            <Box marginTop={2} className="single-restaurant-page-button">
              {!showReviewForm && (
                <Button
                  variant="outline"
                  onClick={handleLeaveReview}
                  style={{ backgroundColor: "white" }}
                >
                  <span className="leave-review-button-text">
                    Leave a review
                  </span>
                </Button>
              )}
              {showReviewForm && (
                <ReviewForm
                  // restaurantId={Number(restaurantId)}
                  showReviewForm={showReviewForm}
                  setShowReviewForm={setShowReviewForm}
                  newReview={newReview}
                  setNewReview={setNewReview}
                />
              )}
              {/* {showReviewForm && <Button onClick={handleLeaveReview}>Cancel</Button>} */}
            </Box>
          </Stack>
        </Flex>

        {/* <Flex justifyContent="space-between">
          <GoogleMap address={restaurant.address} />
        </Flex> */}
        <Box width="70%">
          <RestaurantReviews
            // restaurantId={Number(restaurantId)}
            newReview={newReview}
            setNewReview={setNewReview}
          />
        </Box>
      </div>
      {/* <Box margin="20px">
        {!showReviewForm && (
          <Button onClick={handleLeaveReview}>Leave a review</Button>
        )}
        {showReviewForm && (
          <ReviewForm
            showReviewForm={showReviewForm}
            setShowReviewForm={setShowReviewForm}
            newReview={newReview}
            setNewReview={setNewReview}
          />
        )}
      </Box> */}
      {/* <RestaurantReviews
        // restaurantId={Number(restaurantId)}
        newReview={newReview}
        setNewReview={setNewReview}
      /> */}
    </div>
  );
};

export default RestaurantInfo;
