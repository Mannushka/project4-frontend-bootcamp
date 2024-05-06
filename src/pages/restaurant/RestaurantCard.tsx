import React from "react";
import axios from "axios";
import { BACKEND_URL } from "../../constants";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RestaurantCard = () => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const restaurantId = Number(id);

  const getRestaurantInfo = async () => {
    if (restaurantId) {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/restaurants/${restaurantId}`
        );
        setRestaurant(response.data);
        console.log(restaurant);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // const showRestarauntInfo = () => {
  //   if (accessToken) {
  //     getRestaurantInfo();
  //   }
  // };

  // useEffect(() => {
  //   getToken();
  // }, []);

  useEffect(() => {
    setLoading(true);
    getRestaurantInfo();
  }, [restaurantId]);

  return <div>RestaurantCard</div>;
};

export default RestaurantCard;
