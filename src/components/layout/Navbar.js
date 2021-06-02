import React, { useEffect, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
} from "reactstrap";
import { Link } from "react-router-dom";

const NavBar = ({ isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Dashboard</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {!isLoggedIn ? null : (
              <>
                <NavItem>
                  <Link to="/">Home</Link>
                </NavItem>
                <NavItem>
                  <Link to="/post/create">Create Post</Link>
                </NavItem>
              </>
            )}
          </Nav>
          {!isLoggedIn ? (
            <>
              <NavbarText>
                <Link to="/login">Login /</Link>
              </NavbarText>
              <NavbarText>
                <Link to="/register">Register</Link>
              </NavbarText>
            </>
          ) : (
            <NavbarText>
              <Link to="/logout">Logout</Link>
            </NavbarText>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
