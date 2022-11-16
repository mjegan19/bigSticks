// Import React modules
import React from 'react';
import { Link } from 'react-router-dom';

// Import Bootstrap modules
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';

// Import custom modules
import useAuth from '../../hooks/useAuth';
import BSButton from '../../components/common/BSButton';

const StyledNavbar = styled(Navbar)`
  background-color: var(--primary);
`;

const LogoText = styled.span`
  font-family: var(--logo-typeface);
  font-size: 2.5rem;
`;

const Header = () => {
const { user, logout } = useAuth();

  return (
    <StyledNavbar variant="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">

          <LogoText>BigSticks</LogoText>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* LEFT MAIN NAVS */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/cards/collection">Trading Cards</Nav.Link>
            <Nav.Link as={Link} to="/afl/ladder">AFL Ladder</Nav.Link>
          </Nav>
          {/* RIGHT AUTH NAVS */}
          <Nav>
            {!user && <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>}
            {!user && <Nav.Link as={Link} to="/login">Log In</Nav.Link>}
            {user && <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>}
            {user && <BSButton onClick={() => { logout() }}>Logout</BSButton>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  )
}   

export default Header