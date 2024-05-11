import React from "react";
import axios from "axios";
import { BACKEND_URL } from "../../constants";
import { useState, useEffect } from "react";
import SingleRestaurantCard from "./SingleRestaurantCard";
import Spinner from "../../components/ui/Spinner";
import FoodCategoryFilter from "../../components/filters/FoodCategoryFilter";
import LocationFilter from "../../components/filters/LocationFilter";
import FilterOptions from "../../components/filters/FilterOptions";

const RestaurantsList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [categoryParams, setCategoryParams] = useState<string[]>([]);
  const [locationParams, setLocationParams] = useState<string[]>([]);
  const [priceParams, setPriceParams] = useState<number | number[]>();
  useEffect(() => {
    setLoading(true);
    const getAllRestaurantsInfo = async (): Promise<void> => {
      try {
        const params: {
          location?: string[];
          category?: string[];
          priceCategory?: number | number[];
        } = {};
        if (locationParams.length) {
          params.location = locationParams;
        }

        if (categoryParams.length) {
          params.category = categoryParams;
        }

        if (
          (Array.isArray(priceParams) && priceParams.length > 0) ||
          (!isNaN(priceParams as number) && priceParams)
        ) {
          params.priceCategory = priceParams;
        }

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
      {/* <div>
        <FoodCategoryFilter
          selectedItems={categoryParams}
          setSelectedItems={setCategoryParams}
        />
      </div> */}
      {/* <div>
        <LocationFilter
          selectedItems={locationParams}
          setSelectedItems={setLocationParams}
        />
      </div> */}
      <div>
        <FilterOptions
          selectedItems={categoryParams}
          setSelectedItems={setCategoryParams}
          filterType="category"
          path="categories"
        />
      </div>
      <div>
        <FilterOptions
          selectedItems={locationParams}
          setSelectedItems={setLocationParams}
          filterType="location"
          path="locations"
        />
      </div>
      <div>{loading && !restaurants.length && <Spinner />}</div>
      <div>{!loading && restaurants.length > 0 && restaurantsList}</div>
    </div>
  );
};

export default RestaurantsList;
