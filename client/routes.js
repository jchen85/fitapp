import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Challenges from './containers/Challenges';
import Store from './containers/Store';

export default (
  <Route path="/" component={App}>
  </Route>
    <Route path="challenges" component={Challenges} />
    <Route path="store" component={Store} />
);
