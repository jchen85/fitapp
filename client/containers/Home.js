import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { socket } from '../index';

import * as UserActions from '../actions/UserActions';
import * as ChallengesActions from '../actions/ChallengesActions';
import UserInfo from './UserInfo';
import SideBar from './SideBar';
import Prize from './Prize';

class Home extends Component {
  componentDidMount() {
    const { actions } = this.props;

    // initial fetch of user info (over HTTP), subsequent updates of user info happen over sockets
    actions.fetchUserInfo();

    socket.on('updateChallenges', data => {
      actions.updateChallenges(data);
    });

    socket.on('updateUserInfo', data => {
      actions.updateUserInfo(data);
    });
  }

  render() {
    const { challenges, actions, user } = this.props;

    return (
      <div className="main__app__container">
        <UserInfo actions={actions} user={user} />
        <div className="main__body__container">
          <SideBar user={user} />
          {this.props.children}
          <Prize />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  challenges: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    counter: state.counter,
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
)(Home);
