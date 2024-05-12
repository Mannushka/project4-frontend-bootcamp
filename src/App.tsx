import { useEffect } from "react";
import "./App.css";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "./components/navbar/NavBar";
import imagePath from "./assets/dumbling.png";
import { BACKEND_URL } from "./constants";

// import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App(): JSX.Element {
  const { user, isAuthenticated, isLoading } = useAuth0();
  // const navItems = ["Home", "Restaurants", "About us"];

  const checkIfUserIsInDb = async (): Promise<boolean> => {
    if (isAuthenticated && user?.email) {
      try {
        const response = await axios.get(`${BACKEND_URL}/users/finduser`, {
          params: {
            email: user?.email,
          },
        });
        console.log(response.data);
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
    console.log(isUserInDb);
    if (!isUserInDb) {
      try {
        const response = await axios.post(`http://localhost:3000/users`, {
          email: user?.email,
          first_name: user?.first_name,
          last_name: user?.last_name,
        });

        console.log("posted a new user!");
        console.log(response.data);
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
  console.log(user);

  return (
    <>
      <NavBar
      // brandName="Food Harbour"
      // imageSrcPath={imagePath}
      // navItems={navItems}
      />
    </>
  );
}

export default App;
