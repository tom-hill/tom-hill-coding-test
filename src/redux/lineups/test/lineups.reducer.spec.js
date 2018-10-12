import { expect } from 'chai';
import reducer from '../lineups.reducer';
import * as Actions from '../lineups.actions';

const JSON = require('../../../../tools/test/match-lineups').lineups[0];

describe('Lineups Reducer', () => {
  const initialState = {};

  it('should have an initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(initialState);
  });

  it('should return current state by default', () => {
    expect(reducer(undefined, { type: 'DOES_NOT_EXIST' })).to.deep.equal(initialState);
  });

  describe('Can handle actions', () => {
    it('NEW_LINEUPS_RECEIVED', () => {
      const action = Actions.newLineupsReceived(JSON);
      const newState = Object.assign({}, initialState, {
        [JSON.team.replace(/\s/, '_')]: JSON,
      });

      expect(reducer(undefined, action)).to.deep.equal(newState);
    });
  });
});
