import { Menu, MenuButton, MenuList, MenuItem, Portal } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const UserMenu = (): JSX.Element => {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const userMenu = (
    <Menu>
      <MenuButton>
        Hello {user?.first_name} <ChevronDownIcon />
      </MenuButton>
      <Portal>
        <MenuList>
          <MenuItem onClick={() => navigate("/my-reviews")}>
            My reviews
          </MenuItem>
          <MenuItem onClick={() => navigate("/my-restaurants")}>
            Saved restaurants
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
  return <div>{userMenu}</div>;
};

export default UserMenu;
