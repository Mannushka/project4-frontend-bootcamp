import React from "react";
import axios from "axios";
import { BACKEND_URL } from "../../constants";
import { useState, useEffect } from "react";
import SingleRestaurantCard from "./SingleRestaurantCard";
import Spinner from "../../components/ui/Spinner";

const RestaurantsList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    setLoading(true);
    const getAllRestaurantsInfo = async (): Promise<void> => {
      try {
        const response = await axios.get(`${BACKEND_URL}/restaurants`);
        setRestaurants(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getAllRestaurantsInfo();
  }, []);

  const restaurantsList = restaurants.map((restaurant) => {
    return (
      <div key={restaurant.id}>
        <SingleRestaurantCard restaurant={restaurant} />
      </div>
    );
  });
  return (
    <div>
      <div>{loading && !restaurants.length && <Spinner />}</div>
      <div>{!loading && restaurants.length > 0 && restaurantsList}</div>
    </div>
  );
};

export default RestaurantsList;
