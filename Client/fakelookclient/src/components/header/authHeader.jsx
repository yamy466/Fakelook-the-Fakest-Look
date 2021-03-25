import { Button, Menu } from "semantic-ui-react";
import env from "../../enviroments/enviroment";
import UsernameHeader from "./usernameHeader";
import { connect } from 'react-redux'
import jwtService from "../../services/jwtService";
const { getAccessToken } = jwtService;

const AuthHeader = ({ username, onRegisterClick, onAuthClick }) => {
  return (
    <Menu.Menu position="right">
      {!getAccessToken() && (
        <Button style={{ backgroundColor: env.mainColor }} onClick={onRegisterClick}>
          Register
        </Button>
      )}
      <Button className="right" onClick={onAuthClick}>
        {getAccessToken() ? "Logout" : "Login"}
      </Button>
      <UsernameHeader username={username} />
    </Menu.Menu>
  );
};

const mapStateToProps = ({ login }) => {
    return {
      username: login.username,
    };
  };

export default connect(mapStateToProps)(AuthHeader);
