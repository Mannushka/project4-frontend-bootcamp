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
import { useRestaurantInfo } from "../../context/RestaurantInfoContext";
import BussinessHoursCard from "../../components/restaurant/BussinessHoursCard";
import LocationCard from "../../components/restaurant/LocationCard";
import SaveButton from "../../components/restaurants-listings/SaveButton";
import { useAuth0 } from "@auth0/auth0-react";

const RestaurantInfo = () => {
  const [restaurant, setRestaurant] = useState<Restaurant>({} as Restaurant);
  const [loading, setLoading] = useState<boolean>(false);
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [newReview, setNewReview] = useState<boolean>(false);
  const { restaurantId } = useParams();
  const { updateRestaurantId } = useRestaurantInfo();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

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
  }, [updateRestaurantId, restaurantId, newReview]);

  const handleLeaveReview = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
      setShowReviewForm((prevState) => !prevState);
    }
  };

  return (
    <div>
      <NavBar />
      <div>{loading && <Spinner />}</div>
      <div className="restaurant-container">
        <div className="restaurant-name">{restaurant.name}</div>
        <Flex className="image-details-wrapper">
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
                  showReviewForm={showReviewForm}
                  setShowReviewForm={setShowReviewForm}
                  newReview={newReview}
                  setNewReview={setNewReview}
                />
              )}
            </Box>
          </Stack>
        </Flex>

        <Box className="review-card-container" width={{ lg: "70%", sm: "90%" }}>
          <RestaurantReviews newReview={newReview} />
        </Box>
      </div>
    </div>
  );
};

export default RestaurantInfo;
