import React from "react";
import axios from "axios";
import { BACKEND_URL } from "../../constants";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import "./Restaurant.css";
import { Flex, Box, Text } from "@chakra-ui/react";

const RestaurantInfo = () => {
  const [restaurant, setRestaurant] = useState<Restaurant>({} as Restaurant);
  const [loading, setLoading] = useState<boolean>(false);
  const { restaurantId } = useParams();

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
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getRestaurantInfo();
  }, [restaurantId]);

  const displayRestaurantInfo = (): JSX.Element[] => {
    const infoElements = [];
    for (const key in restaurant) {
      infoElements.push(<p key={key}>{`${key}: ${restaurant[key]}`}</p>);
    }
    return infoElements;
  };

  return (
    <div className="restaurant-container">
      <div className="restaurant-name">{restaurant.name}</div>
      {/* <div className="restaurant-image"> */}
      {/* <img src={`${restaurant.img_url}`} alt="image" /> */}
      {/* </div> */}
      <Flex flexWrap="wrap" className="image-details-wrapper">
        <Box className="restaurant-image">
          <img src={`${restaurant.img_url}`} alt="image" />
        </Box>

        <Box>
          <RestaurantCard restaurant={restaurant} />
        </Box>
      </Flex>
      {/* {displayRestaurantInfo()} */}
    </div>
  );
};

export default RestaurantInfo;
