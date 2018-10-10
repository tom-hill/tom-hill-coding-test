import * as Type from '../constants';

export const newLineupsReceived = (data) => ({
    type: Type.NEW_LINEUPS_RECEIVED,
    data
});