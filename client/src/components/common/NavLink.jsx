import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  border-radius: 1rem;
  border: 2px solid var(--brand);
  color: var(--brand);
  transition: all 0.2s;
  padding: 0.4rem 1rem;
  text-decoration: none;
  margin: 0 0.4rem;
  text-align: center;

  &:hover, &:active, &:focus {
    color: var(--primary);
    background-color: var(--brand-dark);
    border: 2px solid var(--brand-dark);
    transform: scale(1.02);
    box-shadow: none;
  }
`;

const CXNavLink = ({ to, children }) => {
  return (
    <StyledLink to={to}>
      {children}
    </StyledLink>
  )
}

export default CXNavLink