import { useState } from "react";
import { Menu } from "semantic-ui-react";
import Login from "../loginComponents/login";
import "./header.css";
import { connect } from "react-redux";
import Navigation from "../navigationComponents/navigation";
import { logout } from "../../actions/authActions";
import Register from "../register/register";
import jwtService from "../../services/jwtService";
import AuthHeader from "./authHeader";
const { getAccessToken } = jwtService;

const Header = props => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const { logout } = props;

  const onAuthClick = e => {
    if (getAccessToken()) {
      logout();
    } else {
      setLoginOpen(true);
    }
  };

  const onRegisterClick = e => {
    setRegisterOpen(true);
  };

  return (
    <Menu className="menu" tabular color="blue">
      <Navigation/>
      <AuthHeader onAuthClick={onAuthClick} onRegisterClick={onRegisterClick} />
      <Login open={loginOpen} onClose={() => setLoginOpen(false)} />
      <Register open={registerOpen} onClose={() => setRegisterOpen(false)} />
    </Menu>
  );
};


export default connect(null, { logout })(Header);
