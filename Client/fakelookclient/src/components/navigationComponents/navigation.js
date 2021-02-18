import React from "react";
import { withRouter, Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="ui secondary pointing menu">
      <a
        href="/"
        className={window.location.pathname === "/" ? "active item" : "item"}>
        Home
      </a>
      <a
        href="/aboutus"
        className={
          window.location.pathname === "/aboutus" ? "active item" : "item"
        }>
        About Us
      </a>
      <div class="right menu">
        <Link
          className={
            window.location.pathname === "/login" ? "active item" : "item"
          }
          to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default withRouter(Navigation);
