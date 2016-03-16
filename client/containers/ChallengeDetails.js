import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Challenge from '../components/Challenge';
import Participant from '../components/Participant';
import '../styles/challengedetails.scss';

export default class ChallengeDetails extends Component {
  render() {
    const { params, challenges, actions, user } = this.props;
    const thisChallenge = challenges[params.challenge];

    const participants = thisChallenge.members.map((participant, i) => {
      return <Participant participant={participant} key={i} />
    });

    return (
      <div className="challengeDetails">
        <Challenge challenge={thisChallenge} actions={actions} user={user} />
        <div className="challengeDetails__participants">
          <div className="challengeDetails__participants__header">
            Participants
          </div>
          <div className="challengeDetails__participants__body">
            {participants}
          </div>
        </div>
      </div>
    );
  }
}

ChallengeDetails.propTypes = {
  user: PropTypes.object.isRequired
};

ChallengeDetails.propTypes = {
  actions: PropTypes.object.isRequired,
  challenges: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  params: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    actions: state.actions,
    challenges: state.challenges,
    user: state.user
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(Object.assign({}, UserActions, ChallengeDetailsActions), dispatch),
//   };
// }

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(ChallengeDetails);
