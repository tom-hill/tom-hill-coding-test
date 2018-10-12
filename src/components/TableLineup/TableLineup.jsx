import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/table-lineup.scss';

export default function TableLineup(props) {
  const renderPositionLayout = (layout, lineup) => layout.map((position, i) => {
    const player = lineup.players.find(person => person.formation_place === position);
    return (
      <tr key={`${player}_${player.formation_place}_${i}`}>
        <td>{player.formation_place}</td>
        <td>{player.position}</td>
        <td>{player.name}</td>
      </tr>
    );
  });

  const renderFourFourTwo = (lineup) => {
    const positionLayout = [1, 2, 5, 6, 3, 7, 4, 8, 11, 10, 9];

    return renderPositionLayout(positionLayout, lineup);
  };

  const renderThreeFourTwoOne = (lineup) => {
    const positionLayout = [1, 6, 5, 4, 2, 7, 8, 3, 10, 11, 9];

    return renderPositionLayout(positionLayout, lineup);
  };

  const renderFourFourOneOne = (lineup) => {
    const positionLayout = [1, 2, 5, 6, 3, 7, 4, 8, 11, 10, 9];

    return renderPositionLayout(positionLayout, lineup);
  };

  const renderLineup = (lineup) => {
    const formationLookup = (formation) => {
      switch (formation) {
        case 442:
          return renderFourFourTwo;
        case 3421:
          return renderThreeFourTwoOne;
        case 4411:
          return renderFourFourOneOne;
        default:
          return renderFourFourTwo;
      }
    };

    return formationLookup(lineup.formation)(lineup);
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th />
          <th>Position</th>
          <th>Player</th>
        </tr>
      </thead>
      <tbody>
        {renderLineup(props.data)}
      </tbody>
    </table>
  );
};

TableLineup.propTypes = {
  data: PropTypes.object.isRequired,
};
