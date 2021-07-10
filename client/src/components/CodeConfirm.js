import axios from 'axios';
import {useRef} from 'react';
import {Form, Button} from 'react-bootstrap';

const CodeConfirm = () => {
    const code = useRef();
    const email = localStorage.getItem("email");

    const confirmCode = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/api/v1/users/confirmSignUp', {email, code : code.current.value}).then(res => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }

    const resendClicked = (event) => {
        console.log(email);
        event.preventDefault();
        axios.post('http://localhost:3000/api/v1/users/resendCode', {email}).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <Form style = {{border : "2px solid black",borderRadius : "1rem", padding : "20px"}}>
            <div style = {{textAlign : "center"}}>
                <Form.Text as = "h4">
                    Enter the code sent to your email!
                </Form.Text>
            </div>
            
            <Form.Group controlId="code">
                <Form.Label></Form.Label>
                <Form.Control type="text" placeholder="Enter code sent to your email" ref = {code}/>
            </Form.Group>
            
            <Button variant="primary" type="submit" onClick = {(event) => confirmCode(event)}>
                submit
            </Button>
            {' '}
            <Button variant="primary" type="submit" onClick = {(event) => resendClicked(event)}>
                resend code
            </Button>
        </Form>
    )
}

export default CodeConfirm;