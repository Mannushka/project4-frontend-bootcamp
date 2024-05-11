import React from "react";
import axios from "axios";
import { BACKEND_URL } from "../../constants";
import { useState, useEffect } from "react";
import SingleRestaurantCard from "./SingleRestaurantCard";
import Spinner from "../../components/ui/Spinner";
import FoodCategoryFilters from "../../components/filters/FoodCategoryFilters";

const RestaurantsList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [categoryParams, setCategoryParams] = useState<string | string[]>("");
  const [locationParams, setLocationParams] = useState<string | string[]>("");
  const [priceParams, setPriceParams] = useState<number | number[]>();
  useEffect(() => {
    setLoading(true);
    const getAllRestaurantsInfo = async (): Promise<void> => {
      try {
        const params: {
          location?: string | string[];
          category?: string | string[];
          priceCategory?: number | number[];
        } = {};
        if (
          (Array.isArray(locationParams) && locationParams.length > 0) ||
          (typeof locationParams === "string" && locationParams)
        ) {
          params.location = locationParams;
        }

        if (
          (Array.isArray(categoryParams) && categoryParams.length > 0) ||
          (typeof categoryParams === "string" && categoryParams)
        ) {
          params.category = categoryParams;
        }

        if (
          (Array.isArray(priceParams) && priceParams.length > 0) ||
          (!isNaN(priceParams as number) && priceParams)
        ) {
          params.priceCategory = priceParams;
        }

        console.log(priceParams);
        console.log(isNaN(priceParams as number));

        const response = await axios.get(`${BACKEND_URL}/restaurants`, {
          params: params,
        });
        setRestaurants(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getAllRestaurantsInfo();
  }, [categoryParams, locationParams, priceParams]);

  // const handleCategoryClick = (item: string) => {
  //   setCategoryParams((prevCategoryParams) => {
  //     if (!prevCategoryParams) {
  //       return item;
  //     } else {
  //       return [...prevCategoryParams, item];
  //     }
  //   });
  // };
  console.log(categoryParams);

  const restaurantsList = restaurants.map((restaurant) => {
    return (
      <div key={restaurant.id}>
        <SingleRestaurantCard restaurant={restaurant} />
      </div>
    );
  });
  return (
    <div>
      <div>
        <FoodCategoryFilters
          selectedItems={categoryParams}
          setSelectedItems={setCategoryParams}
        />
      </div>
      <div>{loading && !restaurants.length && <Spinner />}</div>
      <div>{!loading && restaurants.length > 0 && restaurantsList}</div>
    </div>
  );
};

export default RestaurantsList;
