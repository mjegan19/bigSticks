import React, { Fragment } from 'react';

// Custom components
import LadderItem from './LadderItem';
import { logoWebAddress } from '../../services/teamLogos';

// External packages
import { Table } from 'react-bootstrap';
import styled from 'styled-components';

const StyledTable = styled(Table)`
  margin: 2rem 0;
  border: 5px solid var(--complementary);

  thead {
    background: var(--complementary);
    color: var(--primary);
    padding: 2rem 0;
  }

  .button-col {
    width: 150px;
  }
`;

const LadderList = (props) => {


  return (
    <Fragment>
      <StyledTable striped hover>
        <thead>
          <tr>
            <th className="text-center">Rank</th>
            <th>Team</th>
            <th></th>
            <th className="text-center">Plyd</th>
            <th className="text-center">Won</th>
            <th className="text-center">Lost</th>
            <th className="text-center">Drew</th>
            <th className="text-center">Pts</th>
            <th className="text-center">For</th>
            <th className="text-center">Agst</th>
            <th className="text-center">%</th>
          </tr>
        </thead>
        <tbody>
          { props.standings.map(( team ) => (
            <LadderItem 
              key={team.rank}
              id={team.id}
              rank={team.rank}
              icon={logoWebAddress(team.id)}
              name={team.name}
              played={team.played}
              wins={team.wins}
              losses={team.losses}
              draws={team.draws}
              pts={team.pts}
              for={team.for}
              against={team.against}
              percentage={team.percentage.toFixed(2)}
            />
          )) }
        </tbody>
      </StyledTable>
    </Fragment>
  )
}

export default LadderList;