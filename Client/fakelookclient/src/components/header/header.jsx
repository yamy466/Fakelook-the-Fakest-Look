import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, GridRow, Image, Menu } from "semantic-ui-react";
import Login from "../loginComponents/login";
import "./header.css"
import {connect} from "react-redux"
import Navigation from "../navigationComponents/navigation";
import env from "../../enviroments/enviroment";
import {loginChange} from "../../actions"

const Header = (props) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const history = useHistory()
  const {loggedInUser,loginChange} = props

  const onAuthClick = (e) => {
    if (loggedInUser) {
      loginChange(false)
      history.push("/")
    } else {
      setLoginOpen(true)
    }
  };

  const onRegisterClick = (e) => {};

  return (
    <Menu className="menu" tabular color="blue">
      <Navigation loggedIn={loggedInUser}/>
      <Menu.Menu position="right">
        {!loggedInUser && <Button style={{backgroundColor: env.mainColor}} onClick={onRegisterClick}>Register</Button>}
        <Button  className="right" onClick={onAuthClick}>
          {loggedInUser ? "Logout" : "Login"}
        </Button>
      </Menu.Menu>
      <Login open={loginOpen} onClose={() => setLoginOpen(false)} />
    </Menu>
  );
};


const mapStateToProps = ({loggedInUser}) => {
  return {
    loggedInUser
  };
};

export default connect(mapStateToProps,{loginChange})(Header);
