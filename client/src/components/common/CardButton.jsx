import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  background-color: var(--brand);
  border-radius: 0.5rem;
  color: var(--primary);
  transition: all 0.2s;
  padding: 0.5rem 1.25rem;
  text-decoration: none;
  margin: 0;
  text-align: center;

  &:hover, &:active, &:focus {
    color: var(--primary);
    background-color: var(--brand-dark);
    box-shadow: none;
  }
`;

const CardButton = ({ to, children }) => {
  return (
    <StyledLink to={to}>
      {children}
    </StyledLink>
  )
}

export default CardButton;