import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../constants";
import FilterButtonGroup from "./FilterButtonGroup";
import { Heading } from "@chakra-ui/react";

interface FilterProps {
  filterType: string;
  path: string;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const FilterOptions = ({
  selectedItems,
  setSelectedItems,
  path,
  filterType,
  page,
  setPage,
}: FilterProps): JSX.Element => {
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

  return (
    <div>
      <Heading as="h5" size="sm">
        {capitalizedFilterType}
      </Heading>
      <FilterButtonGroup
        filterItems={filterItems}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default FilterOptions;
