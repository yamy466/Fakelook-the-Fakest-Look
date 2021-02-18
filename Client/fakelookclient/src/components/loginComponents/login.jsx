<<<<<<< HEAD
import { useState } from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react'

const Login = () => {
    const [open, setOpen] = useState(false)
    return (
        <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button>Show Modal</Button>}
        >
            <Modal.Header>
                test
            </Modal.Header>
        </Modal>
    )
}
 
export default Login;
=======
import React from "react";

function Login() {
  return (
    <div>
      <p>Login!</p>
    </div>
  );
}

export default Login;
>>>>>>> 08a246a67968e8dab492e2edf8a8f38c14ee9e4c
