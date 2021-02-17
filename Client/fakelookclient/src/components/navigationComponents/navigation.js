import React from "react";
import { Navbar, Nav, NavbarBrand } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";

const Navigation = (props) => {
  return (
    <div className="ui inverted segment">
      <Navbar bg="primary" variant="dark">
        <NavbarBrand>Fakelook</NavbarBrand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ui inverted menu">
            <div>
              <Link
                className={
                  window.location.pathname === "/" ? "active item" : "item"
                }
                to="/">
                Home
              </Link>
            </div>
            <div class="right menu">
              <Link
                className={
                  window.location.pathname === "/login" ? "active item" : "item"
                }
                to="/">
                Login
              </Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default withRouter(Navigation);
