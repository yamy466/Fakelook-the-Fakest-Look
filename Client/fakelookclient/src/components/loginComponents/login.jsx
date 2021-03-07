import {  useState } from "react";
import { Button, Form, Header, Input, Message, Modal } from "semantic-ui-react";
import env from "../../enviroments/enviroment";
import { login } from "../../services/authService.js";
import { connect } from "react-redux";
import { loginChange } from "../../actions";
import { useHistory } from "react-router-dom";

const [LOADING, INCORRECT] = ["loading", "incorrcet"];

const Login = (props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const history = useHistory();

  const onLoginClick = async (e) => {
    setLoginStatus(LOADING);
    setTimeout(async () => {
      const user = await login(name, password);
      setLoginStatus("");
      if (user) {
        props.loginChange(user);
        props.onClose();
        history.push("/map");
      } else {
        //incorrect
        setLoginStatus(INCORRECT);
      }
    }, 1000);
  };

  return (
    <Modal
      closeIcon
      style={{ maxWidth: 500 }}
      onClose={props.onClose}
      open={props.open}
      /* trigger={<Button>Show Modal</Button>} */
    >
      <Modal.Content>
        <Header textAlign="center">Welcome To Fakelook!</Header>
        <Form>
          <Form.Field
            control={Input}
            id="usernameForm"
            label="UserName"
            icon="user"
            iconPosition="left"
            placeholder="Username"
            onChange={(e) => setName(e.target.value.trim())}
            value={name}
          />
          <Form.Field
            id="passwordForm"
            control={Input}
            label="Password"
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value.trim());
            }}
          />
          {loginStatus === INCORRECT && (
            <Message negative>UserName or Password is incorrect!</Message>
          )}
          <Button
            loading={loginStatus === LOADING}
            onClick={onLoginClick}
            disabled={!(name && password)}
            style={{ backgroundColor: env.mainColor }}
            fluid
            size="large"
          >
            Login
          </Button>
          <Message>
            Not registered? <Button href="#">Sign Up</Button>
          </Message>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

const mapStateToProps = ({ loggedInUser }) => {
  return {
    loggedInUser,
  };
};

export default connect(mapStateToProps, { loginChange })(Login);
