import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Card, Col, Row } from 'react-bootstrap';
import BSButton from '../../components/common/BSButton';
import NavLink from '../../components/common/NavLink';
import useAuth from '../../hooks/useAuth';

// Import Test Img
// import TestImg from '../../assets/test_imgs/istockphoto-483199983-612x612.jpeg';

import cardRequest from '../../services/cardRequest';
import ErrorPage from '../../components/common/ErrorPage';
import Loader from '../../components/common/Loader';

const Styles = styled.div`
  .hero-box {
    padding: 2rem;
    margin-top: 4rem;
    margin-bottom: 4rem;
    background-color: var(--highlight-light);
    color: var(--complementary);
    border-radius: 1rem;

    .row.main {
      padding-bottom: 1rem;
      border-bottom: solid 5px var(--primary);

      .image-section {
        text-align: center;
  
        img {
          margin-top: 1rem;
          width: 50%;
          padding: 1rem;
          border-radius: 50%;
        }
      }
    }

    .row.secondary {
      .info-box {
        margin-top: 1rem;

        span.title {
          font-weight: bold;
        }
      }
    }

    .admin-box {
      margin: 2rem 0;

      .grid-row {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
      }
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
        {/* HEADING SECTION */}
        <div className="hero-box">
          <Container>
            
            {/* 1. MAIN ROW */}
            <Row className="main">
              <Col>
                <h2>{year}{' '}{playerName}{' '}{teamName}{' '}{manufacturer}{' '}{competition}{' '} Trading Card</h2>
                <h3>{cardNo} of {setTotal}</h3>
                <p>{description}</p>
              </Col>
              <Col>
                <div className="image-section">
                  <h2>{playerName}</h2>
                  <img className="preview-image" src={image} alt={`Preview of ${playerName}`} />
                </div>

                {/* HIDDEN - ADMIN DROPDOWN SECTION*/}
                { user && <div className="admin-box">
                  <div className="grid-row">
                    {/* EDIT LINK */}
                    <NavLink to={`/cards/edit/${id}`}>Edit</NavLink>

                    {/* DELETE BUTTON */}
                    <BSButton onClick={handleDeleteClick} loadingState={loading}>{loading ? '...' : 'Delete'}</BSButton>
                  </div>
                </div>}

              </Col>
            </Row>

            {/* 2. OTHER INFORMATION */}
            <Row className="secondary">             
              <div className="info-box">
                <div>
                  <p><span className="title">Condition: </span>{condition}</p>
                  <p><span className="title">Rarity: </span>{rarity} %</p>
                  <p><span className="title">Value: </span>{value}</p>
                </div>
              </div>
            </Row>

          </Container>
        </div>
      </Container>
    </Styles>
  )
}

export default CardDetail;