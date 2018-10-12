import { combineReducers } from 'redux';
import { createResponsiveStateReducer } from 'redux-responsive';
import global from './_global/global.reducer';
import lineups from './lineups/lineups.reducer';

const rootReducer = combineReducers({
  global,
  browser: createResponsiveStateReducer({
    micro: 320,
    extraSmall: 480,
    small: 768,
    medium: 992,
    large: 1280,
    extraLarge: 1400,
  }),
  lineups,
});

export default rootReducer;
