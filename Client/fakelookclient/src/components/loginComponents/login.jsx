import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Grid,
  GridColumn,
  Header,
  Message,
  Modal,
  Segment,
} from "semantic-ui-react";

const Login = (props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.open)
    
  }, [props.open])

  const onClose = () => {
    props.onClose();
  }
  return (
    <Modal
      closeIcon
      style={{ maxWidth: 500 }}
      onClose={onClose}
      onOpen={() => setOpen(true)}
      open={open}
      /* trigger={<Button>Show Modal</Button>} */
    >
      <Modal.Content>
        <Grid textAlign="center" verticalAlign="middle">
          <GridColumn>
            <Header>Welcome To Fakelook!</Header>
            <Form>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
              />
              <Button color="teal" fluid size="large">
                Login
              </Button>
              <Message>
                Not registered? <Button href="#">Sign Up</Button>
              </Message>
            </Form>
          </GridColumn>
        </Grid>
      </Modal.Content>
    </Modal>
  );
};

export default Login;
