import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const useAuth = () => {
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } =
    useAuth0();

  const checkUser = async () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
      const accessToken = await getAccessTokenSilently();
      // setToken(accessToken);
      return accessToken;
    }
  };

  useEffect(() => {
    checkUser();
  }, [isAuthenticated, loginWithRedirect, getAccessTokenSilently]);

  return { checkUser };
};

export default useAuth;
