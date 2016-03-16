import React, { Component, PropTypes } from 'react';
import '../styles/challengedetails.scss';

export default class Participant extends Component {
  render() {
    const { participant } = this.props;
    return (
      <div className="challengeDetails__participant">
        <img src={participant.avatar} />
        <div className="challengeDetails__participant__info">
          <b>{participant.name},&nbsp;{participant.age}</b>
          <p>Team: {participant.team} Carrots: {participant.points}</p>
          <p></p>
        </div>
      </div>
    );
  }
}

Participant.propTypes = {
  participant: PropTypes.object.isRequired
};
