import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './styles/lineup-view.scss';
import PitchLineup from '../PitchLineup/PitchLineup';
import TableLineup from '../TableLineup/TableLineup';

const responsive = ({ browser }, ownProps) => ({
  browser,
  ...ownProps,
});

export function LineupView(props) {
  const {
    browser,
  } = props;
  return (
    <div className={styles['team-lineup']}>
      <h2>{props.data.team}</h2>
      {browser.is.micro && <TableLineup data={props.data} />}
      {browser.greaterThan.micro && <PitchLineup data={props.data} />}
    </div>
  );
}

LineupView.propTypes = {
  browser: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default connect(responsive)(LineupView);
