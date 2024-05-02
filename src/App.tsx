import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/authentication/LoginButton";
import LogoutButton from "./components/authentication/LogoutButton";

function App(): JSX.Element {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const checkIfUserIsInDb = async (): Promise<boolean> => {
    if (isAuthenticated && user?.email) {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/finduser`,
          {
            params: {
              email: user?.email,
            },
          }
        );

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
  return <>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</>;
}

export default App;
