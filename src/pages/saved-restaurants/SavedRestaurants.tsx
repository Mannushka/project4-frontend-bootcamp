import { BACKEND_URL, USER } from "../../constants";
import axios from "axios";
import { useUserInfo } from "../../context/UserInfoContext";
import { useState, useEffect } from "react";
import { validateId } from "../../utils/validateId";
import SingleRestaurantCard from "../../components/restaurants-listings/SingleRestaurantCard";
import NavBar from "../../components/navbar/NavBar";
const SavedRestaurants = () => {
  const [savedRestaurants, setSavedRestaurants] = useState<Restaurant[]>([]);
  const { userId } = useUserInfo();

  useEffect(() => {
    const getSavedRestaurants = async (): Promise<void> => {
      try {
        validateId(userId, USER);
        const response = await axios.get(
          `${BACKEND_URL}/users/${userId}/my-restaurants`
        );

        setSavedRestaurants(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        throw new Error("An error occurred while fetching saved restaurants.");
      }
    };

    getSavedRestaurants();
  }, [userId, savedRestaurants]);

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
      {savedRestaurantsList}
    </div>
  );
};

export default SavedRestaurants;
