import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Form, InputGroup, Container } from 'react-bootstrap';
import styled from 'styled-components';

// Import local component
import BSCard from '../../components/common/BSCard'
import BSButton from '../../components/common/BSButton';
import formRequest from '../../services/formRequest';
import cardRequest from '../../services/cardRequest';
import ErrorPage from '../../components/common/ErrorPage';
import Loader from '../../components/common/Loader';

const FormLabel = styled(Form.Label)`
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 0rem;
  margin-left: 0.7rem;
`;

const FormControl = styled(Form.Control)`
  background-color: var(--highlight-light);
  color: var(--complementary);
  border: none;
  border-bottom: 3px solid var(--highlight-dark);
  border-radius: 0rem;
  margin-top: 0rem;
  padding-bottom: 0.25rem;
`;

const SelectOption = styled(Form.Control)`
  background-color: var(--highlight-light);
  color: var(--complementary);
  border: none;
  border-bottom: 3px solid var(--highlight-dark);
  border-radius: 0rem;
  margin-top: 0rem;
  padding-bottom: 0.32rem;
  padding-left: 0.7rem;
  padding-top: 0.5rem;
  width: 100%;
`;

const TextArea = styled(Form.Control)`
  background-color: var(--highlight-light);
  color: var(--complementary);
  border: none;
  border-bottom: 3px solid var(--highlight-dark);
  border-radius: 0rem;
  margin-top: 0rem;
  padding-bottom: 0rem;
  padding-left: 0.75rem;
  padding-top: 0.5rem;
  width: 100%;
`;

const PreviewImg = styled.img`
  margin: 1rem;
  border: 3px solid var(--brand);
  width: 290px;
  padding: 0.5rem;
  opacity: 0.8;
`;

const EditCard = () => {
  const navigate = useNavigate();
  const params = useParams();

  // Hook - Initial States
  const [cardData, setCardData] = useState({
    id: params.id,
    year: "",
    manufacturer: "",
    playerName: "",
    teamName: "",
    competition: "",
    cardNo: "",
    setTotal: "",
    description: "",
    condition: "",
    rarity: "",
    value: 0,
    image: ""
  });

  const [rareness, setRareness] = useState([]);
  const [appearance, setApperance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [preview, setPreview] = useState(true);

  const [uploadedFile, setUploadedFile] = useState("");

  const effectRan = useRef(false);
  
  // Desctructuring data state object
  const { id, year, manufacturer, playerName, teamName, competition, cardNo, setTotal, description, condition, rarity, value, image } = cardData;

  useEffect(()=> {
    if(effectRan.current === false) {
      fetchCard();
      fetchRarityOptions();
      fetchConditionOptions();
      setLoading(false);

      return () => {
        effectRan.current = true;
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  async function fetchCard() {
    try {
      // (i) API Fetch Call
      const response = await cardRequest.getById(id);
      const fetchedCard = await response.data;
      console.log(fetchedCard);
  
      // (ii) Update State data object
      setCardData(cardData => ({
        ...cardData,
        ...fetchedCard
      }));

      // (iii) Save Uploaded File "Glob" to State
      if(!fetchedCard.image) {
        console.log("No download URL provided by the database.");
      } else {
        const fileGlob = cardRequest.getFileFromUrl(fetchedCard.image);
        setUploadedFile(fileGlob);
      }

    } catch (err) {
      console.log(err?.response);
      setError(true);
    }
  }

  // Component Functions
  // 1. Map changing text input fields to state
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setCardData({
      ...cardData,
      [name]: value
    });
  }
  
  // 2. Map changing file input to state
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCardData({
      ...cardData,
      image: file
    })
  }

  async function fetchRarityOptions() {
    try {
      const response = await formRequest.getRarity();
      const rarity = await response.data;
      setRareness(rarity);
    } catch (err) {
      console.log(err?.response);
      setError(true);
    }
  }

  async function fetchConditionOptions() {
    try {
      const response = await formRequest.getCondition();
      const condition = await response.data;
      setApperance(condition);
    } catch (err) {
      console.log(err?.response);
      setError(true);
    }
  }

  // 3. Function to control form submission event
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await cardRequest.post(cardData);
      console.log(response);
      navigate('/cards/collection');

    } catch (err) {
      console.log(err?.response);
      window.scroll({top: 0, behavior: 'smooth'});
    }
    setLoading(false);
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

    <BSCard title={`Edit ${playerName} ${competition} Card`}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <FormLabel>Card Year</FormLabel>
              <FormControl
                type="text"
                placeholder="eg. 1982"
                name="year"
                value={year}
                onChange={handleTextChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <FormLabel>Card Number</FormLabel>
              <FormControl
                type="text"
                placeholder="eg. 57"
                name="cardNo"
                value={cardNo}
                onChange={handleTextChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <FormLabel>Cards in Set</FormLabel>
              <FormControl
                type="text"
                placeholder="eg. 352"
                name="setTotal"
                value={setTotal}
                onChange={handleTextChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <FormLabel>Competition</FormLabel>
              <FormControl
                type="text"
                placeholder="AFL, WAFL, SANFL..."
                name="competition"
                value={competition}
                onChange={handleTextChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <FormLabel>Card Brand</FormLabel>
              <FormControl
                type="text"
                placeholder="Scanlens, Select, etc"
                name="manufacturer"
                value={manufacturer}
                onChange={handleTextChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <FormLabel>Player Name</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter the player's name"
                name="playerName"
                value={playerName}
                onChange={handleTextChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <FormLabel>Team Name</FormLabel>
              <FormControl
                type="text"
                placeholder="eg. Footscray Bulldogs"
                name="teamName"
                value={teamName}
                onChange={handleTextChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <FormLabel>Card Rarity</FormLabel>
              <SelectOption
                as="select"
                name="rarity"
                value={rarity}
                onChange={handleTextChange}
              >
                { rareness.map(( option ) => (
                  <option 
                    key={option.id}
                    id={option.id}
                    value={option.rarity}>{option.rarity}</option>
                ))}
              </SelectOption>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <FormLabel>Card Condition</FormLabel>
              <SelectOption
                as="select"
                name="condition"
                value={condition}
                onChange={handleTextChange}
              >
                { appearance.map(( option ) => (
                  <option 
                    key={option.id}
                    id={option.id}
                    value={option.condition}>{option.condition}</option>
                ))}
              </SelectOption>
            </Form.Group>
          </Col>
          <Col>
            <FormLabel>Card Value ($)</FormLabel>
              <FormControl
                type="text"
                placeholder="eg. 352"
                name="value"
                value={value}
                onChange={handleTextChange}
              />
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <FormLabel>Card Description</FormLabel>
          <TextArea
            as="textarea"
            rows={3}
            placeholder="Tell us about the card in your collection"
            name="description"
            value={description}
            onChange={handleTextChange}
          />
        </Form.Group>

        {preview && !loading && 
        <div className="text-center mt-2 mb-5">
          <h6>Current Image</h6>
          <PreviewImg src={image} alt="preview" />
        </div> }
        <Form.Group className="my-3" controlId="image">
          <FormLabel>Card Image</FormLabel>
          <FormControl
            type="file"
            onChange={handleFileChange}
          />
        </Form.Group>

        <BSButton loadingState={loading}>
          {loading ? '...' : 'Submit'}
        </BSButton>

      </Form>
    </BSCard>
  )
}

export default EditCard;