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

    const buttonText = memberOrNot ? 'Leave' : 'Join!';
    const buttonAction = memberOrNot ?
                        () => actions.removeMember(challenge.id, user.id) :
                        () => actions.addMember(challenge.id, user.id);

    // After the halfway point, challenge becomes disabled.
    // User can still join, but they can't leave
    // Challenge also becomes disabled once the end_time is reached
    const button = challenge.disabled && memberOrNot || challenge.ended ?
                <button className="challenge__join_btn challenge__join_btn--disabled" disabled>Locked</button> :
                <button className="challenge__join_btn challenge__join_btn--enabled" onClick={buttonAction}>{buttonText}</button>;

    // Change elements depending on type of challenge (calories vs steps)
    let goalDescription = null;
    if (challenge.category === 'calories') {
      goalDescription = `Lose ${challenge.requirement} calories!`;
    }
    if (challenge.category === 'steps') {
      goalDescription = `Take ${challenge.requirement} steps!`;
    }

    let goalImage = null;
    if (challenge.category === 'calories') {
      goalImage = 'https://cdn3.iconfinder.com/data/icons/frozen-yogurt-fruts/696/iconos_-_ice_cream_-_fruts_Kiwi-512.png';
    }
    if (challenge.category === 'steps') {
      goalImage = 'http://www.svgcuts.com/fsvgfotw/2010/fsvgfotw_2010_08_04.png';
    }

    // Carrots represent currency/points
    const carrot = <div className="carrot" />;

    // Determine if challenge ended already, render differently if so
    let challengeClass = null;
    let challengeStatus = null;

    if (moment(challenge.end_time).isSameOrAfter(moment())) {
      challengeClass = 'challenge';
      challengeStatus = 'Challenge ends';
    } else {
      challengeClass = 'challenge--ended';
      challengeStatus = 'Challenge ended';
    }

    return (
      <div className={challengeClass}>
        <header className="challenge__header">
          <span>{challengeStatus} {moment(challenge.end_time).fromNow()}</span>
        </header>
        <div className="challenge__details">
          <div className="challenge__image">
            <img src={goalImage} />
          </div>
          <div className="challenge__mainInfo">
            <h2>{goalDescription}</h2>
            <div className="challenge__reward">
              Reward: <div className="challenge__reward__amt">{challenge.reward}</div> {carrot}
            </div>
            <div className="challenge__participants">
              Participants: {challenge.members.length}
            </div>
          </div>
          <div className="challenge__join">
            Interested?
            <div className="challenge__cost">
              -{challenge.wager} {carrot}
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
