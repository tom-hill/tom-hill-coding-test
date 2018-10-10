import * as Type from '../constants';

const initialState = {};

export default function lineupsReducer(state = initialState, action) {
    switch(action.type) {
        case Type.NEW_LINEUPS_RECEIVED:
            return Object.assign({}, state, {
               [action.data.team.replace(/\s/, '_')]: action.data
            });

        default:
            return state;
    }
}