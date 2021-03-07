import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Icon } from "semantic-ui-react";
import env from "../../enviroments/enviroment";

function Home() {
  return (
    <Container text textAlign="center">
      <Header
      as='h1'
      content='Fakelook'
      
      style={{
        fontSize:'5em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop:'3em',
      }}
    />
     <Header
      as='h2'
      content='The fakest look in the world!'
      style={{
        fontSize: '1.7em',
        fontWeight: 'normal',
        marginTop: '1.5em',
      }}
    />
    <Container>

    <Button style={{backgroundColor: env.mainColor}} size='huge'>
    Register
      <Icon name='right arrow' />
    </Button>
    <Button size='huge'>
      Login
      <Icon name='right arrow' />
    </Button>
    </Container>
      
    </Container>
  );
}
export default Home;
