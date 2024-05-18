import axios from "axios";
import { BACKEND_URL } from "../../constants";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantCard from "../../components/restaurant/RestaurantCard";
import "./Restaurant.css";
import { Flex, Box, Image, Button } from "@chakra-ui/react";
import Spinner from "../../components/ui/Spinner";
import RestaurantReviews from "../../components/review/restaurantReviews/RestaurantReviews";
import ReviewForm from "../../components/review/restaurantReviews/ReviewForm";
import NavBar from "../../components/navbar/NavBar";
import GoogleMap from "../../components/map/GoogleMap";
import { useRestaurantInfo } from "../../context/RestaurantInfoContext";

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
          console.log(response.data);
          updateRestaurantId(response.data.id);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getRestaurantInfo();
  }, [restaurantId]);

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
  console.log(newReview);
  return (
    <div>
      <NavBar />
      <div>{loading && <Spinner />}</div>
      <div className="restaurant-container">
        <div className="restaurant-name">{restaurant.name}</div>
        {/* <div className="restaurant-image"> */}
        {/* <img src={`${restaurant.img_url}`} alt="image" /> */}
        {/* </div> */}
        <Flex flexWrap="wrap" className="image-details-wrapper">
          <Box className="restaurant-image">
            <Image
              src={`${restaurant.img_url}`}
              alt="image"
              width="45rem"
              height="32rem"
              objectFit="cover"
              borderRadius={5}
            />
          </Box>

          <Box>
            <RestaurantCard restaurant={restaurant} />
          </Box>
        </Flex>
        <GoogleMap address={restaurant.address} />
      </div>
      <Box margin="20px">
        {!showReviewForm && (
          <Button onClick={handleLeaveReview}>Leave a review</Button>
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
      <RestaurantReviews
        // restaurantId={Number(restaurantId)}
        newReview={newReview}
        setNewReview={setNewReview}
      />
    </div>
  );
};

export default RestaurantInfo;
