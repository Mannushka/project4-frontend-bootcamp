import React from "react";
import axios from "axios";
import { BACKEND_URL } from "../../constants";
import { useState, useEffect } from "react";
import SingleRestaurantCard from "../../components/restaurants-listings/SingleRestaurantCard";
import Spinner from "../../components/ui/Spinner";
import FoodCategoryFilter from "../../components/filters/FoodCategoryFilter";
import LocationFilter from "../../components/filters/LocationFilter";
import FilterOptions from "../../components/filters/FilterOptions";
import FilterButtonGroup from "../../components/filters/FilterButtonGroup";
import { convertPriceCategoriesToNums } from "../../utils/convertPriceCategoriesToNums";
import { Flex, Box, Heading } from "@chakra-ui/react";
import "./Restaurants.css";
import NavBar from "../../components/navbar/NavBar";
import PaginationComponent from "../../components/ui/pagination/PaginationComponent";
import SearchBar from "../../components/SearchBar";
import SortByMenu from "../../components/restaurants-listings/SortByMenu";

const RestaurantsList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [categoryParams, setCategoryParams] = useState<string[]>([]);
  const [locationParams, setLocationParams] = useState<string[]>([]);
  const [priceParams, setPriceParams] = useState<string[]>([]);
  const [nameParams, setNameParams] = useState<string>("");
  const [sortByParams, setSortByParams] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPagesNum, setTotalPagesNum] = useState<number>(0);
  const [totalRestaurantsNum, setTotalRestautantsNum] = useState<number>(0);
  const priceCategoriesArray = ["$", "$$", "$$$"];

  useEffect(() => {
    setLoading(true);
    const getAllRestaurantsInfo = async (): Promise<void> => {
      try {
        const params: {
          location?: string[];
          category?: string[];
          priceCategory?: number[];
          name?: string;
          page?: number;
          sortBy?: string;
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

        if (nameParams) {
          params.name = nameParams;
        }
        if (sortByParams) {
          params.sortBy = sortByParams;
        }
        params.page = page;
        console.log(params);

        const response = await axios.get(`${BACKEND_URL}/restaurants`, {
          params: params,
        });
        setRestaurants(response.data.restaurants);
        setTotalPagesNum(response.data.totalPages);
        setTotalRestautantsNum(response.data.totalCount);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getAllRestaurantsInfo();
  }, [
    categoryParams,
    locationParams,
    priceParams,
    page,
    nameParams,
    sortByParams,
  ]);

  const restaurantsList = restaurants.map((restaurant) => {
    return (
      <div key={restaurant.id}>
        <SingleRestaurantCard restaurant={restaurant} />
      </div>
    );
  });

  return (
    <>
      <NavBar />
      <Flex wrap="wrap" margin={4} padding={2} justifyContent="center">
        <Box className="restaurant-list-box" id="restaurant-filters">
          <SearchBar nameParams={nameParams} setNameParams={setNameParams} />

          <Heading as="h4" size="md" marginBottom={5}>
            Filters
          </Heading>
          <div>
            <FilterOptions
              selectedItems={categoryParams}
              setSelectedItems={setCategoryParams}
              filterType="category"
              path="categories"
            />
          </div>
          <div>
            <Heading as="h5" size="sm">
              Price
            </Heading>
            <FilterButtonGroup
              filterItems={priceCategoriesArray}
              selectedItems={priceParams}
              setSelectedItems={setPriceParams}
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
        </Box>
        <Box className="restaurant-list-box" id="restaurants">
          <SortByMenu
            sortByParams={sortByParams}
            setSortByParams={setSortByParams}
          />
          <div>{loading && !restaurants.length && <Spinner />}</div>
          <div
            // style={{
            //   display: "flex",
            //   flexDirection: "column",
            //   alignItems: "flex-start",
            //   justifyContent: "flex-start",
            // }}
            className="restaurants-list"
          >
            {!loading && !!restaurants.length && restaurantsList}
          </div>
          {!!restaurants.length && totalPagesNum > 1 && (
            <PaginationComponent
              page={page}
              setPage={setPage}
              totalPagesNum={totalPagesNum}
              totalItemsNum={totalRestaurantsNum}
            />
          )}
        </Box>
      </Flex>
    </>
  );
};

export default RestaurantsList;

{
  /* <div>
        <FoodCategoryFilter
          selectedItems={categoryParams}
          setSelectedItems={setCategoryParams}
        />
      </div> */
}
{
  /* <div>
        <LocationFilter
          selectedItems={locationParams}
          setSelectedItems={setLocationParams}
        />
      </div> */
}
