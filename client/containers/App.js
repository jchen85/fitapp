import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Challenges from './Challenges';
import Store from './Store';
import Home from './Home';
import Leaderboard from './Leaderboard';
import ChallengeDetails from './ChallengeDetails';

export default class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home}>
          <IndexRoute component={Challenges}/>
          <Route path="challenges" component={Challenges} />
          <Route path="store" component={Store} />
          <Route path="leaderboard" component={Leaderboard} />
          <Route path="challenges/:challenge" component={ChallengeDetails} />
        </Route>
      </Router>
    );
  }
}
