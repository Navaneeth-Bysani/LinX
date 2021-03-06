import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import UserProfile from './UserProfile';

const NavigationBar = () => {
    return (
        <Navbar bg = "light" expand = "lg">
            <Container fluid>
            <Navbar.Brand href="#home"><h3>LinX</h3></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                {/* <NavLink to = '/admin/links'>Links</NavLink> */}
                <Nav.Link href = "/admin/links">Links</Nav.Link>
                <Nav.Link href="/admin/user">UserProfile</Nav.Link>
                {/* <NavLink to ='/admin/user'>UserProfile</NavLink> */}
                {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown> */}
            </Nav>
            <Nav>
                <Nav.Link>Log Out</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default NavigationBar;