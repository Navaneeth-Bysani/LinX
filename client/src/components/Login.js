import {Form, Button, Row, Col} from 'react-bootstrap';
import {useEffect, useRef} from 'react';
import axios from 'axios';
const Login = () => {
    const email = useRef();
    const password = useRef();
    const loginSubmitted = (event) => {
        event.preventDefault();
        const submittedEmail = email.current.value.trim();
        const submittedPassword = password.current.value.trim();

        if(submittedEmail === "" || submittedPassword === "") {
            email.current.value = "";
            password.current.value = "";
            alert("enter a valid password and email");
            return;
        }
        const payload = {
            email : submittedEmail,
            password : submittedPassword
        }
        console.log(payload);
        axios.post('http://localhost:3000/api/v1/users/login', payload).then((res) => {
            console.log(res);
            if(res.status === 200 && res.data.message === "please confirm your email") {
                console.log('email not verified');
            }
        }).catch((err) => {
            console.log(err);
        })
        
    }
    return (
        <Form style = {{border : "2px solid black",borderRadius : "1rem", padding : "20px"}} onSubmit = {(event)=>loginSubmitted(event)}>
            <div style = {{textAlign : "center"}}>
                <Form.Text as = "h4">
                    Welcome to LinX<br/>
                    Login to start creating magic!
                </Form.Text>
                <br/><br/>
            </div>
            
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" ref = {email}/>
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref = {password} />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Text>Don't have an account yet? <a href = "/signup">Signup</a>! </Form.Text>
            </Form.Group>
            
            <Button variant="primary" type="submit">
                login
            </Button>
            <Form.Text>
                <a href = "/forgotPassword">Forgot Password?</a>
            </Form.Text>
        </Form>
    )
}

export default Login;