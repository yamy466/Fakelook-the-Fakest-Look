import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Image, Menu, MenuItem } from "semantic-ui-react";
import logo from "../../logo/logo_transparent.png";

const Navigation = (props) => {
  const { loggedIn } = props;
  const [pathName, setPathName] = useState(window.location.pathname);
  const [home, aboutUs, map, feed] = ["Home", "About Us", "Map", "Feed"];

  const history = useHistory();

  const onItemClick = (path) => {
    history.push(path);
    setPathName(window.location.pathname);
  };

  return (
    <>
      <Image src={logo} size="tiny" onClick={() => onItemClick("/")}/>

      
      {loggedIn ? (
        <>
          <MenuItem
            name={map}
            active={pathName === "/map"}
            onClick={() => onItemClick("/map")}
          />
          <MenuItem
            name={feed}
            active={pathName === "/feed"}
            onClick={() => onItemClick("/feed")}
          />
        </>
        
      ):
      (
        <>
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
      </>
      )}
    </>
  );
};

export default Navigation;
