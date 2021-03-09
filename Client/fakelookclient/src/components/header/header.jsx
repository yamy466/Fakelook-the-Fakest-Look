import { useState } from "react";
import { Button, Menu } from "semantic-ui-react";
import Login from "../loginComponents/login";
import "./header.css"
import {connect} from "react-redux"
import Navigation from "../navigationComponents/navigation";
import env from "../../enviroments/enviroment";
import {login, logout} from "../../actions"
import Register from "../register/register";

const Header = (props) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const {accessToken,logout} = props

  const onAuthClick = (e) => {
    if (accessToken) {
      logout()
    } else {
      setLoginOpen(true)
    }
  };

  const onRegisterClick = (e) => {
    setRegisterOpen(true)
  };

  return (
    <Menu className="menu" tabular color="blue">
      <Navigation/>
      <Menu.Menu position="right">
        {!accessToken && <Button style={{backgroundColor: env.mainColor}} onClick={onRegisterClick}>Register</Button>}
        <Button  className="right" onClick={onAuthClick}>
          {accessToken ? "Logout" : "Login"}
        </Button>
      </Menu.Menu>
      <Login open={loginOpen} onClose={() => setLoginOpen(false)} />
      <Register open={registerOpen} onClose={() => setRegisterOpen(false) }/>
    </Menu>
  );
};


const mapStateToProps = ({login}) => {
  return {
    accessToken : login.accessToken
  };
};

export default connect(mapStateToProps,{login,logout})(Header);
