import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initialiseApplication } from '../../redux/_global/global.actions';

import LoadingView from '../LoadingView/LoadingView';
import LineupView from '../LineupView/LineupView';

export class Index extends React.Component {
  componentDidMount() {
    this.props.initialiseApplication();
  }

  renderLoadingView = () => (<LoadingView />);

  renderLineupView = (team, i) => (<LineupView data={this.props.lineupData[team]} key={`${team}_${i}`} />);

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

Index.propTypes = {
  loading: PropTypes.bool,
  lineupData: PropTypes.object,
  initialiseApplication: PropTypes.func.isRequired,
};

Index.defaultProps = {
  loading: true,
  lineupData: {},
};

const mapStateToProps = (state) => ({
  loading: state.global.loading,
  lineupData: state.lineups,
});

const mapDispatchToProps = dispatch => ({
  initialiseApplication: () => {
    dispatch(initialiseApplication());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
