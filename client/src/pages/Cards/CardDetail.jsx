import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Col, Row } from 'react-bootstrap';
import BSButton from '../../components/common/BSButton';
import NavLink from '../../components/common/NavLink';
import useAuth from '../../hooks/useAuth';


import cardRequest from '../../services/cardRequest';
import ErrorPage from '../../components/common/ErrorPage';
import Loader from '../../components/common/Loader';

const Styles = styled.div`
  
  .cardHeader {
    display: grid;
    grid-template-columns: 80% 10% 10%;
  }
  
  .cardBody {
    display: grid;
    grid-template-columns: 65% 35%;
    gap: 2%;
    margin-top: 1rem;

    .cardSpecs {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      
      .subSpecs {
        background-color: var(--highlight-light);
        text-align: center;
        align-items: center;
        height: 180px;
        font-size: 1.5rem;
        padding-top: 55px;

        span {
          font-weight: 700;
        }
      }

      .desc {
        grid-column: 1 / span 3;
      }
    }

    .cardImg > img {
      max-width: 400px;
      align-self: center;
      padding: 0.5rem;
      border: 1px solid var(--highlight-light);
    }
  }
`;

const CardDetail = () => {
  const { user } = useAuth();
  const params = useParams();
  const navigate = useNavigate();
  // Hook - Initial States
  const [cardData, setCardData] = useState({
    id: params.id,
    year: "",
    manufacturer: "",
    playerName: "",
    teamName: "",
    competition: "",
    cardNo: 0,
    setTotal: 0,
    description: "",
    condition: "",
    rarity: "",
    value: "",
    image: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Desctructuring data state object
  const { id, year, manufacturer, playerName, teamName, competition, cardNo, setTotal, description, condition, rarity, value, image } = cardData;

  useEffect(() => {
    async function fetchCard() {
      try {
        const response = await cardRequest.getById(id);
        const fetchedCard = await response.data;
        console.log(fetchedCard);

        setCardData(cardData => ({
          ...cardData,
          ...fetchedCard
        }));

      } catch (err) {
        console.log(err?.response);
        setError(true);
      }
    }
    fetchCard();
    setLoading(false);
  }, [id]);

  // 
  const handleDeleteClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await cardRequest.del(id);
      console.log(response);

      setLoading(false);
      navigate('/cards/collection');
    } catch(err) {
      setError(true);
      window.scroll({ top:0, left: 0, behavior: "smooth"} );
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

  return (

    <Styles>
      <Container>

        <div className="cardHeader">
          <div className="title"><h1>{year}{' '}{playerName}{' '}&#91;{teamName}&#93;{' '}Trading Card</h1></div>
          { user && <div className="edit"><NavLink to={`/cards/edit/${id}`} outline>Edit</NavLink></div> }
          { user && <div className="delete"><BSButton onClick={handleDeleteClick} loadingState={loading}>{loading ? '...' : 'Delete'}</BSButton></div>}
        </div>

        <div className="cardBody">
          <div className="cardSpecs">
            <div className="desc">{description}</div>
            <div className="subSpecs"><span>Card</span><br />{cardNo} of {setTotal}</div>
            <div className="subSpecs"><span>Competition</span><br />{competition}</div>
            <div className="subSpecs"><span>Produced by</span><br />{manufacturer}</div>
            <div className="subSpecs"><span>Condition</span><br />{condition}</div>
            <div className="subSpecs"><span>Rarity</span><br />{rarity}</div>
            <div className="subSpecs"><span>Value</span><br />{value}</div>
          </div>
          <div className="cardImg">
            <img className="preview-image" src={image} alt={`Preview of ${playerName}`} />
          </div>
        </div>






    
      </Container>
    </Styles>
  )
}

export default CardDetail;