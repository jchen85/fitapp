import React, { Component, PropTypes } from 'react';
import '../styles/challenge.scss';
import moment from 'moment';

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

    let goalDescription = null;
    if (challenge.category === 'calories') {
      goalDescription = `Lose ${challenge.requirement} calories!`;
    }

    if (challenge.category === 'steps') {
      goalDescription = `Take ${challenge.requirement} steps!`;
    }

    return (
      <div className="challenge">
        <header className="challenge__header">
          <span>Challenge ends {moment(challenge.end_time).fromNow()}</span>
        </header>
        <div className="challenge__details">
          <div className="challenge__image">
            <img src="http://www.svgcuts.com/fsvgfotw/2010/fsvgfotw_2010_08_04.png" />
          </div>
          <div className="challenge__mainInfo">
            <h2>{goalDescription}</h2>
            <div className="challenge__participants">
              Participants: {challenge.members.length}
            </div>
          </div>
          <div className="challenge__cost_endTime_container">
            <div className="challenge__cost">
              Cost: {challenge.wager} points
            </div>
            {button}
          </div>
        </div>
      </div>
    );
  }
}

Challenge.propTypes = {
  challenge: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};
