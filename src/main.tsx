import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import "./index.css";
// import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import RestaurantInfo from "./pages/restaurant/RestaurantInfo.tsx";
import RestaurantsList from "./pages/restaurants-list/RestaurantsList.tsx";
import { RestaurantInfoProvider } from "./context/RestaurantInfoContext.tsx";
import { UserInfoProvider } from "./context/UserInfoContext.tsx";
import SavedRestaurants from "./pages/saved-restaurants/SavedRestaurants.tsx";
import CurrentUserReviews from "./pages/user-reviews/CurrentUserReviews.tsx";
import AboutUs from "./pages/AboutUs.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope:
          "read:current_user update:current_user_metadata openid profile email read:user_metadata",
      }}
    >
      <ChakraProvider>
        <UserInfoProvider>
          <RestaurantInfoProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/restaurants" element={<RestaurantsList />} />
                <Route
                  path="/restaurants/:restaurantId"
                  element={<RestaurantInfo />}
                />
                <Route path="/my-restaurants" element={<SavedRestaurants />} />
                <Route path="/my-reviews" element={<CurrentUserReviews />} />
                <Route path="/about-us" element={<AboutUs />} />
              </Routes>
            </BrowserRouter>
          </RestaurantInfoProvider>
        </UserInfoProvider>
      </ChakraProvider>
    </Auth0Provider>
  </React.StrictMode>
);
