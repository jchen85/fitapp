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
    const { leaderboard, teamScores, actions } = this.props;

    const leaderboardEntries = leaderboard.map((entry, i) => {
      if (i <= 49) {
        return <LeaderboardEntry leaderboardEntry={entry} key={i} rank={i + 1}/>;
      }
    });

    const leaderboardEntries2 = leaderboard.map((entry, i) => {
      if (i > 49) {
        return <LeaderboardEntry leaderboardEntry={entry} key={i} rank={i + 1}/>;
      }
    });

    const teamScoreEntries = teamScores.map((entry, i) => {
      return (<TeamScoreEntry
        teamScoreEntry={entry}
        key={i}
        rank={i + 1}
        fetchLeaderboard={actions.fetchLeaderboard}
      />);
    });

    return (
      <div className="leaderboards">
        <h2>Team Leaders</h2>
        <table className="teamLeaderboard">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Carrots</th>
            </tr>
          </thead>
          <tbody>
          {teamScoreEntries}
          </tbody>
        </table>
        <h2>User Leaders</h2>
        <div className="userLeaderboards">
          <table className="userLeaderboard">
            <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Name</th>
              <th>Age</th>
              <th>Team</th>
              <th>Carrots</th>
            </tr>
            </thead>
            <tbody className="userLeaderboard__body">
            {leaderboardEntries}
            </tbody>
          </table>
          <table className="userLeaderboard">
            <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Name</th>
              <th>Age</th>
              <th>Team</th>
              <th>Carrots</th>
            </tr>
            </thead>
            <tbody className="userLeaderboard__body">
            {leaderboardEntries2}
            </tbody>
          </table>
        </div>
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
