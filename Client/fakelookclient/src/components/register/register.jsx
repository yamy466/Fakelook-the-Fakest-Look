import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Form,
  FormField,
  FormGroup,
  Header,
  Input,
  Message,
  MessageHeader,
  MessageItem,
  MessageList,
  Modal,
  ModalContent,
} from "semantic-ui-react";
import { register } from "../../actions";
import env from "../../enviroments/enviroment";
import {
  usernameValidation,
  passwordValidation,
  nameValidation,
  emailValidation,
} from "../../services/validationService";

const [
  AT_LEAST_2_LETTERS,
  PASSWORD_NOT_MATCH_REQUIREMENTS,
  PASSWORDS_NOT_MATCH,
  INVALID_EMAIL,
] = [
  "at least 2 letters",
  "the password dosn't match the requirements",
  "password dosn't match",
  "invalid email",
];

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [email, setEmail] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatedPasswordError, setRepeatedPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [serverErrors, setServerErrors] = useState([])



  useEffect(() => {
    if(!props.registerError) return;
    const errors = [];
    const { fields } = props.registerError?.data;
    if (fields?.email) errors.push("email already in use");
    if (fields?.username) errors.push("username already in use");
    setServerErrors(errors)
  }, [props.registerError]);

  const onFieldChange = (
    val,
    setter,
    errorSetter,
    maxLength = null,
    trim = false
  ) => {
    errorSetter("");
    if (trim) val = val.trim();
    if (maxLength) {
      if (val.length < maxLength) setter(val);
    } else setter(val);
  };

  const isFormValid = () => {
    return (
      passwordValidation(password) &&
      nameValidation(firstName) &&
      nameValidation(lastName) &&
      usernameValidation(username) &&
      password === repeatedPassword &&
      emailValidation(email)
    );
  };

  const onSubmitClick = async () => {
    await props.register({
      username,
      firstName,
      lastName,
      password,
      email,
    });
  };

  useEffect(() => {
    if (props.registerStatus === "success") props.onClose();
  }, [props.registerStatus]);

  return (
    <Modal
      closeIcon
      onClose={props.onClose}
      open={props.open}
      style={{ maxWidth: 750 }}
    >
      <ModalContent>
        <Header textAlign="center">Welcome To Fakelook!</Header>
        <Form>
          <FormGroup widths="equal">
            <Form.Field
              control={Input}
              id="firstNameField"
              label="First Name"
              value={firstName}
              error={firstNameError || null}
              onChange={({ target }) =>
                onFieldChange(
                  target.value,
                  setFirstName,
                  setFirstNameError,
                  41,
                  true
                )
              }
              onBlur={() =>
                firstName.length > 2
                  ? setFirstNameError("")
                  : setFirstNameError(AT_LEAST_2_LETTERS)
              }
            />
            <Form.Field
              control={Input}
              id="lastNameField"
              label="Last Name"
              value={lastName}
              error={lastNameError || null}
              onChange={({ target }) =>
                onFieldChange(
                  target.value,
                  setLastName,
                  setLastNameError,
                  41,
                  true
                )
              }
              onBlur={() =>
                lastName.length > 2
                  ? setLastNameError("")
                  : setLastNameError(AT_LEAST_2_LETTERS)
              }
            />
          </FormGroup>
          <FormGroup widths="equal">
            <FormField
              control={Input}
              id="usernameField"
              label="Username"
              value={username}
              error={usernameError || null}
              onChange={({ target }) =>
                onFieldChange(
                  target.value,
                  setUsername,
                  setUsernameError,
                  31,
                  true
                )
              }
              onBlur={() =>
                username.length > 2
                  ? setUsernameError("")
                  : setUsernameError(AT_LEAST_2_LETTERS)
              }
            />
            <FormField
              control={Input}
              id="emailField"
              label="Email"
              value={email}
              onChange={({ target }) =>
                onFieldChange(target.value, setEmail, setEmailError)
              }
              onBlur={() =>
                emailValidation(email)
                  ? setEmailError("")
                  : setEmailError(INVALID_EMAIL)
              }
              error={emailError || null}
            />
          </FormGroup>
          <FormGroup>
            <FormField width="10">
              <FormField
                control={Input}
                type="password"
                id="passwordField"
                label="Password"
                value={password}
                error={passwordError || null}
                onChange={({ target }) =>
                  onFieldChange(target.value, setPassword, setPasswordError, 31)
                }
                onBlur={() =>
                  passwordValidation(password)
                    ? setPasswordError("")
                    : setPasswordError(PASSWORD_NOT_MATCH_REQUIREMENTS)
                }
              />
              <br />
              <FormField
                seccuss
                control={Input}
                type="Password"
                disabled={passwordError}
                id="repeatPasswordField"
                label="Repeat Password"
                onBlur={() =>
                  password === repeatedPassword
                    ? setRepeatedPasswordError("")
                    : setRepeatedPasswordError(PASSWORDS_NOT_MATCH)
                }
                value={repeatedPassword}
                error={repeatedPasswordError || null}
                onChange={({ target }) =>
                  onFieldChange(
                    target.value,
                    setRepeatedPassword,
                    setRepeatedPasswordError
                  )
                }
              />
              {serverErrors.length > 0 && (
                <FormField>
                  <Message negative>
                    <MessageList>
                      {serverErrors.map((err, index) => {
                        return <MessageItem key={index}>{err}</MessageItem>;
                      })}
                    </MessageList>
                  </Message>
                </FormField>
              )}
              <FormField
                as={Button}
                loading={props.registerStatus === "loading"}
                disabled={!isFormValid()}
                content="Submit"
                onClick={onSubmitClick}
                style={{ backgroundColor: env.mainColor, marginTop: "30px" }}
              />
            </FormField>
            <FormField width="6">
              <Message floating>
                <MessageHeader>password requirements:</MessageHeader>
                <MessageList>
                  <MessageItem>
                    password length has to be between 8 to 30
                  </MessageItem>
                  <MessageItem>
                    the password must contain at least:{" "}
                    <MessageList>
                      <MessageItem>one uppercase letter</MessageItem>
                      <MessageItem>one lowercase letter</MessageItem>
                      <MessageItem>one number</MessageItem>
                    </MessageList>
                  </MessageItem>
                </MessageList>
              </Message>
            </FormField>
          </FormGroup>
        </Form>
      </ModalContent>
    </Modal>
  );
};

const mapStateToProps = ({ login, register }) => {
  const { accessToken } = login;
  const { registerStatus, registerError } = register;
  return {
    accessToken,
    registerStatus,
    registerError,
  };
};

export default connect(mapStateToProps, { register })(Register);
