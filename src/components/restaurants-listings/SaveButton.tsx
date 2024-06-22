import { useUserInfo } from "../../context/UserInfoContext";
import { BACKEND_URL, RESTAURANT, USER } from "../../constants";
import axios from "axios";
import { validateId } from "../../utils/validateId";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";

interface SaveButtonProps {
  restaurantId: number;
  buttonVariant: string;
}
const SaveButton = ({
  restaurantId,
  buttonVariant,
}: SaveButtonProps): JSX.Element => {
  const { userId } = useUserInfo();
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const { checkUser } = useAuth();

  useEffect(() => {
    const checkIfRestaurantSaved = async (): Promise<void> => {
      try {
        validateId(restaurantId, RESTAURANT);
        validateId(userId, USER);

        // const response = await axios.get(
        //   `${BACKEND_URL}/users/${userId}/check-saved-restaurant`,
        //   { params: { restaurantId } },
        // );

        console.log(token);
        if (token) {
          const response = await axios.get(
            `${BACKEND_URL}/users/${userId}/check-saved-restaurant`,
            {
              params: { restaurantId },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setIsSaved(response.data.isRestaurantSaved);
          console.log("success");
        }
      } catch (error) {
        console.error(error);
        throw new Error(
          "An error occurred while checking if the restaurant is saved."
        );
      }
    };

    checkIfRestaurantSaved();
  }, [restaurantId, userId, isSaved, token]);

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

  const saveRestaurant = async (): Promise<void> => {
    try {
      validateId(restaurantId, RESTAURANT);
      validateId(userId, USER);
      if (token) {
        const response = await axios.post(
          `${BACKEND_URL}/users/${userId}/my-restaurants`,
          {
            restaurantId: restaurantId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          console.log("Restaurant saved!");
        }
        setIsSaved(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeRestaurant = async (): Promise<void> => {
    try {
      validateId(restaurantId, RESTAURANT);
      validateId(userId, USER);
      if (token) {
        const response = await axios.delete(
          `${BACKEND_URL}/users/${userId}/my-restaurants`,
          {
            params: { restaurantId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 204) {
          setIsSaved(false);
        }
        console.log("Restaurant removed!");
      }
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
          variant={buttonVariant}
          onClick={handleClick}
          style={{ backgroundColor: "white" }}
        >
          <span className="single-restaurant-button-text">
            {isSaved ? "Remove from saved" : "Add to saved"}
          </span>
        </Button>
      )}
    </div>
  );
};

export default SaveButton;
