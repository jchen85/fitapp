import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../actions/UserActions';
import * as ChallengesActions from '../actions/ChallengesActions';
import Footer from '../components/Footer';
import UserInfo from './UserInfo';
import Challenges from './Challenges';
import SideMenu from './SideMenu';
import { socket } from '../index';

export default class App extends Component {
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
      <div className="main-app-container">
        <SideMenu />
        <UserInfo actions={actions} user={user} />
        <div className="main-app-nav">Simple Redux Boilerplate</div>
        <h2>Challenges</h2>
        <Challenges actions={actions} challenges={challenges} user={user} />
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
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
)(App);
