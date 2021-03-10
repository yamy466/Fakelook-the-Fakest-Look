import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Image, MenuItem } from "semantic-ui-react";
import logo from "../../logo/logo_transparent.png";
import { connect } from 'react-redux'


const Navigation = (props) => {
  const [pathName, setPathName] = useState(window.location.pathname);
  const [home, aboutUs, map, feed] = ["Home", "About Us", "Map", "Feed"];

  const history = useHistory();

  const onItemClick = (path) => {
    history.push(path);
    setPathName(path);
  };

  useEffect(() => {
    history.push(props.path)
  }, [props.path])

  useEffect(() => {
    setPathName(window.location.pathname);
  }, [props.accessToken,history]);

  return (
    <>
      <Image src={logo} size="tiny" onClick={() => onItemClick("/")} />

      {props.accessToken ? (
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

const mapStateToProps = ({login,path}) => {
  return {
    accessToken: login.accessToken,
    path
  };
};

export default connect(mapStateToProps)(Navigation);
