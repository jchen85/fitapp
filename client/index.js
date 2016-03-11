import React from 'react';
import ReactDOM from 'react-dom';

import './styles/main.scss';

import { configureStore } from './store/configureStore';
import { Root } from './containers/Root';

import io from 'socket.io-client';
export const socket = io();

const store = configureStore();

ReactDOM.render(
  <Root store={store}/>,
  document.getElementById('root')
);
