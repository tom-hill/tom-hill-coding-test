import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/player.scss';

export default function Player(props) {
  const {
    blank,
    data: player,
  } = props;
  return (
    <li className={styles.player}>
      {!blank && (
        <div className={styles.player__card}>
          <div className={styles.player__shirt}>{player.formation_place}</div>
          <div className={styles.player__details}>{player.name}</div>
        </div>
      )}
    </li>
  );
}

Player.propTypes = {
  blank: PropTypes.bool,
  data: PropTypes.object,
};

Player.defaultProps = {
  blank: false,
  data: {},
};
