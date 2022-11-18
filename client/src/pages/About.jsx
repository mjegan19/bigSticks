import React from 'react'
// Import npm packages
import Container from 'react-bootstrap/Container';

// Import custom components
import HeroBox from '../components/common/HeroBox';

const About = () => {
  return (
    <Container>
      <HeroBox 
        title="About BIGSTICKS!"
        content="Our goal is to take trading cards to the next level of fandom.  We've created a database for you to upload, share and view all Aussie Footy related Trading Cards.  We plan to hopefully add to this functionallity by allowing you to create your own footy cards in the not too distant future."
        button="Register an Account"
        page="about"
      />
    </Container>
  )
}

export default About