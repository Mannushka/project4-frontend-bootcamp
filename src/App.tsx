import { useState } from "react";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/authentication/LoginButton";
import LogoutButton from "./components/authentication/LogoutButton";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  console.log(user);
  return <>{!isAuthenticated ? <LoginButton /> : <LogoutButton />}</>;
}

export default App;
