import { combineReducers } from 'redux';
import global from './_global/global.reducer';
import lineups from './lineups/lineups.reducer';

const rootReducer = combineReducers({
  global,
  lineups,
});

export default rootReducer;
