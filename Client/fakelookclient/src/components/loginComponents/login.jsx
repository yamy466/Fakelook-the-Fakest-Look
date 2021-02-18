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