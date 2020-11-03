import React from 'react';
import Auth from './Auth';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { BiBookReader } from 'react-icons/bi'

const Header = () => {

  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Brand href="/">
                <BiBookReader className="navbar-logo" size={30} style={{paddingBottom: '3px'}}/>
            </Navbar.Brand>
            <Navbar.Brand href="/">Expert Finder</Navbar.Brand>
                
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/user-profile/edit">Edit Profile</Nav.Link>
                            <Nav.Link href="/Invite">Invite an Expert</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                        <Auth />
        </Container>
    </Navbar>
    </>
  );
};

export default Header;