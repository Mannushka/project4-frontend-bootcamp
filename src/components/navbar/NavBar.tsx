import LoginButton from "../authentication/LoginButton";
import LogoutButton from "../authentication/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserMenu from "./userMenu";

// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// interface NavBarProps {
//   brandName: string;
//   imageSrcPath: string;
//   navItems: string[];
// }

const NavBar = (): JSX.Element => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const brandName = "Food Harbour";
  const navItems = ["Home", "Restaurants", "About us"];
  const imagePath = `https://firebasestorage.googleapis.com/v0/b/food-harbour.appspot.com/o/navbar-img%2Fdumbling.png?alt=media&token=${
    import.meta.env.VITE_NAVBAR_IMG_TOKEN
  }`;
  const navigate = useNavigate();

  const navigateToPage = (item: string): void => {
    if (item === "Home") {
      navigate("/");
    }
    if (item === "Restaurants") {
      navigate("/restaurants");
    }
    if (item === "About us") {
      navigate("/about");
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light bg-light shadow">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src={imagePath}
              width="55"
              height="50"
              className="d-inline-block align-center me-2"
              alt=""
            />
            <span className="fw-bolder fs-4"> {brandName}</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse 
          navbar-collapse 
          align-items-start
          d-flex
          flex-column
          flex-md-row"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-1">
              {navItems.map((items, index) => (
                <li
                  key={items}
                  className="nav-item"
                  onClick={() => {
                    setSelectedIndex(index);
                    navigateToPage(items);
                  }}
                >
                  <a
                    className={
                      selectedIndex === index
                        ? "nav-link active fw-bold"
                        : "nav-link"
                    }
                    // href="#"
                  >
                    {items}
                  </a>
                </li>
              ))}
              {/* <li className="nav-item active">
                <a className="nav-link" href="#">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle me-5"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Restaurants
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </li> */}
              {/* <li>
                <form className=" d-flex me-3" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button
                    className="btn btn-outline-success my-2 my-sm-0"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
              </li> */}
            </ul>
            <form className=" d-flex me-5 mb-2" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
            <div className="me-4 mb-2 ">
              {/* {isAuthenticated && !isLoading && `Hello ${user?.first_name}`} */}
              {isAuthenticated && !isLoading && <UserMenu />}
            </div>
            <div className="me-4 mb-2">
              {isAuthenticated && !isLoading && <LogoutButton />}
              {!isAuthenticated && !isLoading && <LoginButton />}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
