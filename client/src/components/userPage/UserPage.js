import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import {Row, Container, Col} from 'react-bootstrap';
import UserHeader from './UserHeader';
import ButtonPage from './ButtonPage';

const UserPage = () => {
    const userId = useParams().userId;
    const [user, setUser] = useState({
        name : "",
        links : [],
        bio : ""
    });
    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/users/getUser/${userId}`).then(res => {
            console.log(res);
            setUser(res.data.responseUser);
            document.body.style = "background: rgba(181, 200, 177, 0.93)"
        }).catch((err) => {
            console.log(err);
        })
    }, []);
    return (
        <React.Fragment>
            <Container fluid>
                <div>
                    <Row style = {{justifyContent:"center"}}>
                        <UserHeader name = {user.name} bio = {user.bio} />
                    </Row>
                    <Row style = {{justifyContent:"center"}}>
                        <ButtonPage links = {user.links}/>
                    </Row>
                </div>
            </Container>
        </React.Fragment>
    )
}

export default UserPage;