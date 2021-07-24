import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
const UserDetails = () => {
    return (
        <React.Fragment>
            <Row style = {{justifyContent:"center", padding : "6px", border : "2px solid black"}} md = {6}>
                <Col>
                <Form style = {{}}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default UserDetails;