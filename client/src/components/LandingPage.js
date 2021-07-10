import Login from './Login';

import { Container, Row } from 'react-bootstrap';
const LandingPage = () => {
    return (
        <Container fluid>
            <Row style = {{justifyContent:"center"}}>
                <Login/>
            </Row>
        </Container>
    )
}

export default LandingPage;