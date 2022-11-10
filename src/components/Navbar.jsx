import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react'
import logo from "../assets/logo.png";
import { Button, TextField } from '@mui/material';
import Searchbox from './searchbox';
export const AppNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" sticky="top"  variant="dark">
      <Container style={{alignItems: "center"}}>
        <Navbar.Brand href="#home">
        <img src={logo} alt="logo icon" style={{width: '3%', height:'auto', minWidth:'48px',marginRight: '16px'}}/>
        <span className='logo-text'>octo</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Searchbox className='search-nav' type="text" />
          </Nav>
          <Nav>
            <Nav.Link>Listings</Nav.Link>
            <Nav.Link >
              Swap
            </Nav.Link>
            <Nav.Link disabled >
              Auction
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Button className='connect-btn' variant='contained'>Connect Wallet</Button>
      </Container>
    </Navbar>
  );
};
