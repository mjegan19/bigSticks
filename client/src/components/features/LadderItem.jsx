import React from 'react';

// External packages
import styled from 'styled-components';

const TableRow = styled.tr`
  margin: 1rem 0%;

  td {
    padding: 1rem;
    vertical-align: middle;
    font-size: 0.9rem;

    img {
      max-width: 25px;
    }
    
    p {
      display: inline;
      vertical-align: middle;
      font-size: 1.2rem;
      font-weight: bold;
      margin-left: 1rem;
    }

    span {
      vertical-align: -10%;
      color: var(--highlight);
      font-size: 0.7rem;
      font-weight: bold;
      margin-left: 0.4rem;
    }
  }
`;


const MenuItem = (props) => {
  return (
    <TableRow>
      {/* Column 1: Rank */}
      <td className="text-center">
        {props.rank}
      </td>

      {/* Column 2a: Team Icon */}
      <td>
        <img src={props.icon} alt={props.name} />{' '}
      </td>

      {/* Column 2b: Team Name */}
      <td>
        {props.name}
      </td>

      {/* Column 3: Games Played */}
      <td className="text-center">
        {props.played}
      </td>

      {/* Column 4: Wins */}
      <td className="text-center">
        {props.wins}
      </td>

      {/* Column 5: Losses */}
      <td className="text-center">
        {props.losses}
      </td>

      {/* Column 6: Draws */}
      <td className="text-center">
        {props.draws}
      </td>

      {/* Column 7: Total Match Points*/}
      <td className="text-center">
        {props.pts}
      </td>

      {/* Column 8: Scores For */}
      <td className="text-center">
        {props.for}
      </td>

      {/* Column 9: Scores Against */}
      <td className="text-center">
        {props.against}
      </td>

      {/* Column 10: Percentage % */}
      <td className="text-center">
        {props.percentage}
      </td>

    </TableRow>
  )
}

export default MenuItem;