import React from "react";
import axios from "axios";
import { BACKEND_URL } from "../../constants";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RestaurantInfo = () => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
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

  return <div>RestaurantInfo</div>;
};

export default RestaurantInfo;
