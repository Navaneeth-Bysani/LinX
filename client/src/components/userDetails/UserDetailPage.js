import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import classes from './UserDetailPage.module.css';
import DisplayLink from './DisplayLink';

const UserDetailPage = () => {
    const userId = useParams().userId;
    const [userDetails, setUserDetails] = useState({
        name : "",
        links : [],
        bio : "",
        backgroundColor : "white"
    })
    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/users/getUser/${userId}`).then(res => {
            console.log(res);
            setUserDetails(res.data.responseUser);
            document.body.style = "background: rgb(204, 255, 204)"
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    return (
        <div className = {classes.page}>
            <section className = {classes.display}>
                <h1>{userDetails.name}</h1>
                <p>{userDetails.bio}</p>
                {
                    userDetails.links.map((el,idx) =>{
                        return (
                            <>
                            <DisplayLink url = {el.url} title = {el.title} key = {idx}/>
                            {/* <br/> */}
                            </>
                        )
                    })
                }
            </section>
        </div>
    )
}

export default UserDetailPage;