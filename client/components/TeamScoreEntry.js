import React, { Component, PropTypes } from 'react';
import '../styles/leaderboard.scss';

export default class TeamScoreEntry extends Component {
  render() {
    const { teamScoreEntry } = this.props;
    return (
      <tr className="teamScore__entry">
        <td>{teamScoreEntry.group}</td>
        <td>{teamScoreEntry.reduction}</td>
      </tr>
    );
  }
}

TeamScoreEntry.propTypes = {
  teamScoreEntry: PropTypes.object.isRequired
};
