import { BACKEND_URL, USER } from "../../constants";
import axios from "axios";
import { useUserInfo } from "../../context/UserInfoContext";
import { useState, useEffect } from "react";
import { validateId } from "../../utils/validateId";
import SingleRestaurantCard from "../../components/restaurants-listings/SingleRestaurantCard";
import NavBar from "../../components/navbar/NavBar";
import "./SavedRestaurants.css";
import { Box, Text } from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";

const SavedRestaurants = () => {
  const [savedRestaurants, setSavedRestaurants] = useState<Restaurant[]>([]);
  const [token, setToken] = useState<string>("");
  const { userId } = useUserInfo();
  const { checkUser } = useAuth();

  useEffect(() => {
    const getSavedRestaurants = async (): Promise<void> => {
      try {
        validateId(userId, USER);
        if (token) {
          const response = await axios.get(
            `${BACKEND_URL}/users/${userId}/my-restaurants`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setSavedRestaurants(response.data);
        }
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred while fetching saved restaurants.");
      }
    };

    getSavedRestaurants();
  }, [userId, savedRestaurants, token]);

  useEffect(() => {
    const handleCheckUser = async (): Promise<void> => {
      try {
        const accessToken = await checkUser();
        if (accessToken) setToken(accessToken);
      } catch (error) {
        console.error(error);
      }
    };
    handleCheckUser();
  }, [checkUser, userId]);

  const savedRestaurantsList = savedRestaurants.map((restaurant) => {
    return (
      <div key={restaurant.id}>
        <SingleRestaurantCard restaurant={restaurant} />
      </div>
    );
  });

  return (
    <div>
      <NavBar />
      <Box className="saved-restaurants-page-container">
        <Text className="page-header">My saved restaurants</Text>
        <Box className="saved-restaurants-container">
          {savedRestaurantsList}
        </Box>
      </Box>
    </div>
  );
};

export default SavedRestaurants;
