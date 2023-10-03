import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar className='p-3' bg="light" variant="light">
      <Navbar.Brand>Automatic Car Parking</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
      <Nav className="ml-auto">
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/book">Book a Spot</Nav.Link>        
      </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;