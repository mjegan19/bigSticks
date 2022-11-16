import React, { useEffect, useState, useRef } from 'react';

// Import npm packages
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';   //Error box

// Import components
import LadderList from '../../components/features/LadderList';
import ErrorPage from '../../components/common/ErrorPage';
import Loader from '../../components/common/Loader';

const Ladder = () => {
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
      fetchLadder();
      setLoading(false);

      // CLEAN UP FUNCTION
      return () => {
        console.log("Unmounted");
        effectRan.current = true;
      }
    }
  }, []);

  // COMPONENT FUNCTIONS
  async function fetchLadder() {
    try {
      // External API Request: Squiggle AFL
      const response = await axios.get("https://api.squiggle.com.au/?q=standings&year=2022");
      console.log(response);
      const data = await response.data.standings;

      // SUCCESS: Output overrides intiial data state
      setData(data);

    } catch (err) {
      console.log(err)
      setError(true); 
      toast.error("Internal Server Error - Cannot retrieve data"); 
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
      <h1>Final 2022 AFL Ladder Standings</h1>
      <p>This year's AFL season was another ripper, with plenty of drama, tension and high stakes right up until the very end.  Here's a look at how the teams stood after the home and season, just before the exciting finals fixtures took place!</p>

      {/* SECTION: Ladder Results */}
      {/* REFACTOR (A): Our return ONLY concerned with the success render condition AND all moving parts are abstracted out (SEE FEATURES COMPONENTS) */}
      {data.length > 0 && <LadderList standings={data} />}
    </Container>
  )
};

export default Ladder;