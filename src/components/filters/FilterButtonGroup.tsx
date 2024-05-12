import React from "react";
import { Button, ButtonGroup, Wrap, WrapItem } from "@chakra-ui/react";

interface FilterProps {
  filterItems: string[];
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterButtonGroup = ({
  filterItems,
  selectedItems,
  setSelectedItems,
}: FilterProps): JSX.Element => {
  const handleClick = (item: string): void => {
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
    <WrapItem key={filterItem}>
      <Button
        variant={isItemSelected(filterItem) ? "solid" : "outline"}
        onClick={() => handleClick(filterItem)}
      >
        {filterItem}
      </Button>
    </WrapItem>
  ));

  return (
    <div>
      <Wrap spacing={2}>
        <ButtonGroup>{buttons}</ButtonGroup>
      </Wrap>
    </div>
  );
};

export default FilterButtonGroup;

// const handleClick = (item: string) => {
//   if (!selectedItems) {
//     setSelectedItems(item);
//   } else {
//     if (typeof selectedItems === "string") {
//       if (selectedItems === item) {
//         setSelectedItems("");
//       } else {
//         setSelectedItems([selectedItems, item]);
//       }
//     } else if (Array.isArray(selectedItems)) {
//       if (selectedItems.includes(item)) {
//         setSelectedItems((prevSelectedItems) =>
//           (prevSelectedItems as string[]).filter(
//             (selectedItem: string) => selectedItem !== item
//           )
//         );
//       } else {
//         setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
//       }
//     }
//   }
// };
