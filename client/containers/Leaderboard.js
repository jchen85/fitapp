import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LeaderboardActions from '../actions/LeaderboardActions';
import { socket } from '../index';

class Leaderboard extends Component {
  componentDidMount() {
    socket.on('newLeaderboard', data => {
      console.log(data);
    });
  }

  render() {
    return (
      <div className="leaderboard">
      </div>
    );
  }
}

Leaderboard.propTypes = {
  leaderboard: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    leaderboard: state.leaderboard
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LeaderboardActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Leaderboard);
