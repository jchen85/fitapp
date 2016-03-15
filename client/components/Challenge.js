import React, { Component, PropTypes } from 'react';
import '../styles/challenge.scss';
import moment from 'moment';
import '@gigwalk/livestamp';

export default class Challenge extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { challenge, actions, user } = this.props;

    // Render differently depending on if user is a member of this challenge
    const memberOrNot = challenge.members.reduce((acc, el) => {
      if (el.id === user.id) return true;
    }, false);

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
    if (challenge.category === 'activity') {
      goalDescription = `Be active for ${challenge.requirement} mins!`;
    }
    if (challenge.category === 'distance') {
      goalDescription = `Move ${challenge.requirement} miles!`;
    }

    let goalImage = null;
    if (challenge.category === 'calories') {
      goalImage = '/static/icons/kiwi.png';
    }
    if (challenge.category === 'steps') {
      goalImage = '/static/icons/shoe.png';
    }
    if (challenge.category === 'activity') {
      goalImage = '/static/icons/heartrate.png';
    }
    if (challenge.category === 'distance') {
      goalImage = '/static/icons/map.png';
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
          <span>{challengeStatus} <span data-livestamp={challenge.end_time}></span></span>
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
              <ul>
                <li><input type="checkbox" id="cb1"/><label for="cb1">Level 1</label>
                  <ul>
                    <li><input type="checkbox" id="cb2"/><label for="cb2">Level 2-A</label>
                        <ul>
                          <li><label>Level 3-A</label> Content</li>
                          <li><label>Level 3-B</label> Content</li>
                        </ul>
                    </li>
                    <li><input type="checkbox" id="cb3"/><label for="cb3">Level 2-B</label>
                    <ul>
                      <li><input type="checkbox" id="cb5"/><label for="cb5">Level 3-A</label>
                        <ul>
                          <li><label>Level 4-A</label> Content</li>
                          <li><label>Level 4-B</label> Content</li>
                          <li><label>Level 4-C</label> Content</li>
                          <li><label>Level 4-D</label> Content</li>
                        </ul>
                      </li>
                    <li><input type="checkbox" id="cb6"/><label for="cb6">Level 3-B</label>
                        <ul>
                          <li><label>Level 4-A</label> Content</li>
                          <li><label>Level 4-B</label> Content</li>
                        </ul>
                      </li>
                    <li><input type="checkbox" id="cb7"/><label for="cb7">Level 3-C</label>
                        <ul>
                          <li><label>Level 4-A</label> Content</li>
                          <li><label>Level 4-B</label> Content</li>
                          <li><label>Level 4-C</label> Content</li>
                        </ul>
                      </li>
                  </ul>
                    </li>
                    <li><input type="checkbox" id="cb4"/><label for="cb4">Level 2-C</label>
                        <ul>
                          <li><label>Level 3-A</label> Content</li>
                        </ul>
                    </li>
                  </ul>
                </li>
              </ul>
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
