import { useEffect } from "react";
import "./App.css";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "./components/navbar/NavBar";
import { BACKEND_URL } from "./constants";
import { useUserInfo } from "./context/UserInfoContext";
import HomePage from "./pages/homepage/HomePage";

function App(): JSX.Element {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const { updateUserId } = useUserInfo();

  useEffect(() => {
    if (user) {
      postNewUserToDb();
    }
  }, [user]);

  const checkIfUserIsInDb = async (): Promise<boolean> => {
    if (isAuthenticated && user?.email) {
      try {
        const accessToken = await getAccessTokenSilently();

        const response = await axios.get(`${BACKEND_URL}/users/find-user`, {
          params: {
            email: user?.email,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        updateUserId(response.data);
        if (response.data === null) {
          return false;
        } else {
          return true;
        }
      } catch (err) {
        console.log(err);
      }
    }
    return false;
  };

  const postNewUserToDb = async (): Promise<void> => {
    const isUserInDb = await checkIfUserIsInDb();

    if (!isUserInDb) {
      try {
        const response = await axios.post(`${BACKEND_URL}/users`, {
          email: user?.email,
          first_name: user?.first_name,
          last_name: user?.last_name,
        });
        updateUserId(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="app">
      <NavBar />
      <HomePage />
    </div>
  );
}

export default App;
