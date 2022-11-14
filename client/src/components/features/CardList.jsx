import React, { Fragment } from 'react';

// Custom components
import CardItem from './CardItem';
import styled from 'styled-components';

const CardResults = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;


const CardList = (props) => {

  function deCapitalizeLetters(string) {
    return string.toLowerCase();
  }

  return (
    <Fragment>
      <CardResults>
        { props.cards.map(( card ) => (
          <CardItem 
            key={card.id}
            id={card.id}
            year={card.year}
            manufacturer={card.manufacturer}
            playerName={card.playerName}
            teamName={card.teamName}
            competition={card.competition}
            cardNo={card.cardNo}
            setTotal={card.setTotal}
            description={card.description}
            condition={
              deCapitalizeLetters(
                card.condition
              )
            }
            rarity={
              deCapitalizeLetters(
                card.rarity
              )
            }
            value={card.value}
            image={card.image}
          />
        )) }
      </CardResults>
    </Fragment>
  )
}

export default CardList;