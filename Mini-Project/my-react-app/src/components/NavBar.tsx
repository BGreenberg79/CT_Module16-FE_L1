import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {

    return(
        <Navbar bg="info" expand ="lg" fixed="top">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className="text-white">Home</Nav.Link>
                        <Nav.Link as={Link} to="/manage-posts" className="text-white">Manage Posts</Nav.Link>
                        <Nav.Link as={Link} to="/albums" className='text-white'>Albums</Nav.Link>
                        <Nav.Link as={Link} to="/todos" className='text-white'>Todos</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        // Navbar cannot work with dynamic parameters for user posts and user details

    )
}
export default NavBar;