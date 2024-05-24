import { useAuth0 } from "@auth0/auth0-react";
import { MdOutlineLogout } from "react-icons/md";

const LogoutButton = (): JSX.Element => {
  const { logout } = useAuth0();

  const logOut = (): void => {
    localStorage.removeItem("userId");
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <button onClick={logOut} style={{ display: "flex", alignItems: "center" }}>
      Log out <MdOutlineLogout style={{ marginLeft: "5px" }} />
    </button>
  );
};

export default LogoutButton;
