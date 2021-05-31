import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Dashboard</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link to="/">Home</Link>
            </NavItem>
            {!localStorage.getItem("clientData") ? (
              <>
                <NavItem>
                  <Link to="/login">Login</Link>
                </NavItem>
                <NavItem>
                  <Link to="/register">Register</Link>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <Link to="/post/create">Create Post</Link>
                </NavItem>
                <NavbarText>
                  <Link to="/logout">Logout</Link>
                </NavbarText>
              </>
            )}
          </Nav>

          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
