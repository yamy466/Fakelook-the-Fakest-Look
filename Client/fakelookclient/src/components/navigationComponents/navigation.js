import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Image, Menu, MenuItem } from "semantic-ui-react";
import logo from "../../logo/logo_transparent.png";

const Navigation = () => {
  const pathName = window.location.pathname;
  const [home, aboutUs, login] = ["Home", "About Us", "Login"];

  const history = useHistory();

  const onItemClick = (path) => {
    history.push(path);
  };

  return (
    <Menu pointing secondary>
      <Image src={logo} size="tiny" />
      <MenuItem
        name={home}
        active={pathName === "/"}
        onClick={() => onItemClick("/")}
      />
      <MenuItem
        name={aboutUs}
        active={pathName === "/aboutus"}
        onClick={() => onItemClick("/aboutus")}
      />
      <MenuItem
        className="right menu"
        name={login}
        active={pathName === "/login"}
        onClick={() => onItemClick("/login")}
      />
    </Menu>
  );
};

export default Navigation;
