import { expect } from 'chai';
import * as Actions from '../lineups.actions';
import * as Type from '../../constants';

describe('Lineups Actions', () => {
  it('newLineupsReceived(data)', () => {
    const data = 'data';
    const action = {
      type: Type.NEW_LINEUPS_RECEIVED,
      data,
    };
    expect(Actions.newLineupsReceived(data)).to.deep.equal(action);
  });
});
