import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LeaderboardActions from '../actions/LeaderboardActions';
import LeaderboardEntry from '../components/LeaderboardEntry';
import '../styles/leaderboard.scss';

class Leaderboard extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.fetchLeaderboard('All');
    actions.fetchTeamScores();
  }

  render() {
    const { leaderboard } = this.props;

    const leaderboardEntries = leaderboard.map((entry, i) => {
      return <LeaderboardEntry leaderboardEntry={entry} key={i} />;
    });

    return (
      <div className="leaderboard">
        <table>
          <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Age</th>
            <th>Team</th>
            <th>Carrots</th>
          </tr>
          </thead>
          <tbody>
          {leaderboardEntries}
          </tbody>
        </table>
      </div>
    );
  }
}

Leaderboard.propTypes = {
  leaderboard: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    leaderboard: state.leaderboard.leaderboard,
    teamScores: state.leaderboard.teamScores
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
