import React, { useEffect, useState, useRef } from 'react';
import useAuth from '../../hooks/useAuth';

// Import npm packages
import { Container } from 'react-bootstrap';
import NavLink from '../../components/common/NavLink';

// Import components
import cardRequest from '../../services/cardRequest';
import CardList from '../../components/features/CardList';
import ErrorPage from '../../components/common/ErrorPage';
import Loader from '../../components/common/Loader';

const CardDeck = () => {

    const { user } = useAuth();
    // HOOK: SETTING COMPONENT STATE (& init values)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    // HOOK: Prevention of useEffect calling TWICE (React v18)
    const effectRan = useRef(false);
  
    // HOOK: ON-LOAD SIDE EFFECTS
    useEffect(() => {
      console.log("Effect Ran");
  
      if (effectRan.current === false) {
        fetchCards();
        setLoading(false);
  
        // CLEAN UP FUNCTION
        return () => {
          console.log("Unmounted");
          effectRan.current = true;
        }
      }
    }, []);
  
    // 
    async function fetchCards() {
      try {
        const response = await cardRequest.get();
        const data = await response.data;
        setData(data);
      } catch (err) {
        console.log(err?.response);
        setError(true);
      }
    }

    // CONDITIONAL LOAD: ERROR
  if (error) {
    return (
      <Container className="text-center">
        <ErrorPage />
      </Container>
    )
  }

  // CONDITIONAL LOAD: LOADING
  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    )
  }

  // DEFAULT LOAD: SUCCESS API CALL
  return (
    <Container>
      <h1>Trading Cards</h1>
      <p>Listed below are the current trading cards that have been uploaded to our database.  To view futher deatils about each card, or to edit or delete the card simply click "View Card Details" on your selected card.</p>
      <p>If you'd like to submit a card to the database, please click the "Add a Trading Card" button below.</p>

      {/* ADMIN SECTION */}
      {user && <div className="admin-section text-center">
        <NavLink to="/cards/add">Add a Trading Card</NavLink>
      </div>}

      {/* SECTION: Currency Menu */}
      {/* REFACTOR (A): Our return ONLY concerned with the success render condition AND all moving parts are abstracted out (SEE FEATURES COMPONENTS) */}
      {data.length > 0 &&
        <CardList title="Trading Cards" cards={data} />
      }
    </Container>
  )
};

export default CardDeck;