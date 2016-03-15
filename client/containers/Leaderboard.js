import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LeaderboardActions from '../actions/LeaderboardActions';
import LeaderboardEntry from '../components/LeaderboardEntry';
import TeamScoreEntry from '../components/TeamScoreEntry';
import '../styles/leaderboard.scss';

class Leaderboard extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.fetchLeaderboard('All');
    actions.fetchTeamScores();
  }

  render() {
    const { leaderboard, teamScores } = this.props;

    const leaderboardEntries = leaderboard.map((entry, i) => {
      return <LeaderboardEntry leaderboardEntry={entry} key={i} />;
    });

    const teamScoreEntries = teamScores.map((entry, i) => {
      return <TeamScoreEntry teamScoreEntry={entry} key={i} />;
    });

    return (
      <div className="leaderboards">
        <table className="teamLeaderboard">
          <thead>
            <tr>
              <th>Team</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
          {teamScoreEntries}
          </tbody>
        </table>
        <table className="userLeaderboard">
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
  teamScores: PropTypes.array.isRequired,
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
