import { useEffect, useState } from "react";
import { Button, Form, Header, Input, Message, Modal } from "semantic-ui-react";
import env from "../../enviroments/enviroment";
import { connect } from "react-redux";
import { login } from "../../actions/authActions";

const Login = (props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { loginStatus, onClose, login } = props;

  useEffect(() => {
    if (loginStatus === "success") {
      onClose(); 
    }
  }, [loginStatus]);

  return (
    <Modal
      closeIcon
      style={{ maxWidth: 500 }}
      onClose={props.onClose}
      open={props.open}
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
          {loginStatus === "incorrect" && (
            <Message negative>UserName or Password is incorrect!</Message>
          )}
          <Button
            loading={loginStatus === "loading"}
            onClick={() => login(name,password)}
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

const mapStateToProps = ({ login }) => {
  return {
    loginStatus: login.loginStatus,
  };
};

export default connect(mapStateToProps, { login })(Login);
