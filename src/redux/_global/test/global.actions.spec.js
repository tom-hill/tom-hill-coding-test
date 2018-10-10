import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import * as Actions from '../global.actions';
import * as API from '../../../services/api.service';
import * as Type from '../../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const JSON = require('../../../../tools/test/match-lineups').lineups[0];

describe('Global Store Actions', () => {
  it('appInitialised()', () => {
    const action = {
      type: Type.APP_INITIALISED,
    };
    expect(Actions.appInitialised()).to.deep.equal(action);
  });

  it('appInitialisationError(err)', () => {
    const error = 'Error Message';
    const action = {
      type: Type.APP_INITIALISATION_ERROR,
      error,
    };
    expect(Actions.appInitialisationError(error)).to.deep.equal(action);
  });

  it('newLineupReceived(data)', () => {
    const data = 'data';
    const action = {
      type: Type.NEW_LINEUPS_RECEIVED,
      data,
    };
    expect(Actions.newLineupReceived(data))
      .to
      .deep
      .equal(action);
  });

  it('slowConnection()', () => {
    const action = {
      type: Type.SLOW_CONNECTION,
    };
    expect(Actions.slowConnection()).to.deep.equal(action);
  });

  describe('API Calls - Success Scenarios', () => {
    before(() => {
      sinon.stub(API, 'get').callsFake(() => {
        return Promise.resolve(JSON);
      });
    });

    after(() => {
      API.get.restore();
    });

    it('initialiseApplication() SUCCESS', () => {
      const store = mockStore({});
      const expectedActions = [
        Actions.newLineupReceived().type,
        Actions.appInitialised().type,
      ];

      return store.dispatch(Actions.initialiseApplication()).then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).to.deep.equal(expectedActions);
      });
    });
  });

  describe('API Calls - Failure Scenarios', () => {
    before(() => {
      sinon.stub(API, 'get').callsFake(() => {
        return Promise.reject('error');
      });
    });

    after(() => {
      API.get.restore();
    });

    it('initialiseApplication() FAILURE', () => {
      const store = mockStore({});
      const expectedActions = [
        Actions.appInitialisationError('error').type,
      ];

      return store.dispatch(Actions.initialiseApplication()).catch(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).to.deep.equal(expectedActions);
      });
    });
  });
});
