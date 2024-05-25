import { MdBookmarks } from "react-icons/md";
import { useUserInfo } from "../../context/UserInfoContext";
import { BACKEND_URL, RESTAURANT, USER } from "../../constants";
import axios from "axios";
import { validateId } from "../../utils/validateId";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";

interface SaveButtonProps {
  restaurantId: number;
}
const SaveButton = ({ restaurantId }: SaveButtonProps): JSX.Element => {
  const { userId } = useUserInfo();
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    const checkIfRestaurantSaved = async (): Promise<void> => {
      try {
        validateId(restaurantId, RESTAURANT);
        validateId(userId, USER);

        const response = await axios.get(
          `${BACKEND_URL}/users/${userId}/check-saved-restaurant`,
          { params: { restaurantId } }
        );

        setIsSaved(response.data.isRestaurantSaved);
      } catch (error) {
        console.error(error);
        throw new Error(
          "An error occurred while checking if the restaurant is saved."
        );
      }
    };

    checkIfRestaurantSaved();
  }, [restaurantId, userId, isSaved]);

  const saveRestaurant = async (): Promise<void> => {
    try {
      validateId(restaurantId, RESTAURANT);
      validateId(userId, USER);

      const response = await axios.post(
        `${BACKEND_URL}/users/${userId}/my-restaurants`,
        {
          restaurantId: restaurantId,
        }
      );

      if (response.status === 201) {
        console.log("Restaurant saved!");
      }
      setIsSaved(true);
    } catch (error) {
      console.error(error);
    }
  };

  const removeRestaurant = async (): Promise<void> => {
    try {
      validateId(restaurantId, RESTAURANT);
      validateId(userId, USER);

      const response = await axios.delete(
        `${BACKEND_URL}/users/${userId}/my-restaurants`,
        { params: { restaurantId } }
      );

      if (response.status === 204) {
        setIsSaved(false);
      }
      console.log("Restaurant removed!");
    } catch (error) {
      console.error(error);
    }
  };
  const handleClick = (): void => {
    if (isSaved) {
      removeRestaurant();
    } else {
      saveRestaurant();
    }
  };

  return (
    <div className="save-button">
      {!!userId && (
        <Button
          variant={isSaved ? "ghost" : "solid"}
          onClick={handleClick}
          style={{ backgroundColor: "white" }}
        >
          <span className="single-restaurant-button-text">
            {isSaved ? "Remove from saved" : <MdBookmarks />}
          </span>
        </Button>
      )}
    </div>
  );
};

export default SaveButton;
