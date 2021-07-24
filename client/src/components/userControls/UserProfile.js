import {useState, useRef, useEffect} from 'react';

import {Form, Button} from 'react-bootstrap';
import classes from './UserProfile.module.css';

const UserProfile = () => {
    const [user, setUser] = useState({
        name : "",
        bio : ""
    });
    const [isEditing, setIsEditing] = useState(false);

    const editClickedHandler = () => {
        setIsEditing(true);
    }

    useEffect(() => {
        setUser({
            name : "Navaneeth",
            bio : "bio"
        })
    }, []);

    const nameChangeHandler = (event) => {
        setUser({
            ...user,
            name : event.target.value
        })
    }

    const bioChangeHandler = (event) => {
        setUser({
            ...user,
            bio : event.target.value
        })
    }

    const saveClicked = () => {
        console.log(user);
        setIsEditing(false);
    }
    return (
        <div className = {classes.Cover}>
            <Form className = {classes.Form}>
            <h4>Your Profile</h4>
            <hr/>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder = "Your Name" value = {user.name} readOnly = {!isEditing}
                onChange = {nameChangeHandler}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Bio</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder = "Your Bio" value = {user.bio} readOnly = {!isEditing} 
                onChange = {bioChangeHandler}/>
            </Form.Group>
            {!isEditing && <Button variant="success" onClick = {editClickedHandler}>Edit</Button>}
            {isEditing && <Button variant="success" onClick = {saveClicked}>Save</Button>}
            </Form>
        </div>
    )
}

export default UserProfile;