import React from 'react';
import PropTypes from 'prop-types';
import Player from '../Player/Player';

import styles from './styles/pitch-lineup.scss';

export default class PitchLineup extends React.PureComponent {
  constructor(props) {
    super(props);

    this.renderPlayers = this.renderPlayers.bind(this);
    this.renderPositionLayout = this.renderPositionLayout.bind(this);
    this.renderFourFourTwo = this.renderFourFourTwo.bind(this);
    this.renderThreeFourTwoOne = this.renderThreeFourTwoOne.bind(this);
    this.renderFourFourOneOne = this.renderFourFourOneOne.bind(this);
    this.renderLineup = this.renderLineup.bind(this);
  }

  renderPlayers(positionMap, lineup, row) {
    return positionMap.map((position, i) => {
      const selectedPlayer = lineup.players.find(player => player.formation_place === position);

      if (selectedPlayer) {
        return <Player data={selectedPlayer} key={`${selectedPlayer.formation_place}__${selectedPlayer.name}`} />;
      }

      return <Player blank key={`$row#${row}_blank_${i}`} />;
    });
  }

  renderPositionLayout(layout, lineup) {
    return layout.map((row, i) => (
      <ul className={styles.row} key={`${lineup.team}_row_${i}`}>
        {this.renderPlayers(row, lineup, i)}
      </ul>
    ));
  }

  renderFourFourTwo(lineup) {
    const positionLayout = [
      [null, 1, null],
      [2, 5, 6, 3],
      [7, 4, 8, 11],
      [null, 10, 9, null],
    ];

    return this.renderPositionLayout(positionLayout, lineup);
  }

  renderThreeFourTwoOne(lineup) {
    const positionLayout = [
      [null, 1, null],
      [null, 6, 5, 4, null],
      [2, 7, 8, 3],
      [null, 10, 11, null],
      [null, 9, null],
    ];

    return this.renderPositionLayout(positionLayout, lineup);
  }

  renderFourFourOneOne(lineup) {
    const positionLayout = [
      [null, 1, null],
      [2, 5, 6, 3],
      [7, 4, 8, 11],
      [null, 10, null],
      [null, 9, null],
    ];

    return this.renderPositionLayout(positionLayout, lineup);
  }

  renderLineup(lineup) {
    const formationLookup = (formation) => {
      switch (formation) {
        case '442':
          return this.renderFourFourTwo;
        case '3421':
          return this.renderThreeFourTwoOne;
        case '4411':
          return this.renderFourFourOneOne;
        default:
          return this.renderFourFourTwo;
      }
    };

    return (
      <ul className={styles.pitch}>
        {formationLookup(lineup.formation)(lineup)}
      </ul>
    );
  }

  render() {
    const {
      data: lineup,
    } = this.props;

    return (
      <div className={styles['pitch-layout']}>
        {this.renderLineup(lineup)}
      </div>
    );
  }
}

PitchLineup.propTypes = {
  data: PropTypes.object.isRequired,
};
