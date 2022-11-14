import React from 'react';

// External packages
import Card from 'react-bootstrap/Card';

import CardButton from '../common/CardButton';
import styled from 'styled-components';

const TradingCard = styled(Card)`
  max-width: 290px;
  margin: 1rem;
  padding: 1rem;
  border: 1px solid var(--highlight-dark);
  background-color: transparent;

  border-radius: 0;
  transition: all 0.3s ease-in-out;

  &:hover {
  }
`;

const CardImage = styled(Card.Img)`
  max-height: 320px;
  max-width: 290px;
  opacity: 0.9;
  border-radius: 0;
`;

const CardBody = styled(Card.Body)`
  padding-left: 0;
  padding-right: 0;
`;

const CardText = styled(Card.Text)`
  font-size: 0.9rem;
  height: 150px;
`;

const CardItem = (props) => {
  return (
    <TradingCard>
      <CardImage variant="top" src={props.image} alt={props.playerName} />
      <CardBody>
        <Card.Title>{props.playerName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.teamName}</Card.Subtitle>
        <CardText>
          Produced by {props.manufacturer} back in {props.year}, this {props.playerName} trading card is number {props.cardNo} in a set of {props.setTotal}.<br />
          Condition is &#699;{props.condition}&#700;&#44; its rarity is &#699;{props.rarity}&#700; and is currently valued at ${props.value}.
        </CardText>
        <CardButton 
          className="btn btn-outline-dark"
          to={`/cards/${props.id}`}
        >
          View Card Details
        </CardButton>
      </CardBody>
    </TradingCard>
  )
}

export default CardItem;