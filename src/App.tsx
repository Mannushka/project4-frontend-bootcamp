import { useEffect } from "react";
import "./App.css";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "./components/navbar/NavBar";
import { BACKEND_URL } from "./constants";
import { useUserInfo } from "./context/UserInfoContext";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import imagePath from "./assets/dumbling.png";

function App(): JSX.Element {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { updateUserId } = useUserInfo();

  const checkIfUserIsInDb = async (): Promise<boolean> => {
    if (isAuthenticated && user?.email) {
      try {
        const response = await axios.get(`${BACKEND_URL}/users/find-user`, {
          params: {
            email: user?.email,
          },
        });
        console.log(response.data);
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

  useEffect(() => {
    if (user) {
      postNewUserToDb();
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="app">
      <NavBar />
    </div>
  );
}

export default App;
