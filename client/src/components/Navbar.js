import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Button, Nav, Navbar, Container } from "react-bootstrap";
import misc from "../images/misc.png";
import userImage from "../images/user.png";
import decode from "jwt-decode";
import { useDispatch } from "react-redux";

export const NavBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    history.push("/auth");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <Container>
      <Navbar bg="light" expand="xl">
        <Nav className="mr-auto">
          <h1>
            <Link to="/">Crafter</Link>
          </h1>
          <img className="ml-2" src={misc} alt="icon" height="50px" />
        </Nav>
        {user?.result ? (
          <Nav>
            <Navbar.Brand>
              <img
                alt={user?.result.name}
                src={user?.result.imageUrl || userImage}
                height="50px"
                width="50px"
              />
              {/* {user?.result.name.charAt(0)} */}
              {user?.result.name}
            </Navbar.Brand>

            <Button variant="danger" onClick={logout}>
              Logout
            </Button>
          </Nav>
        ) : (
          <Nav>
            <Link to="/auth">
              <Button variant="primary">Sign In</Button>
            </Link>
          </Nav>
        )}
      </Navbar>
    </Container>
  );
};
