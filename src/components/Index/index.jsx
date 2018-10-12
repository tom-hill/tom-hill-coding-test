import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initialiseApplication } from '../../redux/_global/global.actions';
import { newLineupsReceived } from '../../redux/lineups/lineups.actions';

import LoadingView from '../LoadingView/LoadingView';
import LineupView from '../LineupView/LineupView';

import * as Consts from '../constants';

export class IndexComponent extends React.Component {
  componentDidMount() {
    const updateLineups = this.props.newLineupsReceived;

    this.props.initialiseApplication().then((pusher) => {
      const channel = pusher.subscribe(Consts.LINEUPS.Channel);

      channel.bind(Consts.LINEUPS.Event, updateLineups);
    });
  }

  renderLoadingView = () => (<LoadingView />);

  renderLineupView = (team, i) => (
    <LineupView data={this.props.lineupData[team]} key={`${team}_${i}`} />);

  render() {
    const { loading } = this.props;
    return (
      <main>
        <h1>Latest Team Lineups</h1>
        {loading && this.renderLoadingView()}
        {!loading && Object.keys(this.props.lineupData).map(this.renderLineupView)}
      </main>
    );
  }
}

IndexComponent.propTypes = {
  loading: PropTypes.bool,
  lineupData: PropTypes.object,
  initialiseApplication: PropTypes.func.isRequired,
  newLineupsReceived: PropTypes.func.isRequired,
};

IndexComponent.defaultProps = {
  loading: true,
  lineupData: {},
};

const mapStateToProps = state => ({
  loading: state.global.loading,
  lineupData: state.lineups,
});

const mapDispatchToProps = dispatch => ({
  initialiseApplication: () => {
    return dispatch(initialiseApplication());
  },
  newLineupsReceived: (data) => {
    return dispatch(newLineupsReceived(data));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IndexComponent);
