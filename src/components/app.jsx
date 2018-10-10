import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import * as process from 'process';

import Index from './Index/index';
import configureStore from '../redux/redux.configuration';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Index />
  </Provider>
);

const HotApp = hot(module)(App);

if (process.env.NODE_ENV === 'development') {
  ReactDOM.render(<HotApp />, document.getElementById('app'));
} else {
  ReactDOM.render(<App />, document.getElementById('app'));
}
