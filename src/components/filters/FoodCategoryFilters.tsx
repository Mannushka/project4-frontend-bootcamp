import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../constants";
import FilterButtonGroup from "./FilterButtonGroup";
interface FilterProps {
  selectedItems: string | string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string | string[]>>;
}

const FoodCategoryFilters = ({
  selectedItems,
  setSelectedItems,
}: FilterProps) => {
  const [foodCategories, setFoodCategories] = useState<string[]>([]);

  useEffect(() => {
    const getFoodCategoriesInfo = async (): Promise<void> => {
      try {
        const response = await axios.get(`${BACKEND_URL}/categories`);
        const categories = response.data;
        setFoodCategories(
          categories.map((category: FoodCategory) => category.category_name)
        );
      } catch (error) {
        console.log(error);
      }
    };
    getFoodCategoriesInfo();
  }, []);

  return (
    <div>
      <p>Cuisine:</p>
      <FilterButtonGroup
        filterItems={foodCategories}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </div>
  );
};

export default FoodCategoryFilters;
