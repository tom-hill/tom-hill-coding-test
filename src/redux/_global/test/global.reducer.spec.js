import { expect } from 'chai';
import reducer from '../global.reducer';
import * as Actions from '../global.actions';

describe('Global Store Reducer', () => {
  const initialState = {
    loading: true,
    slowConnection: false,
    error: false,
    errorMessage: null,
  };

  it('should have an initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(initialState);
  });

  it('should return current state by default', () => {
    expect(reducer(undefined, { type: 'DOES_NOT_EXIST' })).to.deep.equal(initialState);
  });

  describe('Can handle actions', () => {
    it('APP_INITIALISED', () => {
      const action = Actions.appInitialised();
      const newState = Object.assign({}, initialState, {
        loading: false,
      });
      expect(reducer(undefined, action)).to.deep.equal(newState);
    });

    it('NEW_LINEUPS_RECEIVED', () => {
      const action = Actions.newLineupReceived({});
      const newState = Object.assign({}, initialState, {
        loading: false,
      });
      expect(reducer(undefined, action)).to.deep.equal(newState);
    });

    it('NEW_LINEUPS_RECEIVED', () => {
      const action = Actions.newLineupReceived({});
      const newState = Object.assign({}, initialState, {
        loading: false,
      });
      expect(reducer(undefined, action)).to.deep.equal(newState);
    });

    it('SLOW_CONNECTION', () => {
      const action = Actions.slowConnection();
      const newState = Object.assign({}, initialState, {
        loading: true,
        slowConnection: true,
      });
      expect(reducer(undefined, action)).to.deep.equal(newState);
    });

    it('APP_INITIALISATION_ERROR', () => {
      const error = 'Error Message';
      const action = Actions.appInitialisationError(error);
      const newState = Object.assign({}, initialState, {
        loading: false,
        error: true,
        errorMessage: error,
      });
      expect(reducer(undefined, action)).to.deep.equal(newState);
    });
  });
});
