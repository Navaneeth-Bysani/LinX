import Header from './Header';
import {Container} from 'react-bootstrap';
import {Route} from 'react-router-dom';
import UserDetails from './UserDetails';

const Dashboard = () => {
    return (
        <Container fluid>
                <Header />
            <Route path = "/dashboard/userDetails">
                <UserDetails/>
            </Route>
        </Container>
    )
}

export default Dashboard;