import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../constants";
import FilterButtonGroup from "./FilterButtonGroup";

interface FilterProps {
  filterType: string;
  path: string;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterOptions = ({
  selectedItems,
  setSelectedItems,
  path,
  filterType,
}: FilterProps) => {
  const [filterItems, setFilterItems] = useState<string[]>([]);

  const capitalizedFilterType =
    filterType.charAt(0).toUpperCase() + filterType.slice(1);

  useEffect(() => {
    const getFilterItemsInfo = async (): Promise<void> => {
      try {
        const response = await axios.get(`${BACKEND_URL}/${path}`);
        const filterItemsData = response.data;
        setFilterItems(
          filterItemsData.map(
            (filterItem: { [key: string]: string }) =>
              filterItem[`${filterType}_name`]
          )
        );
      } catch (error) {
        console.log(error);
      }
    };
    getFilterItemsInfo();
  }, [filterType, path]);

  console.log(filterItems);

  return (
    <div>
      <p>{capitalizedFilterType}:</p>
      <FilterButtonGroup
        filterItems={filterItems}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </div>
  );
};

export default FilterOptions;
