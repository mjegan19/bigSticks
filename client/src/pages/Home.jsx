// Import React modules
import React from 'react';

// Import npm packages
import Container from 'react-bootstrap/Container';

// Import custom components
import HeroBox from '../components/common/HeroBox';

const Home = () => {
  return (
    <Container>
      <HeroBox 
        title="Through the Big Sticks"
        content="The ultimate footy card database.  View the collection, add a card and keep track of all the footy cards in your collection!"
        button="View the Collection"
      />
    </Container>
  )
}

export default Home