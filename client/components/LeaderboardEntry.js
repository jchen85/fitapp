import React, { Component, PropTypes } from 'react';
import '../styles/leaderboard.scss';

export default class LeaderboardEntry extends Component {
  render() {
    const { leaderboardEntry } = this.props;
    return (
      <tr className="leaderboard__entry">
        <td><img src={leaderboardEntry.avatar}/></td>
        <td>{leaderboardEntry.name}</td>
        <td>{leaderboardEntry.age}</td>
        <td>{leaderboardEntry.team}</td>
        <td>{leaderboardEntry.points}</td>
      </tr>
    );
  }
}

LeaderboardEntry.propTypes = {
  leaderboardEntry: PropTypes.object.isRequired
};
