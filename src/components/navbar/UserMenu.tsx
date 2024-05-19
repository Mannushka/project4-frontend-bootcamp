import { Menu, MenuButton, MenuList, MenuItem, Portal } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";

const UserMenu = (): JSX.Element => {
  const { user } = useAuth0();
  const userMenu = (
    <Menu>
      <MenuButton>
        Hello {user?.first_name} <ChevronDownIcon />
      </MenuButton>
      <Portal>
        <MenuList>
          <MenuItem>My reviews</MenuItem>
          <MenuItem>Saved restaurants</MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
  return <div>{userMenu}</div>;
};

export default UserMenu;
