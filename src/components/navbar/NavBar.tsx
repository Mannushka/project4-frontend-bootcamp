import LoginButton from "../authentication/LoginButton";
import LogoutButton from "../authentication/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";

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
      navigate("/about-us");
    }
  };

  return (
    <Navbar expand="lg" className="shadow" id="navbar">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            src={imagePath}
            width="55"
            height="50"
            className="d-inline-block align-center me-2"
            alt="food_harbour"
          />
          <span className="fw-bolder fs-4"> {brandName}</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {navItems.map((item, index) => (
              <Nav.Link
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => {
                  setSelectedIndex(index);
                  navigateToPage(item);
                }}
                className={selectedIndex === index ? "active fw-bold" : ""}
              >
                {item}
              </Nav.Link>
            ))}
          </Nav>

          <div className="me-4 mb-2 ">
            {isAuthenticated && !isLoading && <UserMenu />}
          </div>
          <div className="me-4 mb-2">
            {isAuthenticated && !isLoading && <LogoutButton />}
            {!isAuthenticated && !isLoading && <LoginButton />}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
