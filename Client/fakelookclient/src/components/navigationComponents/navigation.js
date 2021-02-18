import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Image, Menu, MenuItem } from "semantic-ui-react";
import logo from "../../logo/logo_transparent.png";

const Navigation = () => {
  const [active, setActive] = useState("Home");
  const [home, aboutUs, login] = ["Home", "About Us", "Login"];

  const history = useHistory();

  const onItemClick = (name, path) => {
    history.push(path);
    setActive(name);
  };

  return (
    <Menu pointing secondary>
      <Image src={logo} size="tiny" />
      <MenuItem
        name={home}
        active={active === home}
        onClick={() => onItemClick(home, "/")}
      />
      <MenuItem
        name={aboutUs}
        active={active === aboutUs}
        onClick={() => onItemClick(aboutUs, "/aboutus")}
      />
      <MenuItem
        name={login}
        active={active === login}
        onClick={() => onItemClick(login, "/login")}
      />
    </Menu>
  );
};

export default Navigation;
