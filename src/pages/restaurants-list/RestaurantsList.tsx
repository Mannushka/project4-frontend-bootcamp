import React from "react";
import axios from "axios";
import { BACKEND_URL } from "../../constants";
import { useState, useEffect } from "react";
import SingleRestaurantCard from "./SingleRestaurantCard";
import Spinner from "../../components/ui/Spinner";
import FoodCategoryFilter from "../../components/filters/FoodCategoryFilter";
import LocationFilter from "../../components/filters/LocationFilter";
import FilterOptions from "../../components/filters/FilterOptions";
import FilterButtonGroup from "../../components/filters/FilterButtonGroup";
import { convertPriceCategoriesToNums } from "../../utils/convertPriceCategoriesToNums";

const RestaurantsList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [categoryParams, setCategoryParams] = useState<string[]>([]);
  const [locationParams, setLocationParams] = useState<string[]>([]);
  const [priceParams, setPriceParams] = useState<string[]>([]);
  const priceCategoriesArray = ["$", "$$", "$$$"];
  useEffect(() => {
    setLoading(true);
    const getAllRestaurantsInfo = async (): Promise<void> => {
      try {
        const params: {
          location?: string[];
          category?: string[];
          priceCategory?: number[];
        } = {};
        if (locationParams.length) {
          params.location = locationParams;
        }

        if (categoryParams.length) {
          params.category = categoryParams;
        }

        if (priceParams.length) {
          params.priceCategory = convertPriceCategoriesToNums(priceParams);
        }

        const response = await axios.get(`${BACKEND_URL}/restaurants`, {
          params: params,
        });
        setRestaurants(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getAllRestaurantsInfo();
  }, [categoryParams, locationParams, priceParams]);

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
      <div>
        <FilterButtonGroup
          filterItems={priceCategoriesArray}
          selectedItems={priceParams}
          setSelectedItems={setPriceParams}
        />
      </div>
      <div>{loading && !restaurants.length && <Spinner />}</div>
      <div>{!loading && restaurants.length > 0 && restaurantsList}</div>
    </div>
  );
};

export default RestaurantsList;
