import React, { Component, PropTypes } from 'react';

export default class Challenge extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { challenge, actions, user } = this.props;

    // Render differently depending on if user is a member of this challenge
    const memberOrNot = challenge.members.indexOf(user.id) > -1;

    const buttonText = memberOrNot ? 'Leave' : 'Join';
    const buttonAction = memberOrNot ?
                        () => actions.removeMember(challenge.id, user.id) :
                        () => actions.addMember(challenge.id, user.id);

    // After the halfway point, challenge becomes disabled.
    // User can still join, but they can't leave
    // Challenge also becomes disabled once the end_time is reached
    const button = challenge.disabled && memberOrNot || challenge.ended ?
                <button disabled>Locked</button> :
                <button onClick={buttonAction}>{buttonText}</button>;

    return (
      <div>
        {challenge.category}
        {button}
      </div>
    );
  }
}

Challenge.propTypes = {
  challenge: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};
