import React, { Component, PropTypes } from 'react';
import '../styles/leaderboard.scss';

export default class TeamScoreEntry extends Component {
  render() {
    const { rank, teamScoreEntry, fetchLeaderboard } = this.props;
    return (
      <tr className="teamScore__entry" onClick={() => fetchLeaderboard(teamScoreEntry.group)}>
        <td>{rank}</td>
        <td>{teamScoreEntry.group}</td>
        <td>{teamScoreEntry.reduction}</td>
      </tr>
    );
  }
}

TeamScoreEntry.propTypes = {
  teamScoreEntry: PropTypes.object.isRequired,
  rank: PropTypes.number.isRequired,
  fetchLeaderboard: PropTypes.func.isRequired
};
