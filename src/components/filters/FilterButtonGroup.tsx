import React from "react";
import { Button, Wrap, Flex, Box } from "@chakra-ui/react";

interface FilterProps {
  filterItems: string[];
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const FilterButtonGroup = ({
  filterItems,
  selectedItems,
  setSelectedItems,
  page,
  setPage,
}: FilterProps): JSX.Element => {
  const handleClick = (item: string): void => {
    if (page > 1) {
      setPage(1);
    }
    if (!selectedItems) {
      setSelectedItems([item]);
    } else if (selectedItems.includes(item)) {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((selectedItem) => selectedItem !== item)
      );
    } else {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
    }
  };

  const isItemSelected = (item: string): boolean => {
    return selectedItems.includes(item);
  };

  const buttons = filterItems.map((filterItem) => (
    <Box key={filterItem}>
      <Button
        variant={isItemSelected(filterItem) ? "solid" : "outline"}
        onClick={() => handleClick(filterItem)}
      >
        {filterItem}
      </Button>
    </Box>
  ));

  return (
    <Flex wrap="wrap" marginBottom={5}>
      <Wrap spacing={2}>{buttons}</Wrap>
    </Flex>
  );
};

export default FilterButtonGroup;
