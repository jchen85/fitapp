import React, { Component, PropTypes } from 'react';
import Challenge from '../components/Challenge';
import { socket } from '../index';

export default class Challenges extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.fetchUserInfo();
    socket.on('updateChallenges', (data) => {
      actions.updateChallenges(data);
    });
  }

  render() {
    const { challenges, actions, user } = this.props;

    const challengesDivs = [];
    const keys = Object.keys(challenges);
    for (let i = 0; i < keys.length; i++) {
      challengesDivs.push(<Challenge challenge={challenges[keys[i]]} key={i} actions={actions} user={user} />);
    }
    // const challengesDivs = challenges.map((challenge, index) => {
    //   return <Challenge challenge={challenge} key={index} actions={actions} user={user} />;
    // });

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
