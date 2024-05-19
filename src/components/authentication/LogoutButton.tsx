import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = (): JSX.Element => {
  const { logout } = useAuth0();

  const logOut = (): void => {
    localStorage.removeItem("userId");
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return <button onClick={logOut}>Log Out</button>;
};

export default LogoutButton;
