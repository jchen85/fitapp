import React, { Component, PropTypes } from 'react';
import '../styles/challengedetails.scss';

export default class Participant extends Component {
  render() {
    const { participant } = this.props;
    return (
      <div className="challengeDetails__participant">
        {participant.name}
      </div>
    );
  }
}

Participant.propTypes = {
  participant: PropTypes.object.isRequired
};
