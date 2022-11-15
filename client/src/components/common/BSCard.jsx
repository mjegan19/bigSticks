// Import react modules
import React from 'react';

//Import npm packages
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .container {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
  }

  .lead-card {
    margin: auto;
    padding: 2rem;
    width: 550px;
    background-color: var(--primary);
    border: 1px solid var(--highlight-dark);
  }

  .lead-card .card-title {
    padding-bottom: 1rem;
    font-size: 2em;
    font-weight: 600;
    color: var(--brand);
    text-align: center;
  }
`;

const BSCard = ({ title, authform, children }) => (
  <Styles authform={authform ? 1 : 0}> 
    <Container>
      <div className="lead-card">
        <p className="card-title">{title}</p>
        <div>
          {children}
        </div>
      </div>
    </Container>
  </Styles>
);

export default BSCard;