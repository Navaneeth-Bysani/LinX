import {useRef} from 'react';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';

const SignUp = () => {
    const email = useRef();
    const password = useRef();
    const passwordConfirm = useRef();
    const name = useRef();

    const signUpClicked = (event) => {
        event.preventDefault();
        if(email.current.value.trim() === "" || password.current.value.trim() === "" || passwordConfirm.current.value.trim() === "" 
        || name.current.value.trim() === "") {
            alert("Enter correct details!");
            return;
        }
        if(password.current.value !== passwordConfirm.current.value) {
            alert("password and password Confirm should be same, please check!");
            return;
        }
        const payload = {
            email : email.current.value,
            password : password.current.value,
            passwordConfirm : passwordConfirm.current.value,
            name : name.current.value
        }
        axios.post('http://localhost:3000/api/v1/users/signup', payload).then(res => {
            console.log(res);
            localStorage.setItem("email", email.current.value);
            if(res.status === 200 && res.data.status === "success") {
                console.log("check your email");
            } else {
                console.log("There is some error! please try again later");
            }
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <Form style = {{border : "2px solid black", borderRadius : "1rem", padding : "20px"}} onSubmit = {(event)=>signUpClicked(event)}>
            <div style = {{textAlign : "center"}}>
                <Form.Text as = "h4">
                    Welcome to LinX<br/>
                    Signup to start creating magic!
                </Form.Text>
                <br/><br/>
            </div>
            <Form.Group controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Your Name" ref = {name} />
            </Form.Group>
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
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password Confirm</Form.Label>
                <Form.Control type="password" placeholder="Password Confirm" ref = {passwordConfirm} />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Text>Already have an account? <a href = "/login">Login</a>! </Form.Text>
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Signup
            </Button>
        </Form>
    )
}

export default SignUp;