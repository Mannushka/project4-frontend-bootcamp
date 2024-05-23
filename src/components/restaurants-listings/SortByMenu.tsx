import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Box,
  Heading,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface SortByMenuProps {
  sortByParams: string;
  setSortByParams: React.Dispatch<React.SetStateAction<string>>;
}
const SortByMenu = ({
  sortByParams,
  setSortByParams,
}: SortByMenuProps): JSX.Element => {
  const RATING = "Highest rating";
  const MOST_REVIES = "Most reviews";
  const MOST_RECENT_REVIEW = "Most recent review";

  const sortingOptions = [RATING, MOST_REVIES, MOST_RECENT_REVIEW];

  const handleMenuClick = (option: string): void => {
    const newOption = option.toLowerCase().replace(/\s+/g, "_");
    setSortByParams(newOption);
  };
  console.log(sortByParams);

  const menu = (
    <Menu isLazy>
      <MenuButton>
        <Heading as="h5" size="md">
          Sort by <ChevronDownIcon />
        </Heading>
      </MenuButton>
      <MenuList>
        {sortingOptions.map((option) => (
          <MenuItem onClick={() => handleMenuClick(option)}>{option}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  );

  return (
    <div>
      <Box marginTop={5} marginBottom={2} marginLeft={3}>
        {menu}
      </Box>
    </div>
  );
};

export default SortByMenu;
