import React from 'react'
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container'
import styled from 'styled-components';

import NotFoundImg from '../../src/assets/notFound.png'

const Image = styled.img`
  width: 600px;
  margin: 2rem auto 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--brand);
`;

const NotFound = () => {
  return (
    <Container>
      <Image src={NotFoundImg} alt="page not found" />
      <h2>
        Page Not Found: &nbsp; 
        <StyledLink to="/">Return to Home</StyledLink>
      </h2>
    </Container>
  )
}

export default NotFound