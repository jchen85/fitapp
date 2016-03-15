  import React, { Component, PropTypes } from 'react';
  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import { socket } from '../index';
  import { Router, Route, browserHistory, IndexRoute } from 'react-router';

  import * as UserActions from '../actions/UserActions';
  import * as ChallengesActions from '../actions/ChallengesActions';
  import Footer from '../components/Footer';
  import UserInfo from './UserInfo';
  import Challenges from './Challenges';
  import Store from './Store';
  import SideBar from './SideBar';
  import Home from './Home';

  class App extends Component {
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
        <Router history={browserHistory}>
          <Route path="/" component={Home}>
            <IndexRoute component={Challenges}/>
            <Route path="challenges" component={Challenges} />
            <Route path="store" component={Store} />
          </Route>
        </Router>
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
