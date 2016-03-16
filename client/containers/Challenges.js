import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../actions/UserActions';
import * as ChallengesActions from '../actions/ChallengesActions';
import Challenge from '../components/Challenge';
import moment from 'moment';
import { sortBy, toArray } from 'underscore';

class Challenges extends Component {
  render() {
    const { challenges, actions, user } = this.props;

    const challengesSorted = sortBy(toArray(challenges), (challenge) => {
      return -moment(challenge.end_time);
    });

    const challengesDivs = challengesSorted.map((challenge, i) => {
      return <Challenge challenge={challenge} key={i} actions={actions} user={user} />;
    });

    return (
      <div className="challenges__container">
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

function mapStateToProps(state) {
  return {
    actions: state.actions,
    challenges: state.challenges,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, UserActions, ChallengesActions), dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Challenges);
