import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import isi from 'redux-immutable-state-invariant';
import * as process from 'process';
import rootReducer from './redux.rootReducer';

const logger = createLogger({
  duration: true,
  collapsed: true,
  diff: true,
});

export default function configureStore(preloadedState) {
  const middleware = [thunkMiddleware, isi()];

  if (process.env.NODE_ENV === 'development') middleware.push(logger);

  const middlewareEnhancer = applyMiddleware(...middleware);

  const enhancers = [middlewareEnhancer];
  const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const composedEnhancers = composer(...enhancers);

  return createStore(rootReducer, preloadedState, composedEnhancers);
}
