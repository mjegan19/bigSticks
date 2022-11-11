// Import React modules
import React from 'react';
import { Link } from 'react-router-dom';

// Import Bootstrap modules
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { RiExchangeFundsLine } from 'react-icons/ri';
import styled from 'styled-components';

// Import custom modules
import useAuth from '../../hooks/useAuth';
import CXButton from '../../components/common/CXButton';

const StyledNavbar = styled(Navbar)`
  background-color: var(--primary);
`;

const StyledLogo = styled(RiExchangeFundsLine)`
  font-size: 1.5rem;
  margin-bottom: 0.2rem;
  color: var(--brand);
  transition: all 1s;

  &:hover {
    transform: scale(1.10) rotateZ(180deg);
  }
`;

const Header = () => {
const { user, logout } = useAuth();

  return (
    <StyledNavbar variant="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <StyledLogo />
          {' '}
          CentralX
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* LEFT MAIN NAVS */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/currency/prices">CBDC</Nav.Link>
            <Nav.Link as={Link} to="/crypto/prices">Crypto</Nav.Link>
          </Nav>
          {/* RIGHT AUTH NAVS */}
          <Nav>
            {!user && <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>}
            {!user && <Nav.Link as={Link} to="/login">Log In</Nav.Link>}
            {user && <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>}
            {user && <CXButton onClick={() => { logout() }}>Logout</CXButton>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  )
}   

export default Header