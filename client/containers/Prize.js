import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../styles/prize.scss';
import * as LeaderboardActions from '../actions/LeaderboardActions';
import Card from '../components/Card';
import CardTypes from '../constants/CardTypes';

export default class Prize extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.fetchTeamScores();
  }

  render() {
    const { teamScores } = this.props;

    return (
      <div className="prize">
        <div className="prize__header">
        </div>
        Today's prize:
        <Card type={CardTypes.Speedwalk} />
        <div className="prize__leader">
          <div className="prize__leader__header">Today's Leader</div>
            <h3>{teamScores[0].group}</h3>
          <div className="prize__leader__desc">
            If {teamScores[0].group} has the highest score at midnight, all Delta team members will receive Speedwalk in their inventory.
          </div>
        </div>
      </div>
    );
  }
}

Prize.propTypes = {
  teamScores: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    teamScores: state.leaderboard.teamScores
  };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LeaderboardActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Prize);
