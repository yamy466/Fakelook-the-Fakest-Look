import { useState } from "react";
import { Button, GridRow, Image, Menu } from "semantic-ui-react";
import Login from "../loginComponents/login";
import "./header.css"

import Navigation from "../navigationComponents/navigation";
import env from "../../enviroments/enviroment";

const Header = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const onAuthClick = (e) => {
    if (loggedIn) {
      //logout
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
      setLoginOpen(true);
    }
  };

  const onRegisterClick = (e) => {};

  return (
    <Menu className="menu" tabular color="blue">
      <Navigation loggedIn={loggedIn}/>
      <Menu.Menu position="right">
        {!loggedIn && <Button onClick={onRegisterClick}>Register</Button>}
        <Button style={{backgroundColor: env.mainColor}} className="right" onClick={onAuthClick}>
          {loggedIn ? "Logout" : "Login"}
        </Button>
      </Menu.Menu>
      <Login open={loginOpen} onClose={() => setLoginOpen(false)} />
    </Menu>
  );
};

export default Header;
