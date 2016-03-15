import React, { Component, PropTypes } from 'react';
import '../styles/leaderboard.scss';

export default class TeamScoreEntry extends Component {
  render() {
    const { teamScoreEntry, fetchLeaderboard } = this.props;
    return (
      <tr className="teamScore__entry" onClick={() => fetchLeaderboard(teamScoreEntry.group)}>
        <td>{teamScoreEntry.group}</td>
        <td>{teamScoreEntry.reduction}</td>
      </tr>
    );
  }
}

TeamScoreEntry.propTypes = {
  teamScoreEntry: PropTypes.object.isRequired,
  fetchLeaderboard: PropTypes.function.isRequired
};
