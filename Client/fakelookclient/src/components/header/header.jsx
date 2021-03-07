import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";
import Login from "../loginComponents/login";
import "./header.css"
import {connect} from "react-redux"
import Navigation from "../navigationComponents/navigation";
import env from "../../enviroments/enviroment";
import {loginChange} from "../../actions"
import Register from "../register/register";

const Header = (props) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
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

  const onRegisterClick = (e) => {
    setRegisterOpen(true)
  };

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
      <Register open={registerOpen} onClose={() => setRegisterOpen(false) }/>
    </Menu>
  );
};


const mapStateToProps = ({loggedInUser}) => {
  return {
    loggedInUser
  };
};

export default connect(mapStateToProps,{loginChange})(Header);
