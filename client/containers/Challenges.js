import React, { Component, PropTypes } from 'react';
import Challenge from '../components/Challenge';
import moment from 'moment';
import { sortBy, toArray } from 'underscore';

export default class Challenges extends Component {
  render() {
    const { challenges, actions, user } = this.props;

    const challengesSorted = sortBy(toArray(challenges), (challenge) => {
      return moment(challenge.end_time);
    });

    const challengesDivs = challengesSorted.map((challenge, i) => {
      return <Challenge challenge={challenge} key={i} actions={actions} user={user} />;
    });

    return (
      <div>
        {challengesDivs}
      </div>
    );
  }
}

Challenges.propTypes = {
  actions: PropTypes.object.isRequired,
  challenges: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};
