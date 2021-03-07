import React, { useState } from "react";
import { Button, Container, Header, Icon } from "semantic-ui-react";
import env from "../../enviroments/enviroment";
import Login from "../loginComponents/login";
import Register from "../register/register";

function Home() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  return (
    <Container text textAlign="center">
      <Header
        as="h1"
        content="Fakelook"
        style={{
          fontSize: "5em",
          fontWeight: "normal",
          marginBottom: 0,
          marginTop: "3em",
        }}
      />
      <Header
        as="h2"
        content="The fakest look in the world!"
        style={{
          fontSize: "1.7em",
          fontWeight: "normal",
          marginTop: "1.5em",
        }}
      />
      <Container>
        <Button
          style={{ backgroundColor: env.mainColor }}
          size="huge"
          onClick={() => setRegisterOpen(true)}
        >
          Register
          <Icon name="right arrow" />
        </Button>
        <Button size="huge" onClick={() => setLoginOpen(true)}>
          Login
          <Icon name="right arrow" />
        </Button>
      </Container>
      <Login open={loginOpen} onClose={() => setLoginOpen(false)} />
      <Register open={registerOpen} onClose={() => setRegisterOpen(false)} />
    </Container>
  );
}
export default Home;
