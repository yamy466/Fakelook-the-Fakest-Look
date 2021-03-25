import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Image, MenuItem } from "semantic-ui-react";
import logo from "../../logo/logo_transparent.png";
import { connect } from "react-redux";
import jwtService from "../../services/jwtService";
const {getAccessToken} = jwtService

const Navigation = (props) => {
  const [pathName, setPathName] = useState(window.location.pathname);
  const [home, aboutUs, map, feed] = ["Home", "About Us", "Map", "Feed"];

  const history = useHistory();

  const onItemClick = (path) => {
    history.push(path);
    setPathName(path);
  };
  useEffect(() => {
    history.push(props.path);
  }, [props.path]);
  
  
  return ( 
    <>
      <Image src={logo} size="tiny" onClick={() => onItemClick("/")} />

      {getAccessToken() ? (
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
      ) : (
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

const mapStateToProps = ({ path }) => {
  return {
    path,
  };
};

export default connect(mapStateToProps)(Navigation);
