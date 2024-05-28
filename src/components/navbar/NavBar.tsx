import LoginButton from "../authentication/LoginButton";
import LogoutButton from "../authentication/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
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

  // return (
  //   <div>
  //     <nav className="navbar navbar-expand-md navbar-light bg-light shadow">
  //       <div className="container-fluid">
  //         <a className="navbar-brand" href="#">
  //           <img
  //             src={imagePath}
  //             width="55"
  //             height="50"
  //             className="d-inline-block align-center me-2"
  //             alt="food_harbour"
  //           />
  //           <span className="fw-bolder fs-4"> {brandName}</span>
  //         </a>
  //         <button
  //           className="navbar-toggler"
  //           type="button"
  //           data-toggle="collapse"
  //           data-target="#navbarSupportedContent"
  //           aria-controls="navbarSupportedContent"
  //           aria-expanded="false"
  //           aria-label="Toggle navigation"
  //         >
  //           <span className="navbar-toggler-icon"></span>
  //         </button>
  //         <div
  //           className="collapse
  //         navbar-collapse
  //         align-items-start
  //         d-flex
  //         flex-column
  //         flex-md-row"
  //           id="navbarSupportedContent"
  //         >
  //           <ul className="navbar-nav me-auto mb-2 mb-lg-1">
  //             {navItems.map((items, index) => (
  //               <li
  //                 key={items}
  //                 className="nav-item"
  //                 onClick={() => {
  //                   setSelectedIndex(index);
  //                   navigateToPage(items);
  //                 }}
  //               >
  //                 <a
  //                   className={
  //                     selectedIndex === index
  //                       ? "nav-link active fw-bold"
  //                       : "nav-link"
  //                   }
  //                   // href="#"
  //                 >
  //                   {items}
  //                 </a>
  //               </li>
  //             ))}
  //           </ul>

  //           <div className="me-4 mb-2 ">
  //             {/* {isAuthenticated && !isLoading && `Hello ${user?.first_name}`} */}
  //             {isAuthenticated && !isLoading && <UserMenu />}
  //           </div>
  //           <div className="me-4 mb-2">
  //             {isAuthenticated && !isLoading && <LogoutButton />}
  //             {!isAuthenticated && !isLoading && <LoginButton />}
  //           </div>
  //         </div>
  //       </div>
  //     </nav>
  //   </div>
  // );

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
                // className={selectedIndex === index ? "active fw-bold" : ""}
              >
                {item}
              </Nav.Link>
            ))}
          </Nav>
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}

          {/* <div className="d-none d-sm-block">
            {isAuthenticated && !isLoading && <UserMenu />}
          </div> */}

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
