import React from 'react';

// Import npm packages
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  width: 100%;
  color: var(--primary);
  font-weight: 500;
  border-radius: 0.5rem;
  border: none;
  background: rgb(9,152,255);
  background: linear-gradient(135deg, rgba(9,152,255,1) 25%, rgba(45,235,252,1) 100%);
  
  &:hover, &:active, &:focus {
    color: var(--primary);
    border-radius: 0.5rem;
    border: none;
    background: rgb(0,148,255);
    background: linear-gradient(135deg, rgba(0,148,255,1) 25%, rgba(18,236,255,1) 100%);
  }
`;

const BSButton = ({ children, loadingState, onClick }) => {
  return (
    <StyledButton 
      type={onClick ? "button" : "submit"} 
      onClick={onClick}
      className={loadingState && "button-gradient-loading"}
      disabled={loadingState}
    >      
      {children}
    </StyledButton>
  )
}

export default BSButton